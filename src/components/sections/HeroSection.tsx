import { motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import { useScroll } from '../../context/ScrollContext'

export default function HeroSection() {
  const { scrollY } = useScroll()

  return (
    <section id="home" className="hero-immersive" style={{ transform: `translate3d(0, ${scrollY * 0.015}px, 0)` }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="hero-immersive-copy"
      >
        <p className="hero-micro">{profile.title}</p>
        <h1 className="hero-title font-display">{profile.name}</h1>
        <p className="hero-sub">{profile.tagline}</p>
      </motion.div>

      <div className="scroll-cue">
        <span className="pulse-dot" />
        Scroll
      </div>
    </section>
  )
}
