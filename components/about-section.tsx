import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { studio } from '@/lib/site-data'

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 01" ghost="About" title="About" />
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          <Reveal className="md:col-span-1">
            <dl className="space-y-6 text-sm">
              <div><dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Studio</dt><dd className="mt-1 text-foreground">{studio.name}</dd></div>
              <div><dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Founder</dt><dd className="mt-1 text-foreground">{studio.artist}</dd></div>
              <div><dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Base</dt><dd className="mt-1 text-foreground">{studio.location}</dd></div>
              <div><dt className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">Focus</dt><dd className="mt-1 text-foreground">Music · Video · Motion · Brand</dd></div>
            </dl>
          </Reveal>
          <Reveal delay={120} className="md:col-span-2">
            <p className="text-pretty text-3xl font-medium leading-[1.15] tracking-tight text-foreground md:text-4xl">{studio.name} is the digital creative studio of {studio.artist} — where sound, motion, film, and brand are made under one roof.</p>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">From the first frame to the final master, from concept to code, we build the work and the systems that carry it. Music, video, motion, and identity are not separate departments here — they are one continuous idea.</p>
            <p className="mt-6 font-mono text-sm italic text-muted-foreground">&ldquo;Design is a decision.&rdquo; — {studio.artist}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
