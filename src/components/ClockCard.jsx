import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function pad(n) { return String(n).padStart(2, '0') }

function getTime() {
  const now = new Date()
  return {
    h:    pad(now.getHours()),
    m:    pad(now.getMinutes()),
    s:    pad(now.getSeconds()),
    day:  now.toLocaleDateString('en-ZA', { weekday: 'long' }),
    date: now.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }),
  }
}

// Lightweight flip — mode="wait" (no layout measurement, much cheaper than popLayout)
function FlipDigit({ value }) {
  return (
    <span style={{ display: 'inline-block', minWidth: '0.6em', textAlign: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0  }}
          exit={{    opacity: 0, y:  6 }}
          transition={{ duration: 0.1 }}
          style={{ display: 'inline-block' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function ClockCard() {
  const [time, setTime] = useState(getTime)

  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="h-full p-5 sm:p-6 flex flex-col justify-between bg-ink text-cream" style={{ minHeight: 180 }}>
      {/* Time — scales from phone → desktop */}
      <div className="font-mono font-bold leading-none tracking-tighter flex items-baseline gap-0.5 text-4xl sm:text-5xl md:text-5xl lg:text-6xl overflow-hidden">
        <FlipDigit value={time.h[0]} />
        <FlipDigit value={time.h[1]} />
        <span className="opacity-40 mx-0.5 text-[0.8em]">:</span>
        <FlipDigit value={time.m[0]} />
        <FlipDigit value={time.m[1]} />
        <span className="opacity-40 mx-0.5 text-[0.8em]">:</span>
        <FlipDigit value={time.s[0]} />
        <FlipDigit value={time.s[1]} />
      </div>

      <div className="mt-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-cream/40">{time.day}</p>
        <p className="font-mono text-xs text-cream/70 mt-0.5">{time.date}</p>
      </div>
    </div>
  )
}
