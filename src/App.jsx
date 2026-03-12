import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdBanner from './components/AdBanner'
import MathBackground from './components/MathBackground'
import ScrollToTop from './utils/ScrollToTop'
import Landing from './pages/Landing'
import GameSetup from './pages/GameSetup'
import GameArena from './pages/GameArena'
import Leaderboard from './pages/Leaderboard'
import Dashboard from './pages/Dashboard'
import TugOfWar from './pages/TugOfWar'
import LearnPython from './pages/LearnPython'
import LearnCPP from './pages/LearnCPP'
import LearnJS from './pages/LearnJS'
import LearnC from './pages/LearnC'
import LearnDBMS from './pages/LearnDBMS'

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <ScrollToTop />
        <MathBackground />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/setup" element={<GameSetup />} />
            <Route path="/play" element={<GameArena />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tug-of-war" element={<TugOfWar />} />
            <Route path="/learn-python" element={<LearnPython />} />
            <Route path="/learn-cpp" element={<LearnCPP />} />
            <Route path="/learn-js" element={<LearnJS />} />
            <Route path="/learn-c" element={<LearnC />} />
            <Route path="/learn-dbms" element={<LearnDBMS />} />
          </Routes>
        </main>
        <AdBanner />
        <Footer />
      </div>
    </Router>
  )
}

export default App
