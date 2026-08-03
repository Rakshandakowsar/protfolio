import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

interface ProjectModalProps {
  project: {
    title: string
    problem: string
    solution: string
    techStack: string[]
    architecture: string
    features: string[]
    github: string
    demo: string
    badges: string[]
  } | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 16, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.24 }}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-cyan-950/40"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <div className="flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <span key={badge} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                {badge}
              </span>
            ))}
          </div>
          <h3 className="mt-5 text-2xl font-semibold text-white">{project.title}</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Problem</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{project.problem}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Solution</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{project.solution}</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Tech Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((item) => (
                <span key={item} className="rounded-full bg-slate-900/70 px-3 py-1 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Architecture</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{project.architecture}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Features</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-cyan-400/30 bg-slate-900/70 p-6 text-center text-slate-300">
            Screenshots placeholder with product visuals and UI walkthroughs will appear here in the production build.
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/20">
              <FaGithub size={16} /> GitHub
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              <ExternalLink size={16} /> Live demo
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
