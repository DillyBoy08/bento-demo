import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ROWS = 5
const LOOP_MS = 4000

function brickDelay(row, col) {
  // Bottom row (row 4) appears first
  return (ROWS - 1 - row) * 0.18 + col * 0.05
}

function BrickWall({ cycle }) {
  return (
    <div key={cycle} className="flex flex-col gap-[4px] w-full">
      {Array.from({ length: ROWS }, (_, row) => {
        const isOffset  = row % 2 === 1
        const brickCount = isOffset ? 5 : 6

        return (
          <div key={row} className="flex gap-[4px]">
            {isOffset && <div className="flex-[0.5]" />}

            {Array.from({ length: brickCount }, (_, col) => (
              <motion.div
                key={col}
                className="flex-1 bg-terracotta"
                style={{ height: 18, transformOrigin: 'center bottom' }}
                initial={{ y: -28, opacity: 0, scaleY: 0.6 }}
                animate={{ y: 0,   opacity: 1, scaleY: 1   }}
                transition={{
                  delay: brickDelay(row, col),
                  type: 'spring',
                  stiffness: 500,
                  damping: 16,
                  mass: 0.6,
                }}
              />
            ))}

            {isOffset && <div className="flex-[0.5]" />}
          </div>
        )
      })}
    </div>
  )
}

export default function CurrentlyBuildingCard() {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCycle(c => c + 1), LOOP_MS)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="h-full p-5 flex flex-col bg-ink text-cream" style={{ minHeight: 180 }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
          Currently Building
        </span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta" />
        </span>
      </div>

      {/* Brick wall animation */}
      <div className="flex-1 flex items-center">
        <BrickWall cycle={cycle} />
      </div>
    </div>
  )
}
