import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaBrain, FaGamepad, FaTrophy, FaChartBar, FaFire, FaPython } from 'react-icons/fa'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: '/', label: 'Home', icon: <FaBrain /> },
    { to: '/setup', label: 'Play', icon: <FaGamepad /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <FaTrophy /> },
    { to: '/tug-of-war', label: 'Tug of War', icon: <FaFire /> },
    { to: '/learn-python', label: 'Learn', icon: <FaPython /> },
    { to: '/dashboard', label: 'Dashboard', icon: <FaChartBar /> },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-t-0 border-x-0" style={{ borderBottom: '1px solid rgba(30,41,59,0.5)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-arena-neon to-arena-purple flex items-center justify-center text-arena-dark font-outfit font-black text-lg group-hover:shadow-neon transition-shadow duration-300">
              S
            </div>
            <span className="font-outfit font-bold text-lg hidden sm:block">
              <span className="gradient-text">SmartMath</span>{' '}
              <span className="text-white/80">Arena</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'bg-arena-neon/10 text-arena-neon shadow-neon/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {open ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden glass-card rounded-none border-x-0 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.to)
                    ? 'bg-arena-neon/10 text-arena-neon'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
