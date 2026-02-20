import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const phrases = [
  'Building interfaces that feel alive.',
  'Clean code.\u2004Dirty hands.',
  'Detail is everything.',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
  exit: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
}

const charVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
}

export default function TypewriterCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % phrases.length), 3400)
    return () => clearInterval(t)
  }, [])

  const phrase = phrases[index]

  return (
    <div className="h-full p-6 flex flex-col justify-between bg-warm-beige dark:bg-[#2a2218] min-h-[180px]">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-cream/40 mb-3">
        Philosophy
      </p>

      <div className="flex-1 flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-syne font-bold text-2xl md:text-3xl leading-tight text-ink dark:text-cream"
            aria-label={phrase}
          >
            {phrase.split('').map((char, i) => (
              <motion.span
                key={i}
                variants={charVariants}
                style={{ display: 'inline-block', whiteSpace: char === ' ' || char === '\u2004' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5 mt-4">
        {phrases.map((_, i) => (
          <motion.div
            key={i}
            className="h-1"
            animate={{ width: i === index ? 24 : 8, backgroundColor: i === index ? '#C4623A' : '#1A1A1A' }}
            style={{ opacity: i === index ? 1 : 0.2 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}
