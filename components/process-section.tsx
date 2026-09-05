'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { process } from '@/lib/site-data'

function PanelNavigator({ panels }: { panels: NonNullable<(typeof process)[number]['panels']> }) {
  const [index, setIndex] = useState(0)
  const panel = panels[index]
  const go = (dir: number) => setIndex((prev) => (prev + dir + panels.length) % panels.length)

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-band">
          <Image key={panel.image} src={panel.image || '/placeholder.svg'} alt={panel.imageAlt} fill className="animate-[fadeIn_0.4s_ease-out] object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-accent">{panel.label}</span>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{panel.text}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next" className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent">
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="flex flex-1 items-center gap-3">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">{String(index + 1).padStart(2, '0')} / {String(panels.length).padStart(2, '0')}</span>
          <div className="flex flex-1 gap-1.5">
            {panels.map((p, i) => (
              <button key={p.label} type="button" onClick={() => setIndex(i)} aria-label={`Go to ${p.label}`} aria-current={i === index} className={`h-0.5 flex-1 transition-colors ${i === index ? 'bg-accent' : 'bg-border'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProcessSection() {
  const [open, setOpen] = useState<string | null>(process[0].step)

  return (
    <section id="process" className="scroll-mt-20 border-t border-border bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 04" ghost="Process" title="Process" subtitle="How we work" />
        <div className="flex flex-col border-t border-border">
          {process.map((item) => {
            const expanded = open === item.step
            const panelId = `process-panel-${item.step}`
            return (
              <div key={item.step} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : item.step)}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    className="group grid w-full grid-cols-[3rem_1fr_2rem] items-center gap-x-6 py-8 text-left transition-colors md:grid-cols-[6rem_1fr_3rem] md:gap-x-10 md:py-10"
                  >
                    <span className={`font-mono text-sm transition-colors md:text-base ${expanded ? 'text-accent' : 'text-accent-dim group-hover:text-accent'}`}>{item.step}</span>
                    <span className={`text-3xl font-bold uppercase leading-none tracking-tighter transition-colors md:text-4xl ${expanded ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>{item.title}</span>
                    <ChevronDown className={`h-6 w-6 justify-self-end text-foreground transition-transform duration-300 ${expanded ? 'rotate-180 text-accent' : 'group-hover:text-accent'}`} />
                  </button>
                </h3>
                <div id={panelId} role="region" hidden={!expanded} className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-[3rem_1fr] gap-x-6 pb-10 md:grid-cols-[6rem_1fr] md:gap-x-10">
                      <span aria-hidden="true" className="hidden md:block" />
                      <div>
                        <p className="max-w-xl text-pretty text-lg leading-relaxed text-foreground">{item.body}</p>
                        {item.panels ? (
                          <div className="mt-8">
                            <PanelNavigator panels={item.panels} />
                          </div>
                        ) : (
                          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
                            {item.image && (
                              <div className="relative aspect-[4/3] w-full overflow-hidden bg-band">
                                <Image src={item.image} alt={item.imageAlt ?? item.title} fill className="object-cover grayscale" sizes="(min-width: 768px) 40vw, 100vw" />
                              </div>
                            )}
                            {item.detail && (
                              <div className={item.scroll ? 'max-h-64 space-y-4 overflow-y-auto pr-4 [scrollbar-color:var(--accent)_transparent] [scrollbar-width:thin]' : 'space-y-4'}>
                                {item.detail.map((p, i) => (
                                  <p key={i} className="text-pretty leading-relaxed text-muted-foreground">{p}</p>
                                ))}
                                {item.scroll && <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent-dim">Scroll for more &darr;</p>}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
