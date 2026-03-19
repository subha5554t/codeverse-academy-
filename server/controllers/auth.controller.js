import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User from '../models/User.model.js'

// ── Helper: sign JWT ─────────────────────────────────────────────────────────
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  return res.status(statusCode).json({
    success: true,
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    },
  })
}

// ── POST /api/auth/register ──────────────────────────────────────────────────
export const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }

  try {
    const { name, email, password } = req.body

    // Check existing
    const exists = await User.findOne({ email: email.toLowerCase() })
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: 'student',
    })

    // Update lastLogin
    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    return createSendToken(user, 201, res)
  } catch (error) {
    console.error('Register error:', error.message)
    return res.status(500).json({ success: false, message: 'Registration failed. Try again.' })
  }
}

// ── POST /api/auth/login ─────────────────────────────────────────────────────
export const login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    })
  }

  try {
    const { email, password } = req.body

    // Get user with password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect email or password.',
      })
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Contact support.',
      })
    }

    // Update lastLogin
    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    return createSendToken(user, 200, res)
  } catch (error) {
    console.error('Login error:', error.message)
    return res.status(500).json({ success: false, message: 'Login failed. Try again.' })
  }
}

// ── GET /api/auth/me ─────────────────────────────────────────────────────────
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    return res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// ── POST /api/auth/logout ────────────────────────────────────────────────────
export const logout = (_req, res) => {
  return res.json({ success: true, message: 'Logged out successfully.' })
}

// ── PUT /api/auth/change-password ────────────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both current and new password are required.' })
    }

    const user = await User.findById(req.user.id).select('+password')
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters.' })
    }

    user.password = newPassword
    await user.save()

    return createSendToken(user, 200, res)
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}
