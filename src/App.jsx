import { createContext, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import BentoCard           from './components/BentoCard'
import HeroCard            from './components/HeroCard'
import ClockCard           from './components/ClockCard'
import TypewriterCard      from './components/TypewriterCard'
import DragCard            from './components/DragCard'
import MarqueeTicker       from './components/MarqueeTicker'
import TogglesCard         from './components/TogglesCard'
import CounterCard         from './components/CounterCard'
import PaletteCard         from './components/PaletteCard'
import MusicCard           from './components/MusicCard'
import StackCard           from './components/StackCard'
import StatsCard           from './components/StatsCard'
import CurrentlyBuildingCard from './components/CurrentlyBuildingCard'
import ScrollProgressBar   from './components/ScrollProgressBar'

export const DarkModeContext = createContext({ dark: false, setDark: () => {} })

const entrance = (i) => ({
  initial:    { opacity: 0, y: 16 },
  animate:    { opacity: 1, y: 0  },
  transition: { delay: i * 0.055, duration: 0.45, ease: [0.25, 0.1, 0, 1] },
})

export default function App() {
  const [dark,          setDark]          = useState(false)
  const [boldType,      setBoldType]      = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [grayscale,     setGrayscale]     = useState(false)
  const [compact,       setCompact]       = useState(false)

  // Auto-detect system preference for reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) setReducedMotion(true)
  }, [])

  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  useEffect(() => { document.body.style.fontWeight = boldType ? '600' : '' }, [boldType])

  const m = (i) => reducedMotion ? {} : entrance(i)
  const gap = compact ? 'gap-1.5' : 'gap-3'
  const px  = compact ? 'px-3 md:px-5' : 'px-4 md:px-8'

  const toggleProps = {
    boldType, setBoldType,
    reducedMotion, setReducedMotion,
    grayscale, setGrayscale,
    compact, setCompact,
  }

  return (
    <DarkModeContext.Provider value={{ dark, setDark }}>
      <ScrollProgressBar />

      {/* Grayscale wrapper — GPU-composited filter, doesn't affect layout */}
      <div
        className="min-h-screen bg-cream dark:bg-[#111111] transition-colors duration-300"
        style={{ filter: grayscale ? 'grayscale(1)' : 'none' }}
      >
        <div className={`${px} py-6 md:py-8`}>

          {/* ── Nav ───────────────────────────────── */}
          <motion.header {...m(0)} className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-cream/40 block mb-0.5">
                Dylan Swart
              </span>
              <span className="font-inter text-xs text-ink/30 dark:text-cream/30">
                Frontend Developer · South Africa
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-xs text-ink/25 dark:text-cream/25 hidden sm:block">
                Interactive UI Demo
              </span>
              <div className="w-px h-4 bg-ink/15 dark:bg-cream/15 hidden sm:block" />
              <a
                href="mailto:swartdylan42@gmail.com"
                className="font-mono text-xs uppercase tracking-wider px-2.5 py-1.5 border-[2px] border-ink dark:border-cream/40 text-ink dark:text-cream hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink transition-colors"
              >
                Hire me →
              </a>
            </div>
          </motion.header>

          {/* ── Description ───────────────────────── */}
          <motion.div {...m(1)} className="mb-6 md:mb-8">
            <p className="font-inter text-sm text-ink/45 dark:text-cream/40 leading-relaxed max-w-lg">
              A live showcase of frontend skills — animation, interactivity, CSS craft, and
              state management. Every card is independently interactive, handbuilt from scratch.
            </p>
          </motion.div>

          {/* ── Desktop grid (md+) ────────────────── */}
          <div
            className={`hidden md:grid ${gap}`}
            style={{
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateAreas: `
                "hero    hero    clock"
                "type    drag    drag"
                "ticker  ticker  ticker"
                "tog     count   pal"
                "music   music   stack"
                "current current stats"
              `,
            }}
          >
            <motion.div style={{ gridArea: 'hero'    }} {...m(2)}><BentoCard><HeroCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'clock'   }} {...m(3)}><BentoCard><ClockCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'type'    }} {...m(4)}><BentoCard><TypewriterCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'drag'    }} {...m(5)}><BentoCard><DragCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'ticker'  }} {...m(6)}><MarqueeTicker /></motion.div>
            <motion.div style={{ gridArea: 'tog'     }} {...m(7)}>
              <BentoCard><TogglesCard {...toggleProps} /></BentoCard>
            </motion.div>
            <motion.div style={{ gridArea: 'count'   }} {...m(8)}><BentoCard><CounterCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'pal'     }} {...m(9)}><BentoCard><PaletteCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'music'   }} {...m(10)}><BentoCard><MusicCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'stack'   }} {...m(11)}><BentoCard><StackCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'current' }} {...m(12)}><BentoCard><CurrentlyBuildingCard /></BentoCard></motion.div>
            <motion.div style={{ gridArea: 'stats'   }} {...m(13)}><BentoCard><StatsCard /></BentoCard></motion.div>
          </div>

          {/* ── Mobile grid (< md) ────────────────── */}
          {/* 2-col on small tablets, 1-col on phones */}
          <div className={`md:hidden grid grid-cols-1 sm:grid-cols-2 ${gap}`}>
            {/* Hero — always full width */}
            <motion.div className="sm:col-span-2" {...m(2)}>
              <BentoCard><HeroCard /></BentoCard>
            </motion.div>

            <motion.div {...m(3)}><BentoCard><ClockCard /></BentoCard></motion.div>
            <motion.div {...m(4)}><BentoCard><TypewriterCard /></BentoCard></motion.div>

            {/* Drag — full width on mobile (needs space) */}
            <motion.div className="sm:col-span-2" {...m(5)}>
              <BentoCard><DragCard /></BentoCard>
            </motion.div>

            {/* Marquee — always full width */}
            <motion.div className="sm:col-span-2" {...m(6)}>
              <MarqueeTicker />
            </motion.div>

            <motion.div {...m(7)}>
              <BentoCard><TogglesCard {...toggleProps} /></BentoCard>
            </motion.div>
            <motion.div {...m(8)}><BentoCard><CounterCard /></BentoCard></motion.div>

            {/* Palette — full width on mobile (swatches need room) */}
            <motion.div className="sm:col-span-2" {...m(9)}>
              <BentoCard><PaletteCard /></BentoCard>
            </motion.div>

            {/* Music — full width */}
            <motion.div className="sm:col-span-2" {...m(10)}>
              <BentoCard><MusicCard /></BentoCard>
            </motion.div>

            <motion.div {...m(11)}><BentoCard><StackCard /></BentoCard></motion.div>
            <motion.div {...m(12)}><BentoCard><StatsCard /></BentoCard></motion.div>

            <motion.div className="sm:col-span-2" {...m(13)}>
              <BentoCard><CurrentlyBuildingCard /></BentoCard>
            </motion.div>
          </div>

          {/* ── Footer ────────────────────────────── */}
          <motion.footer
            {...m(14)}
            className="mt-8 pt-5 border-t border-ink/10 dark:border-cream/10 flex items-center justify-between flex-wrap gap-3"
          >
            <p className="font-mono text-xs text-ink/30 dark:text-cream/30">© 2026 Dylan Swart</p>
            <p className="font-mono text-xs text-ink/20 dark:text-cream/20">
              React · Framer Motion · Tailwind · Handbuilt
            </p>
          </motion.footer>

        </div>
      </div>
    </DarkModeContext.Provider>
  )
}
