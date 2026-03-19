import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Wrench, FolderOpen, ChevronRight } from 'lucide-react'
import { domains } from '../utils/data'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function DomainsPage() {
  const [active, setActive] = useState(domains[0].id)
  const domain = domains.find(d => d.id === active)!

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-surface border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-violet/8 rounded-full blur-[80px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label mx-auto mb-4">Tech Domains</div>
            <h1 className="section-title mb-4">
              Explore Every Path in{' '}
              <span className="gradient-text">Software Development</span>
            </h1>
            <p className="section-subtitle max-w-xl mx-auto">
              Deep-dive into each domain of modern software engineering. Understand the tools, careers, and projects waiting for you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Sidebar + Detail layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Domain Selector */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              {domains.map(d => (
                <button
                  key={d.id}
                  onClick={() => setActive(d.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold font-display text-left transition-all duration-200 ${
                    active === d.id
                      ? `bg-gradient-to-r ${d.bgColor} border ${d.borderColor} ${d.accentColor}`
                      : 'text-text-secondary hover:text-text-primary hover:bg-elevated border border-transparent'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{d.icon}</span>
                  <span className="flex-1">{d.title}</span>
                  {active === d.id && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Domain Detail */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className={`card p-8 mb-6 bg-gradient-to-br ${domain.bgColor} border ${domain.borderColor}`}>
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{domain.icon}</div>
                  <div>
                    <h2 className="font-display font-bold text-3xl text-text-primary mb-1">{domain.title}</h2>
                    <p className={`text-sm font-semibold mb-3 ${domain.accentColor}`}>{domain.tagline}</p>
                    <p className="text-text-secondary leading-relaxed">{domain.description}</p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="card p-6 mb-6">
                <h3 className="font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${domain.color}`} />
                  Technologies & Concepts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {domain.technologies.map(tech => (
                    <div key={tech.name} className="flex gap-3 p-3 rounded-xl bg-elevated border border-border hover:border-border-light transition-colors">
                      <div className={`w-1 rounded-full bg-gradient-to-b ${domain.color} flex-shrink-0`} />
                      <div>
                        <div className="font-semibold text-sm text-text-primary mb-0.5">{tech.name}</div>
                        <div className="text-xs text-text-secondary">{tech.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                {/* Tools */}
                <div className="card p-5">
                  <h3 className="font-display font-semibold text-sm text-text-primary mb-3 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-text-muted" />
                    Tools Used
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tools.map(tool => (
                      <span key={tool} className="code-badge">{tool}</span>
                    ))}
                  </div>
                </div>

                {/* Careers */}
                <div className="card p-5">
                  <h3 className="font-display font-semibold text-sm text-text-primary mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-text-muted" />
                    Career Paths
                  </h3>
                  <ul className="space-y-2">
                    {domain.careers.map(c => (
                      <li key={c} className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className={`w-1.5 h-1.5 rounded-full ${domain.accentColor.replace('text', 'bg')}`} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Projects */}
                <div className="card p-5">
                  <h3 className="font-display font-semibold text-sm text-text-primary mb-3 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-text-muted" />
                    Sample Projects
                  </h3>
                  <ul className="space-y-2">
                    {domain.projects.map(p => (
                      <li key={p} className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className={`w-1.5 h-1.5 rounded-full ${domain.accentColor.replace('text', 'bg')}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className={`card p-6 bg-gradient-to-br ${domain.bgColor} border ${domain.borderColor} flex items-center justify-between flex-wrap gap-4`}>
                <div>
                  <p className="font-display font-semibold text-text-primary mb-1">
                    Ready to master {domain.title}?
                  </p>
                  <p className="text-sm text-text-secondary">Start with our structured curriculum today.</p>
                </div>
                <Link to="/courses" className="btn-primary">
                  Browse Courses <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* All Domains Grid at bottom */}
        <div className="mt-20">
          <h2 className="font-display font-bold text-2xl text-text-primary mb-6 text-center">
            All {domains.length} Tech Domains at a Glance
          </h2>
          <div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {domains.map((d, i) => (
              <motion.button
                key={d.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                onClick={() => {
                  setActive(d.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className={`card p-5 text-left border ${d.borderColor} bg-gradient-to-br ${d.bgColor} hover:-translate-y-1 group`}
              >
                <div className="text-3xl mb-3">{d.icon}</div>
                <h3 className="font-display font-semibold text-text-primary text-sm mb-1 group-hover:text-primary transition-colors">
                  {d.title}
                </h3>
                <p className={`text-xs font-semibold mb-2 ${d.accentColor}`}>{d.tagline}</p>
                <div className="flex flex-wrap gap-1">
                  {d.tools.slice(0, 3).map(t => (
                    <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-elevated text-text-muted font-mono">{t}</span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
