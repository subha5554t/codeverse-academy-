import { Router } from 'express'
import { body } from 'express-validator'
import {
  submitContact,
  getContacts,
  updateContactStatus,
} from '../controllers/contact.controller.js'

const router = Router()

const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 80 }).withMessage('Name must be between 2 and 80 characters')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  body('course')
    .optional()
    .trim()
    .isLength({ max: 120 }).withMessage('Course name too long'),
]

// POST /api/contact — public
router.post('/', contactValidation, submitContact)

// GET /api/contact — admin (add auth middleware in production)
router.get('/', getContacts)

// PATCH /api/contact/:id/status — admin
router.patch('/:id/status', updateContactStatus)

export default router
