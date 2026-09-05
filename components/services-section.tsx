import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { services } from '@/lib/site-data'

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-border bg-secondary py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 05" ghost="Services" title="Services" subtitle="What we make" />
        <div className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-2">{services.map((service, i) => (<Reveal key={service.name} delay={(i % 2) * 120} className="text-center sm:text-left"><span className="font-mono text-[0.7rem] tracking-[0.3em] text-accent">{`0${i + 1}`}</span><h3 className="mt-3 text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">{service.name}</h3><p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{service.description}</p></Reveal>))}</div>
      </div>
    </section>
  )
}
