import { motion } from 'framer-motion'

export default function BentoCard({ children, className = '', darkShadow = false, style = {} }) {
  const shadow = darkShadow
    ? { default: '5px 5px 0 #F5F0E8', hover: '7px 7px 0 #F5F0E8' }
    : { default: '5px 5px 0 #1A1A1A', hover: '7px 7px 0 #1A1A1A' }

  return (
    <motion.div
      className={`relative overflow-hidden border-[3px] border-ink rounded-none h-full ${className}`}
      style={{ boxShadow: shadow.default, ...style }}
      whileHover={{ y: -2, x: -2, boxShadow: shadow.hover }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  )
}
