import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  // All state as MotionValues — zero React re-renders, springs never interrupted
  const x       = useMotionValue(-100)
  const y       = useMotionValue(-100)
  const opacity = useMotionValue(0)
  const scale   = useMotionValue(1)
  const size    = useMotionValue(14)

  const springX    = useSpring(x,    { stiffness: 200, damping: 22, mass: 0.5 })
  const springY    = useSpring(y,    { stiffness: 200, damping: 22, mass: 0.5 })
  const springSize = useSpring(size, { stiffness: 300, damping: 28 })

  useEffect(() => {
    // Skip on touch/stylus devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    function onMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
      opacity.set(1)
    }
    function onDown()  { scale.set(0.6) }
    function onUp()    { scale.set(1)   }
    function onLeave() { opacity.set(0) }
    function onEnter() { opacity.set(1) }
    function onOver(e) {
      const hit = e.target.closest('a, button, [role="switch"], label')
      size.set(hit ? 30 : 14)
    }

    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('mouseover',  onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('mouseover',  onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: springX,
        y: springY,
        opacity,
        scale,
        width: springSize,
        height: springSize,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: '#C4623A',
        border: '2px solid #1A1A1A',
      }}
    />
  )
}
