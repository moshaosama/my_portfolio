import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi'
import { profile } from '../../data/portfolio'

export default function ContactSection() {
  return (
    <section id="contact" className="panel contact-panel">
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 250 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="eyebrow"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 250 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight"
        >
          Let&apos;s build something exceptional together.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 250 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="contact-text mt-5 max-w-2xl"
        >
          Available for full-stack, mobile, and AI-powered product work. Reach out for collaborations, freelance, or
          full-time opportunities.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <FiMail className="text-cyan-400" size={24} />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
            { icon: <FiPhone className="text-purple-400" size={24} />, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
            { icon: <FiGithub className="text-pink-400" size={24} />, label: 'GitHub', value: '@moshaosama', href: profile.github },
            { icon: <FiLinkedin className="text-blue-400" size={24} />, label: 'LinkedIn', value: '/in/thisfekry', href: profile.linkedin }
          ].map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label !== 'Email' && item.label !== 'Phone' ? '_blank' : undefined}
              rel={item.label !== 'Email' && item.label !== 'Phone' ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="contact-card"
            >
              {item.icon}
              <span className="text-xs uppercase tracking-[0.2em] text-white/45">{item.label}</span>
              <span className="text-sm text-white/80">{item.value}</span>
            </motion.a>
          ))}
        </div>

        <motion.a
          href={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="primary-btn mt-10"
        >
          Say Hello
        </motion.a>
      </motion.div>
    </section>
  )
}
