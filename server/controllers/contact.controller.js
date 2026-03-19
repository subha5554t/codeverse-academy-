import { validationResult } from 'express-validator'
import Student from '../models/Student.model.js'
import {
  sendContactAlertToAdmin,
  sendContactAutoReply,
} from '../utils/email.js'

// POST /api/contact
export const submitContact = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }

  try {
    const { name, email, course, message } = req.body

    const student = await Student.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      course: course || '',
      message: message.trim(),
      ipAddress: req.ip || '',
    })

    // Send emails in background
    Promise.allSettled([
      sendContactAlertToAdmin({ name, email, course, message }),
      sendContactAutoReply({ name, email, course }),
    ]).then(results => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.error(`Email ${i === 0 ? 'admin alert' : 'auto-reply'} failed:`, r.reason?.message)
        }
      })
    })

    return res.status(201).json({
      success: true,
      message: 'Your message has been received! Check your inbox — we will reply within 2 hours.',
      data: { id: student._id, name: student.name, email: student.email, createdAt: student.createdAt },
    })
  } catch (error) {
    console.error('Contact submission error:', error.message)
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
}

// GET /api/contact
export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const filter = req.query.status ? { status: req.query.status } : {}
    const [contacts, total] = await Promise.all([
      Student.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).select('-ipAddress'),
      Student.countDocuments(filter),
    ])
    return res.json({ success: true, data: contacts, pagination: { total, page, pages: Math.ceil(total / limit), limit } })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// PATCH /api/contact/:id/status
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!['new', 'contacted', 'enrolled', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' })
    }
    const contact = await Student.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' })
    return res.json({ success: true, data: contact })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
