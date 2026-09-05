export const studio = {
  name: 'DigitalStudioz',
  artist: 'Jon Beatz',
  tagline: 'Digital Creative Studio',
  location: 'Remote / Worldwide',
  email: 'hello@digitalstudioz.com',
  instagram: 'https://instagram.com/digitalstudioz',
  instagramHandle: '@digitalstudioz',
  youtube: 'https://youtube.com/@digitalstudioz',
  youtubeHandle: '@digitalstudioz',
  availability: 'Available for projects — 2026',
}

export const heroSlides = [
  {
    kicker: '// 01',
    title: 'DigitalStudioz',
    subtitle: 'Pixels with purpose',
    image: '/images/hero-studio.png',
    alt: 'Digital creative studio at night with glowing screens of code and design tools',
  },
  {
    kicker: '// 02',
    title: 'DigitalStudioz',
    subtitle: 'Every frame counts',
    image: '/images/hero-video.png',
    alt: 'Film production set with a cinema camera under cool cyan practical lighting',
  },
  {
    kicker: '// 03',
    title: 'DigitalStudioz',
    subtitle: 'Identity is a signal',
    image: '/images/hero-brand.png',
    alt: 'Brand and motion design workspace with typography prints under a cyan lamp',
  },
]

export const stats = [
  { value: 240, suffix: '+', label: 'Projects Shipped' },
  { value: 68, suffix: '', label: 'Brands Served' },
  { value: 19, suffix: '', label: 'Product Launches' },
  { value: 11, suffix: 'yr', label: 'In the Craft' },
]

export type GalleryImage = { src: string; alt: string }
export type Discipline = {
  name: string
  category: string
  image: string
  description?: string
  href?: string
  gallery?: GalleryImage[]
}

export const disciplines: Discipline[] = [
  {
    name: 'Sound & Music',
    category: 'Audio / Scoring',
    image: '/images/reel-production.png',
    description: 'Original scores, beats, and full arrangements produced in-house — from the first synth patch to the final stem.',
    href: 'https://digitalstudioz.com/work/sound-and-music',
    gallery: [
      { src: '/images/reel-production.png', alt: 'Synthesizer and audio interface with glowing cyan meters' },
      { src: '/images/reel-mixing.png', alt: 'Mixing console with faders glowing cool cyan' },
      { src: '/images/reel-liveset.png', alt: 'Vocalist tracking at a studio microphone under a cyan spotlight' },
    ],
  },
  {
    name: 'Mix & Master',
    category: 'Audio Engineering',
    image: '/images/reel-mixing.png',
    description: 'Streaming-ready mixes and masters that stay wide, punchy, and loud without ever clipping.',
    href: 'https://digitalstudioz.com/work/mix-and-master',
    gallery: [
      { src: '/images/reel-mixing.png', alt: 'Mixing console with rows of faders glowing cyan' },
      { src: '/images/reel-production.png', alt: 'Audio interface and outboard gear with cyan meters' },
    ],
  },
  {
    name: 'Live Capture',
    category: 'Recording / Sessions',
    image: '/images/reel-liveset.png',
    description: 'Live band and vocal sessions tracked in a single room for raw takes and maximum feel.',
    href: 'https://digitalstudioz.com/work/live-capture',
  },
  {
    name: 'Video & Film',
    category: 'Direction / Edit',
    image: '/images/reel-video.png',
    description: 'Direction, shooting, and edit under one roof — cool-toned coverage cut tight to the track.',
    href: 'https://digitalstudioz.com/work/video-and-film',
    gallery: [
      { src: '/images/reel-video.png', alt: 'Video editing suite with footage timelines glowing cyan' },
      { src: '/images/hero-video.png', alt: 'Cinema camera on a rig under cool cyan practical lighting' },
    ],
  },
  {
    name: 'Motion & 3D',
    category: 'Animation / Visuals',
    image: '/images/reel-motion.png',
    description: 'Real-time render pipeline for titles, 3D, and animated systems that stay on-brand across every ratio.',
    href: 'https://digitalstudioz.com/work/motion-and-3d',
    gallery: [
      { src: '/images/reel-motion.png', alt: 'Abstract wireframe and rendered geometry glowing electric cyan' },
      { src: '/images/hero-brand.png', alt: 'Motion design workspace with typography under a cyan lamp' },
    ],
  },
  {
    name: 'Brand & Web',
    category: 'Identity / Digital',
    image: '/images/reel-brand.png',
    description: 'Identity systems, sites, and motion graphics designed to move as one cohesive signal.',
    href: 'https://digitalstudioz.com/work/brand-and-web',
    gallery: [
      { src: '/images/reel-brand.png', alt: 'Brand and web design flatlay lit with cyan accent light' },
      { src: '/images/hero-brand.png', alt: 'Logo grid and typography prints pinned under cyan light' },
      { src: '/images/hero-studio.png', alt: 'Studio workstation with glowing screens of design tools' },
    ],
  },
  {
    name: 'Photography',
    category: 'Stills / Campaign',
    image: '/images/reel-photo.png',
    description: 'Cool-toned stills campaigns shot in-studio — one strobe, one backdrop, a full look book per session.',
    href: 'https://digitalstudioz.com/work/photography',
  },
  {
    name: 'Voice & Dialogue',
    category: 'VO / Podcast',
    image: '/images/reel-voice.png',
    description: 'Booth setup, recording, and edit workflow for voiceover and long-form conversation.',
    href: 'https://digitalstudioz.com/work/voice-and-dialogue',
  },
  {
    name: 'Live Events',
    category: 'Stage / Show',
    image: '/images/reel-stage.png',
    description: 'Show packages for touring acts — stage visuals, walk-on stings, and lighting-ready motion sets.',
    href: 'https://digitalstudioz.com/work/live-events',
    gallery: [
      { src: '/images/reel-stage.png', alt: 'Crowd facing a stage washed in cool cyan concert lighting' },
      { src: '/images/reel-liveset.png', alt: 'Performer at a microphone under a cyan spotlight' },
    ],
  },
]

