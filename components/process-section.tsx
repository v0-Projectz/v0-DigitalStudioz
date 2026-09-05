import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { process } from '@/lib/site-data'

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-20 border-t border-border bg-background py-24 md:py-32">
      <div className="container-wide">
        <SectionHeading index="// 04" ghost="Process" title="Process" subtitle="How we work" />
        <div className="flex flex-col border-t border-border">
          {process.map((item, i) => (
            <Reveal
              key={item.step}
              delay={i * 90}
              className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-3 border-b border-border py-8 transition-colors hover:border-accent/50 md:grid-cols-[6rem_18rem_1fr] md:gap-x-10 md:py-10"
            >
              <span className="font-mono text-sm text-accent transition-colors md:text-base">{item.step}</span>
              <h3 className="text-3xl font-bold uppercase leading-none tracking-tighter text-foreground transition-colors group-hover:text-accent md:text-4xl">{item.title}</h3>
              <p className="col-span-2 max-w-xl text-pretty leading-relaxed text-muted-foreground md:col-span-1">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
