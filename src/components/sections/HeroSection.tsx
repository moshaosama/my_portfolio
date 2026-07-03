import { motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import { useScroll } from '../../context/ScrollContext'

export default function HeroSection() {
  const { scrollY } = useScroll()

  return (
    <section id="home" className="hero-immersive" style={{ transform: `translate3d(0, ${scrollY * 0.015}px, 0)` }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hero-immersive-copy"
      >
        <motion.p
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-micro"
        >
          {profile.title}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="hero-title font-display"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-sub"
        >
          {profile.tagline}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="scroll-cue"
      >
        <span className="pulse-dot" />
        Scroll
      </motion.div>
    </section>
  )
}
