'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export type LightboxImage = { src: string; alt: string }
export type LightboxItem = {
  title: string
  meta?: string
  description?: string
  href?: string
  hrefLabel?: string
  images: LightboxImage[]
}
type LightboxContextValue = { open: (items: LightboxItem[], index: number) => void }
const LightboxContext = createContext<LightboxContextValue | null>(null)

export function useLightbox() {
  const ctx = useContext(LightboxContext)
  if (!ctx) throw new Error('useLightbox must be used within a LightboxProvider')
  return ctx
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([])
  const [index, setIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback((next: LightboxItem[], i: number) => {
    setItems(next)
    setIndex(i)
    setImageIndex(0)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])
  const prev = useCallback(() => {
    setImageIndex(0)
    setIndex((i) => (i - 1 + items.length) % items.length)
  }, [items.length])
  const next = useCallback(() => {
    setImageIndex(0)
    setIndex((i) => (i + 1) % items.length)
  }, [items.length])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = original
    }
  }, [isOpen, close, prev, next])

  const current = items[index]
  const image = current?.images[imageIndex]

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {isOpen && current && image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[100] flex flex-col bg-scrim/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-6 py-5 text-band-foreground">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-band-foreground/70">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid h-10 w-10 place-items-center border border-band-foreground/30 transition-colors hover:border-band-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex flex-1 flex-col overflow-y-auto px-4 pb-6 md:px-16" onClick={(e) => e.stopPropagation()}>
            <div className="relative mx-auto w-full max-w-5xl">
              <div className="relative h-[44vh] w-full sm:h-[50vh]">
                <Image
                  key={image.src}
                  src={image.src || '/placeholder.svg'}
                  alt={image.alt}
                  fill
                  className="object-contain animate-in fade-in zoom-in-95 duration-300 ease-out"
                  sizes="86vw"
                  priority
                />
                {items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous project"
                      className="absolute left-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-band-foreground/30 bg-scrim/40 text-band-foreground transition-colors hover:border-band-foreground md:-left-14 md:bg-transparent"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next project"
                      className="absolute right-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-band-foreground/30 bg-scrim/40 text-band-foreground transition-colors hover:border-band-foreground md:-right-14 md:bg-transparent"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mx-auto mt-6 w-full max-w-5xl border-t border-band-foreground/15 pt-5">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl text-band-foreground">
                  {current.meta && (
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-accent">{current.meta}</span>
                  )}
                  <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight md:text-3xl">{current.title}</h3>
                  {current.description && (
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-band-foreground/70">{current.description}</p>
                  )}
                  {current.href && (
                    <a
                      href={current.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 border border-band-foreground/30 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-band-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      {current.hrefLabel ?? 'View project'}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                {current.images.length > 1 && (
                  <div className="shrink-0">
                    <span className="mb-2 block font-mono text-[0.55rem] uppercase tracking-[0.3em] text-band-foreground/40">
                      {current.images.length} views
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {current.images.map((img, i) => (
                        <button
                          key={img.src + i}
                          type="button"
                          onClick={() => setImageIndex(i)}
                          aria-label={`View image ${i + 1} of ${current.title}`}
                          aria-current={i === imageIndex}
                          className={`relative h-16 w-24 shrink-0 overflow-hidden border transition-colors ${i === imageIndex ? 'border-accent' : 'border-band-foreground/25 hover:border-band-foreground/60'}`}
                        >
                          <Image
                            src={img.src || '/placeholder.svg'}
                            alt=""
                            fill
                            className={`object-cover transition-opacity ${i === imageIndex ? '' : 'opacity-55 hover:opacity-90'}`}
                            sizes="6rem"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  )
}
