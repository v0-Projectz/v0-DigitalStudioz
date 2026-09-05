'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  variant = 'wipe',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'span'
  variant?: 'wipe' | 'fade'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Observe an unclipped node: the wipe applies clip-path to `el`, which
    // collapses its paint rect to zero and makes IntersectionObserver report
    // ratio 0. The parent is never clipped, so it triggers reliably.
    const target = el.parentElement ?? el
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )
    io.observe(target)
    return () => io.disconnect()
  }, [])
  const hidden: CSSProperties =
    variant === 'wipe'
      ? { clipPath: 'inset(0 0 100% 0)', opacity: 0, transform: 'translateY(1.25rem)' }
      : { opacity: 0, transform: 'translateY(1.5rem)' }
  const shown: CSSProperties = { clipPath: 'inset(0 0 0 0)', opacity: 1, transform: 'translateY(0)' }
  return (
    <Tag
      /* @ts-expect-error polymorphic ref */
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, ...(show ? shown : hidden) }}
      className={`transition-[clip-path,opacity,transform] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${className ?? ''}`}
    >
      {children}
    </Tag>
  )
}
