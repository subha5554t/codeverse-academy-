import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Star, ChevronDown, ChevronUp,
  Users, Award, TrendingUp, Zap, Code, Globe,
  CheckCircle, BookOpen, Briefcase, Rocket
} from 'lucide-react'
import { courses, testimonials, stats, instructors, pricingPlans, faqs } from '../utils/data'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid BG */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent-cyan/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent-violet/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Floating code snippets */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-8 lg:left-24 hidden md:block"
      >
        <div className="glass rounded-xl p-3 font-mono text-xs text-accent-cyan border border-accent-cyan/20 shadow-glow-cyan">
          <div className="text-text-muted mb-1">{'// App.jsx'}</div>
          <div><span className="text-accent-violet">const</span> <span className="text-accent-amber">App</span> = () ={'>'} {'{'}</div>
          <div className="pl-3"><span className="text-primary-light">return</span> <span className="text-accent-rose">{'<Hero />'}</span></div>
          <div>{'}'}</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -1.5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-40 right-8 lg:right-24 hidden md:block"
      >
        <div className="glass rounded-xl p-3 font-mono text-xs border border-emerald-500/20">
          <div className="text-text-muted mb-1">{'// server.js'}</div>
          <div><span className="text-accent-cyan">app</span>.<span className="text-accent-amber">get</span>(<span className="text-accent-rose">'/api/courses'</span>,</div>
          <div className="pl-3 text-accent-emerald">async (req, res) ={'>'} {'{'}</div>
          <div className="pl-6 text-text-secondary">res.json(courses)</div>
          <div className="pl-3 text-accent-emerald">{'}'}</div>
          <div>)</div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div className="section-label">
            <span className="glow-dot w-1 h-1" />
            #1 Rated Developer Academy 2024
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-balance leading-[1.05] mb-6"
        >
          Learn Modern{' '}
          <span className="gradient-text">Software Development</span>
          {' '}From Industry Experts
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Become a job-ready developer in months, not years. Master MERN Stack, React, Web3, AI, and DevOps through hands-on projects and expert mentorship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/courses" className="btn-primary text-base px-8 py-3.5">
            Start Learning Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/contact" className="btn-ghost text-base px-8 py-3.5">
            Talk to an Advisor <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted"
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-accent-emerald" />
            <span>30-day money-back</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-accent-emerald" />
            <span>No experience needed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-accent-emerald" />
            <span>94% job placement</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-accent-emerald" />
            <span>Industry mentors</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div key={i} className="card p-5 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display font-bold text-2xl text-text-primary mb-0.5">{stat.value}</div>
              <div className="text-xs text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── TECH MARQUEE ────────────────────────────────────────────────────────────
const techStack = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS', 'Python', 'Solidity', 'Next.js', 'GraphQL', 'PostgreSQL', 'Kubernetes', 'TensorFlow', 'Redis', 'Tailwind CSS']

