import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const BARS = 12
const BAR_CLASSES = ['bar-1','bar-2','bar-3','bar-4','bar-5','bar-6','bar-7','bar-8','bar-9','bar-10','bar-11','bar-12']

const tracks = [
  { title: 'Come Together',       artist: 'The Beatles', duration: 259 },
  { title: 'Here Comes the Sun',  artist: 'The Beatles', duration: 185 },
  { title: 'Let It Be',           artist: 'The Beatles', duration: 243 },
]

function fmt(s) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

function PrevIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
}
function NextIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
}
function PlayIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
}
function PauseIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
}

export default function MusicCard() {
  const [playing, setPlaying]   = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const track = tracks[trackIdx]

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= track.duration) { setPlaying(false); return 0 }
          return p + 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, track.duration])

  function prev() { setProgress(0); setTrackIdx(i => (i - 1 + tracks.length) % tracks.length) }
  function next() { setProgress(0); setTrackIdx(i => (i + 1) % tracks.length) }

  const pct = (progress / track.duration) * 100

  return (
    <div className="h-full p-6 flex flex-col justify-between bg-ink text-cream" style={{ minHeight: 200 }}>
      {/* Track info + waveform */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-cream/40 mb-1">Now Playing</p>
          <p className="font-syne font-bold text-xl leading-tight truncate">{track.title}</p>
          <p className="font-inter text-sm text-cream/50 mt-0.5">{track.artist}</p>
        </div>
        <div className="flex items-end gap-[3px] h-10 flex-shrink-0">
          {Array.from({ length: BARS }, (_, i) => (
            <div
              key={i}
              className={`${playing ? BAR_CLASSES[i] : ''} bg-terracotta flex-shrink-0`}
              style={{
                width: 3,
                height: playing ? undefined : `${20 + (i % 5) * 12}%`,
                minHeight: 3,
                opacity: playing ? 1 : 0.35,
                alignSelf: 'flex-end',
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="relative h-px bg-cream/15 mb-2">
          <motion.div className="absolute top-0 left-0 h-full bg-terracotta" style={{ width: `${pct}%` }} />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-cream border-2 border-ink"
            style={{ left: `calc(${pct}% - 5px)` }}
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-cream/30">
          <span>{fmt(progress)}</span>
          <span>{fmt(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mt-4">
        <button onClick={prev} className="text-cream/50 hover:text-cream transition-colors p-1" aria-label="Previous">
          <PrevIcon />
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className="w-10 h-10 border-2 border-cream flex items-center justify-center hover:bg-cream hover:text-ink transition-colors"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button onClick={next} className="text-cream/50 hover:text-cream transition-colors p-1" aria-label="Next">
          <NextIcon />
        </button>
      </div>
    </div>
  )
}
