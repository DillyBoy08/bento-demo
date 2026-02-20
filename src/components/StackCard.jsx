import { motion } from 'framer-motion'

const stack = [
  { name: 'React',           level: 5 },
  { name: 'TypeScript',      level: 4 },
  { name: 'Framer Motion',   level: 4 },
  { name: 'Three.js / R3F',  level: 3 },
  { name: 'Tailwind CSS',    level: 5 },
  { name: 'Node.js',         level: 5 },
  { name: 'Vite',            level: 4 },
]

function Dots({ level }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 border transition-colors ${
            i < level
              ? 'bg-terracotta border-terracotta'
              : 'bg-transparent border-ink/20 dark:border-cream/20'
          }`}
        />
      ))}
    </div>
  )
}

export default function StackCard() {
  return (
    <div className="h-full p-5 flex flex-col bg-cream dark:bg-[#1a1a1a]" style={{ minHeight: 200 }}>
      <p className="font-mono text-xs uppercase tracking-widest text-ink/40 dark:text-cream/40 mb-4">
        Tech Stack
      </p>
      <ul className="flex-1 flex flex-col justify-center divide-y divide-ink/8 dark:divide-cream/8">
        {stack.map((item) => (
          <motion.li
            key={item.name}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="flex items-center justify-between py-2 cursor-default"
          >
            <span className="font-inter text-sm font-medium text-ink dark:text-cream">{item.name}</span>
            <Dots level={item.level} />
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
