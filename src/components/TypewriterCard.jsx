import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const phrases = [
  'Building interfaces that feel alive.',
  'Clean code. Dirty hands.',
  'Detail is everything.',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.12 } },
}

export default function TypewriterCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % phrases.length), 3400)
    return () => clearInterval(t)
  }, [])

  const phrase = phrases[index]
  const words = phrase.split(' ')

  return (
    <div className="h-full p-4 sm:p-6 flex flex-col justify-between bg-warm-beige dark:bg-[#2a2218] min-h-[180px]">
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
            className="font-syne font-bold text-lg sm:text-2xl md:text-3xl leading-tight text-ink dark:text-cream"
            aria-label={phrase}
          >
            {words.map((word, wi) => (
              <motion.span
                key={wi}
                variants={wordVariants}
                style={{ display: 'inline-block', marginRight: wi < words.length - 1 ? '0.3em' : 0 }}
              >
                {word}
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
