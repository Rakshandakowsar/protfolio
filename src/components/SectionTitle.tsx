interface SectionTitleProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionTitle({ eyebrow, title, subtitle, align = 'left' }: SectionTitleProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base leading-8 text-slate-300">{subtitle}</p> : null}
    </div>
  )
}
