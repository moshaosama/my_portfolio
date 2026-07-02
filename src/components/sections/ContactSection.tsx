import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { profile } from '../../data/portfolio'

export default function ContactSection() {
  return (
    <section id="contact" className="panel contact-panel">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="w-full"
      >
        <p className="eyebrow">Contact</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight">
          Let&apos;s build something exceptional together.
        </h2>
        <p className="contact-text mt-5 max-w-2xl">
          Available for full-stack, mobile, and AI-powered product work. Reach out for collaborations, freelance, or
          full-time opportunities.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href={`mailto:${profile.email}`} className="contact-card">
            <FiMail className="text-cyan-400" size={24} />
            <span className="text-xs uppercase tracking-[0.2em] text-white/45">Email</span>
            <span className="text-sm text-white/80">{profile.email}</span>
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-card">
            <FiPhone className="text-purple-400" size={24} />
            <span className="text-xs uppercase tracking-[0.2em] text-white/45">Phone</span>
            <span className="text-sm text-white/80">{profile.phone}</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="contact-card">
            <FiGithub className="text-pink-400" size={24} />
            <span className="text-xs uppercase tracking-[0.2em] text-white/45">GitHub</span>
            <span className="text-sm text-white/80">@moshaosama</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-card">
            <FiLinkedin className="text-blue-400" size={24} />
            <span className="text-xs uppercase tracking-[0.2em] text-white/45">LinkedIn</span>
            <span className="text-sm text-white/80">/in/thisfekry</span>
          </a>
        </div>

        <a href={`mailto:${profile.email}`} className="primary-btn mt-10">
          Say Hello
        </a>
      </motion.div>
    </section>
  )
}
