/**
 * Placeholder media map for FinTechLab.
 *
 * Replace generated abstract motifs with real photography / video by
 * dropping files into the paths below and wiring them in `data/*`.
 *
 * /public/media/hero/           — optional hero stills
 * /public/media/research/       — research area previews (01–04)
 * /public/media/projects/       — project posters ({slug}.jpg)
 * /public/media/videos/         — muted loop videos ({slug}.mp4 / .webm)
 * /public/media/people/         — B&W editorial portraits ({id}.jpg)
 * /public/media/field-notes/    — field note covers
 *
 * Until real assets exist, the site uses CSS/Canvas abstract visualizations.
 */

export const mediaPaths = {
  projectPoster: (slug: string) => `/media/projects/${slug}.jpg`,
  projectVideo: (slug: string) => `/media/videos/${slug}.mp4`,
  videoPoster: (slug: string) => `/media/posters/${slug}.jpg`,
  personPortrait: (id: string) => `/media/people/${id}.jpg?v=20260902`,
  researchPreview: (id: string) => `/media/research/${id}.jpg`,
  fieldNote: (id: string) => `/media/field-notes/${id}.jpg`,
  partnerLogo: (id: string) => `/media/partners/${id}.png`,
  ogDefault: "/og/og-default.jpg",
} as const;
