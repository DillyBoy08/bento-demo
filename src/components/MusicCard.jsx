import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const BARS = 12
const BAR_CLASSES = ['bar-1','bar-2','bar-3','bar-4','bar-5','bar-6','bar-7','bar-8','bar-9','bar-10','bar-11','bar-12']

// Royalty-free tracks (SoundHelix, public domain)
const tracks = [
  {
    title: 'Song One',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Song Two',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    title: 'Song Three',
    artist: 'SoundHelix',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
]

function fmt(s) {
  if (!isFinite(s) || isNaN(s)) return '0:00'
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
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
  const track = tracks[trackIdx]

  // Create / swap audio element when track changes
  useEffect(() => {
    const audio = new Audio(track.src)
    audio.preload = 'metadata'
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () => setProgress(audio.currentTime))
    audio.addEventListener('ended', () => goNext())

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [trackIdx])

  // Keep playing state in sync with the audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [playing])

  const goNext = useCallback(() => {
    setPlaying(false)
    setProgress(0)
    setTrackIdx(i => (i + 1) % tracks.length)
  }, [])

  function prev() {
    setPlaying(false)
    setProgress(0)
    setTrackIdx(i => (i - 1 + tracks.length) % tracks.length)
  }

  function seek(e) {
    const pct = e.target.value / 100
    const time = pct * duration
    if (audioRef.current) audioRef.current.currentTime = time
    setProgress(time)
  }

  const pct = duration > 0 ? (progress / duration) * 100 : 0

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

      {/* Progress — real seekable range */}
      <div className="mt-5">
        <div className="relative h-1 mb-2">
          <div className="absolute inset-0 bg-cream/15 rounded-full" />
          <motion.div
            className="absolute top-0 left-0 h-full bg-terracotta rounded-full"
            style={{ width: `${pct}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={pct}
            onChange={seek}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            aria-label="Seek"
          />
        </div>
        <div className="flex justify-between font-mono text-[10px] text-cream/30">
          <span>{fmt(progress)}</span>
          <span>{fmt(duration)}</span>
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
        <button onClick={goNext} className="text-cream/50 hover:text-cream transition-colors p-1" aria-label="Next">
          <NextIcon />
        </button>
      </div>
    </div>
  )
}
