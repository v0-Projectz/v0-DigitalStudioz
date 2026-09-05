'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { useLightbox, type LightboxItem } from '@/components/lightbox'
import { works, workTags, type WorkTag } from '@/lib/site-data'

type Filter = WorkTag | 'All'
const filters: Filter[] = ['All', ...workTags]

export function WorksSection() {
  const { open } = useLightbox()
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo(
    () => (filter === 'All' ? works : works.filter((w) => w.tags.includes(filter))),
    [filter],
  )

  const gallery: LightboxItem[] = visible.map((w) => ({
    title: w.name,
    meta: `// ${w.id} / ${w.category}`,
    description: w.description,
    href: w.href,
    hrefLabel: 'View project',
    images: w.gallery ?? [{ src: w.image, alt: w.name }],
  }))

  return (
    <section id="works" className="scroll-mt-20 border-t border-border bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 03" ghost="Works" title="Full Works" />

        {/* Filter chips */}
        <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter works by discipline">
          {filters.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  active
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border text-muted-foreground hover:border-accent-dim hover:text-foreground'
                }`}
              >
                {f}
              </button>
            )
          })}
          <span className="ml-auto font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground" aria-live="polite">
            {String(visible.length).padStart(2, '0')} {visible.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        {visible.map((work, i) => {
          const reversed = i % 2 === 1
          return (
            <div key={work.id} className="container-wide grid items-center gap-8 py-8 md:grid-cols-2 md:gap-16 md:py-12">
              <Reveal className={reversed ? 'md:order-2' : ''}>
                <button type="button" onClick={() => open(gallery, i)} aria-label={`Open ${work.name} in lightbox`} className="group relative block aspect-[4/3] w-full overflow-hidden bg-band focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  <Image src={work.image || '/placeholder.svg'} alt={work.name} fill className="transform-gpu object-cover transition-transform duration-700 ease-out group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" />
                  <span className="absolute inset-0 flex items-center justify-center bg-scrim/0 transition-colors duration-500 group-hover:bg-scrim/40"><Maximize2 className="h-6 w-6 text-band-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100" /></span>
                </button>
              </Reveal>
              <Reveal delay={120} className={reversed ? 'md:order-1' : ''}>
                <div className={reversed ? 'md:text-right' : ''}>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-accent">{`// ${work.id} / ${work.name}`}</span>
                  <h3 className="mt-3 text-3xl font-bold uppercase leading-none tracking-tighter text-foreground md:text-5xl">{work.name}</h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{work.category}</p>
                  <p className={`mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground ${reversed ? 'md:ml-auto' : ''}`}>{work.description}</p>
                  <ul className={`mt-5 flex flex-wrap gap-2 ${reversed ? 'md:justify-end' : ''}`}>
                    {work.tags.map((tag) => (
                      <li key={tag} className="border border-border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.25em] text-accent-dim">{tag}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          )
        })}
      </div>
    </section>
  )
}
