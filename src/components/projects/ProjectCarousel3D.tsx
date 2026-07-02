import { useCallback, useEffect, useRef, useState } from 'react'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { projects } from '../../data/projects'
import { useScrollFrame } from '../../context/ScrollContext'

const SCROLL_VH_PER_PROJECT = 100

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function ProjectCarousel3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const [ringRotation, setRingRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragStartRot = useRef(0)
  const count = projects.length
  const slice = 360 / count
  const active = projects[index]

  // Dynamic radius based on viewport
  const getRadius = () => Math.min(520, window.innerWidth * 0.46)

  const updateFromScroll = useCallback(() => {
    const section = sectionRef.current
    if (!section || count === 0) return

    const rect = section.getBoundingClientRect()
    const scrollRange = section.offsetHeight - window.innerHeight
    if (scrollRange <= 0) return

    const scrolled = clamp(-rect.top, 0, scrollRange)
    const ratio = scrolled / scrollRange
    const maxIndex = count - 1
    const nextIndex = clamp(Math.round(ratio * maxIndex), 0, maxIndex)
    const nextRotation = -ratio * maxIndex * slice

    setIndex((prev) => (prev === nextIndex ? prev : nextIndex))
    setRingRotation(nextRotation)
  }, [count, slice])

  useScrollFrame(updateFromScroll)

  useEffect(() => {
    updateFromScroll()
    window.addEventListener('resize', updateFromScroll, { passive: true })
    return () => window.removeEventListener('resize', updateFromScroll)
  }, [updateFromScroll])

  // Manual navigation
  const goTo = (i: number) => {
    const next = clamp(i, 0, count - 1)
    setIndex(next)
    setRingRotation(-next * slice)
  }

  // Drag to navigate
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartRot.current = ringRotation
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const delta = e.clientX - dragStartX.current
    const rotDelta = (delta / window.innerWidth) * 180
    setRingRotation(dragStartRot.current + rotDelta)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? index + 1 : index - 1)
    } else {
      goTo(index)
    }
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="work-scroll-section work-carousel-section"
      style={{ height: `${Math.max(count, 1) * SCROLL_VH_PER_PROJECT}vh` }}
    >
      <div className="work-carousel-sticky">
        <div className="work-carousel-header">
          <div>
            <p className="eyebrow">Selected Work</p>
            <p className="work-carousel-active-title font-display">{active.title}</p>
          </div>
          <div className="work-carousel-counter">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </div>
        </div>

        <div
          className="carousel-stage"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            className="carousel-ring"
            style={{ transform: `rotateY(${ringRotation}deg)` }}
          >
            {projects.map((project, i) => {
              const diff = ((i - index) % count + count) % count
              const isActive = diff === 0
              const isNeighbor = diff === 1 || diff === count - 1
              const radius = getRadius()

              return (
                <article
                  key={project.title}
                  className={`carousel-card ${isActive ? 'is-active' : ''} ${isNeighbor ? 'is-neighbor' : ''}`}
                  style={{
                    transform: `rotateY(${i * slice}deg) translateZ(${radius}px)`,
                  }}
                >
                  <div className="carousel-card-inner">
                    <div className="carousel-card-grid" aria-hidden="true" />
                    <div className="carousel-card-glow" aria-hidden="true" />

                    {isActive ? (
                      <>
                        <div className="carousel-card-meta">
                          <span>{project.category}</span>
                          <span>{project.year}</span>
                        </div>

                        <h3 className="carousel-card-title font-display">{project.title}</h3>
                        <p className="carousel-card-desc">{project.description}</p>

                        <div className="carousel-card-tags">
                          {project.stack.slice(0, 5).map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>

                        <div className="carousel-card-links">
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer">
                              Live <FiArrowUpRight />
                            </a>
                          )}
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer">
                              GitHub <FiGithub />
                            </a>
                          )}
                          {!project.live && !project.github && (
                            <span className="carousel-card-private">— Private</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="carousel-card-ghost">
                        <h3 className="carousel-card-ghost-title font-display">{project.title}</h3>
                        <p className="carousel-card-ghost-label">{project.category}</p>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Nav dots */}
        <div className="carousel-dots" aria-label="Project navigation">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === index ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <div className="carousel-controls">
          <button
            className="carousel-nav-btn"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous project"
          >
            ←
          </button>
          <span className="carousel-hint">drag or scroll</span>
          <button
            className="carousel-nav-btn"
            onClick={() => goTo(index + 1)}
            disabled={index === count - 1}
            aria-label="Next project"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
