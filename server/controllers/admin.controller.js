import Student from '../models/Student.model.js'
import Enrollment from '../models/Enrollment.model.js'
import Course from '../models/Course.model.js'
import User from '../models/User.model.js'

// GET /api/admin/stats — dashboard overview
export const getDashboardStats = async (req, res) => {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    const [
      totalContacts,
      newContactsThisMonth,
      newContactsLastMonth,
      totalEnrollments,
      enrollmentsThisMonth,
      enrollmentsLastMonth,
      totalCourses,
      totalStudents,
      recentContacts,
      recentEnrollments,
      contactsByStatus,
      enrollmentsByCourse,
      contactsByDay,
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Student.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      Enrollment.countDocuments(),
      Enrollment.countDocuments({ enrolledAt: { $gte: startOfMonth } }),
      Enrollment.countDocuments({ enrolledAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      Course.countDocuments({ isPublished: true }),
      User.countDocuments({ role: 'student' }),
      Student.find().sort({ createdAt: -1 }).limit(8).select('name email course status createdAt'),
      Enrollment.find().sort({ enrolledAt: -1 }).limit(8).select('name email course status enrolledAt'),
      Student.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Enrollment.aggregate([
        { $group: { _id: '$course', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]),
      Student.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
        { $limit: 30 },
      ]),
    ])

    // Calculate growth percentages
    const contactGrowth = newContactsLastMonth > 0
      ? Math.round(((newContactsThisMonth - newContactsLastMonth) / newContactsLastMonth) * 100)
      : 100
    const enrollmentGrowth = enrollmentsLastMonth > 0
      ? Math.round(((enrollmentsThisMonth - enrollmentsLastMonth) / enrollmentsLastMonth) * 100)
      : 100

    return res.json({
      success: true,
      data: {
        overview: {
          totalContacts,
          newContactsThisMonth,
          contactGrowth,
          totalEnrollments,
          enrollmentsThisMonth,
          enrollmentGrowth,
          totalCourses,
          totalStudents,
        },
        recentContacts,
        recentEnrollments,
        contactsByStatus,
        enrollmentsByCourse,
        contactsByDay: contactsByDay.map(d => ({
          date: `${d._id.year}-${String(d._id.month).padStart(2,'0')}-${String(d._id.day).padStart(2,'0')}`,
          count: d.count,
        })),
      },
    })
  } catch (error) {
    console.error('Dashboard stats error:', error.message)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// GET /api/admin/contacts — paginated contact list
export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 15
    const status = req.query.status || null
    const search = req.query.search || null

    const filter = {}
    if (status) filter.status = status
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } },
      ]
    }

    const [contacts, total] = await Promise.all([
      Student.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-ipAddress'),
      Student.countDocuments(filter),
    ])

    return res.json({
      success: true,
      data: contacts,
      pagination: { total, page, pages: Math.ceil(total / limit), limit },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// GET /api/admin/enrollments — paginated enrollment list
export const getAllEnrollments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 15

    const [enrollments, total] = await Promise.all([
      Enrollment.find()
        .sort({ enrolledAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Enrollment.countDocuments(),
    ])

    return res.json({
      success: true,
      data: enrollments,
      pagination: { total, page, pages: Math.ceil(total / limit), limit },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// PATCH /api/admin/contacts/:id/status
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body
    const valid = ['new', 'contacted', 'enrolled', 'closed']
    if (!valid.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' })
    }

    const contact = await Student.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    )
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' })

    return res.json({ success: true, data: contact })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// DELETE /api/admin/contacts/:id
export const deleteContact = async (req, res) => {
  try {
    const contact = await Student.findByIdAndDelete(req.params.id)
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' })
    return res.json({ success: true, message: 'Contact deleted' })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
