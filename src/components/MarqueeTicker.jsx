const rowA = 'REACT · TYPESCRIPT · FRAMER MOTION · THREE.JS · VITE · TAILWIND · GSAP · NODE.JS · '
const rowB = 'FRONTEND · CREATIVE · FAST · ACCESSIBLE · REACTIVE · DETAIL-ORIENTED · CURIOUS · '

function MarqueeRow({ text, reverse = false, className = '' }) {
  // Duplicate 4× so the loop is truly seamless at any viewport
  const repeated = text.repeat(4)
  return (
    <div className={`overflow-hidden w-full py-2 ${className}`}>
      <div
        className={`inline-block ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ willChange: 'transform' }}
      >
        {repeated}
      </div>
    </div>
  )
}

export default function MarqueeTicker() {
  return (
    <div className="w-full bg-terracotta border-[3px] border-ink overflow-hidden select-none"
         style={{ boxShadow: '5px 5px 0 #1A1A1A' }}>
      <MarqueeRow
        text={rowA}
        className="font-mono font-bold text-sm text-cream border-b-[2px] border-ink/30 tracking-wider"
      />
      <MarqueeRow
        text={rowB}
        reverse
        className="font-mono text-sm text-cream/80 tracking-wider"
      />
    </div>
  )
}
