import { useEffect, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsVisible(false), 500)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-waves-left">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="wave-line wave-left" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <div className="loading-circle">
          <div className="loading-ring-outer" />
          <div className="loading-ring-inner" />
          <div className="loading-pattern" />
          <div className="loading-counter">{Math.round(progress)}</div>
        </div>
        <div className="loading-waves-right">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="wave-line wave-right" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
