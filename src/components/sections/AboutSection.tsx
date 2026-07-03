import { motion } from 'framer-motion'
import { education, profile } from '../../data/portfolio'

const highlights = [
  { title: 'Full Stack', desc: 'MERN/MEAN with scalable backend architecture' },
  { title: 'Mobile', desc: 'React Native + Capacitor — iOS & Android production apps' },
  { title: 'AI & Automation', desc: 'Chatbots, n8n workflows, and intelligent platforms' },
  { title: 'CI/CD', desc: 'GitHub Actions, one-click deploy pipelines' },
]

export default function AboutSection() {
  return (
    <section id="about" className="panel about-panel">
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
          About
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 250 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight"
        >
          Turning ideas into fully automated cross-platform systems.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 250 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="about-text mt-5 max-w-3xl"
        >
          {profile.summary} Expert in multi-role dashboards, real-time features, payment systems, and advanced CI/CD
          pipelines. Passionate about performance optimization and building products that feel alive.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300/80">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-8 inline-flex rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70"
        >
          <span className="text-cyan-300/80">{education.degree}</span>
          <span className="mx-3 text-white/30">·</span>
          {education.school}
          <span className="mx-3 text-white/30">·</span>
          Graduated {education.graduated}
        </motion.div>
      </motion.div>
    </section>
  )
}
