import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { FaBrain, FaGamepad, FaTrophy, FaChartBar, FaFire, FaPython, FaBookOpen, FaJs, FaDatabase, FaCode } from 'react-icons/fa'
import { SiCplusplus } from 'react-icons/si'
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [learnOpen, setLearnOpen] = useState(false)
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)

  const links = [
    { to: '/', label: 'Home', icon: <FaBrain /> },
    { to: '/setup', label: 'Play', icon: <FaGamepad /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <FaTrophy /> },
    { to: '/tug-of-war', label: 'Tug of War', icon: <FaFire /> },
    { to: '/dashboard', label: 'Dashboard', icon: <FaChartBar /> },
  ]

  const learnLinks = [
    { to: '/learn-python', label: 'Python', icon: <FaPython />, color: '#fbbf24' },
    { to: '/learn-cpp', label: 'C++', icon: <SiCplusplus />, color: '#3b82f6' },
    { to: '/learn-js', label: 'JavaScript', icon: <FaJs />, color: '#f0db4f' },
    { to: '/learn-c', label: 'C Programming', icon: <FaCode />, color: '#3b82f6' },
    { to: '/learn-dbms', label: 'DBMS', icon: <FaDatabase />, color: '#0ea5e9' },
  ]

  const isActive = (path) => location.pathname === path
  const isLearnActive = learnLinks.some(link => isActive(link.to))

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLearnOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
            {links.slice(0, 4).map(link => (
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

            {/* Learn Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLearnOpen(!learnOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isLearnActive || learnOpen
                    ? 'bg-arena-neon/10 text-arena-neon'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FaBookOpen />
                Learn
                <HiChevronDown className={`transition-transform duration-200 ${learnOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {learnOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-48 glass-card p-1.5 shadow-2xl backdrop-blur-xl border border-white/10"
                  >
                    {learnLinks.map(link => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setLearnOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                          isActive(link.to)
                            ? 'bg-white/10 text-white font-bold'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span style={{ color: link.color }}>{link.icon}</span>
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {links.slice(4).map(link => (
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-card rounded-none border-x-0 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {links.slice(0, 4).map(link => (
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

              {/* Mobile Learn Group */}
              <div className="py-1">
                <button
                  onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isLearnActive || mobileLearnOpen
                      ? 'bg-arena-neon/5 text-arena-neon'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FaBookOpen />
                    <span>Learn</span>
                  </div>
                  <HiChevronDown 
                    className={`transition-transform duration-300 ${mobileLearnOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {mobileLearnOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 mt-1 ml-4 border-l border-white/5">
                        {learnLinks.map(link => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => {
                              setOpen(false)
                              setMobileLearnOpen(false)
                            }}
                            className={`flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActive(link.to)
                                ? 'text-white bg-white/5'
                                : 'text-gray-500 hover:text-white'
                            }`}
                          >
                            <span style={{ color: link.color }}>{link.icon}</span>
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.slice(4).map(link => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