export type WorkTag = 'Music' | 'Video' | 'Motion' | 'Brand' | 'Web'
export const workTags: WorkTag[] = ['Music', 'Video', 'Motion', 'Brand', 'Web']

export type Work = {
  id: string
  name: string
  category: string
  description: string
  image: string
  tags: WorkTag[]
  href?: string
  gallery?: GalleryImage[]
}

export const works: Work[] = [
  {
    id: '01',
    name: 'Neon Runtime',
    category: 'Brand & Web / Motion',
    description: 'Full identity, site, and animated launch package for a dev-tools startup — logo, type, and build in one sprint.',
    image: '/images/reel-brand.png',
    tags: ['Brand', 'Web', 'Motion'],
    href: 'https://digitalstudioz.com/work/neon-runtime',
    gallery: [
      { src: '/images/reel-brand.png', alt: 'Neon Runtime brand and web design system' },
      { src: '/images/hero-brand.png', alt: 'Neon Runtime logo grid and typography exploration' },
      { src: '/images/reel-motion.png', alt: 'Neon Runtime animated launch visuals' },
    ],
  },
  {
    id: '02',
    name: 'City Lights',
    category: 'Video / Direction',
    description: 'Concept, shoot, and edit for a lead single. Cool-toned night visuals cut tight to the beat.',
    image: '/images/reel-video.png',
    tags: ['Video', 'Music'],
    href: 'https://digitalstudioz.com/work/city-lights',
    gallery: [
      { src: '/images/reel-video.png', alt: 'City Lights edit suite with footage timelines' },
      { src: '/images/hero-video.png', alt: 'City Lights night shoot with a cinema camera' },
    ],
  },
  {
    id: '03',
    name: 'Analog Warmth',
    category: 'Mix & Master',
    description: 'Restored and re-mastered a back catalog for streaming — wide, punchy, and loud without clipping.',
    image: '/images/reel-mixing.png',
    tags: ['Music'],
    href: 'https://digitalstudioz.com/work/analog-warmth',
    gallery: [
      { src: '/images/reel-mixing.png', alt: 'Analog Warmth mastering console' },
      { src: '/images/reel-production.png', alt: 'Analog Warmth outboard gear and interface' },
    ],
  },
  {
    id: '04',
    name: 'Live at the Vault',
    category: 'Session / Capture',
    description: 'Tracked a live band and vocals in a single room. Raw takes, minimal edits, maximum feel.',
    image: '/images/reel-liveset.png',
    tags: ['Music', 'Video'],
    href: 'https://digitalstudioz.com/work/live-at-the-vault',
  },
  {
    id: '05',
    name: 'Signal',
    category: 'Motion & 3D',
    description: 'Real-time render pipeline and an animated intro system for an independent label launch.',
    image: '/images/reel-motion.png',
    tags: ['Motion', 'Brand'],
    href: 'https://digitalstudioz.com/work/signal',
    gallery: [
      { src: '/images/reel-motion.png', alt: 'Signal animated intro system frames' },
      { src: '/images/hero-brand.png', alt: 'Signal label identity exploration' },
    ],
  },
  {
    id: '06',
    name: 'Frontlit',
    category: 'Photography / Campaign',
    description: 'A cool-toned stills campaign shot in-studio — one strobe, one backdrop, a full look book from a single session.',
    image: '/images/reel-photo.png',
    tags: ['Brand', 'Video'],
    href: 'https://digitalstudioz.com/work/frontlit',
  },
  {
    id: '07',
    name: 'The Wire',
    category: 'Voice / Podcast',
    description: 'Branding, booth setup, and edit workflow for a weekly interview show — from cold open to published feed.',
    image: '/images/reel-voice.png',
    tags: ['Music', 'Brand'],
    href: 'https://digitalstudioz.com/work/the-wire',
  },
  {
    id: '08',
    name: 'Mainstage',
    category: 'Live Events / Show',
    description: 'Show package for a touring act — stage visuals, walk-on stings, and a synced lighting-ready motion set.',
    image: '/images/reel-stage.png',
    tags: ['Motion', 'Video'],
    href: 'https://digitalstudioz.com/work/mainstage',
    gallery: [
      { src: '/images/reel-stage.png', alt: 'Mainstage stage visuals under cyan concert lighting' },
      { src: '/images/reel-liveset.png', alt: 'Mainstage performer under a cyan spotlight' },
    ],
  },
  {
    id: '09',
    name: 'Nightshift',
    category: 'Sound Design / Trailer',
    description: 'Original score and sound design for a game trailer — tension built in the low end, released on the cut.',
    image: '/images/work-nightshift.png',
    tags: ['Music', 'Motion'],
    href: 'https://digitalstudioz.com/work/nightshift',
    gallery: [
      { src: '/images/work-nightshift.png', alt: 'Sound-design control room with a modular synth and cyan waveforms at night' },
      { src: '/images/reel-production.png', alt: 'Audio interface and outboard gear glowing cyan' },
    ],
  },
  {
    id: '10',
    name: 'Glasshouse',
    category: 'Web / Product Design',
    description: 'A component-driven design system and marketing site for a SaaS product, built to scale across teams.',
    image: '/images/work-glasshouse.png',
    tags: ['Web', 'Brand'],
    href: 'https://digitalstudioz.com/work/glasshouse',
    gallery: [
      { src: '/images/work-glasshouse.png', alt: 'Web product design system across two monitors glowing cyan' },
      { src: '/images/hero-studio.png', alt: 'Studio workstation with glowing screens of design tools' },
    ],
  },
  {
    id: '11',
    name: 'Afterglow',
    category: 'Motion / Title Sequence',
    description: 'A broadcast title sequence built in a real-time render pipeline — glowing type systems that flex to any ratio.',
    image: '/images/work-afterglow.png',
    tags: ['Motion', 'Video'],
    href: 'https://digitalstudioz.com/work/afterglow',
    gallery: [
      { src: '/images/work-afterglow.png', alt: 'Motion title sequence with glowing cyan light streaks and 3D type' },
      { src: '/images/reel-motion.png', alt: 'Abstract wireframe geometry glowing electric cyan' },
    ],
  },
  {
    id: '12',
    name: 'Broadcast',
    category: 'Video / Live Stream',
    description: 'A repeatable multi-camera live-stream package — switching, lower-thirds, and stings for a weekly show.',
    image: '/images/work-broadcast.png',
    tags: ['Video', 'Motion'],
    href: 'https://digitalstudioz.com/work/broadcast',
    gallery: [
      { src: '/images/work-broadcast.png', alt: 'Live-stream broadcast studio with a switcher and cyan preview monitors' },
      { src: '/images/reel-video.png', alt: 'Video editing suite with footage timelines glowing cyan' },
    ],
  },
  {
    id: '13',
    name: 'Monogram',
    category: 'Brand / Identity',
    description: 'An identity refresh for a design consultancy — a flexible monogram system with print and digital rules.',
    image: '/images/work-monogram.png',
    tags: ['Brand'],
    href: 'https://digitalstudioz.com/work/monogram',
    gallery: [
      { src: '/images/work-monogram.png', alt: 'Brand identity flatlay of logo studies under cyan side light' },
      { src: '/images/hero-brand.png', alt: 'Logo grid and typography prints pinned under cyan light' },
    ],
  },
  {
    id: '14',
    name: 'Resonance',
    category: 'Music / Album',
    description: 'Full production, mix, and master for a debut album — arranged, tracked, and finished under one roof.',
    image: '/images/work-resonance.png',
    tags: ['Music'],
    href: 'https://digitalstudioz.com/work/resonance',
    gallery: [
      { src: '/images/work-resonance.png', alt: 'Music production console and vinyl record with cyan meters' },
      { src: '/images/reel-mixing.png', alt: 'Mixing console with faders glowing cool cyan' },
    ],
  },
]

