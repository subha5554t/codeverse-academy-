import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'

// ── Protect routes — must be logged in ──────────────────────────────────────
export const protect = async (req, res, next) => {
  try {
    // 1. Get token from header or cookie
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'You are not logged in. Please log in to access this.',
      })
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 3. Check if user still exists
    const user = await User.findById(decoded.id)
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      })
    }

    // 4. Check if password was changed after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: 'Password was recently changed. Please log in again.',
      })
    }

    // Grant access
    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token.' })
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired. Please log in again.' })
    }
    return res.status(401).json({ success: false, message: 'Authentication failed.' })
  }
}

// ── Restrict to specific roles ───────────────────────────────────────────────
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action.',
      })
    }
    next()
  }
}

// ── Optional auth — does not block if no token ───────────────────────────────
export const optionalAuth = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id)
    }
  } catch {
    // silently ignore — user is just not authenticated
  }
  next()
}
