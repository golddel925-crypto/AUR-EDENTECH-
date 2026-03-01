import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSessionStore } from '../../stores/sessionStore'
import { motion } from 'framer-motion'

/**
 * Top Navigation Bar
 * Design: glassy black, emerald/gold glow, animated underline
 */
export const TopNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearSession } = useSessionStore()

  const handleLogout = () => {
    // fully reset browser storage and then force a hard redirect so the app
    // initialises from a clean state
    sessionStorage.clear()
    localStorage.removeItem('aur_session')
    localStorage.removeItem('sequence_id')
    clearSession()
    // do not use react-router navigate here per spec
    window.location.href = '/login'
  }

  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'DASHBOARD', href: '/dashboard' },
    { label: 'TOTALITÀ', href: '/dashboard' },
    { label: 'FORUM', href: '/forum' },
    { label: 'VIAGGIO', href: '/journey' },
    { label: 'PREMI', href: '/badges' },
    { label: 'UTENTI', href: '/users' },
    { label: 'ATTIVITÀ', href: '/activity' },
    { label: 'CANCELLIERE', href: '/wallet' },
    { label: 'PROFILO', href: '/profile' },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav className="topnav fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm h-14 border-b border-emerald/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0">
            <motion.div
              className="text-xl font-bold text-yellow-400 tracking-widest"
              whileHover={( { textShadow: '0 0 8px rgba(80, 200, 120, 0.8)' } as any )}
              transition={{ duration: 0.2 }}
            >
              AUR EDENTECH
            </motion.div>
          </Link>

          {/* Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <motion.div
                    className={`relative px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-yellow-400'
                        : 'text-white/70 hover:text-white'
                    }`}
                    whileHover={( { textShadow: '0 0 10px rgba(80, 200, 120, 0.6)' } as any )}
                  >
                    {item.label}
                    {/* animated underline for active tab */}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-emerald-500 to-yellow-400"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
              </Link>
            ))}
          </div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-4 py-2 text-xs font-semibold text-white border border-emerald-500 rounded hover:bg-emerald-500 hover:text-black transition-all duration-200"
          >
            LOGOUT
          </motion.button>
        </div>

        {/* Mobile menu */}
        <motion.div
          className="md:hidden pb-4 border-t border-emerald-500/20 mt-2 pt-2 space-y-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          {menuItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className={`text-xs font-semibold py-2 transition-all ${
                  isActive(item.href)
                    ? 'text-yellow-400'
                    : 'text-white/70 hover:text-emerald-500'
                }`}
                whileHover={( { paddingLeft: 8 } as any)}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </nav>
  )
}
