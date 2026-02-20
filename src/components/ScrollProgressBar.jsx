import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] origin-left"
      style={{
        scaleX,
        height: 3,
        backgroundColor: '#C4623A',
        transformOrigin: '0%',
      }}
    />
  )
}
