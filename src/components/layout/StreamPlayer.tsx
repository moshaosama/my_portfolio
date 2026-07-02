import { useEffect, useRef } from 'react'
import { useAmbientStream } from '../../hooks/useAmbientStream'

const BAR_COUNT = 14

// Pre-computed colors for each bar (magenta → purple → cyan gradient)
const BAR_COLORS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1)
  // Interpolate from #e879f9 (magenta) through #a855f7 (purple) to #67e8f9 (cyan)
  if (t < 0.5) {
    const u = t * 2
    const r = Math.round(232 + (168 - 232) * u)
    const g = Math.round(121 + (85 - 121) * u)
    const b = Math.round(249 + (247 - 249) * u)
    return `rgb(${r},${g},${b})`
  } else {
    const u = (t - 0.5) * 2
    const r = Math.round(168 + (103 - 168) * u)
    const g = Math.round(85 + (232 - 85) * u)
    const b = Math.round(247 + (249 - 247) * u)
    return `rgb(${r},${g},${b})`
  }
})

export default function StreamPlayer() {
  const { index, playing, ready, current, toggle, go } = useAmbientStream()
  const barsRef = useRef<(HTMLSpanElement | null)[]>([])

  /* Animate bars with smooth music-reactive motion when playing */
  useEffect(() => {
    if (!playing) {
      barsRef.current.forEach((bar) => {
        if (bar) {
          bar.style.height = '3px'
          bar.style.opacity = '0.25'
        }
      })
      return
    }
    let raf: number
    const animate = () => {
      const now = Date.now() * 0.003
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        // Layered sine waves for organic feel
        const phase1 = Math.sin(now * 1.8 + i * 0.6)
        const phase2 = Math.sin(now * 2.7 + i * 0.4 + 1.2)
        const phase3 = Math.sin(now * 0.9 + i * 0.9 + 2.4)
        const combined = (phase1 * 0.5 + phase2 * 0.3 + phase3 * 0.2)
        const h = Math.max(3, Math.round((0.35 + combined * 0.45) * 28))
        bar.style.height = `${h}px`
        bar.style.opacity = (0.5 + (h / 28) * 0.5).toFixed(2)
      })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  return (
    <div className="beatbox-player" role="region" aria-label="Ambient stream player">
      {/* Track info header */}
      <div className="beatbox-header">
        <span className="beatbox-label">STREAMS</span>
        <span className="beatbox-track">{current.title}</span>
        <span className="beatbox-idx">{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Visualizer bars */}
      <div className="beatbox-viz" aria-hidden="true">
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <span
            key={i}
            ref={(el) => { barsRef.current[i] = el }}
            className="beatbox-bar"
            style={{ background: BAR_COLORS[i] }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="beatbox-controls">
        <button
          type="button"
          className="beatbox-btn"
          onClick={(e) => { e.stopPropagation(); void go(-1) }}
          aria-label="Previous stream"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <polygon points="10,0 0,5 10,10" />
            <rect x="0" y="0" width="2" height="10" />
          </svg>
        </button>

        <button
          type="button"
          className={`beatbox-play ${playing ? 'is-playing' : ''}`}
          onClick={(e) => { e.stopPropagation(); void toggle() }}
          aria-label={playing ? 'Pause stream' : 'Play stream'}
        >
          {playing ? (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <rect x="0" y="0" width="4" height="14" rx="1" />
              <rect x="8" y="0" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
              <polygon points="0,0 12,7 0,14" />
            </svg>
          )}
          {!ready && <span className="beatbox-tap">TAP</span>}
        </button>

        <button
          type="button"
          className="beatbox-btn"
          onClick={(e) => { e.stopPropagation(); void go(1) }}
          aria-label="Next stream"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <polygon points="0,0 10,5 0,10" />
            <rect x="8" y="0" width="2" height="10" />
          </svg>
        </button>
      </div>

      {/* Status glow ring */}
      <div className={`beatbox-glow ${playing ? 'active' : ''}`} aria-hidden="true" />
    </div>
  )
}
