import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AbstractMedia } from "@/components/visual/AbstractMedia";
import {
  getProjectBySlug,
  kindLabels,
  projects,
  statusLabels,
} from "@/data/projects";
import { researchAreas } from "@/data/research";
import { mediaPaths } from "@/lib/media";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { labBrandName } from "@/data/lab";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const DEMO_LINKS: Record<string, string> = {
  "golden-detector": "https://gold-detector.vercel.app/",
};

export function generateStaticParams() {
  return projects.flatMap((project) =>
    (["en", "ru"] as const).map((locale) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildPageMetadata({
    locale,
    path: `projects/${slug}`,
    title: `${project.title[locale]} — ${labBrandName(locale)}`,
    description: project.description[locale],
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const area = researchAreas.find((a) => a.id === project.researchAreaId);
  const status = project.status ? statusLabels[project.status][locale] : null;
  const videoSlug = project.videoSlug ?? (project.hasVideo ? project.slug : null);
  const videoSrc = videoSlug ? mediaPaths.projectVideo(videoSlug) : null;
  const posterSrc = videoSlug ? mediaPaths.videoPoster(videoSlug) : null;
  const demoHref = DEMO_LINKS[project.slug];

  return (
    <div className="page-top">
      <section className="section-pad">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-8">
            <Link
              href={getLocalizedPath(locale, "projects")}
              className="label-mono text-[11px] text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              ← {dict.projectDetail.back}
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 label-mono text-[11px] text-muted">
              <span className="text-accent">{project.number}</span>
              <span>/</span>
              <span>{kindLabels[project.kind][locale]}</span>
              {project.year ? <span>· {project.year}</span> : null}
              {status ? (
                <span className="border border-white/20 px-2 py-1 text-ink/90">
                  {status}
                </span>
              ) : null}
            </div>
            <h1 className="headline-section mt-6 break-words">
              {project.title[locale]}
            </h1>
            {project.question ? (
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
                <span className="label-mono mb-3 block text-[10px] text-accent">
                  {dict.projectDetail.question}
                </span>
                {project.question[locale]}
              </p>
            ) : (
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
                {project.description[locale]}
              </p>
            )}
            {project.meta ? (
              <p className="label-mono mt-6 text-[11px] text-accent">
                {project.meta[locale]}
              </p>
            ) : null}
            {demoHref ? (
              <a
                href={demoHref}
                target="_blank"
                rel="noreferrer"
                className="label-mono mt-8 inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-[11px] transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {dict.projectDetail.demo}
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>

          <div className="col-span-12 mt-12 md:col-span-4 md:mt-16">
            {posterSrc ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/12">
                <Image
                  src={posterSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  aria-hidden
                />
              </div>
            ) : (
              <AbstractMedia
                motif={project.motif}
                className="aspect-[4/5] w-full"
                label={project.title[locale]}
              />
            )}
          </div>

          {project.overview ? (
            <div className="col-span-12 mt-16 max-w-3xl md:col-span-8">
              <SectionLabel>{dict.projectDetail.overview}</SectionLabel>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {project.overview[locale]}
              </p>
            </div>
          ) : null}

          {project.method?.length ? (
            <div className="col-span-12 mt-14 md:col-span-5">
              <SectionLabel>{dict.projectDetail.method}</SectionLabel>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {project.method.map((m) => (
                  <li key={m.en}>{m[locale]}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.output?.length ? (
            <div className="col-span-12 mt-14 md:col-span-5">
              <SectionLabel>{dict.projectDetail.output}</SectionLabel>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {project.output.map((o) => (
                  <li key={o.en}>→ {o[locale]}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.application ? (
            <div className="col-span-12 mt-14 max-w-2xl md:col-span-8">
              <SectionLabel>{dict.projectDetail.application}</SectionLabel>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                {project.application[locale]}
              </p>
            </div>
          ) : null}

          {videoSrc && posterSrc ? (
            <div className="col-span-12 mt-16 md:col-span-10">
              <SectionLabel>{dict.projectDetail.media}</SectionLabel>
              <div className="relative mt-6 aspect-video w-full overflow-hidden border border-white/12 bg-[#0c0c0c]">
                <video
                  className="h-full w-full object-cover"
                  src={videoSrc}
                  poster={posterSrc}
                  controls
                  muted
                  playsInline
                  preload="none"
                />
              </div>
            </div>
          ) : null}

          {area ? (
            <div className="col-span-12 mt-14">
              <p className="label-mono text-[10px] text-muted">
                {area.code} · {area.title[locale]}
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
