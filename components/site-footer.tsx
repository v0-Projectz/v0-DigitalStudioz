import { nav, studio } from '@/lib/site-data'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        {/* Brand lockup */}
        <div className="flex flex-col gap-5">
          <a href="#top" className="flex items-baseline gap-2" aria-label={`${studio.name} home`}>
            <span className="text-base font-semibold uppercase tracking-[0.35em]">DIGITAL</span>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent">Studioz</span>
          </a>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">{studio.tagline} — sound, film, motion, and brand built under one vision.</p>
          <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {studio.availability}
          </span>
        </div>

        {/* Mini sitemap */}
        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h2 className="mb-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent-dim">Sitemap</h2>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="w-fit text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">{item.label}</a>
          ))}
        </nav>

        {/* Contact / social */}
        <div className="flex flex-col gap-3">
          <h2 className="mb-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-accent-dim">Contact</h2>
          <a href={`mailto:${studio.email}`} className="w-fit text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">{studio.email}</a>
          <a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="w-fit text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">Instagram {studio.instagramHandle}</a>
          <a href={studio.youtube} target="_blank" rel="noopener noreferrer" className="w-fit text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">YouTube {studio.youtubeHandle}</a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-wide flex items-center justify-center py-6">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">© {year} {studio.name} — {studio.artist}</p>
        </div>
      </div>
    </footer>
  )
}
