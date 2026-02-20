import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const areas = [
  { label: 'UI Animation',    pct: 95 },
  { label: 'React / Web Apps', pct: 92 },
  { label: '3D / WebGL',      pct: 72 },
  { label: 'Design Systems',  pct: 80 },
]

export default function StatsCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="h-full p-5 flex flex-col bg-warm-beige dark:bg-[#2a2218]" style={{ minHeight: 180 }}>
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-cream/40 mb-4">
        Focus Areas
      </p>

      <ul className="flex-1 flex flex-col justify-center gap-3.5">
        {areas.map(({ label, pct }) => (
          <li key={label}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-inter text-xs font-medium text-ink dark:text-cream">{label}</span>
              <span className="font-mono text-[10px] text-ink/40 dark:text-cream/40">{pct}%</span>
            </div>
            <div className="h-1.5 bg-ink/10 dark:bg-cream/10 w-full">
              <motion.div
                className="h-full bg-terracotta"
                initial={{ width: 0 }}
                animate={{ width: inView ? `${pct}%` : 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1], delay: 0.1 }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
