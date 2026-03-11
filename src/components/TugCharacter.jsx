import { motion } from 'framer-motion'

/**
 * Animated SVG tug-of-war character with real pulling motion.
 * Arms pull back, body leans, legs brace — all animated.
 *
 * @param {string} teamColor - hex color for team (e.g. '#3b82f6')
 * @param {boolean} isLeft - true=faces right & pulls left, false=faces left & pulls right
 * @param {boolean} isWinning - true triggers faster/harder pull animation
 * @param {boolean} isPulling - true enables the pull cycle animation
 */
export default function TugCharacter({ teamColor = '#3b82f6', isLeft = true, isWinning = false, isPulling = true }) {
  const flipX = isLeft ? 1 : -1
  const pullSpeed = isWinning ? 0.3 : 0.7
  const pullAmount = isWinning ? 8 : 4

  return (
    <motion.svg
      width="120"
      height="160"
      viewBox="0 0 120 160"
      className="tug-character"
      style={{ transform: `scaleX(${flipX})` }}
      animate={isPulling ? {
        x: isLeft ? [-pullAmount, pullAmount, -pullAmount] : [pullAmount, -pullAmount, pullAmount],
      } : {}}
      transition={{ repeat: Infinity, duration: pullSpeed, ease: 'easeInOut' }}
    >
      {/* === SHADOW on ground === */}
      <ellipse cx="60" cy="155" rx="30" ry="5" fill="rgba(0,0,0,0.2)" />

      {/* === LEFT LEG (back leg, bracing) === */}
      <motion.g
        animate={isPulling ? { rotate: [-3, 3, -3] } : {}}
        transition={{ repeat: Infinity, duration: pullSpeed * 2 }}
        style={{ transformOrigin: '45px 115px' }}
      >
        {/* Thigh */}
        <rect x="37" y="110" width="12" height="25" rx="5" fill="#1e293b" />
        {/* Shin */}
        <rect x="33" y="130" width="12" height="18" rx="5" fill="#1e293b" />
        {/* Shoe */}
        <rect x="28" y="145" width="20" height="8" rx="4" fill="#ef4444" />
      </motion.g>

      {/* === RIGHT LEG (front leg, pushing) === */}
      <motion.g
        animate={isPulling ? { rotate: [3, -3, 3] } : {}}
        transition={{ repeat: Infinity, duration: pullSpeed * 2 }}
        style={{ transformOrigin: '65px 115px' }}
      >
        {/* Thigh */}
        <rect x="60" y="108" width="12" height="25" rx="5" fill="#0f172a" />
        {/* Shin */}
        <rect x="63" y="128" width="12" height="20" rx="5" fill="#0f172a" />
        {/* Shoe */}
        <rect x="60" y="145" width="20" height="8" rx="4" fill="#ef4444" />
      </motion.g>

      {/* === BODY / TORSO === */}
      <motion.g
        animate={isPulling ? { rotate: [-6, 6, -6], x: [-2, 2, -2] } : {}}
        transition={{ repeat: Infinity, duration: pullSpeed, ease: 'easeInOut' }}
        style={{ transformOrigin: '60px 100px' }}
      >
        {/* Torso */}
        <rect x="40" y="65" width="30" height="50" rx="8" fill={teamColor} />
        {/* Shirt collar detail */}
        <path d="M48 65 L55 72 L62 65" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

        {/* === BACK ARM (pulling the rope) === */}
        <motion.g
          animate={isPulling ? { rotate: [-12, 8, -12] } : {}}
          transition={{ repeat: Infinity, duration: pullSpeed, ease: 'easeInOut' }}
          style={{ transformOrigin: '42px 72px' }}
        >
          {/* Upper arm */}
          <rect x="25" y="68" width="20" height="10" rx="5" fill={teamColor} />
          {/* Forearm */}
          <motion.rect
            x="12" y="70" width="18" height="8" rx="4"
            fill={teamColor}
            animate={isPulling ? { rotate: [-5, 5, -5] } : {}}
            transition={{ repeat: Infinity, duration: pullSpeed * 0.7 }}
            style={{ transformOrigin: '25px 74px' }}
          />
          {/* Hand gripping */}
          <circle cx="14" cy="74" r="5" fill="#fbbf24" />
          <circle cx="14" cy="74" r="3" fill="#f59e0b" />
        </motion.g>

        {/* === FRONT ARM (also pulling) === */}
        <motion.g
          animate={isPulling ? { rotate: [8, -12, 8] } : {}}
          transition={{ repeat: Infinity, duration: pullSpeed, ease: 'easeInOut' }}
          style={{ transformOrigin: '68px 72px' }}
        >
          {/* Upper arm */}
          <rect x="65" y="68" width="18" height="10" rx="5" fill={teamColor} style={{ opacity: 0.85 }} />
          {/* Forearm reaching forward */}
          <motion.rect
            x="78" y="70" width="16" height="8" rx="4"
            fill={teamColor}
            animate={isPulling ? { rotate: [5, -5, 5] } : {}}
            transition={{ repeat: Infinity, duration: pullSpeed * 0.7 }}
            style={{ transformOrigin: '80px 74px', opacity: 0.85 }}
          />
          {/* Hand */}
          <circle cx="93" cy="74" r="5" fill="#fbbf24" />
          <circle cx="93" cy="74" r="3" fill="#f59e0b" />
        </motion.g>

        {/* === HEAD === */}
        <motion.g
          animate={isPulling ? { rotate: [-4, 4, -4], y: [-1, 1, -1] } : {}}
          transition={{ repeat: Infinity, duration: pullSpeed }}
          style={{ transformOrigin: '55px 45px' }}
        >
          {/* Head circle */}
          <circle cx="55" cy="40" r="20" fill="#fbbf24" />
          {/* Face highlight */}
          <circle cx="55" cy="38" r="17" fill="#fcd34d" />

          {/* Headband */}
          <rect x="35" y="30" width="40" height="7" rx="3" fill="#1e293b" />
          <rect x="38" y="32" width="34" height="1.5" rx="1" fill="#475569" />
          {/* Headband tail (flowing) */}
          <motion.path
            d={isLeft ? "M75 33 Q82 30 85 35 Q88 40 92 38" : "M35 33 Q28 30 25 35 Q22 40 18 38"}
            fill="none"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
            animate={isPulling ? { d: isLeft
              ? ["M75 33 Q82 30 85 35 Q88 40 92 38", "M75 33 Q82 36 85 31 Q88 28 92 32", "M75 33 Q82 30 85 35 Q88 40 92 38"]
              : ["M35 33 Q28 30 25 35 Q22 40 18 38", "M35 33 Q28 36 25 31 Q22 28 18 32", "M35 33 Q28 30 25 35 Q22 40 18 38"]
            } : {}}
            transition={{ repeat: Infinity, duration: pullSpeed * 1.5 }}
          />

          {/* Eyes - determined expression */}
          <g>
            {/* Left eye */}
            <ellipse cx="48" cy="40" rx="3" ry="3.5" fill="white" />
            <motion.circle
              cx="47" cy="40" r="2"
              fill="#1e293b"
              animate={isPulling ? { cx: [46, 48, 46] } : {}}
              transition={{ repeat: Infinity, duration: pullSpeed * 3 }}
            />
            {/* Right eye */}
            <ellipse cx="62" cy="40" rx="3" ry="3.5" fill="white" />
            <motion.circle
              cx="61" cy="40" r="2"
              fill="#1e293b"
              animate={isPulling ? { cx: [60, 62, 60] } : {}}
              transition={{ repeat: Infinity, duration: pullSpeed * 3 }}
            />
            {/* Eyebrows - intense */}
            <motion.line
              x1="44" y1="35" x2="51" y2="36"
              stroke="#92400e" strokeWidth="2" strokeLinecap="round"
              animate={isPulling ? { y1: [35, 33, 35] } : {}}
              transition={{ repeat: Infinity, duration: pullSpeed }}
            />
            <motion.line
              x1="59" y1="36" x2="66" y2="35"
              stroke="#92400e" strokeWidth="2" strokeLinecap="round"
              animate={isPulling ? { y1: [36, 34, 36] } : {}}
              transition={{ repeat: Infinity, duration: pullSpeed }}
            />
          </g>

          {/* Mouth - effort expression */}
          <motion.path
            d={isWinning ? "M50 48 Q55 52 60 48" : "M50 48 Q55 50 60 48"}
            fill="none"
            stroke="#92400e"
            strokeWidth="2"
            strokeLinecap="round"
            animate={isPulling ? {
              d: isWinning
                ? ["M50 48 Q55 52 60 48", "M50 47 Q55 44 60 47", "M50 48 Q55 52 60 48"]
                : ["M50 48 Q55 50 60 48", "M50 48 Q55 46 60 48", "M50 48 Q55 50 60 48"],
            } : {}}
            transition={{ repeat: Infinity, duration: pullSpeed }}
          />
        </motion.g>
      </motion.g>

      {/* === EFFORT LINES (when winning) === */}
      {isWinning && (
        <>
          <motion.line
            x1={isLeft ? 5 : 95} y1="60" x2={isLeft ? -5 : 115} y2="55"
            stroke={teamColor} strokeWidth="2" strokeLinecap="round" opacity="0.6"
            animate={{ opacity: [0, 0.8, 0], x1: isLeft ? [5, 0, 5] : [95, 100, 95] }}
            transition={{ repeat: Infinity, duration: 0.4, delay: 0 }}
          />
          <motion.line
            x1={isLeft ? 8 : 92} y1="75" x2={isLeft ? -2 : 112} y2="73"
            stroke={teamColor} strokeWidth="2" strokeLinecap="round" opacity="0.6"
            animate={{ opacity: [0, 0.8, 0], x1: isLeft ? [8, 3, 8] : [92, 97, 92] }}
            transition={{ repeat: Infinity, duration: 0.4, delay: 0.15 }}
          />
          <motion.line
            x1={isLeft ? 6 : 94} y1="48" x2={isLeft ? -4 : 114} y2="45"
            stroke={teamColor} strokeWidth="2" strokeLinecap="round" opacity="0.6"
            animate={{ opacity: [0, 0.8, 0], x1: isLeft ? [6, 1, 6] : [94, 99, 94] }}
            transition={{ repeat: Infinity, duration: 0.4, delay: 0.3 }}
          />
        </>
      )}

      {/* === SWEAT DROPS (effort indicator) === */}
      {isPulling && (
        <motion.g
          animate={{ opacity: [0, 1, 0], y: [0, 15, 30] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
        >
          <path
            d={`M${isLeft ? 72 : 38} 25 Q${isLeft ? 74 : 36} 20 ${isLeft ? 73 : 37} 18`}
            fill="#38bdf8"
            opacity="0.7"
          />
        </motion.g>
      )}
    </motion.svg>
  )
}
