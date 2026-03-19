import { Router } from 'express'
import { body } from 'express-validator'
import {
  createEnrollment,
  getEnrollments,
  checkEnrollment,
} from '../controllers/enroll.controller.js'

const router = Router()

const enrollValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('course')
    .trim()
    .notEmpty().withMessage('Course is required')
    .isLength({ max: 120 }).withMessage('Course name too long'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 80 }).withMessage('Name too long'),
]

// POST /api/enroll         — public enrollment
router.post('/', enrollValidation, createEnrollment)

// GET  /api/enroll         — list all enrollments (admin)
router.get('/', getEnrollments)

// GET  /api/enroll/check   — check if email is enrolled in a course
router.get('/check', checkEnrollment)

export default router
