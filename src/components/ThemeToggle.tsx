import { MoonStar, SunMedium } from 'lucide-react'

interface ThemeToggleProps {
  theme: 'dark' | 'light'
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:bg-white/15"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunMedium size={16} /> : <MoonStar size={16} />}
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  )
}
