import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, UserPlus, Code2, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const passwordRules = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
]

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
  const password = watch('password', '')

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError('')
    const result = await registerUser(data.name, data.email, data.password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message || 'Registration failed')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-accent-violet/8 rounded-full blur-[100px]" />

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
          <h1 className="font-display font-bold text-3xl text-text-primary mb-2">Create your account</h1>
          <p className="text-text-secondary text-sm">Join 50,000+ developers learning at CodeVerse</p>
        </div>

        <div className="card p-8">
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
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
                placeholder="Subhadip Mahanty"
                autoComplete="name"
                className={`w-full px-4 py-3 rounded-xl bg-elevated border text-text-primary placeholder:text-text-muted text-sm focus:outline-none transition-colors ${
                  errors.name ? 'border-accent-rose/60' : 'border-border focus:border-primary/60'
                }`}
              />
              {errors.name && <p className="text-xs text-accent-rose mt-1">{errors.name.message}</p>}
            </div>

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
              <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Minimum 8 characters' },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Must include uppercase, lowercase, and number',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="new-password"
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

              {/* Password strength */}
              {password.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {passwordRules.map(rule => (
                    <div key={rule.label} className={`flex items-center gap-1.5 text-xs transition-colors ${
                      rule.test(password) ? 'text-accent-emerald' : 'text-text-muted'
                    }`}>
                      <CheckCircle className="w-3 h-3" />
                      {rule.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword', { required: 'Please confirm your password' })}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="new-password"
                className={`w-full px-4 py-3 rounded-xl bg-elevated border text-text-primary placeholder:text-text-muted text-sm focus:outline-none transition-colors ${
                  errors.confirmPassword ? 'border-accent-rose/60' : 'border-border focus:border-primary/60'
                }`}
              />
              {errors.confirmPassword && <p className="text-xs text-accent-rose mt-1">{errors.confirmPassword.message}</p>}
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
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-light font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
