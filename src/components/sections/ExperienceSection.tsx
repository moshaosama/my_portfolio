import { motion } from 'framer-motion'
import { experience } from '../../data/portfolio'

export default function ExperienceSection() {
  return (
    <section id="experience" className="panel about-panel">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="w-full"
      >
        <p className="eyebrow">Experience</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight">
          Where I&apos;ve built & shipped.
        </h2>

        <div className="mt-10 flex flex-col gap-6">
          {experience.map((job, i) => (
            <motion.article
              key={job.company}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-[24px] border border-white/10 bg-black/25 p-6 backdrop-blur-sm transition hover:border-cyan-400/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <p className="mt-1 text-cyan-300/80">{job.company}</p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/50">
                  {job.period}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-white/65">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
