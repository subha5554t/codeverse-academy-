import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Mail, MapPin, Clock, CheckCircle, Send, MessageSquare, Github, Linkedin, Twitter, AlertCircle } from 'lucide-react'
import { api } from '../utils/api'

interface FormData { name: string; email: string; course: string; message: string }

const courseOptions = [
  'HTML & CSS Fundamentals',
  'JavaScript Basics',
  'Git & GitHub for Beginners',
  'Python for Beginners',
  'React.js Crash Course',
  'Node.js & Express APIs',
  'Tailwind CSS Mastery',
  'TypeScript for Developers',
  'SQL & Database Design',
  'MERN Stack Bootcamp',
  'Full Stack Developer Path',
  'AI for Developers',
  'Not sure yet',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const json = await api.post('/api/contact', {
        name: data.name,
        email: data.email,
        course: data.course || '',
        message: data.message,
      })
      if (json.success) {
        setSubmitted(true)
        reset()
      } else {
        if (json.errors && json.errors.length > 0) {
          setError(json.errors.map((e: { message: string }) => e.message).join(', '))
        } else {
          setError(json.message || 'Something went wrong. Please try again.')
        }
      }
    } catch {
      const subject = encodeURIComponent(`[CodeVerse Enquiry] ${data.course || 'General'} — ${data.name}`)
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nCourse: ${data.course || 'Not specified'}\n\nMessage:\n${data.message}`)
      window.open(`mailto:subhadipmahanty@gmail.com?subject=${subject}&body=${body}`, '_blank')
      setSubmitted(true)
      reset()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-24">
      <div className="relative overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-rose/6 rounded-full blur-[80px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label mx-auto mb-4"><MessageSquare className="w-3 h-3" />Contact</div>
            <h1 className="section-title mb-4">Let's Start Your <span className="gradient-text">Developer Journey</span></h1>
            <p className="section-subtitle max-w-xl mx-auto">I personally read every message and reply within 2 hours.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-2 space-y-5">
            <div className="card p-6 bg-gradient-to-br from-primary/10 to-accent-cyan/5 border-primary/30">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white text-xl font-bold font-display shadow-glow-primary flex-shrink-0">SM</div>
                <div>
                  <div className="font-display font-bold text-text-primary text-lg">Subhadip Mahanty</div>
                  <div className="text-xs text-primary font-semibold">Full Stack Developer</div>
                  <div className="text-xs text-text-muted">Purulia, West Bengal, 723128, India</div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">Full Stack Developer passionate about teaching modern web technologies. I mentor students from zero to job-ready and personally answer every enquiry.</p>
              <div className="flex gap-2">
                {[
                  { icon: <Github className="w-4 h-4"/>, href: 'https://github.com' },
                  { icon: <Linkedin className="w-4 h-4"/>, href: 'https://linkedin.com' },
                  { icon: <Twitter className="w-4 h-4"/>, href: 'https://twitter.com' },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-border-light bg-elevated flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all">{s.icon}</a>
                ))}
              </div>
            </div>
            {[
              { icon: <Mail className="w-5 h-5"/>, label: 'Email', value: 'subhadipmahanty@gmail.com', sub: 'Replies within 2 hours', color: 'text-primary bg-primary/10 border-primary/25', href: 'mailto:subhadipmahanty@gmail.com' },
              { icon: <MapPin className="w-5 h-5"/>, label: 'Location', value: 'Purulia, West Bengal, 723128', sub: 'IST (UTC +5:30)', color: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/25', href: null },
              { icon: <Clock className="w-5 h-5"/>, label: 'Response Time', value: 'Within 2 Hours', sub: 'Mon–Sat, 9am–9pm IST', color: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/25', href: null },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="card p-4 flex gap-4">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.color}`}>{item.icon}</div>
                <div>
                  <p className="text-xs text-text-muted font-mono mb-0.5">{item.label}</p>
                  {item.href
                    ? <a href={item.href} className="font-semibold text-sm text-text-primary hover:text-primary transition-colors">{item.value}</a>
                    : <p className="font-semibold text-sm text-text-primary">{item.value}</p>
                  }
                  <p className="text-xs text-text-secondary">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="lg:col-span-3">
            <div className="card p-8 lg:p-10">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent-emerald/20 border border-accent-emerald/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-accent-emerald" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-text-primary mb-2">Message Sent! 🎉</h3>
                  <p className="text-text-secondary mb-2 text-sm max-w-sm mx-auto">Subhadip will reply to your email within 2 hours.</p>
                  <p className="text-xs text-text-muted mb-6">Reply will come from <span className="text-primary">subhadipmahanty@gmail.com</span></p>
                  <button onClick={() => setSubmitted(false)} className="btn-ghost text-sm">Send Another Message</button>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-2xl text-text-primary mb-1">Send a Message</h2>
                  <p className="text-sm text-text-secondary mb-8">Personal reply within 2 hours from <span className="text-primary">subhadipmahanty@gmail.com</span></p>
                  {error && (
                    <div className="mb-5 p-3 rounded-xl bg-accent-rose/10 border border-accent-rose/25 text-sm text-accent-rose flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />{error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">Full Name *</label>
                        <input {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' }, maxLength: { value: 80, message: 'Max 80 characters' } })} placeholder="Your full name" className={`w-full px-4 py-3 rounded-xl bg-elevated border text-text-primary placeholder:text-text-muted text-sm focus:outline-none transition-colors ${errors.name ? 'border-accent-rose/60' : 'border-border focus:border-primary/60'}`} />
                        {errors.name && <p className="text-xs text-accent-rose mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">Email Address *</label>
                        <input {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} type="email" placeholder="you@email.com" className={`w-full px-4 py-3 rounded-xl bg-elevated border text-text-primary placeholder:text-text-muted text-sm focus:outline-none transition-colors ${errors.email ? 'border-accent-rose/60' : 'border-border focus:border-primary/60'}`} />
                        {errors.email && <p className="text-xs text-accent-rose mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">Course Interest</label>
                      <select {...register('course')} className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-primary/60 focus:outline-none text-text-primary text-sm appearance-none cursor-pointer">
                        <option value="">Select a course...</option>
                        {courseOptions.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">Message *</label>
                      <textarea {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'At least 10 characters' }, maxLength: { value: 2000, message: 'Max 2000 characters' } })} rows={5} placeholder="Tell me about your background, goals, or questions about courses..." className={`w-full px-4 py-3 rounded-xl bg-elevated border text-text-primary placeholder:text-text-muted text-sm focus:outline-none transition-colors resize-none ${errors.message ? 'border-accent-rose/60' : 'border-border focus:border-primary/60'}`} />
                      {errors.message && <p className="text-xs text-accent-rose mt-1">{errors.message.message}</p>}
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <><Send className="w-4 h-4"/>Send Message</>}
                    </button>
                    <p className="text-xs text-text-muted text-center">Goes directly to <span className="text-text-secondary font-medium">subhadipmahanty@gmail.com</span></p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}