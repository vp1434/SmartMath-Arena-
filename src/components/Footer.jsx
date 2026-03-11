import { Link } from 'react-router-dom'
import { FaBrain, FaTrophy, FaChartBar, FaUsers, FaFire, FaGlobe, FaEnvelope, FaDiscord, FaMobileAlt, FaHeart } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative border-t border-arena-border/50 pt-16 pb-8 px-4 mt-10">
      {/* Glowing top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #00f0ff, #a855f7, transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Top section: Logo + Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-arena-neon to-arena-purple flex items-center justify-center text-arena-dark font-outfit font-black text-lg">
                S
              </div>
              <span className="font-outfit font-bold text-lg">
                <span className="gradient-text">SmartMath</span>{' '}
                <span className="text-white/80">Arena</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Transform your classroom into an exciting math battlefield with AI-powered questions and real-time competitions.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: <FaGlobe />, color: '#00f0ff' },
                { icon: <FaEnvelope />, color: '#a855f7' },
                { icon: <FaDiscord />, color: '#5865F2' },
                { icon: <FaMobileAlt />, color: '#22c55e' },
              ].map((item, i) => (
                <div key={i} className="w-9 h-9 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(30,41,59,0.8)', color: item.color }}>
                  {item.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-bold text-white text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Play Now', to: '/setup' },
                { label: 'Tug of War', to: '/tug-of-war' },
                { label: 'Leaderboard', to: '/leaderboard' },
                { label: 'Dashboard', to: '/dashboard' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-500 text-sm hover:text-arena-neon transition-colors duration-300 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-arena-neon/40" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Game Features */}
          <div>
            <h4 className="font-outfit font-bold text-white text-sm mb-4 uppercase tracking-wider">Features</h4>
            <ul className="space-y-3">
              {[
                { icon: <FaBrain className="text-purple-400" />, label: 'AI Questions' },
                { icon: <FaUsers className="text-cyan-400" />, label: 'Team Battles' },
                { icon: <FaFire className="text-orange-400" />, label: 'Tug of War' },
                { icon: <FaChartBar className="text-green-400" />, label: 'Analytics' },
                { icon: <FaTrophy className="text-yellow-400" />, label: 'Leaderboard' },
              ].map(feat => (
                <li key={feat.label} className="text-gray-500 text-sm flex items-center gap-2">
                  {feat.icon}
                  {feat.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h4 className="font-outfit font-bold text-white text-sm mb-4 uppercase tracking-wider">Game Stats</h4>
            <div className="space-y-4">
              {[
                { value: '5+', label: 'Math Categories', color: '#00f0ff' },
                { value: '3', label: 'Difficulty Levels', color: '#a855f7' },
                { value: '∞', label: 'AI Questions', color: '#f59e0b' },
                { value: '2', label: 'Game Modes', color: '#ec4899' },
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="font-outfit font-black text-lg" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="text-gray-500 text-xs">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(30,41,59,0.8), transparent)' }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © 2026 SmartMath Arena. Making math fun, one question at a time.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer transition-colors">Privacy</span>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer transition-colors">Terms</span>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
