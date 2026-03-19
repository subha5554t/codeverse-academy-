import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, LogIn, Code2, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface FormData {
  email: string
  password: string
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/'

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    const result = await login(data.email, data.password)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-primary/8 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center shadow-glow-primary">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-text-primary">
              Code<span className="gradient-text">Verse</span>
            </span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-text-primary mb-2">Welcome back</h1>
          <p className="text-text-secondary text-sm">Sign in to your CodeVerse account</p>
        </div>

        {/* Card */}
        <div className="card p-8">
          {/* Admin hint */}
          <div className="mb-6 p-3 rounded-xl bg-primary/10 border border-primary/25 text-xs text-text-secondary">
            <span className="text-primary font-semibold">Admin?</span> Use your admin credentials to access the dashboard at{' '}
            <code className="text-primary-light">/admin</code>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-3 rounded-xl bg-accent-rose/10 border border-accent-rose/25 flex items-center gap-2 text-sm text-accent-rose"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                })}
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl bg-elevated border text-text-primary placeholder:text-text-muted text-sm focus:outline-none transition-colors ${
                  errors.email ? 'border-accent-rose/60' : 'border-border focus:border-primary/60'
                }`}
              />
              {errors.email && <p className="text-xs text-accent-rose mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider">
                  Password
                </label>
                <button type="button" className="text-xs text-primary hover:text-primary-light transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full px-4 py-3 pr-11 rounded-xl bg-elevated border text-text-primary placeholder:text-text-muted text-sm focus:outline-none transition-colors ${
                    errors.password ? 'border-accent-rose/60' : 'border-border focus:border-primary/60'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-accent-rose mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-light font-semibold transition-colors">
              Create one free
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          By signing in you agree to our{' '}
          <span className="text-text-secondary">Terms of Service</span> and{' '}
          <span className="text-text-secondary">Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  )
}
