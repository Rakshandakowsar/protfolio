import { motion } from 'framer-motion'

const particles = [
  { left: '8%', top: '12%', size: 220, delay: 0 },
  { left: '72%', top: '18%', size: 180, delay: 0.8 },
  { left: '18%', top: '72%', size: 240, delay: 1.4 },
  { left: '75%', top: '68%', size: 160, delay: 2.1 },
]

interface AnimatedBackgroundProps {
  theme: 'dark' | 'light'
}

export function AnimatedBackground({ theme }: AnimatedBackgroundProps) {
  const overlay = theme === 'dark'
    ? 'bg-[radial-gradient(circle_at_top_left,_rgba(108,99,255,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,220,255,0.16),_transparent_28%)]'
    : 'bg-[radial-gradient(circle_at_top_left,_rgba(108,99,255,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,220,255,0.15),_transparent_28%)]'

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 ${overlay}`} />
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-cyan-400/20 blur-3xl"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [0, -24, 0], x: [0, 14, 0], opacity: [0.55, 0.9, 0.55] }}
          transition={{ duration: 10 + index, repeat: Infinity, ease: 'easeInOut', delay: particle.delay }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.04)_50%,transparent_100%)]" />
    </div>
  )
}