export const services = [
  { name: 'Sound & Music', description: 'Original scores, beats, and full arrangements crafted around your project.' },
  { name: 'Mixing & Mastering', description: 'Streaming-ready mixes that translate across every system and speaker.' },
  { name: 'Video & Film', description: 'Direction, shooting, and editing — from product films to full narratives.' },
  { name: 'Brand, Web & Motion', description: 'Identity systems, sites, and motion graphics that all move as one.' },
]

export const news = [
  { title: 'Studio Goes Remote-First', meta: '· Studio / Space ·', body: 'DigitalStudioz now runs as a distributed collective — the same craft, more reach, with collaborators and clients worldwide.' },
  { title: 'New Motion & 3D Pipeline', meta: '· Motion / Tooling ·', body: 'A real-time render and 3D pipeline now lives in-house, so sound, video, and motion ship under one vision and one workflow.' },
]

export const quotes = [
  { text: 'If it does not move you in the first eight seconds, it will not move anyone.', author: 'Jon Beatz' },
  { text: 'Design for the feeling first, the pixel second.', author: 'Studio Rule 01' },
  { text: 'The best effect is a good idea.', author: 'Studio Rule 07' },
]

export const process = [
  {
    step: '01',
    title: 'Discover',
    body: 'We open with the idea and the outcome — a short, sharp brief that aligns sound, picture, and brand before a single frame is made.',
    image: '/images/reel-brand.png',
    imageAlt: 'Brand and motion design workspace under a cyan lamp',
    scroll: true,
    detail: [
      'Discovery is where most projects are won or lost, so we spend real time here. We start with a working session — sometimes an hour, sometimes a day — to pull the idea out of your head and onto the table. What is the outcome? Who is it for? What does success actually look like when this ships?',
      'From there we write a one-page brief that every discipline works against. It fixes the tone, the references, the deliverables, and the guardrails. Sound, picture, motion, and brand all read from the same document, so nothing drifts as the project grows.',
      'We also audit what already exists — your catalog, your brand assets, your past launches — and flag what to keep, what to retire, and what to rebuild. By the end of discovery you have a plan you can approve with confidence, a schedule, and a shared vocabulary the whole team uses for the rest of the build. No surprises, no scope creep, no guessing.',
      'Deliverables from this phase: creative brief, moodboard, reference cut, project schedule, and a fixed definition of done.',
    ],
  },
  {
    step: '02',
    title: 'Direct',
    body: 'Concept, references, and a creative direction that ties every discipline to one signal, so the work reads as intentional end to end.',
    image: '/images/hero-brand.png',
    imageAlt: 'Typography prints and a logo grid pinned on a wall under cyan light',
    detail: [
      'Direction turns the brief into a look and a feel. We build the visual and sonic language — palette, type, motion rules, and a reference cut — so everyone can see and hear where the work is going before we commit budget to production.',
      'You get one clear direction to react to, not ten watered-down options. We would rather commit hard to a single strong idea and refine it than hedge across safe ones.',
    ],
  },
  {
    step: '03',
    title: 'Produce',
    body: 'We build it — tracking, shooting, editing, animating, and coding in-house, iterating fast against the direction.',
    panels: [
      { label: 'Sound', text: 'We track, arrange, and score in-house — beats, live instruments, and sound design built around the cut, not bolted on after.', image: '/images/reel-production.png', imageAlt: 'Synthesizer and audio interface with glowing cyan meters' },
      { label: 'Picture', text: 'Direction, shooting, and edit under one roof. Cool-toned coverage, tight assembly, and a color pass that matches the brand.', image: '/images/reel-video.png', imageAlt: 'Video editing suite with footage timelines glowing cyan' },
      { label: 'Motion', text: 'Real-time render pipeline for titles, 3D, and animated systems that stay on-brand across every platform and aspect ratio.', image: '/images/reel-motion.png', imageAlt: 'Abstract wireframe and rendered geometry glowing electric cyan' },
    ],
  },
  {
    step: '04',
    title: 'Deliver',
    body: 'Final masters, exports, and launch-ready systems, packaged and documented so the work ships clean across every platform.',
    image: '/images/reel-mixing.png',
    imageAlt: 'Audio mixing console with faders glowing cool cyan',
    detail: [
      'Delivery is a checklist, not an afterthought. Every master is exported to spec, named to convention, and packaged with the source files so you own the work outright.',
      'We hand off with a short guide — where each file goes, how to post it, and how to keep the system consistent as you make more. When launch day comes, everything is already in place.',
    ],
  },
]

export const testimonials = [
  { text: 'DigitalStudioz took a vague idea and returned a launch that felt inevitable. Sound, film, and brand all moved as one — it did not feel like three vendors, it felt like one studio.', author: 'Maya Okonkwo', role: 'Founder, Neon Runtime', photo: '/images/author-1.png' },
  { text: 'They committed to a single strong direction and made it undeniable. The edit hit in the first eight seconds and never let go. We have never had a rollout land this cleanly.', author: 'Daniel Reyes', role: 'Creative Director, City Lights', photo: '/images/author-2.png' },
  { text: 'Every master arrived to spec, named right, documented. We shipped across six platforms in a day with zero back-and-forth. Rare, and exactly what you want from a studio.', author: 'Priya Nair', role: 'Label Lead, Signal', photo: '/images/author-3.png' },
]

export const marqueeWords = [
  'Sound & Music', 'Video & Film', 'Motion & 3D', 'Brand & Identity', 'Web & Product', 'Mix & Master', 'Art Direction', 'Creative Code',
]

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Reel', href: '#reel' },
  { label: 'Works', href: '#works' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]
