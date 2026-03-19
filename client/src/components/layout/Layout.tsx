import { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Code2, ChevronRight, LogIn, LayoutDashboard, LogOut, User } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/domains', label: 'Tech Domains' },
  { path: '/courses', label: 'Courses' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme()
  const { user, isAdmin, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false); window.scrollTo(0, 0) }, [location.pathname])

  const isAdminPage = location.pathname === '/admin'
  if (isAdminPage) return <div className="bg-void text-text-primary">{children}</div>

  return (
    <div className={`min-h-screen bg-void text-text-primary ${theme}`}>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-border shadow-card' : 'bg-transparent'}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center shadow-glow-primary">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-text-primary">Code<span className="gradient-text">Verse</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium font-display transition-all duration-200 ${location.pathname === link.path ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-elevated'}`}
              >
                {location.pathname === link.path && (
                  <motion.div layoutId="nav-indicator" className="absolute inset-0 rounded-lg bg-elevated border border-border-light" />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle} className="w-9 h-9 rounded-lg border border-border-light bg-elevated flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/50 transition-all">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-light bg-elevated hover:border-primary/50 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="text-sm font-semibold text-text-primary hidden lg:block max-w-24 truncate">{user?.name?.split(' ')[0]}</span>
                  {isAdmin && <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary font-mono">admin</span>}
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 glass rounded-xl border border-border shadow-card-hover overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-semibold text-text-primary truncate">{user?.name}</p>
                        <p className="text-xs text-text-muted truncate">{user?.email}</p>
                      </div>
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors">
                          <LayoutDashboard className="w-4 h-4" />Dashboard
                        </Link>
                      )}
                      <button onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-accent-rose hover:bg-accent-rose/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm py-2 px-4"><LogIn className="w-4 h-4" />Login</Link>
                <Link to="/courses" className="btn-primary text-sm py-2 px-4">Start Learning</Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggle} className="w-9 h-9 rounded-lg border border-border-light bg-elevated flex items-center justify-center text-text-secondary">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 rounded-lg border border-border-light bg-elevated flex items-center justify-center text-text-secondary">
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden glass border-t border-border">
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium font-display transition-all ${location.pathname === link.path ? 'bg-primary/15 text-primary border border-primary/25' : 'text-text-secondary hover:text-text-primary hover:bg-elevated'}`}
                  >
                    {link.label}<ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-text-secondary hover:text-primary hover:bg-elevated">
                        <LayoutDashboard className="w-4 h-4" />Admin Dashboard
                      </Link>
                    )}
                    <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-accent-rose hover:bg-accent-rose/10">
                      <LogOut className="w-4 h-4" />Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-ghost w-full justify-center mt-2">Login</Link>
                    <Link to="/courses" className="btn-primary w-full justify-center mt-2">Start Learning</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-border bg-surface mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center"><Code2 className="w-4 h-4 text-white" /></div>
                <span className="font-display font-bold text-lg">Code<span className="gradient-text">Verse</span></span>
              </Link>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">Empowering the next generation of software engineers with world-class education.</p>
              <div className="flex items-center gap-1"><div className="glow-dot" /><span className="text-xs text-text-muted font-mono">50,000+ students worldwide</span></div>
              <p className="text-xs text-text-muted mt-3 font-mono">Built by Subhadip Mahanty<br/>Purulia, West Bengal, India</p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-text-primary mb-4 uppercase tracking-widest text-xs">Platform</h4>
              <ul className="space-y-2.5">
                {[['Courses','/courses'],['Tech Domains','/domains'],['About','/about'],['Contact','/contact']].map(([label,path])=>(
                  <li key={path}><Link to={path} className="text-sm text-text-secondary hover:text-primary transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-text-primary mb-4 uppercase tracking-widest text-xs">Account</h4>
              <ul className="space-y-2.5">
                {[['Login','/login'],['Register','/register']].map(([label,path])=>(
                  <li key={path}><Link to={path} className="text-sm text-text-secondary hover:text-primary transition-colors">{label}</Link></li>
                ))}
                <li><a href="mailto:subhadipmahanty@gmail.com" className="text-sm text-text-secondary hover:text-primary transition-colors">subhadipmahanty@gmail.com</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-text-primary mb-4 uppercase tracking-widest text-xs">Stay Updated</h4>
              <p className="text-sm text-text-secondary mb-3">Get weekly developer tips.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="you@email.com" className="flex-1 px-3 py-2 text-sm rounded-lg bg-elevated border border-border focus:border-primary/50 focus:outline-none text-text-primary placeholder:text-text-muted"/>
                <button className="px-3 py-2 rounded-lg bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-colors">→</button>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted font-mono">© 2025 CodeVerse Academy · Subhadip Mahanty</p>
            <div className="flex items-center gap-4 text-xs text-text-muted"><span>React + TypeScript</span><span>·</span><span>MERN Stack</span></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
