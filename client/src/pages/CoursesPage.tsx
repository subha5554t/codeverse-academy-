import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, Users, ArrowRight, Filter, Search, CheckCircle, Award, FileText, ShieldCheck, AlertCircle } from 'lucide-react'
import { courses } from '../utils/data'
import { api } from '../utils/api'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

interface EnrollState {
  status: 'idle' | 'loading' | 'success' | 'error' | 'duplicate'
  message: string
}

export default function CoursesPage() {
  const [activeLevel, setActiveLevel] = useState('All')
  const [search, setSearch] = useState('')
  const [enrollStates, setEnrollStates] = useState<Record<number, EnrollState>>({})
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<{ id: number; title: string } | null>(null)
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '' })

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const filtered = courses.filter(c => {
    const matchLevel = activeLevel === 'All' || c.level === activeLevel
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    return matchLevel && matchSearch
  })

  const setEnrollState = (id: number, state: EnrollState) => {
    setEnrollStates(prev => ({ ...prev, [id]: state }))
  }

  const openEnrollModal = (course: { id: number; title: string }) => {
    setSelectedCourse(course)
    setEnrollForm({ name: '', email: '' })
    setShowEnrollModal(true)
  }

  const handleEnroll = async () => {
    if (!selectedCourse) return
    if (!enrollForm.name.trim() || !enrollForm.email.trim()) return
    const { id, title } = selectedCourse
    setEnrollState(id, { status: 'loading', message: '' })
    setShowEnrollModal(false)
    try {
      const json = await api.post('/api/enroll', {
        name: enrollForm.name.trim(),
        email: enrollForm.email.trim(),
        course: title,
      })
      if (json.success) {
        setEnrollState(id, { status: 'success', message: json.message || `Enrolled in ${title}!` })
      } else if (json.message?.includes('already enrolled')) {
        setEnrollState(id, { status: 'duplicate', message: 'You are already enrolled!' })
      } else {
        setEnrollState(id, { status: 'error', message: json.message || 'Enrollment failed.' })
      }
    } catch {
      setEnrollState(id, { status: 'error', message: 'Network error. Please try again.' })
    }
    setTimeout(() => setEnrollState(id, { status: 'idle', message: '' }), 4000)
  }

  return (
    <div className="pt-24 pb-24">
      <div className="relative overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[80px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="section-label mx-auto mb-4">All Courses</div>
            <h1 className="section-title mb-4">Pick Your <span className="gradient-text">Learning Path</span></h1>
            <p className="section-subtitle max-w-xl mx-auto">12 courses starting at just ₹999. Real projects. Expert mentors. Certificate + LOR on completion.</p>
            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-sm text-text-muted">
              <div className="flex items-center gap-1.5"><Award className="w-4 h-4 text-accent-amber" /><span>Certificate of Completion</span></div>
              <div className="flex items-center gap-1.5"><FileText className="w-4 h-4 text-accent-cyan" /><span>Letter of Recommendation (LOR)</span></div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-accent-emerald" /><span>Verified by 500+ Hiring Partners</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-muted" />
            <div className="flex gap-2">
              {levels.map(level => (
                <button key={level} onClick={() => setActiveLevel(level)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-display transition-all ${activeLevel === level ? 'bg-primary text-white shadow-glow-primary' : 'border border-border-light text-text-secondary hover:text-text-primary hover:border-primary/50'}`}>{level}</button>
              ))}
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Search courses or skills..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 text-sm rounded-lg bg-elevated border border-border focus:border-primary/50 focus:outline-none text-text-primary placeholder:text-text-muted w-64" />
          </div>
        </motion.div>

        <motion.div ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'} variants={{ show: { transition: { staggerChildren: 0.08 } }, hidden: {} }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => {
            const enrollState = enrollStates[course.id] || { status: 'idle', message: '' }
            return (
              <motion.div key={course.id} variants={fadeUp} className={`card border ${course.borderColor} bg-gradient-to-br ${course.color} group overflow-hidden flex flex-col`}>
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{course.image}</div>
                    <div className="flex flex-col items-end gap-1">
                      {course.badge && <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold font-mono ${course.badgeColor}`}>{course.badge}</span>}
                      <span className="text-xs text-text-muted font-mono border border-border px-2 py-0.5 rounded-md">{course.level}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students.toLocaleString()} enrolled</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-accent-amber fill-accent-amber" />{course.rating}</span>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 font-mono">Skills Covered</p>
                  <div className="flex flex-wrap gap-1.5">{course.skills.map(skill => <span key={skill} className="code-badge">{skill}</span>)}</div>
                </div>
                <div className="px-6 pb-4">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 font-mono">Eligibility</p>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-text-secondary leading-relaxed">{course.eligibility}</p>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 font-mono">On Completion</p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-text-secondary"><Award className="w-3.5 h-3.5 text-accent-amber flex-shrink-0" />Certificate of Completion (verified)</div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary"><FileText className="w-3.5 h-3.5 text-accent-cyan flex-shrink-0" />Letter of Recommendation (LOR) on request</div>
                  </div>
                </div>
                {enrollState.status !== 'idle' && enrollState.status !== 'loading' && (
                  <div className={`mx-6 mb-3 p-2 rounded-lg text-xs flex items-center gap-2 ${enrollState.status === 'success' ? 'bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/25' : enrollState.status === 'duplicate' ? 'bg-accent-amber/15 text-accent-amber border border-accent-amber/25' : 'bg-accent-rose/15 text-accent-rose border border-accent-rose/25'}`}>
                    {enrollState.status === 'success' ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                    {enrollState.message}
                  </div>
                )}
                <div className="px-6 pb-6 flex items-end justify-between pt-4 border-t border-border/50 mt-auto">
                  <div>
                    <div className="font-display font-bold text-2xl text-text-primary">${course.price}</div>
                    <div className="text-xs text-text-muted">≈ ₹{course.priceINR.toLocaleString('en-IN')} · one-time</div>
                  </div>
                  <button onClick={() => openEnrollModal({ id: course.id, title: course.title })} disabled={enrollState.status === 'loading'} className={`btn-primary text-sm py-2 px-5 ${enrollState.status === 'loading' ? 'opacity-70' : ''}`}>
                    {enrollState.status === 'loading' ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : enrollState.status === 'success' ? <><CheckCircle className="w-4 h-4" />Enrolled!</> : <>Enroll Now<ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-text-muted">
            <div className="text-4xl mb-4">🔍</div>
            <p className="font-display font-semibold text-lg text-text-secondary mb-2">No courses found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-16 card p-8 text-center bg-gradient-to-br from-primary/10 to-accent-cyan/5 border-primary/30">
          <h3 className="font-display font-bold text-2xl text-text-primary mb-2">Not sure which course to pick?</h3>
          <p className="text-text-secondary mb-6">Book a free 30-minute consultation. We will match you to the perfect path.</p>
          <Link to="/contact" className="btn-primary">Get Free Advice <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
      </div>

      {showEnrollModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 w-full max-w-md">
            <h3 className="font-display font-bold text-xl text-text-primary mb-1">Enroll in Course</h3>
            <p className="text-sm text-text-secondary mb-6">{selectedCourse.title}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">Your Name *</label>
                <input type="text" value={enrollForm.name} onChange={e => setEnrollForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-primary/60 focus:outline-none text-text-primary placeholder:text-text-muted text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider mb-2">Email Address *</label>
                <input type="email" value={enrollForm.email} onChange={e => setEnrollForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl bg-elevated border border-border focus:border-primary/60 focus:outline-none text-text-primary placeholder:text-text-muted text-sm" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowEnrollModal(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
              <button onClick={handleEnroll} disabled={!enrollForm.name.trim() || !enrollForm.email.trim()} className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed">Confirm Enroll</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}