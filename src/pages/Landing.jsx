import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGamepad, FaBrain, FaTrophy, FaChartBar, FaUsers, FaBolt, FaStar, FaRocket, FaFire, FaGlobe, FaEnvelope, FaDiscord, FaMobileAlt, FaHeart, FaCode, FaPython, FaLaptopCode, FaJs } from 'react-icons/fa'
import { SiCplusplus } from 'react-icons/si'
import { HiLightningBolt, HiAcademicCap } from 'react-icons/hi'

const features = [
  {
    icon: <FaUsers className="text-3xl" />,
    title: 'Team Battles',
    desc: 'Compete in team vs team math challenges with real-time scoring.',
    color: '#00f0ff',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <FaBrain className="text-3xl" />,
    title: 'AI Questions',
    desc: 'Adaptive difficulty that grows with your skills across 5 categories.',
    color: '#a855f7',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: <FaTrophy className="text-3xl" />,
    title: 'Leaderboard',
    desc: 'Track rankings, accuracy, speed, and rise to the top.',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <FaChartBar className="text-3xl" />,
    title: 'Teacher Dashboard',
    desc: 'Real-time analytics, session controls, and exportable reports.',
    color: '#22c55e',
    gradient: 'from-green-500 to-emerald-500',
  },
]

const stats = [
  { value: '5+', label: 'Question Types', icon: <HiLightningBolt /> },
  { value: '3', label: 'Difficulty Levels', icon: <FaStar /> },
  { value: '30+', label: 'Students Support', icon: <FaUsers /> },
  { value: '∞', label: 'AI Questions', icon: <FaBrain /> },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Landing() {
  return (
    <div className="page-enter pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Large blurred orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-arena-neon/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-arena-purple/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-arena-pink/5 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light mb-6 text-sm text-arena-neon font-medium">
              <FaBolt className="animate-pulse" />
              AI-Powered Classroom Learning
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-outfit font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6"
          >
            <span className="gradient-text">SmartMath</span>
            <br />
            <span className="text-white">Arena</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Transform your classroom into an exciting math battlefield.
            AI-generated challenges, team competitions, and real-time analytics
            make learning truly <span className="text-arena-neon font-semibold">unforgettable</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/setup" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              <FaGamepad /> Start Playing
            </Link>
            <Link to="/tug-of-war" className="btn-gold text-lg px-8 py-4 flex items-center gap-2">
              <FaFire /> Tug of War
            </Link>
            <Link to="/dashboard" className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
              <HiAcademicCap /> Dashboard
            </Link>
          </motion.div>

          {/* Floating math elements around hero */}
          <div className="absolute -top-10 left-[10%] text-4xl text-arena-neon/10 font-outfit font-bold animate-float">+</div>
          <div className="absolute top-20 right-[15%] text-5xl text-arena-purple/10 font-outfit font-bold animate-float-slow">×</div>
          <div className="absolute bottom-10 left-[20%] text-3xl text-arena-gold/10 font-outfit font-bold animate-float" style={{ animationDelay: '2s' }}>÷</div>
          <div className="absolute bottom-20 right-[10%] text-4xl text-arena-pink/10 font-outfit font-bold animate-float-slow" style={{ animationDelay: '1s' }}>π</div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-arena-border/50">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="text-arena-neon text-2xl mb-1">{stat.icon}</div>
              <div className="font-outfit font-black text-3xl text-white">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card-light mb-4 text-xs font-bold text-arena-neon uppercase tracking-widest">
              <FaCode /> Feature Packed
            </div>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Engage</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features designed for modern classrooms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card p-6 sm:p-8 group cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-lg"
                  style={{ backgroundColor: `${f.color}15`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="font-outfit font-bold text-xl text-white mb-2 group-hover:text-arena-neon transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learn Coding Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-arena-neon/5 rounded-full blur-[120px]" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card-light mb-4 text-xs font-bold text-yellow-400 uppercase tracking-widest">
              <FaLaptopCode /> New Release
            </div>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4">
              Master <span className="text-yellow-400">Coding</span> Concepts
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Learn the world's most popular programming languages with our interactive tutorials.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { to: '/learn-python', name: 'Python', icon: <FaPython />, color: '#fbbf24', desc: 'Data Science, AI & Automation' },
              { to: '/learn-cpp', name: 'C++', icon: <SiCplusplus />, color: '#3b82f6', desc: 'Game Engines & High Performance' },
              { to: '/learn-js', name: 'JavaScript', icon: <FaJs />, color: '#f0db4f', desc: 'Web Development & Interactivity' }
            ].map((lang, i) => (
              <motion.div
                key={lang.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="glass-card p-8 group flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <div className="text-8xl transform rotate-12">{lang.icon}</div>
                </div>
                
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner"
                  style={{ background: `${lang.color}15`, color: lang.color, border: `1px solid ${lang.color}30` }}
                >
                  {lang.icon}
                </div>
                
                <h3 className="font-outfit font-black text-2xl text-white mb-3">
                  {lang.name}
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  {lang.desc}
                </p>
                
                <Link 
                  to={lang.to} 
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300"
                  style={{ background: `${lang.color}20`, color: lang.color, border: `1px solid ${lang.color}40` }}
                >
                  Start Learning
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="max-w-3xl mx-auto glass-card neon-border p-10 sm:p-14 text-center"
        >
          <FaRocket className="text-5xl text-arena-neon mx-auto mb-6 animate-bounce" />
          <h2 className="font-outfit font-black text-3xl sm:text-4xl text-white mb-4">
            Ready to Transform Your Classroom?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            Start a game session in seconds. No sign-up required for V1.
          </p>
          <Link to="/setup" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
            <FaGamepad /> Launch Game
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
