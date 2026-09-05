'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { useLightbox, type LightboxSlide } from '@/components/lightbox'
import { disciplines } from '@/lib/site-data'

export function ReelSection() {
  const { open } = useLightbox()
  const trackRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [ratio, setRatio] = useState(0.3)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const dragging = useRef(false)
  const moved = useRef(false)
  const startX = useRef(0)
  const startLeft = useRef(0)
  const barDragging = useRef(false)

  const gallery: LightboxSlide[] = disciplines.map((item) => ({ src: item.image, alt: item.name, caption: item.name, meta: item.category }))

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setRatio(el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1)
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const page = (d: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  // Drag-to-scroll across the whole rail.
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    dragging.current = true
    moved.current = false
    startX.current = e.clientX
    startLeft.current = el.scrollLeft
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current
    if (!el || !dragging.current) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 5) moved.current = true
    el.scrollLeft = startLeft.current - dx
  }
  const endDrag = (e: React.PointerEvent) => {
    const el = trackRef.current
    dragging.current = false
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
  }
  const handleOpen = (i: number) => {
    if (moved.current) return
    open(gallery, i)
  }

  // Draggable cyan scrollbar thumb.
  const scrubTo = (clientX: number) => {
    const bar = barRef.current
    const el = trackRef.current
    if (!bar || !el) return
    const rect = bar.getBoundingClientRect()
    const thumbW = rect.width * ratio
    const pos = Math.min(Math.max(clientX - rect.left - thumbW / 2, 0), rect.width - thumbW)
    const frac = rect.width - thumbW > 0 ? pos / (rect.width - thumbW) : 0
    el.scrollLeft = frac * (el.scrollWidth - el.clientWidth)
  }
  const onBarDown = (e: React.PointerEvent) => {
    barDragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    scrubTo(e.clientX)
  }
  const onBarMove = (e: React.PointerEvent) => {
    if (barDragging.current) scrubTo(e.clientX)
  }
  const onBarUp = (e: React.PointerEvent) => {
    barDragging.current = false
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const thumbLeft = (1 - ratio) * progress * 100
  const thumbWidth = ratio * 100

  return (
    <section id="reel" className="scroll-mt-20 border-t border-border bg-background py-24 md:py-32">
      <div className="container-wide"><SectionHeading index="// 02" ghost="Featured" title="Work" subtitle="Studio / Portfolio" /></div>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex cursor-grab select-none snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 active:cursor-grabbing md:gap-6 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {disciplines.map((item, i) => {
          const feature = i % 3 === 0
          return (
            <figure key={item.name} className={`flex shrink-0 snap-start flex-col ${feature ? 'w-[85vw] md:w-[44rem]' : 'w-[72vw] md:w-[23rem]'}`}>
              <button
                type="button"
                onClick={() => handleOpen(i)}
                aria-label={`Open ${item.name} in lightbox`}
                className={`group relative block w-full overflow-hidden bg-band ${feature ? 'aspect-[16/10]' : 'aspect-[3/4]'}`}
              >
                <Image src={item.image || '/placeholder.svg'} alt={item.name} fill draggable={false} className="transform-gpu object-cover grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0" sizes="(min-width: 768px) 44rem, 85vw" />
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

      <div className="container-wide mt-8 flex items-center gap-5">
        <div
          ref={barRef}
          onPointerDown={onBarDown}
          onPointerMove={onBarMove}
          onPointerUp={onBarUp}
          onPointerCancel={onBarUp}
          role="scrollbar"
          aria-controls="reel"
          aria-orientation="horizontal"
          aria-label="Scroll featured work"
          aria-valuenow={Math.round(progress * 100)}
          className="relative h-4 flex-1 cursor-pointer touch-none"
        >
          <span className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
          <span
            className="pointer-events-none absolute top-1/2 h-1 -translate-y-1/2 bg-accent"
            style={{ left: `${thumbLeft}%`, width: `${thumbWidth}%` }}
          />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => page(-1)} disabled={!canPrev} aria-label="Previous work" className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"><ArrowLeft className="h-4 w-4" strokeWidth={1.5} /></button>
          <button type="button" onClick={() => page(1)} disabled={!canNext} aria-label="Next work" className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"><ArrowRight className="h-4 w-4" strokeWidth={1.5} /></button>
        </div>
      </div>
      <p className="container-wide mt-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Drag &middot; scrub &middot; or use arrows to browse</p>
    </section>
  )
}
