import { SiteHeader } from '@/components/site-header'
import { HeroSlider } from '@/components/hero-slider'
import { AboutSection } from '@/components/about-section'
import { StatsBand } from '@/components/stats-band'
import { DisciplineMarquee } from '@/components/discipline-marquee'
import { ReelSection } from '@/components/reel-section'
import { WorksSection } from '@/components/works-section'
import { ProcessSection } from '@/components/process-section'
import { ParallaxBand } from '@/components/parallax-band'
import { TestimonialBand } from '@/components/testimonial-band'
import { ServicesSection } from '@/components/services-section'
import { NewsSection } from '@/components/news-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { LightboxProvider } from '@/components/lightbox'
import { BackToTop } from '@/components/back-to-top'
import { quotes } from '@/lib/site-data'

export default function Home() {
  return (
    <LightboxProvider>
      <div className="relative min-h-screen bg-background">
        {/* Persistent spec-sheet left rule */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-8 z-40 hidden w-px bg-border xl:block">
          <span className="absolute top-28 left-2 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-muted-foreground [writing-mode:vertical-rl]">DigitalStudioz &mdash; Edition 02</span>
          <span className="absolute bottom-28 left-2 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-accent-dim [writing-mode:vertical-rl]">// Spec Sheet</span>
        </div>
        <SiteHeader />
        <main>
          <HeroSlider />
          <AboutSection />
          <StatsBand />
          <DisciplineMarquee />
          <ReelSection />
          <WorksSection />
          <ParallaxBand image="/images/reel-mixing.png" quote={quotes[1].text} author={quotes[1].author} height="md" />
          <ProcessSection />
          <ServicesSection />
          <NewsSection />
          <TestimonialBand image="/images/hero-brand.png" />
          <ContactSection />
          <ParallaxBand image="/images/hero-studio.png" />
        </main>
        <SiteFooter />
        <BackToTop />
      </div>
    </LightboxProvider>
  )
}
