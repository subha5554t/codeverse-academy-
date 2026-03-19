import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contact.routes.js'
import courseRoutes from './routes/course.routes.js'
import enrollRoutes from './routes/enroll.routes.js'
import domainRoutes from './routes/domain.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import { limiter } from './middleware/rateLimit.middleware.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL,
  'https://codeverse-academy-othp.vercel.app',
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.log('CORS blocked:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))
// ── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use('/api', limiter)

// ── HEALTH CHECK ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'OK',
    service: 'CodeVerse Academy API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  })
})

// ── ROUTES ────────────────────────────────────────────────────────────────────
app.use('/api/auth',    authRoutes)
app.use('/api/admin',   adminRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/enroll',  enrollRoutes)
app.use('/api/domains', domainRoutes)
app.use('/api/payment', paymentRoutes)

// ── ERROR HANDLING ────────────────────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════╗
  ║      🚀 CodeVerse Academy API  v2.0             ║
  ║  Port: ${PORT}  │  Env: ${(process.env.NODE_ENV || 'development').padEnd(16)}  ║
  ║  Auth · Email · Razorpay · Admin Dashboard      ║
  ╚══════════════════════════════════════════════════╝
  `)
})

export default app