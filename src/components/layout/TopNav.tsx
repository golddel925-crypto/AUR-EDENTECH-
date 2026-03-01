import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSessionStore } from '../../stores/sessionStore'
import { motion } from 'framer-motion'

/**
 * Top Navigation Bar
 * Design: Black background, gold/emerald styling, hover glow
 * 9 nav items with emerald hover glow and gold active border
 */
export const TopNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearSession } = useSessionStore()

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  const menuItems = [
    { label: 'TOTALITÀ', href: '/totalita' },
    { label: 'FORUM', href: '/forum' },
    { label: 'VIAGGIO', href: '/viaggio' },
    { label: 'PREMI', href: '/badges' },
    { label: 'UTENTI ATTIVI', href: '/users' },
    { label: 'COIN', href: '/profile' },
    { label: 'WALLET', href: '/wallet' },
    { label: 'PROFILO', href: '/profile' },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/totalita" className="flex-shrink-0">
            <motion.div
              className="text-2xl font-bold text-yellow-400 tracking-widest"
              whileHover={{
                textShadow: '0 0 12px rgba(80, 200, 120, 0.8)',
              }}
              transition={{ duration: 0.2 }}
            >
              AUR EDENTECH
            </motion.div>
          </Link>

          {/* Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className={`px-3 py-2 text-xs font-semibold transition-all duration-200 relative pb-3 ${
                    isActive(item.href)
                      ? 'text-yellow-400 border-b-2 border-yellow-400'
                      : 'text-white/70 hover:text-white'
                  }`}
                  whileHover={{
                    textShadow: isActive(item.href)
                      ? '0 0 8px rgba(255, 215, 0, 0.6)'
                      : '0 0 12px rgba(80, 200, 120, 0.8)',
                  }}
                >
                  {item.label}
                  {!isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-emerald-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2 }}
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
                whileHover={{
                  paddingLeft: 8,
                }}
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
