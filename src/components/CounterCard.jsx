import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CounterCard() {
  const [count, setCount] = useState(0)
  const [dir, setDir] = useState(1)

  function inc() { setDir(1); setCount(c => c + 1) }
  function dec() { setDir(-1); setCount(c => c - 1) }

  return (
    <div className="h-full p-5 flex flex-col items-center justify-between bg-warm-beige dark:bg-[#2a2218] min-h-[180px]">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-cream/40 self-start">
        Counter
      </p>

      <div className="flex-1 flex items-center justify-center w-full">
        <div className="relative overflow-hidden h-24 flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.span
              key={count}
              custom={dir}
              initial={{ y: dir * 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: dir * -60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="font-syne font-extrabold text-7xl text-ink dark:text-cream select-none"
              style={{ display: 'inline-block' }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={dec}
          className="flex-1 py-2.5 border-[3px] border-ink bg-cream dark:bg-[#1e1e1e] dark:text-cream font-mono font-bold text-xl hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink transition-colors"
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          −
        </button>
        <button
          onClick={inc}
          className="flex-1 py-2.5 border-[3px] border-ink bg-terracotta text-cream font-mono font-bold text-xl hover:bg-ink transition-colors"
          style={{ boxShadow: '3px 3px 0 #1A1A1A' }}
        >
          +
        </button>
      </div>
    </div>
  )
}
