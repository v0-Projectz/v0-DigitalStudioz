'use client'

import { useEffect, useRef } from 'react'
import { marqueeWords } from '@/lib/site-data'

export function DisciplineMarquee() {
  const inner = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = inner.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const half = el.scrollWidth / 2
      if (half <= 0) return
      const offset = (window.scrollY * 0.35) % half
      el.style.transform = `translate3d(${-offset}px, 0, 0)`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  const items = [...marqueeWords, ...marqueeWords]
  return (
    <div className="overflow-hidden border-y border-border bg-secondary py-5 md:py-6" aria-hidden="true">
      <div ref={inner} className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform md:gap-12">
        {items.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center gap-8 md:gap-12">
            <span className="text-2xl font-bold uppercase tracking-tight text-foreground/70 md:text-4xl">{word}</span>
            <span className="text-lg text-accent-dim md:text-2xl">&#42;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
