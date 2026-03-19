// 404 handler — catch unmatched routes
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

// Global error handler
export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || err.status || 500

  // Log in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${new Date().toISOString()}] ${statusCode} — ${err.message}`)
    if (statusCode === 500) console.error(err.stack)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message,
      })),
    })
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field: ${err.path}`,
    })
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(409).json({
      success: false,
      message: `Duplicate value: ${field} already exists`,
    })
  }

  return res.status(statusCode).json({
    success: false,
    message: statusCode === 500
      ? 'Internal server error. Please try again later.'
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
}
