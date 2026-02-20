import { useContext } from 'react'
import { motion } from 'framer-motion'
import { DarkModeContext } from '../App'

function BrutalToggle({ label, desc, checked, onChange }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-2 border-b border-ink/8 dark:border-cream/8 last:border-0 gap-3">
      <div className="min-w-0">
        <span className="font-inter text-xs font-medium text-ink dark:text-cream select-none block">{label}</span>
        {desc && <span className="font-mono text-[9px] text-ink/35 dark:text-cream/35 select-none">{desc}</span>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative flex-shrink-0 w-11 h-5 border-[2px] border-ink dark:border-cream/60 rounded-none flex items-center transition-colors duration-150 outline-none ${
          checked ? 'bg-terracotta' : 'bg-cream dark:bg-[#2a2a2a]'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 600, damping: 32 }}
          className={`absolute w-3 h-3 border-[2px] border-ink dark:border-cream/60 bg-ink dark:bg-cream ${
            checked ? 'right-0.5' : 'left-0.5'
          }`}
        />
      </button>
    </label>
  )
}

export default function TogglesCard({ boldType, setBoldType, reducedMotion, setReducedMotion, grayscale, setGrayscale, compact, setCompact }) {
  const { dark, setDark } = useContext(DarkModeContext)

  return (
    <div className="h-full p-5 flex flex-col bg-cream dark:bg-[#1e1e1e]" style={{ minHeight: 180 }}>
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-cream/40 mb-2">
        Preferences
      </p>
      <div className="flex-1 flex flex-col justify-center">
        <BrutalToggle label="Dark mode"       desc="Flip to dark theme"           checked={dark}          onChange={() => setDark(d => !d)} />
        <BrutalToggle label="Grayscale"       desc="Drain all the colour"          checked={grayscale}     onChange={() => setGrayscale(g => !g)} />
        <BrutalToggle label="Reduced motion"  desc="Fewer animations system-wide" checked={reducedMotion} onChange={() => setReducedMotion(r => !r)} />
        <BrutalToggle label="Bold type"       desc="Heavier font weight"           checked={boldType}      onChange={() => setBoldType(b => !b)} />
        <BrutalToggle label="Compact mode"    desc="Tighter spacing"               checked={compact}       onChange={() => setCompact(c => !c)} />
      </div>
    </div>
  )
}
