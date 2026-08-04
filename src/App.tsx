import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import emailjs from 'emailjs-com'
import {
  ArrowUp,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Contact,
  Cpu,
  Database,
  Mail,
  MoveRight,
  PencilRuler,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { FaCode, FaDatabase, FaGithub, FaJava, FaLinkedin, FaNodeJs, FaPython, FaReact } from 'react-icons/fa'
import { SiFlask, SiGooglecolab, SiJupyter, SiLangchain, SiSqlite, SiTailwindcss } from 'react-icons/si'
import { AnimatedBackground } from './components/AnimatedBackground'
import { BrainCanvas } from './components/BrainCanvas'
import { ProjectModal } from './components/ProjectModal'
import { SectionTitle } from './components/SectionTitle'
import { ThemeToggle } from './components/ThemeToggle'
import './App.css'

interface Project {
  title: string
  problem: string
  solution: string
  techStack: string[]
  architecture: string
  features: string[]
  github: string
  demo: string
  badges: string[]
  category: 'AI' | 'ML' | 'LLM'
}

interface FormState {
  name: string
  email: string
  message: string
}

const skillGroups = [
  {
    name: 'Programming',
    items: [
      { name: 'Python', value: 96, icon: FaPython },
      { name: 'SQL', value: 90, icon: FaDatabase },
      { name: 'Java', value: 68, icon: FaJava },
      { name: 'JavaScript', value: 80, icon: FaCode },
    ],
  },
  {
    name: 'AI',
    items: [
      { name: 'Machine Learning', value: 92, icon: Cpu },
      { name: 'Deep Learning', value: 88, icon: BrainCircuit },
      { name: 'OpenAI API', value: 90, icon: Bot },
      { name: 'LangChain', value: 84, icon: SiLangchain },
      { name: 'Prompt Engineering', value: 95, icon: PencilRuler },
      { name: 'RAG', value: 90, icon: Database },
      { name: 'LLMs', value: 94, icon: Bot },
    ],
  },
  {
    name: 'Frontend',
    items: [
      { name: 'React', value: 90, icon: FaReact },
      { name: 'Tailwind', value: 92, icon: SiTailwindcss },
      { name: 'HTML/CSS', value: 88, icon: FaCode },
    ],
  },
  {
    name: 'Backend',
    items: [
      { name: 'Flask', value: 85, icon: SiFlask },
      { name: 'REST APIs', value: 86, icon: FaNodeJs },
      { name: 'SQLite', value: 80, icon: SiSqlite },
    ],
  },
  {
    name: 'Tools',
    items: [
      { name: 'Git/GitHub', value: 90, icon: FaGithub },
      { name: 'VS Code', value: 92, icon: FaCode },
      { name: 'Google Colab', value: 89, icon: SiGooglecolab },
      { name: 'Jupyter', value: 88, icon: SiJupyter },
    ],
  },
]

const projects: Project[] = [
  {
    title: 'AI-Based Classroom Noise Intelligence System',
    problem: 'Noise levels in classrooms often disrupt concentration, but teachers need a practical way to detect and respond in real time.',
    solution: 'Built an AI-powered sound intelligence layer that classifies classroom audio events and surfaces actionable insights for educators.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'SQLite'],
    architecture: 'Audio ingestion → preprocessing → CNN-based classification → feedback dashboard.',
    features: ['Real-time inference', 'Noise severity scoring', 'Teacher-friendly dashboard', 'Alert workflow'],
    github: 'https://github.com',
    demo: 'https://example.com',
    badges: ['Featured', 'AI', 'ML'],
    category: 'ML',
  },
  {
    title: 'AI Chatbot using OpenAI API + LangChain',
    problem: 'Teams need contextual assistants that can answer with memory, retrieval, and conversational flow.',
    solution: 'Developed a retrieval-augmented chatbot with prompt engineering, memory, and conversational intelligence.',
    techStack: ['Python', 'OpenAI API', 'LangChain', 'Flask', 'Chroma'],
    architecture: 'Prompt templates → retrieval pipeline → response generation → memory state management.',
    features: ['Prompt engineering', 'Conversation memory', 'Knowledge retrieval', 'Resume-ready UX'],
    github: 'https://github.com',
    demo: 'https://example.com',
    badges: ['AI', 'LLM', 'RAG'],
    category: 'LLM',
  },
  {
    title: 'Promixa AI',
    problem: 'Project discovery and collaboration often fail because teams lack a smart system to evaluate, recommend, and review ideas.',
    solution: 'Designed a multi-agent platform that recommends projects, scores them with AI review, and supports collaborative evaluation using RAG.',
    techStack: ['Python', 'RAG', 'Vector DB', 'LangChain', 'React'],
    architecture: 'Agent orchestration → retrieval layer → scoring agents → collaboration and review services.',
    features: ['Multi-agent AI', 'RAG-based retrieval', 'Vector database', 'Project recommendation', 'AI reviewer', 'Collaboration'],
    github: 'https://github.com',
    demo: 'https://example.com',
    badges: ['Featured', 'AI', 'LLM', 'RAG', 'Multi-Agent'],
    category: 'AI',
  },
]

const timeline = [
  { type: 'Education', title: 'Intermediate', detail: 'Built a strong foundation in mathematics, logic, and computer science.' },
  { type: 'Education', title: 'B.Tech AI & DS', detail: 'Final year focused on AI systems, data engineering, and product thinking.' },
  { type: 'Internship', title: 'Google AI ML Virtual Internship', detail: 'Hands-on exposure to machine learning workflows and applied AI.' },
  { type: 'Hackathon', title: 'MIC College Hackathon', detail: 'Built an AI product under pressure and learned high-velocity execution.' },
  { type: 'Workshop', title: 'Mastering AI & ChatGPT', detail: 'Deepened practical understanding of LLMs, prompting, and deployment.' },
]

const certifications = [
  { name: 'Machine Learning Specialization', issuer: 'Coursera', link: '#' },
  { name: 'Generative AI with LLMs', issuer: 'DeepLearning.AI', link: '#' },
  { name: 'Prompt Engineering', issuer: 'OpenAI / Anthropic', link: '#' },
]

const achievements = [
  { label: 'LeetCode', value: '5 Problems' },
  { label: 'GitHub', value: '3k+ Contributions' },
  { label: 'Hackathons', value: '4 Participations' },
  { label: 'Workshops', value: '12+ Sessions' },
  { label: 'Open Source', value: '4 Projects' },
  { label: 'Future Goals', value: 'AI Engineer @ Top MNC' },
]

const stats = [
  { label: 'CGPA', value: '8.7/10' },
  { label: 'Projects', value: '12+' },
  { label: 'Certifications', value: '6+' },
  { label: 'Hackathons', value: '4' },
  { label: 'GitHub Contributions', value: '3k+' },
]

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<'All' | 'AI' | 'ML' | 'LLM'>('All')
  const [typedText, setTypedText] = useState('')
  const [loading, setLoading] = useState(true)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [formState, setFormState] = useState<FormState>({ name: '', email: '', message: '' })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.body.classList.toggle('bg-slate-950', theme === 'dark')
    document.body.classList.toggle('bg-slate-50', theme === 'light')
  }, [theme])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    const raf = (time: number) => {
      lenis.raf(time)
      window.requestAnimationFrame(raf)
    }
    const frame = window.requestAnimationFrame(raf)
    return () => {
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const phrases = ['Python Developer', 'AI Engineer', 'Prompt Engineer', 'Machine Learning Enthusiast']
    let currentIndex = 0
    let charIndex = 0
    let activePhrase = phrases[0]

    const interval = window.setInterval(() => {
      if (charIndex < activePhrase.length) {
        setTypedText(activePhrase.slice(0, charIndex + 1))
        charIndex += 1
      } else {
        window.setTimeout(() => setTypedText(''), 800)
        charIndex = 0
        currentIndex = (currentIndex + 1) % phrases.length
        activePhrase = phrases[currentIndex]
      }
    }, 90)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const onMove = (event: MouseEvent) => setCursorPosition({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const hero = document.querySelector('[data-hero]')
    const reveals = document.querySelectorAll('[data-reveal]')
    if (hero) {
      gsap.fromTo(hero, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' })
    }
    reveals.forEach((node, index) => {
      gsap.fromTo(node, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: index * 0.06, ease: 'power3.out' })
    })
  }, [])

  const filteredProjects = projects.filter((project) => filter === 'All' || project.category === filter)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formState.name || !formState.email || !formState.message) {
      return
    }
    emailjs.send('service_id', 'template_id', formState as unknown as Record<string, unknown>, 'public_key')
      .then(() => {
        window.alert('Thanks for reaching out. Your message is ready to be connected via EmailJS.')
      })
      .catch(() => {
        window.alert('The form is ready. Configure EmailJS credentials to enable live sending.')
      })
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <AnimatePresence>
        {loading ? (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/95 backdrop-blur">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full border-2 border-cyan-400/40 border-t-cyan-300" />
              <p className="mt-6 text-sm uppercase tracking-[0.35em] text-slate-300">Initializing experience</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div className="fixed left-0 top-0 z-[90] h-1 w-full origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500" style={{ scaleX }} />
      <div className="pointer-events-none fixed left-0 top-0 z-[70] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30 bg-cyan-400/10 blur-[1px] transition-transform duration-100" style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }} />
      <div className="pointer-events-none fixed left-0 top-0 z-[60] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" style={{ transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)` }} />
      <AnimatedBackground theme={theme} />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40 mb-8 flex items-center justify-between rounded-full border border-white/10 bg-slate-950/60 px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-200">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-2 text-cyan-300"><BrainCircuit size={16} /></span>
            AIDS Portfolio
          </div>
          <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#skills" className="transition hover:text-white">Skills</a>
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 sm:inline-flex">Visitors 18.7k</span>
            <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          </div>
        </header>

        <main className="flex-1">
          <section data-hero className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/65 p-6 shadow-[0_40px_120px_rgba(108,99,255,0.2)] backdrop-blur-2xl sm:p-10 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                  <Sparkles size={14} /> Final Year • AI & Data Science
                </div>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                  Building AI Solutions That Solve Real-World Problems
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl">
                  Artificial Intelligence & Data Science Student • Python Developer • AI Engineer • Prompt Engineer • Machine Learning Enthusiast
                </p>
                <div className="mt-6 flex min-h-[2.2rem] items-center text-lg font-medium text-cyan-300">
                  <span className="mr-3 text-slate-400">I build</span>
                  <span className="font-semibold">{typedText || 'Python Developer'}</span>
                  <span className="ml-1 animate-pulse">|</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-900/40 transition hover:scale-[1.01]">
                    <Contact size={16} /> Download Resume
                  </a>
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/20">
                    <BriefcaseBusiness size={16} /> View Projects
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/10">
                    <Mail size={16} /> Contact Me
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
                <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-cyan-400/30 blur-3xl" />
                <div className="absolute -right-6 bottom-10 h-28 w-28 rounded-full bg-violet-500/30 blur-3xl" />
                <div className="rounded-[32px] border border-white/10 bg-white/10 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  <div className="rounded-[28px] border border-cyan-400/20 bg-slate-950/70 p-4">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                      <BrainCircuit size={28} />
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-violet-500/20 via-slate-900 to-cyan-500/20 p-3">
                      <div className="h-56 rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(108,99,255,0.16),_transparent_60%)] p-2">
                        <div className="flex h-full items-center justify-center rounded-[16px] border border-white/10 bg-slate-950/70">
                          <div className="text-center">
                            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                              <Sparkles size={26} />
                            </div>
                            <p className="text-lg font-semibold text-white">AI Portfolio</p>
                            <p className="mt-2 text-sm text-slate-400">Premium experience • built for impact</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm text-slate-300">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-2">LLMs</div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-2">RAG</div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-2">Agents</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="mt-20">
            <SectionTitle eyebrow="About" title="Professional introduction" subtitle="I am a final-year B.Tech student in Artificial Intelligence & Data Science, driven by the ambition to build practical AI systems that blend research, engineering, and business impact." />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div data-reveal initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                <p className="text-lg leading-8 text-slate-300">
                  I am deeply interested in Machine Learning, Deep Learning, LLMs, Generative AI, RAG, Multi-Agent Systems, Python, and backend development. I enjoy turning ambitious ideas into reliable systems that feel effortless for the end user.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {['Machine Learning', 'Deep Learning', 'LLMs', 'Generative AI', 'RAG', 'Multi-Agent Systems', 'Python', 'Backend Development'].map((topic) => (
                    <span key={topic} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <motion.div key={stat.label} data-reveal initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[24px] border border-white/10 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div data-reveal initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">GitHub Contribution Graph</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Consistent momentum in building and shipping</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">3k+ contributions • active throughout the year</div>
              </div>
              <div className="mt-6 grid grid-cols-8 gap-2 sm:grid-cols-12">
                {Array.from({ length: 48 }).map((_, index) => (
                  <div key={index} className={`h-4 rounded-sm ${index % 3 === 0 ? 'bg-cyan-400/70' : index % 2 === 0 ? 'bg-violet-500/60' : 'bg-slate-800'}`} />
                ))}
              </div>
            </motion.div>
          </section>

          <section id="skills" className="mt-20">
            <SectionTitle eyebrow="Skills" title="Animated categorized skills" subtitle="I build across the stack, from research and experimentation to polished product experiences." />
            <div className="mt-8 space-y-6">
              {skillGroups.map((group, groupIndex) => (
                <motion.div key={group.name} data-reveal initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 p-2 text-cyan-300"><Cpu size={16} /></div>
                    <h3 className="text-xl font-semibold text-white">{group.name}</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.name} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="rounded-full bg-white/10 p-2 text-cyan-300"><Icon size={16} /></span>
                              <span className="font-medium text-slate-100">{item.name}</span>
                            </div>
                            <span className="text-sm text-slate-400">{item.value}%</span>
                          </div>
                          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8 + groupIndex * 0.1 }} className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="projects" className="mt-20">
            <SectionTitle eyebrow="Projects" title="Premium project cards" subtitle="Each project is designed to feel like a product launch, not a classroom exercise." />
            <div className="mt-6 flex flex-wrap gap-3">
              {(['All', 'AI', 'ML', 'LLM'] as const).map((value) => (
                <button key={value} type="button" onClick={() => setFilter(value)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === value ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white' : 'border border-white/10 bg-white/10 text-slate-300 hover:bg-white/20'}`}>
                  {value}
                </button>
              ))}
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <motion.article key={project.title} data-reveal initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -8, scale: 1.01 }} className="group rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                  <div className="flex flex-wrap gap-2">
                    {project.badges.map((badge) => (
                      <span key={badge} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.solution}</p>
                  <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
                    <p className="font-medium text-cyan-300">Highlights</p>
                    <ul className="mt-2 space-y-2">
                      {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button type="button" onClick={() => setActiveProject(project)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition group-hover:opacity-90">
                    Explore project <MoveRight size={16} />
                  </button>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="mt-20 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <SectionTitle eyebrow="Timeline" title="Experience and milestones" />
              <div className="mt-8 space-y-6">
                {timeline.map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">{index + 1}</div>
                      {index < timeline.length - 1 ? <div className="mt-2 h-full w-px bg-white/10" /> : null}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{item.type}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <SectionTitle eyebrow="3D AI Brain" title="Interactive visualization" />
              <div className="mt-6"><BrainCanvas /></div>
            </div>
          </section>

          <section className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <SectionTitle eyebrow="Certifications" title="Recognized learning milestones" />
              <div className="mt-8 space-y-4">
                {certifications.map((certificate) => (
                  <div key={certificate.name} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4 transition hover:border-cyan-400/30 hover:shadow-[0_15px_50px_rgba(108,99,255,0.2)]">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{certificate.name}</h3>
                        <p className="mt-1 text-sm text-slate-400">{certificate.issuer}</p>
                      </div>
                      <a href={certificate.link} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/20">Download</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <SectionTitle eyebrow="Achievements" title="Recognized progress" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {achievements.map((achievement) => (
                  <div key={achievement.label} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5">
                    <div className="flex items-center gap-3 text-cyan-300"><Trophy size={18} /> <span className="text-sm font-semibold uppercase tracking-[0.25em]">{achievement.label}</span></div>
                    <p className="mt-3 text-lg font-semibold text-white">{achievement.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="mt-20 rounded-[36px] border border-white/10 bg-white/8 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-10">
            <SectionTitle eyebrow="Contact" title="Professional contact page" subtitle="Always open to internships, software engineering roles, and collaborations at ambitious teams." />
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
                <div className="space-y-4 text-slate-300">
                  <div className="flex items-center gap-3"><Mail className="text-cyan-300" size={18} /> <span>rakshandakowsar@gmail.com</span></div>
                  <div className="flex items-center gap-3"><FaLinkedin className="text-cyan-300" size={18} /> <a href="https://www.linkedin.com/in/shaikrakshanda-kowsar-77b5b130b" target="_blank" rel="noreferrer" className="transition hover:text-white">linkedin.com/in/shaikrakshanda-kowsar-77b5b130b</a></div>
                  <div className="flex items-center gap-3"><FaGithub className="text-cyan-300" size={18} /> <a href="https://github.com/Rakshandakowsar" target="_blank" rel="noreferrer" className="transition hover:text-white">github.com/Rakshandakowsar</a></div>
                  <div className="flex items-center gap-3"><FaCode className="text-cyan-300" size={18} /> <a href="https://leetcode.com/u/Rakshandakowsar/" target="_blank" rel="noreferrer" className="transition hover:text-white">leetcode.com/u/Rakshandakowsar/</a></div>
                  <div className="flex items-center gap-3"><span className="text-cyan-300">📍</span> <span>India</span></div>
                </div>
                <a href="/resume.pdf" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 font-semibold text-white">Download Resume <MoveRight size={16} /></a>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Working availability: Open for internships, full-time roles, and AI-focused collaborations.</div>
              </div>
              <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input value={formState.name} onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none ring-0" placeholder="Name" />
                  <input type="email" value={formState.email} onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none ring-0" placeholder="Email" />
                </div>
                <textarea value={formState.message} onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))} className="mt-4 min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none ring-0" placeholder="Message" />
                <button type="submit" className="mt-4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 font-semibold text-white transition hover:opacity-90">Send Message</button>
              </form>
            </div>
          </section>
        </main>

        <footer className="mt-20 flex flex-col items-center justify-between gap-4 rounded-[28px] border border-white/10 bg-slate-950/60 px-6 py-6 text-sm text-slate-400 backdrop-blur-xl sm:flex-row">
          <p>© 2026 AIDS Portfolio. Crafted for ambitious AI and software roles.</p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/Rakshandakowsar" className="rounded-full border border-white/10 bg-white/10 p-2 transition hover:bg-white/20"><FaGithub size={16} /></a>
            <a href="https://www.linkedin.com/in/shaikrakshanda-kowsar-77b5b130b" className="rounded-full border border-white/10 bg-white/10 p-2 transition hover:bg-white/20"><FaLinkedin size={16} /></a>
            <a href="#top" className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 p-2 text-white"><ArrowUp size={16} /></a>
          </div>
        </footer>
      </div>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}

export default App
