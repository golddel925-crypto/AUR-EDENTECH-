import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUIStore } from '../../stores/uiStore'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
}

export const Sidebar: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore()

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { label: 'Forum', path: '/forum', icon: '💬' },
    { label: 'Journey', path: '/journey', icon: '🛤️' },
    { label: 'Wallet', path: '/wallet', icon: '👛' },
    { label: 'Badges', path: '/badges', icon: '🎖️' },
    { label: 'Users', path: '/users', icon: '👥' },
    { label: 'Profile', path: '/profile', icon: '👤' },
  ]

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-black border-r border-emerald/20 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-64 w-56`}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold text-yellow-400">AUR</h2>
        <button
          className="lg:hidden text-white text-xl"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          ✖️
        </button>
      </div>
      <nav className="mt-6 flex flex-col space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors
                ${isActive ? 'bg-emerald/20 text-emerald font-semibold' : 'text-white hover:bg-emerald/10'}`
            }
            onClick={() => {
              // if mobile close the sidebar
              if (!sidebarOpen) return
              if (window.innerWidth < 1024) toggleSidebar()
            }}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
