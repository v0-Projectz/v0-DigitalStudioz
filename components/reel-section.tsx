'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from '@/components/section-heading'
import { useLightbox, type LightboxSlide } from '@/components/lightbox'
import { disciplines } from '@/lib/site-data'

export function ReelSection() {
  const { open } = useLightbox()
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const gallery: LightboxSlide[] = disciplines.map((item) => ({ src: item.image, alt: item.name, caption: item.name, meta: item.category }))

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      setProgress(max > 0 ? el.scrollLeft / max : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="reel" className="scroll-mt-20 border-t border-border bg-background py-24 md:py-32">
      <div className="container-wide"><SectionHeading index="// 02" ghost="Featured" title="Work" subtitle="Studio / Portfolio" /></div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:gap-6 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {disciplines.map((item, i) => {
          const feature = i % 3 === 0
          return (
            <figure key={item.name} className={`flex shrink-0 snap-start flex-col ${feature ? 'w-[85vw] md:w-[44rem]' : 'w-[72vw] md:w-[23rem]'}`}>
              <button
                type="button"
                onClick={() => open(gallery, i)}
                aria-label={`Open ${item.name} in lightbox`}
                className={`group relative block w-full overflow-hidden bg-band ${feature ? 'aspect-[16/10]' : 'aspect-[3/4]'}`}
              >
                <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className="transform-gpu object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0" sizes="(min-width: 768px) 44rem, 85vw" />
                <div className="absolute inset-0 bg-scrim/25 transition-colors duration-500 group-hover:bg-scrim/40" />
                <span className="absolute left-4 top-4 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-band-foreground/80">{`0${i + 1}`}</span>
              </button>
              <figcaption className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
                <p className="text-lg font-bold uppercase tracking-tight text-foreground md:text-xl">{item.name}</p>
                <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">{item.category}</span>
              </figcaption>
            </figure>
          )
        })}
        <div className="shrink-0 pl-1 pr-2" aria-hidden="true" />
      </div>
      <div className="container-wide mt-8">
        <div className="relative h-px w-full bg-border">
          <div className="absolute left-0 top-0 h-px bg-accent transition-[width] duration-150 ease-out" style={{ width: `${Math.max(6, progress * 100)}%` }} />
        </div>
        <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Scroll &rarr; to browse</p>
      </div>
    </section>
  )
}
