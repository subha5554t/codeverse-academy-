import { Router } from 'express'
import { body } from 'express-validator'
import {
  register,
  login,
  getMe,
  logout,
  changePassword,
} from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { formLimiter } from '../middleware/rateLimit.middleware.js'

const router = Router()

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 80 }),
  body('email').trim().isEmail().withMessage('Enter a valid email').normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and a number'),
]

const loginValidation = [
  body('email').trim().isEmail().withMessage('Enter a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
]

router.post('/register', formLimiter, registerValidation, register)
router.post('/login',    formLimiter, loginValidation,    login)
router.get('/me',        protect, getMe)
router.post('/logout',   protect, logout)
router.put('/change-password', protect, changePassword)

export default router
