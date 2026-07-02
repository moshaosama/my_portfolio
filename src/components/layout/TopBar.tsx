import { useScroll } from '../../context/ScrollContext'
import StreamPlayer from './StreamPlayer'

export default function TopBar() {
  const { activeSection, velocity } = useScroll()
  const workActive = activeSection === 'work' || activeSection === 'skills' || activeSection === 'experience'
  const contactActive = activeSection === 'contact'

  return (
    <header className="top-bar" style={{ transform: `translateY(${Math.min(Math.abs(velocity) * 0.015, 6)}px)` }}>
      <a href="#home" className="top-brand" aria-label="Home">
        MO
      </a>

      <div className="top-bar-right">
        <nav className="at-nav-pill" aria-label="Primary">
          <a href="#work" className={workActive ? 'active' : ''}>
            Work
          </a>
          <span className="at-nav-wave" aria-hidden="true">
            <svg viewBox="0 0 120 12" preserveAspectRatio="none">
              <path d="M0 6 Q15 0 30 6 T60 6 T90 6 T120 6" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
          <a href="#contact" className={contactActive ? 'active' : ''}>
            Contact
          </a>
        </nav>

        <StreamPlayer />
      </div>
    </header>
  )
}
