import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSessionStore } from '../../stores/sessionStore';

export const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const clearSession = useSessionStore((s) => s.clearSession);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem('aur_session');
    localStorage.removeItem('sequence_id');
    clearSession();
    window.location.href = '/login';
  };

  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'FORUM', href: '/forum' },
    { label: 'VIAGGIO', href: '/journey' },
    { label: 'PREMI', href: '/badges' },
    { label: 'USERS', href: '/users' },
    { label: 'ACTIVITY', href: '/activity' },
    { label: 'CHANCELLIERE', href: '/wallet' },
    { label: 'PROFILE', href: '/profile' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="topnav fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/dashboard" className="flex-shrink-0">
            <motion.div
              className="text-xl font-bold text-yellow-400 tracking-widest"
              whileHover={{ textShadow: '0 0 8px rgba(80, 200, 120, 0.8)' }}
              transition={{ duration: 0.2 }}
            >
              AUR EDENTECH
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className={`relative px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                    isActive(item.href) ? 'text-yellow-400' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-yellow-400"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            className="ml-4 px-3 py-2 text-xs font-semibold text-white bg-red-500 rounded"
          >
            Logout
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
