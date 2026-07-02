import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'

type ScrollContextValue = {
  progress: number
  scrollY: number
  velocity: number
  activeSection: string
  mouse: { x: number; y: number }
  subscribeScroll: (fn: () => void) => () => void
}

const ScrollContext = createContext<ScrollContextValue>({
  progress: 0,
  scrollY: 0,
  velocity: 0,
  activeSection: 'home',
  mouse: { x: 0, y: 0 },
  subscribeScroll: () => () => {},
})

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const progressRef = useRef(0)
  const scrollListeners = useRef(new Set<() => void>())

  const subscribeScroll = (fn: () => void) => {
    scrollListeners.current.add(fn)
    return () => scrollListeners.current.delete(fn)
  }

  useEffect(() => {
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })

    lenis.on('scroll', ({ scroll, limit, velocity: v }: { scroll: number; limit: number; velocity: number }) => {
      const nextProgress = limit > 0 ? scroll / limit : 0
      progressRef.current = nextProgress
      setProgress(nextProgress)
      setScrollY(scroll)
      setVelocity(v)
      scrollListeners.current.forEach((fn) => fn())
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' },
    )

    document.querySelectorAll('section[id]').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <ScrollContext.Provider value={{ progress, scrollY, velocity, activeSection, mouse, subscribeScroll }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  return useContext(ScrollContext)
}

export function useScrollRef() {
  const { progress, mouse, velocity } = useScroll()
  const ref = useRef({ progress, mouse, velocity })

  useEffect(() => {
    ref.current = { progress, mouse, velocity }
  }, [progress, mouse, velocity])

  return ref
}

export function useScrollFrame(callback: () => void) {
  const { subscribeScroll } = useScroll()
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    return subscribeScroll(() => callbackRef.current())
  }, [subscribeScroll])
}
