import { motion } from 'framer-motion'
import { skillGroups } from '../../data/portfolio'

export default function SkillsSection() {
  return (
    <section id="skills" className="panel about-panel">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="w-full"
      >
        <p className="eyebrow">Skills</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight">
          Tech stack & tools I work with daily.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-[24px] border border-white/10 bg-black/25 p-6 backdrop-blur-sm"
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">{group.label}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/75 transition hover:border-cyan-400/40 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
