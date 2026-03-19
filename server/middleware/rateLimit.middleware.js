import rateLimit from 'express-rate-limit'

// General API rate limiter
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again in 15 minutes.',
  },
  skip: (req) => process.env.NODE_ENV === 'test',
})

// Strict limiter for form submissions
export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many form submissions. Please try again later.',
  },
  skip: (req) => process.env.NODE_ENV === 'test',
})
