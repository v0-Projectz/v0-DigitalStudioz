import { Reveal } from '@/components/reveal'

export function SectionHeading({ index, ghost, title, subtitle }: { index: string; ghost: string; title: string; subtitle?: string }) {
  return (
    <div className="relative mb-14 md:mb-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-7 left-0 max-w-[92vw] select-none text-6xl font-bold uppercase leading-none tracking-tighter text-foreground/[0.045] sm:-top-10 sm:text-8xl md:-top-12 md:text-9xl"
      >
        {ghost}
      </span>
      <Reveal className="relative flex items-end gap-4 border-b border-border pb-4">
        <span className="mb-1 shrink-0 font-mono text-[0.7rem] tracking-[0.35em] text-accent">{index}</span>
        <h2 className="text-3xl font-bold uppercase leading-[0.9] tracking-tighter text-foreground sm:text-4xl md:text-5xl">{title}</h2>
        {subtitle && (
          <span className="ml-auto mb-1 hidden shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground sm:block">{subtitle}</span>
        )}
      </Reveal>
    </div>
  )
}
