import { useRef, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

export default function DragCard() {
  const constraintsRef = useRef(null)
  const [dragged, setDragged] = useState(false)
  const controls = useAnimationControls()

  function onDragEnd() {
    setDragged(true)
    controls.start({
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 22 },
    })
  }

  return (
    <div className="h-full p-5 flex flex-col bg-off-white dark:bg-[#1c1c1c]" style={{ minHeight: 200 }}>
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-cream/40 mb-1">
        Drag · Spring Snap
      </p>

      <div
        ref={constraintsRef}
        className="flex-1 border-[2px] border-dashed border-ink/20 dark:border-cream/20 flex items-center justify-center relative mt-3"
        style={{ minHeight: 110 }}
      >
        {/* Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-px h-full bg-ink dark:bg-cream" />
          <div className="h-px w-full bg-ink dark:bg-cream absolute" />
        </div>

        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          dragMomentum={false}
          animate={controls}
          onDragEnd={onDragEnd}
          whileDrag={{ scale: 1.08, zIndex: 10 }}
          className="relative select-none touch-none"
          style={{ cursor: 'grab' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <div className="bg-terracotta border-[3px] border-ink px-5 py-2.5 font-mono font-bold text-sm text-cream shadow-brutal whitespace-nowrap">
            drag me →
          </div>
        </motion.div>
      </div>

      <motion.p
        animate={{ opacity: dragged ? 0 : 0.5, height: dragged ? 0 : 'auto', marginTop: dragged ? 0 : 8 }}
        transition={{ duration: 0.35 }}
        className="font-inter text-xs text-ink dark:text-cream overflow-hidden"
      >
        Springs back to centre on release.
      </motion.p>
    </div>
  )
}
