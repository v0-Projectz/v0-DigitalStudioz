'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'span'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Observe the parent, not the element itself: the clip-path wipe collapses
    // the element's painted area to zero, which makes IntersectionObserver
    // report a 0 ratio and never fire on the clipped node.
    const target = el.parentElement ?? el
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )
    io.observe(target)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      /* @ts-expect-error polymorphic ref */
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: show ? 1 : 0,
        clipPath: show ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
        transform: show ? 'translateY(0)' : 'translateY(0.5rem)',
      }}
      className={`transition-[opacity,clip-path,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${className ?? ''}`}
    >
      {children}
    </Tag>
  )
}
