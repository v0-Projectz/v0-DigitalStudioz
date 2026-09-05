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
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      /* @ts-expect-error polymorphic ref */
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(0.9rem)',
      }}
      className={`transition-[opacity,transform] duration-500 ease-out ${className ?? ''}`}
    >
      {children}
    </Tag>
  )
}
