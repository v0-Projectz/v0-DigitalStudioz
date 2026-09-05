'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Settings2, X } from 'lucide-react'
import { heroSlides, studio } from '@/lib/site-data'

type Transition = 'fade' | 'slide' | 'dip'
const TRANS_MS: Record<Transition, number> = { fade: 1200, dip: 1350, slide: 950 }
const MIN_SECONDS = 2
const MAX_SECONDS = 15
const DEFAULT_SECONDS = 6
const TRANSITIONS: { value: Transition; label: string }[] = [ { value: 'fade', label: 'Cross Fade' }, { value: 'slide', label: 'Slide' }, { value: 'dip', label: 'Dip to Black' } ]
const PRESETS: { label: string; seconds: number }[] = [ { label: 'Slow', seconds: 9 }, { label: 'Normal', seconds: 6 }, { label: 'Fast', seconds: 3 } ]

export function HeroSlider() {
  const count = heroSlides.length
  const year = new Date().getFullYear()
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [dir, setDir] = useState(1)
  const [phase, setPhase] = useState<'idle' | 'start' | 'run'>('idle')
  const [mounted, setMounted] = useState(false)
  const [transition, setTransition] = useState<Transition>('fade')
  const [kenBurns, setKenBurns] = useState(true)
  const [autoplay, setAutoplay] = useState(true)
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const speedMs = seconds * 1000
  const setClampedSeconds = (v: number) => setSeconds(Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, v)))

  useEffect(() => {
    let r2 = 0
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setMounted(true)) })
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2) }
  }, [])

  const change = useCallback((direction: number, target?: number) => {
    setActive((cur) => {
      const next = target != null ? (target + count) % count : (cur + direction + count) % count
      if (next === cur) return cur
      setPrev(cur); setDir(direction); setPhase((p) => (transition === 'slide' ? 'start' : p))
      return next
    })
  }, [count, transition])

  useEffect(() => {
    if (!autoplay) return
    const id = setTimeout(() => change(1), speedMs)
    return () => clearTimeout(id)
  }, [autoplay, speedMs, change, active])

  useEffect(() => {
    if (phase !== 'start') return
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setPhase('run')))
    return () => cancelAnimationFrame(r)
  }, [phase, active])

  useEffect(() => {
    if (prev === null) return
    const id = setTimeout(() => { setPrev(null); setPhase('idle') }, TRANS_MS[transition])
    return () => clearTimeout(id)
  }, [prev, active, transition])

  const outerStyle = (i: number): React.CSSProperties => {
    const isActive = i === active; const isPrev = i === prev
    if (transition === 'slide') {
      let x = dir > 0 ? '100%' : '-100%'
      if (isActive) x = phase === 'start' ? (dir > 0 ? '100%' : '-100%') : '0%'
      else if (isPrev) x = phase === 'run' ? (dir > 0 ? '-100%' : '100%') : '0%'
      const dur = phase === 'start' ? 0 : TRANS_MS.slide
      return { transform: `translateX(${x})`, opacity: isActive || isPrev ? 1 : 0, transition: `transform ${dur}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${dur}ms ease` }
    }
    if (transition === 'dip') {
      if (isActive) return { opacity: 1, transition: `opacity 650ms ease ${prev !== null ? 550 : 0}ms` }
      if (isPrev) return { opacity: 0, transition: 'opacity 550ms ease' }
      return { opacity: 0, transition: 'opacity 0ms' }
    }
    return { opacity: isActive ? 1 : 0, transition: `opacity ${TRANS_MS.fade}ms ease` }
  }

  const innerStyle = (i: number): React.CSSProperties => {
    const zoomed = kenBurns && mounted && (i === active || i === prev)
    return { transform: `scale(${zoomed ? 1.12 : 1})`, transition: `transform ${kenBurns ? speedMs : 0}ms linear` }
  }

  return (
    <section id="top" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-scrim">
      {heroSlides.map((slide, i) => (
        <div key={slide.subtitle} className="absolute inset-0" style={outerStyle(i)} aria-hidden={i !== active}>
          <div className="relative h-full w-full will-change-transform" style={innerStyle(i)}>
            <Image src={slide.image || '/placeholder.svg'} alt={slide.alt} fill priority={i === 0} className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-scrim/85 via-scrim/40 to-scrim/60" />
        </div>
      ))}

      {/* Editorial poster overlay */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-6 py-20 text-band-foreground md:px-10 md:py-24 lg:px-16">
        {/* Corner metadata */}
        <div className="flex items-start justify-between font-mono text-[0.6rem] uppercase tracking-[0.3em] text-band-foreground/70">
          <div className="flex flex-col gap-1.5">
            <span className="text-accent">{heroSlides[active].kicker}</span>
            <span>{studio.location}</span>
            <span className="mt-1 inline-flex items-center gap-2 text-band-foreground/85">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {studio.availability}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1.5 text-right">
            <span>{studio.tagline}</span>
            <span>&copy; {year}</span>
          </div>
        </div>

        {/* Bottom-anchored wordmark + filmstrip */}
        <div>
          <span className="block font-mono text-[0.65rem] uppercase tracking-[0.4em] text-band-foreground/80 sm:text-xs">{heroSlides[active].subtitle}</span>
          <h1 className="mt-3 text-balance text-[3.25rem] font-bold uppercase leading-[0.82] tracking-tighter sm:text-7xl md:text-8xl lg:text-[9.5rem]">{studio.name}</h1>
          <div className="mt-8 flex items-stretch gap-2 pointer-events-auto sm:gap-3">
            {heroSlides.map((slide, i) => {
              const isActive = i === active
              const n = String(i + 1).padStart(2, '0')
              const total = String(count).padStart(2, '0')
              return (
                <button
                  key={slide.subtitle}
                  type="button"
                  onClick={() => change(i >= active ? 1 : -1, i)}
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={isActive}
                  className={`group relative h-16 flex-1 overflow-hidden border text-left transition-colors ${isActive ? 'border-accent/60 bg-accent/[0.06]' : 'border-band-foreground/20 hover:border-band-foreground/40'}`}
                >
                  {/* corner crop marks */}
                  <span aria-hidden className={`absolute left-0 top-0 h-1.5 w-1.5 border-l border-t ${isActive ? 'border-accent' : 'border-band-foreground/40'}`} />
                  <span aria-hidden className={`absolute right-0 top-0 h-1.5 w-1.5 border-r border-t ${isActive ? 'border-accent' : 'border-band-foreground/40'}`} />
                  {/* header: index / total */}
                  <span className="absolute left-2 top-1.5 flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-[0.2em]">
                    <span className={isActive ? 'text-accent' : 'text-band-foreground/55 group-hover:text-band-foreground/80'}>{n}</span>
                    <span className="text-band-foreground/25">/ {total}</span>
                  </span>
                  {/* status readout */}
                  <span className="absolute right-2 top-1.5 flex items-center gap-1 font-mono text-[0.5rem] uppercase tracking-[0.2em]">
                    <span className={`h-1 w-1 rounded-full ${isActive ? 'animate-pulse bg-accent' : 'bg-band-foreground/30'}`} />
                    <span className={isActive ? 'text-accent' : 'text-band-foreground/40'}>{isActive ? 'Live' : 'Cue'}</span>
                  </span>
                  {/* label + equalizer */}
                  <span className="absolute bottom-2.5 left-2 right-2 flex items-end justify-between gap-2">
                    <span className={`hidden truncate font-mono text-[0.55rem] uppercase tracking-[0.22em] sm:block ${isActive ? 'text-band-foreground/80' : 'text-band-foreground/40'}`}>{slide.kicker.replace('// ', '')}</span>
                    <span aria-hidden className="flex items-end gap-[2px]">
                      {[5, 9, 6, 11, 7].map((h, b) => (
                        <span key={b} className={`w-[2px] ${isActive ? 'bg-accent/80' : 'bg-band-foreground/25'}`} style={{ height: `${h}px` }} />
                      ))}
                    </span>
                  </span>
                  {/* progress */}
                  <span className="absolute bottom-0 left-0 h-[3px] w-full bg-band-foreground/15">
                    <span
                      key={isActive ? `fill-${active}-${seconds}-${autoplay}` : `idle-${i}`}
                      className="block h-full bg-accent"
                      style={{ width: isActive ? '100%' : '0%', transition: isActive && autoplay ? `width ${speedMs}ms linear` : 'width 350ms ease' }}
                    />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Settings picker */}
      <div className="absolute bottom-6 right-6 z-30 md:bottom-8 md:right-8">
        {menuOpen && (
          <>
            <button type="button" aria-label="Close slider settings" className="fixed inset-0 z-0 cursor-default" onClick={() => setMenuOpen(false)} />
            <div role="dialog" aria-label="Slider settings" className="relative z-10 mb-3 max-h-[70vh] w-[min(16rem,calc(100vw-3rem))] overflow-y-auto border border-band-foreground/20 bg-scrim/85 p-5 text-band-foreground backdrop-blur-md">
              <PickerGroup label="Transition">{TRANSITIONS.map((t) => (<Pill key={t.value} active={transition === t.value} onClick={() => setTransition(t.value)}>{t.label}</Pill>))}</PickerGroup>
              <PickerGroup label="Ken Burns Zoom"><Pill active={kenBurns} onClick={() => setKenBurns(true)}>On</Pill><Pill active={!kenBurns} onClick={() => setKenBurns(false)}>Off</Pill></PickerGroup>
              <PickerGroup label="Autoplay"><Pill active={autoplay} onClick={() => setAutoplay(true)}>On</Pill><Pill active={!autoplay} onClick={() => setAutoplay(false)}>Off</Pill></PickerGroup>
              <PickerGroup label={`Duration — ${seconds}s`}>{PRESETS.map((p) => (<Pill key={p.label} active={seconds === p.seconds} onClick={() => setSeconds(p.seconds)}>{p.label}</Pill>))}</PickerGroup>
              <div className="mb-1 flex items-center gap-2">
                <button type="button" aria-label="Decrease duration by one second" onClick={() => setClampedSeconds(seconds - 1)} className="flex h-7 w-7 shrink-0 items-center justify-center border border-band-foreground/25 text-band-foreground/70 transition-colors hover:border-band-foreground/50 hover:text-band-foreground"><Minus className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                <input type="range" min={MIN_SECONDS} max={MAX_SECONDS} step={0.5} value={seconds} onChange={(e) => setClampedSeconds(Number(e.target.value))} aria-label="Seconds between slides" className="hero-range h-1 flex-1 cursor-pointer appearance-none rounded-full bg-band-foreground/25" />
                <button type="button" aria-label="Increase duration by one second" onClick={() => setClampedSeconds(seconds + 1)} className="flex h-7 w-7 shrink-0 items-center justify-center border border-band-foreground/25 text-band-foreground/70 transition-colors hover:border-band-foreground/50 hover:text-band-foreground"><Plus className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
              </div>
            </div>
          </>
        )}
        <button type="button" aria-label="Slider settings" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)} className="relative z-10 ml-auto flex h-11 w-11 items-center justify-center border border-band-foreground/30 bg-scrim/60 text-band-foreground/80 backdrop-blur-md transition-colors hover:border-band-foreground/60 hover:text-band-foreground">{menuOpen ? <X className="h-5 w-5" strokeWidth={1.25} /> : <Settings2 className="h-5 w-5" strokeWidth={1.25} />}</button>
      </div>
    </section>
  )
}

function PickerGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div className="mb-4 last:mb-0"><p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-band-foreground/50">{label}</p><div className="flex flex-wrap gap-2">{children}</div></div>)
}
function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (<button type="button" onClick={onClick} aria-pressed={active} className={`border px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.15em] transition-colors ${active ? 'border-accent bg-accent text-accent-foreground' : 'border-band-foreground/25 text-band-foreground/70 hover:border-band-foreground/50 hover:text-band-foreground'}`}>{children}</button>)
}