function TechMarquee() {
  return (
    <div className="py-12 border-y border-border bg-surface overflow-hidden">
      <p className="text-center text-xs font-mono text-text-muted uppercase tracking-widest mb-6">Technologies you will master</p>
      <div className="flex animate-marquee whitespace-nowrap">
        {[...techStack, ...techStack].map((tech, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-6 text-text-secondary font-mono text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── COURSES ─────────────────────────────────────────────────────────────────
function CoursesSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Section>
        <motion.div variants={fadeUp} className="text-center mb-16">
          <div className="section-label mx-auto mb-4">
            <BookOpen className="w-3 h-3" />
            Popular Courses
          </div>
          <h2 className="section-title mb-4">
            Courses Built for{' '}
            <span className="gradient-text">Real Jobs</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Every curriculum is crafted with hiring managers and senior engineers. Courses start at just ₹999 — no excuses not to start.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              variants={fadeUp}
              custom={i}
              className={`card p-6 group cursor-pointer hover:-translate-y-1 border ${course.borderColor} bg-gradient-to-br ${course.color}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{course.image}</div>
                {course.badge && (
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold font-mono ${course.badgeColor}`}>
                    {course.badge}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-lg text-text-primary mb-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {course.skills.slice(0, 4).map(skill => (
                  <span key={skill} className="code-badge">{skill}</span>
                ))}
                {course.skills.length > 4 && (
                  <span className="code-badge">+{course.skills.length - 4}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-text-muted mb-5">
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-accent-amber fill-accent-amber" />
                  <span className="font-semibold text-text-secondary">{course.rating}</span>
                  <span>({course.students.toLocaleString()} students)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                  {course.level}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-display font-bold text-xl text-text-primary">${course.price}</span>
                  <span className="text-xs text-text-muted ml-1">/ ₹{course.priceINR.toLocaleString('en-IN')}</span>
                </div>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-light transition-colors"
                >
                  Enroll <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50 text-xs text-text-muted">
                <span className="flex items-center gap-1"><span>🏅</span> Certificate</span>
                <span className="flex items-center gap-1"><span>📄</span> LOR on request</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="text-center mt-10">
          <Link to="/courses" className="btn-ghost">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Section>
    </section>
  )
}

// ─── TECH DOMAINS ────────────────────────────────────────────────────────────
const domainIcons = [
  { icon: '🎨', label: 'Frontend', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30' },
  { icon: '⚙️', label: 'Backend', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30' },
  { icon: '🗄️', label: 'Database', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30' },
  { icon: '🚀', label: 'Full Stack', color: 'from-violet-500/20 to-indigo-500/20', border: 'border-violet-500/30' },
  { icon: '☁️', label: 'DevOps', color: 'from-sky-500/20 to-blue-500/20', border: 'border-sky-500/30' },
  { icon: '🔗', label: 'Web3', color: 'from-pink-500/20 to-purple-500/20', border: 'border-pink-500/30' },
  { icon: '🤖', label: 'AI / ML', color: 'from-rose-500/20 to-red-500/20', border: 'border-rose-500/30' },
]

function DomainsPreview() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="section-label mx-auto mb-4">
              <Globe className="w-3 h-3" />
              Tech Domains
            </div>
            <h2 className="section-title mb-4">
              Every Path to{' '}
              <span className="gradient-text">Software Mastery</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              From frontend pixels to blockchain protocols — explore the full landscape of modern software development and find your path.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {domainIcons.map((d, i) => (
              <motion.div key={d.label} variants={fadeUp} custom={i}>
                <Link
                  to="/domains"
                  className={`card p-4 text-center border ${d.border} bg-gradient-to-br ${d.color} hover:-translate-y-1 block`}
                >
                  <div className="text-3xl mb-2">{d.icon}</div>
                  <div className="text-xs font-semibold font-display text-text-secondary">{d.label}</div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center mt-10">
            <Link to="/domains" className="btn-primary">
              Explore All Domains <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </Section>
      </div>
    </section>
  )
}

// ─── LEARNING ROADMAP ────────────────────────────────────────────────────────
const roadmapSteps = [
  { step: '01', title: 'Enroll & Setup', desc: 'Pick your track, set up your dev environment, and meet your mentor.', icon: <Rocket className="w-5 h-5" />, color: 'text-primary' },
  { step: '02', title: 'Build Foundations', desc: 'Master core concepts through interactive lessons and hands-on exercises.', icon: <Code className="w-5 h-5" />, color: 'text-accent-cyan' },
  { step: '03', title: 'Ship Real Projects', desc: 'Build 5+ portfolio projects with code reviews from senior engineers.', icon: <Zap className="w-5 h-5" />, color: 'text-accent-violet' },
  { step: '04', title: 'Get Hired', desc: 'Career coaching, mock interviews, and direct connections to our hiring network.', icon: <Briefcase className="w-5 h-5" />, color: 'text-accent-emerald' },
]

function RoadmapSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Section>
        <motion.div variants={fadeUp} className="text-center mb-16">
          <div className="section-label mx-auto mb-4">
            <TrendingUp className="w-3 h-3" />
            Learning Roadmap
          </div>
          <h2 className="section-title mb-4">
            Your Journey to{' '}
            <span className="gradient-text-warm">Dream Job</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />

          {roadmapSteps.map((step, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="relative">
              <div className="card p-6 text-center group hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl border border-current bg-current/10 ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  {step.icon}
                </div>
                <div className="font-mono text-xs text-text-muted mb-2">{step.step}</div>
                <h3 className="font-display font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </section>
  )
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-24 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="section-label mx-auto mb-4">
              <Star className="w-3 h-3 fill-current" />
              Student Stories
            </div>
            <h2 className="section-title mb-4">
              Real Results From{' '}
              <span className="gradient-text">Real Students</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="card p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-amber fill-accent-amber" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold font-display flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{t.name}</div>
                    <div className="text-xs text-text-muted">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  )
}

// ─── INSTRUCTORS ─────────────────────────────────────────────────────────────
function InstructorsSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Section>
        <motion.div variants={fadeUp} className="text-center mb-16">
          <div className="section-label mx-auto mb-4">
            <Award className="w-3 h-3" />
            Instructors
          </div>
          <h2 className="section-title mb-4">
            Learn from{' '}
            <span className="gradient-text">Industry Veterans</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Our instructors have shipped code at the world's top tech companies and now bring that experience directly to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((inst, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="card p-6 text-center group hover:-translate-y-1">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-white text-lg font-bold font-display mx-auto mb-4 group-hover:shadow-glow-primary transition-shadow`}>
                {inst.avatar}
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-0.5">{inst.name}</h3>
              <p className="text-xs text-primary mb-1">{inst.role}</p>
              <p className="text-xs text-text-muted mb-3">{inst.company}</p>
              <p className="text-xs text-text-secondary mb-3 leading-relaxed">{inst.bio}</p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {inst.specialties.map(s => (
                  <span key={s} className="code-badge text-xs">{s}</span>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-3">
                <Users className="w-3 h-3 inline mr-1" />
                {inst.students.toLocaleString()} students
              </p>
            </motion.div>
          ))}
        </div>
      </Section>
    </section>
  )
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Section>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="section-label mx-auto mb-4">
              Pricing
            </div>
            <h2 className="section-title mb-4">
              Invest in Your{' '}
              <span className="gradient-text">Future</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Flexible plans for every stage of your learning journey. Cancel anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                custom={i}
                className={`card p-8 relative ${plan.highlighted ? 'border-primary/50 shadow-glow-primary bg-gradient-to-br from-primary/10 to-accent-cyan/5' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 section-label text-xs">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-display font-bold text-xl text-text-primary mb-1">{plan.name}</h3>
                <p className="text-sm text-text-secondary mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="font-display font-bold text-4xl text-text-primary">${plan.price}</span>
                  <span className="text-text-muted text-sm">{plan.period}</span>
                  <div className="text-xs text-text-muted mt-1">≈ ₹{plan.priceINR.toLocaleString('en-IN')}{plan.period}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-accent-emerald flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={plan.highlighted ? 'btn-primary w-full justify-center' : 'btn-ghost w-full justify-center'}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <Section>
        <motion.div variants={fadeUp} className="text-center mb-16">
          <div className="section-label mx-auto mb-4">FAQ</div>
          <h2 className="section-title mb-4">
            Questions?{' '}
            <span className="gradient-text">Answered.</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-text-primary text-sm pr-4">{faq.q}</span>
                <span className="text-text-muted flex-shrink-0">
                  {open === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CtaSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative card p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent-cyan/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="relative z-10">
            <div className="section-label mx-auto mb-6">
              <Rocket className="w-3 h-3" />
              Start Today
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-4">
              Ready to Become a{' '}
              <span className="gradient-text">Software Engineer?</span>
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Join 50,000+ students who transformed their careers with CodeVerse Academy. Your first week is free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses" className="btn-primary text-base px-8 py-3.5">
                Browse Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="btn-ghost text-base px-8 py-3.5">
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <CoursesSection />
      <DomainsPreview />
      <RoadmapSection />
      <TestimonialsSection />
      <InstructorsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
