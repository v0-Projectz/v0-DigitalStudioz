'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '@/lib/site-data'

export function TestimonialBand({ image }: { image: string }) {
  const [index, setIndex] = useState(0)
  const item = testimonials[index]
  const go = (dir: number) => setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="parallax-fixed relative flex min-h-[70vh] items-center justify-center bg-band text-band-foreground"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="absolute inset-0 bg-scrim/75" />
      <div className="container-wide relative">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-accent">// Testimonials</span>
        <blockquote key={index} className="mx-auto mt-6 max-w-3xl animate-[fadeIn_0.5s_ease-out] text-center">
          <p className="text-balance text-2xl font-light leading-relaxed md:text-3xl">&ldquo;{item.text}&rdquo;</p>
          <footer className="mt-8 flex items-center justify-center gap-4">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image src={item.photo || '/placeholder.svg'} alt={item.author} fill className="object-cover" sizes="56px" />
            </span>
            <span className="text-left">
              <span className="block text-sm font-semibold uppercase tracking-[0.15em] text-band-foreground">{item.author}</span>
              <span className="block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-band-foreground/70">{item.role}</span>
            </span>
          </footer>
        </blockquote>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center border border-band-foreground/30 text-band-foreground transition-colors hover:border-accent hover:text-accent">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
            {testimonials.map((t, i) => (
              <button key={t.author} type="button" role="tab" aria-selected={i === index} aria-label={`Testimonial from ${t.author}`} onClick={() => setIndex(i)} className={`h-1.5 w-8 transition-colors ${i === index ? 'bg-accent' : 'bg-band-foreground/30'}`} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center border border-band-foreground/30 text-band-foreground transition-colors hover:border-accent hover:text-accent">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
