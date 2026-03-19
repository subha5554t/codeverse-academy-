import Course from '../models/Course.model.js'

// GET /api/courses — list all published courses
export const getCourses = async (req, res) => {
  try {
    const { level, search, sort = 'createdAt', page = 1, limit = 20 } = req.query

    const filter = { isPublished: true }
    if (level && level !== 'All') filter.level = level
    if (search) filter.$text = { $search: search }

    const sortMap = {
      createdAt: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating: { rating: -1 },
      popular: { studentsCount: -1 },
    }

    const [courses, total] = await Promise.all([
      Course.find(filter)
        .sort(sortMap[sort] || { createdAt: -1 })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit)),
      Course.countDocuments(filter),
    ])

    return res.json({
      success: true,
      data: courses,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error('Get courses error:', error.message)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// GET /api/courses/:id — single course detail
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course || !course.isPublished) {
      return res.status(404).json({ success: false, message: 'Course not found' })
    }

    return res.json({ success: true, data: course })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid course ID' })
    }
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// POST /api/courses — create course (admin)
export const createCourse = async (req, res) => {
  try {
    const { title, description, duration, level, skills, price, image, badge } = req.body

    const course = await Course.create({
      title, description, duration, level,
      skills: Array.isArray(skills) ? skills : [],
      price, image, badge,
    })

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message)
      return res.status(422).json({ success: false, message: messages.join(', ') })
    }
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// PUT /api/courses/:id — update course (admin)
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' })
    }

    return res.json({ success: true, data: course })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// DELETE /api/courses/:id — soft delete (admin)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isPublished: false },
      { new: true }
    )

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' })
    }

    return res.json({ success: true, message: 'Course removed successfully' })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
