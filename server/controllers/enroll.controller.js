import { validationResult } from 'express-validator'
import Enrollment from '../models/Enrollment.model.js'
import Course from '../models/Course.model.js'

// POST /api/enroll
export const createEnrollment = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }

  try {
    const { name, email, course, courseId } = req.body

    // Check for duplicate enrollment
    const existing = await Enrollment.findOne({
      email: email.toLowerCase(),
      course,
      status: { $ne: 'cancelled' },
    })

    if (existing) {
      return res.status(409).json({
        success: false,
        message: `You are already enrolled in ${course}`,
      })
    }

    // Increment student count on course
    if (courseId) {
      await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } })
    }

    const enrollment = await Enrollment.create({
      name: name?.trim() || 'Student',
      email: email.trim().toLowerCase(),
      course,
      courseRef: courseId || null,
    })

    return res.status(201).json({
      success: true,
      message: `Successfully enrolled in ${course}! Check your email for next steps.`,
      data: {
        id: enrollment._id,
        course: enrollment.course,
        status: enrollment.status,
        enrolledAt: enrollment.enrolledAt,
      },
    })
  } catch (error) {
    console.error('Enrollment error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Enrollment failed. Please try again.',
    })
  }
}

// GET /api/enroll — list enrollments (admin)
export const getEnrollments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const course = req.query.course || null

    const filter = course ? { course } : {}

    const [enrollments, total] = await Promise.all([
      Enrollment.find(filter)
        .sort({ enrolledAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Enrollment.countDocuments(filter),
    ])

    // Stats
    const stats = await Enrollment.aggregate([
      { $group: { _id: '$course', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    return res.json({
      success: true,
      data: enrollments,
      stats,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get enrollments error:', error.message)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// GET /api/enroll/check?email=&course=
export const checkEnrollment = async (req, res) => {
  try {
    const { email, course } = req.query

    if (!email || !course) {
      return res.status(400).json({ success: false, message: 'email and course are required' })
    }

    const enrollment = await Enrollment.findOne({
      email: email.toLowerCase(),
      course,
      status: { $ne: 'cancelled' },
    })

    return res.json({
      success: true,
      enrolled: !!enrollment,
      data: enrollment || null,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
