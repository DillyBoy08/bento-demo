import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const subtitles = ['Frontend Developer', 'React Specialist', 'UI Craftsman']

// startDelay lets "Swart" begin after "Dylan" has mostly appeared
function AnimatedText({ text, startDelay = 0 }) {
  return (
    <span aria-label={text} style={{ display: 'block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: startDelay + i * 0.035,
            duration: 0.45,
            ease: [0.25, 0.1, 0, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export default function HeroCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % subtitles.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="h-full p-6 sm:p-7 flex flex-col justify-between bg-cream dark:bg-[#1a1a1a]" style={{ minHeight: 260 }}>
      <div>
        {/* Name — two deliberate lines */}
        <h1 className="font-syne font-extrabold text-5xl sm:text-7xl md:text-7xl leading-[0.88] tracking-tight text-ink dark:text-cream mb-3">
          <AnimatedText text="Dylan" startDelay={0} />
          <AnimatedText text="Swart" startDelay={0.2} />
        </h1>

        {/* Cycling subtitle */}
        <div className="h-6 overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
              className="font-mono text-xs uppercase tracking-wider sm:tracking-widest text-terracotta"
            >
              {subtitles[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bio */}
        <p className="font-inter text-sm leading-relaxed text-ink/60 dark:text-cream/55 max-w-sm">
          I build interfaces people enjoy using — fast, accessible, and
          obsessively detailed. South Africa · open to remote.
        </p>
      </div>

      {/* Bottom row */}
      <div className="flex flex-wrap items-center gap-2 mt-5">
        <div className="flex items-center gap-2 border-[2px] border-ink dark:border-cream/40 px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-ink dark:text-cream">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Available
        </div>

        <a
          href="https://github.com/DillyBoy08"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 border-[2px] border-ink dark:border-cream/40 px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] font-mono text-ink dark:text-cream hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink transition-colors"
        >
          <GithubIcon /> GitHub
        </a>

        <a
          href="mailto:swartdylan42@gmail.com"
          className="flex items-center gap-1.5 border-[2px] border-terracotta bg-terracotta px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] font-mono text-cream hover:bg-ink hover:border-ink transition-colors"
        >
          <MailIcon /> Contact
        </a>
      </div>
    </div>
  )
}
