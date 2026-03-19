import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Heart, Globe, Zap, TrendingUp, Users, Code } from 'lucide-react'
import { instructors, stats } from '../utils/data'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

const values = [
  {
    icon: <Target className="w-5 h-5" />,
    title: 'Outcome-Focused',
    desc: 'Every lesson, every project, every mentor interaction is designed around one goal: getting you hired. We measure success by your career outcomes.',
    color: 'text-primary border-primary/30 bg-primary/10',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Learn by Building',
    desc: 'Forget passive video watching. You ship real applications from week one. By graduation, you have a portfolio that impresses any hiring manager.',
    color: 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Community First',
    desc: 'Learning is better together. Our 50,000+ student community in Discord means you always have help, accountability, and people cheering you on.',
    color: 'text-accent-rose border-accent-rose/30 bg-accent-rose/10',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Industry Relevant',
    desc: 'Our curriculum is updated quarterly with input from engineering leaders at Google, Meta, Stripe, and more. You learn exactly what\'s in demand.',
    color: 'text-accent-emerald border-accent-emerald/30 bg-accent-emerald/10',
  },
]

const milestones = [
  { year: '2019', title: 'CodeVerse Founded', desc: 'Started with 50 students and one MERN Stack course in a small co-working space.' },
  { year: '2020', title: 'Online Launch', desc: 'Pivoted fully online. Enrollment grew 10x. First students land FAANG roles.' },
  { year: '2021', title: '10,000 Students', desc: 'Launched Web3 and AI tracks. Partnered with 200+ hiring companies.' },
  { year: '2022', title: 'Global Community', desc: 'Students in 85+ countries. Launched live mentorship program.' },
  { year: '2023', title: '50,000 Developers', desc: '$95k average starting salary for CodeVerse graduates. Series A funding.' },
  { year: '2024', title: 'AI-Powered Learning', desc: 'Launched adaptive learning paths and AI code review tools.' },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-emerald/6 rounded-full blur-[80px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label mx-auto mb-4">About Us</div>
            <h1 className="section-title mb-6">
              We Exist to Create{' '}
              <span className="gradient-text">Software Engineers</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              CodeVerse Academy was founded on a radical belief: anyone can become a world-class software engineer with the right education, mentorship, and community.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 max-w-4xl mx-auto"
        >
          <div className="card p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent" />
            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-primary to-transparent" />
            <div className="relative">
              <div className="section-label mb-6">
                <Target className="w-3 h-3" />
                Our Mission
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-4xl text-text-primary mb-6 leading-tight">
                Democratizing world-class software engineering education for everyone, everywhere.
              </h2>
              <p className="text-text-secondary leading-relaxed text-lg mb-6">
                Traditional education leaves aspiring developers behind — it is expensive, slow, and often disconnected from what real engineering jobs require. CodeVerse is different. We teach exactly what the industry needs, at a fraction of the cost, with mentors who actually ship code at top companies.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Software development is the highest-leverage skill in the modern economy. We believe everyone deserves access to that opportunity, regardless of their background, country, or prior experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-display font-bold text-2xl text-text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Why Learn Software Dev */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4">
              <TrendingUp className="w-3 h-3" />
              Industry Demand
            </div>
            <h2 className="section-title mb-4">
              Why Software Development{' '}
              <span className="gradient-text">Right Now</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Code className="w-6 h-6" />,
                title: '4.5M Jobs',
                subtitle: 'Developer jobs go unfilled globally every year',
                desc: 'The demand for software engineers far outpaces supply. Every industry — finance, healthcare, education, retail — is becoming a tech company.',
                color: 'text-primary bg-primary/10 border-primary/25',
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: '$110k+',
                subtitle: 'Median software engineer salary in the US',
                desc: 'Software development is one of the highest-paying careers accessible without a traditional 4-year degree. Our graduates average $95k starting.',
                color: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/25',
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: '100% Remote',
                subtitle: 'Software engineers can work from anywhere on earth',
                desc: 'Location independence is now the norm. Our graduates work at companies from San Francisco to Singapore, from home, from beaches, from everywhere.',
                color: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/25',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${item.color}`}>
                  {item.icon}
                </div>
                <div className="font-display font-bold text-3xl text-text-primary mb-1">{item.title}</div>
                <p className="text-sm font-semibold text-primary mb-3">{item.subtitle}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4">
              <Heart className="w-3 h-3" />
              Our Values
            </div>
            <h2 className="section-title mb-4">
              How We{' '}
              <span className="gradient-text">Teach</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 flex gap-4"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${v.color}`}>
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-text-primary mb-2">{v.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Our Journey</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-8 items-start"
                  >
                    <div className="w-16 flex-shrink-0 text-right">
                      <span className="font-mono text-xs font-bold text-primary">{m.year}</span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-8 top-1 w-3 h-3 rounded-full border-2 border-primary bg-surface" />
                      <div className="card p-4">
                        <h3 className="font-display font-semibold text-text-primary mb-1">{m.title}</h3>
                        <p className="text-sm text-text-secondary">{m.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="section-label mx-auto mb-4">
              <Users className="w-3 h-3" />
              Leadership Team
            </div>
            <h2 className="section-title mb-4">
              Built by{' '}
              <span className="gradient-text">Engineers, for Engineers</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((inst, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${inst.color} flex items-center justify-center text-white text-lg font-bold font-display mx-auto mb-4`}>
                  {inst.avatar}
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-0.5">{inst.name}</h3>
                <p className="text-xs text-primary mb-1">{inst.role}</p>
                <p className="text-xs text-text-muted mb-3">{inst.company}</p>
                <p className="text-xs text-text-secondary">{inst.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-12 text-center bg-gradient-to-br from-primary/10 to-accent-cyan/5 border-primary/30">
          <h2 className="font-display font-bold text-3xl text-text-primary mb-4">
            Join the CodeVerse Community
          </h2>
          <p className="text-text-secondary mb-8 max-w-lg mx-auto">
            50,000+ developers building their careers. Your journey starts here.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/courses" className="btn-primary">
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
