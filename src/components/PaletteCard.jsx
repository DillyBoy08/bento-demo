import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function hslToHex(h, s, l) {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
}

function generatePalette() {
  const base = Math.floor(Math.random() * 360)
  const shifts = [0, 30, 60, 180, 240]
  return shifts.map(shift => {
    const h = (base + shift) % 360
    const s = 55 + Math.floor(Math.random() * 25)
    const l = 40 + Math.floor(Math.random() * 25)
    return hslToHex(h, s, l)
  })
}

function Swatch({ color, index }) {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0.4 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="flex-1 relative border-[2px] border-ink cursor-pointer select-none"
      style={{ backgroundColor: color, minHeight: 72 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="copied"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-center font-mono text-[9px] py-0.5 leading-none"
          >
            ✓ Copied
          </motion.div>
        ) : hovered ? (
          <motion.div
            key="hex"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-0 left-0 right-0 bg-ink text-cream text-center font-mono text-[9px] py-0.5 leading-none"
          >
            {color}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

export default function PaletteCard() {
  const [palette, setPalette] = useState(() => generatePalette())
  const [key, setKey] = useState(0)

  function handleGenerate() {
    setPalette(generatePalette())
    setKey(k => k + 1)
  }

  return (
    <div className="h-full p-5 flex flex-col bg-off-white dark:bg-[#1c1c1c] min-h-[180px]">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-cream/40 mb-3">
        Colour Palette
      </p>

      <div className="flex gap-2 flex-1 mb-4" key={key}>
        {palette.map((color, i) => (
          <Swatch key={`${color}-${i}`} color={color} index={i} />
        ))}
      </div>

      <button
        onClick={handleGenerate}
        className="w-full py-2 border-[3px] border-ink bg-terracotta text-cream font-mono font-bold text-sm tracking-wide hover:bg-ink transition-colors duration-150"
        style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
      >
        Generate →
      </button>
    </div>
  )
}
