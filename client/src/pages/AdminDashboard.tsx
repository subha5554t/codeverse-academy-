import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Users, Mail, BookOpen, TrendingUp, LogOut, RefreshCw,
  ChevronDown, Trash2, ExternalLink, BarChart3, Eye,
  MessageSquare, Award, Code2, CheckCircle, Clock, XCircle,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const STATUS_COLORS: Record<string, string> = {
  new:       'bg-primary/15 text-primary border-primary/30',
  contacted: 'bg-amber-400/15 text-amber-400 border-amber-400/30',
  enrolled:  'bg-emerald-400/15 text-emerald-400 border-emerald-400/30',
  closed:    'bg-text-muted/15 text-text-muted border-text-muted/30',
  pending:   'bg-amber-400/15 text-amber-400 border-amber-400/30',
  active:    'bg-emerald-400/15 text-emerald-400 border-emerald-400/30',
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  new:       <Clock className="w-3 h-3" />,
  contacted: <MessageSquare className="w-3 h-3" />,
  enrolled:  <CheckCircle className="w-3 h-3" />,
  closed:    <XCircle className="w-3 h-3" />,
}

type Tab = 'overview' | 'contacts' | 'enrollments'

export default function AdminDashboard() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  const [tab, setTab] = useState<Tab>('overview')
  const [stats, setStats] = useState<any>(null)
  const [contacts, setContacts] = useState<any[]>([])
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [sRes, cRes, eRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/contacts?limit=50', { headers }),
        fetch('/api/admin/enrollments?limit=50', { headers }),
      ])
      const [s, c, e] = await Promise.all([sRes.json(), cRes.json(), eRes.json()])
      if (s.success) setStats(s.data)
      if (c.success) setContacts(c.data)
      if (e.success) setEnrollments(e.data)
    } catch {
      // handle gracefully in demo mode
    }
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/contacts/${id}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data.success) {
        setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c))
      }
    } catch {}
    setUpdatingId(null)
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Delete this contact permanently?')) return
    try {
      await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE', headers })
      setContacts(prev => prev.filter(c => c._id !== id))
    } catch {}
  }

  const handleLogout = () => { logout(); navigate('/') }

  const filteredContacts = statusFilter === 'all'
    ? contacts
    : contacts.filter(c => c.status === statusFilter)

  const overviewCards = stats ? [
    { label: 'Total Contacts', value: stats.overview.totalContacts, sub: `+${stats.overview.newContactsThisMonth} this month`, icon: <Mail className="w-5 h-5" />, color: 'text-primary bg-primary/10 border-primary/25', trend: stats.overview.contactGrowth },
    { label: 'Total Enrollments', value: stats.overview.totalEnrollments, sub: `+${stats.overview.enrollmentsThisMonth} this month`, icon: <BookOpen className="w-5 h-5" />, color: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/25', trend: stats.overview.enrollmentGrowth },
    { label: 'Active Courses', value: stats.overview.totalCourses, sub: 'Published courses', icon: <Award className="w-5 h-5" />, color: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/25', trend: null },
    { label: 'Registered Students', value: stats.overview.totalStudents, sub: 'Signed up accounts', icon: <Users className="w-5 h-5" />, color: 'text-accent-violet bg-accent-violet/10 border-accent-violet/25', trend: null },
  ] : []

  return (
    <div className="pt-16 min-h-screen bg-void">
      {/* Top Bar */}
      <div className="sticky top-16 z-40 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm text-text-primary">Admin Dashboard</span>
            <span className="text-xs text-text-muted hidden sm:block">· {user?.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchAll} className="w-8 h-8 rounded-lg border border-border-light bg-elevated flex items-center justify-center text-text-muted hover:text-primary transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <Link to="/" className="w-8 h-8 rounded-lg border border-border-light bg-elevated flex items-center justify-center text-text-muted hover:text-primary transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent-rose/30 bg-accent-rose/10 text-accent-rose text-xs font-semibold hover:bg-accent-rose/20 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['overview', 'contacts', 'enrollments'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold font-display capitalize transition-all ${
                tab === t
                  ? 'bg-primary text-white shadow-glow-primary'
                  : 'border border-border-light text-text-secondary hover:text-text-primary hover:border-primary/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* ── OVERVIEW TAB ─────────────────────────────────────── */}
            {tab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Stat cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {overviewCards.map((card, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card p-5">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${card.color}`}>
                        {card.icon}
                      </div>
                      <div className="font-display font-bold text-2xl text-text-primary mb-0.5">{card.value}</div>
                      <div className="text-xs text-text-muted mb-1">{card.label}</div>
                      <div className="flex items-center gap-1 text-xs">
                        {card.trend !== null && card.trend !== undefined ? (
                          <span className={card.trend >= 0 ? 'text-accent-emerald' : 'text-accent-rose'}>
                            {card.trend >= 0 ? '↑' : '↓'} {Math.abs(card.trend)}%
                          </span>
                        ) : null}
                        <span className="text-text-muted">{card.sub}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Course enrollments breakdown */}
                {stats?.enrollmentsByCourse?.length > 0 && (
                  <div className="card p-6 mb-6">
                    <h3 className="font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Enrollments by Course
                    </h3>
                    <div className="space-y-3">
                      {stats.enrollmentsByCourse.map((item: any, i: number) => {
                        const max = stats.enrollmentsByCourse[0]?.count || 1
                        const pct = Math.round((item.count / max) * 100)
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-36 text-xs text-text-secondary truncate flex-shrink-0">{item._id}</div>
                            <div className="flex-1 h-2 bg-elevated rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="h-full bg-gradient-to-r from-primary to-accent-cyan rounded-full"
                              />
                            </div>
                            <span className="text-xs font-mono text-text-muted w-6 text-right">{item.count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Recent activity split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <h3 className="font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Recent Contacts
                    </h3>
                    <div className="space-y-3">
                      {stats?.recentContacts?.slice(0, 5).map((c: any) => (
                        <div key={c._id} className="flex items-center gap-3 p-3 rounded-xl bg-elevated border border-border">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {c.name?.[0] || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-text-primary truncate">{c.name}</div>
                            <div className="text-xs text-text-muted truncate">{c.email}</div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold capitalize ${STATUS_COLORS[c.status] || ''}`}>
                            {c.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setTab('contacts')} className="text-xs text-primary hover:text-primary-light mt-3 font-semibold transition-colors">
                      View all contacts →
                    </button>
                  </div>

                  <div className="card p-6">
                    <h3 className="font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent-emerald" />
                      Recent Enrollments
                    </h3>
                    <div className="space-y-3">
                      {stats?.recentEnrollments?.slice(0, 5).map((e: any) => (
                        <div key={e._id} className="flex items-center gap-3 p-3 rounded-xl bg-elevated border border-border">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-emerald to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {e.name?.[0] || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-text-primary truncate">{e.name}</div>
                            <div className="text-xs text-text-muted truncate">{e.course}</div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold capitalize ${STATUS_COLORS[e.status] || ''}`}>
                            {e.status}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setTab('enrollments')} className="text-xs text-primary hover:text-primary-light mt-3 font-semibold transition-colors">
                      View all enrollments →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── CONTACTS TAB ──────────────────────────────────────── */}
            {tab === 'contacts' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <h2 className="font-display font-bold text-xl text-text-primary">
                    All Contacts <span className="text-text-muted font-normal text-base">({contacts.length})</span>
                  </h2>
                  <div className="flex gap-2">
                    {['all', 'new', 'contacted', 'enrolled', 'closed'].map(s => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                          statusFilter === s
                            ? 'bg-primary text-white'
                            : 'border border-border-light text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredContacts.length === 0 ? (
                    <div className="card p-12 text-center text-text-muted">
                      <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p>No contacts found</p>
                    </div>
                  ) : (
                    filteredContacts.map((contact, i) => (
                      <motion.div
                        key={contact._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="card p-5"
                      >
                        <div className="flex items-start gap-4 flex-wrap">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {contact.name?.[0] || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="font-semibold text-text-primary">{contact.name}</span>
                              <a href={`mailto:${contact.email}`} className="text-xs text-accent-cyan hover:underline">{contact.email}</a>
                              {contact.course && (
                                <span className="code-badge">{contact.course}</span>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary line-clamp-2 mb-2">{contact.message}</p>
                            <span className="text-xs text-text-muted">
                              {new Date(contact.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                            </span>
                          </div>

                          {/* Status selector */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="relative">
                              <select
                                value={contact.status}
                                onChange={e => updateStatus(contact._id, e.target.value)}
                                disabled={updatingId === contact._id}
                                className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold capitalize appearance-none pr-6 cursor-pointer transition-all ${STATUS_COLORS[contact.status] || 'border-border text-text-secondary'}`}
                              >
                                {['new', 'contacted', 'enrolled', 'closed'].map(s => (
                                  <option key={s} value={s} className="bg-elevated text-text-primary">{s}</option>
                                ))}
                              </select>
                              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                            </div>

                            <a
                              href={`mailto:${contact.email}?subject=Re: Your enquiry at CodeVerse Academy`}
                              className="w-8 h-8 rounded-lg border border-border-light bg-elevated flex items-center justify-center text-text-muted hover:text-primary transition-colors"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => deleteContact(contact._id)}
                              className="w-8 h-8 rounded-lg border border-accent-rose/30 bg-accent-rose/10 flex items-center justify-center text-accent-rose hover:bg-accent-rose/20 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* ── ENROLLMENTS TAB ───────────────────────────────────── */}
            {tab === 'enrollments' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-display font-bold text-xl text-text-primary mb-4">
                  All Enrollments <span className="text-text-muted font-normal text-base">({enrollments.length})</span>
                </h2>
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-elevated">
                          {['Student', 'Email', 'Course', 'Status', 'Payment', 'Date'].map(h => (
                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider font-mono">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {enrollments.length === 0 ? (
                          <tr><td colSpan={6} className="text-center py-12 text-text-muted">No enrollments yet</td></tr>
                        ) : (
                          enrollments.map((e, i) => (
                            <motion.tr
                              key={e._id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.03 }}
                              className="border-b border-border/50 hover:bg-elevated/50 transition-colors"
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-emerald to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                                    {e.name?.[0] || '?'}
                                  </div>
                                  <span className="font-semibold text-text-primary">{e.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <a href={`mailto:${e.email}`} className="text-accent-cyan hover:underline text-xs">{e.email}</a>
                              </td>
                              <td className="px-4 py-3">
                                <span className="code-badge">{e.course}</span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold capitalize ${STATUS_COLORS[e.status] || ''}`}>
                                  {e.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold capitalize ${
                                  e.paymentStatus === 'paid' ? 'bg-emerald-400/15 text-emerald-400 border-emerald-400/30' :
                                  e.paymentStatus === 'refunded' ? 'bg-accent-rose/15 text-accent-rose border-accent-rose/30' :
                                  'bg-amber-400/15 text-amber-400 border-amber-400/30'
                                }`}>
                                  {e.paymentStatus}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs text-text-muted">
                                {new Date(e.enrolledAt).toLocaleDateString('en-IN')}
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
