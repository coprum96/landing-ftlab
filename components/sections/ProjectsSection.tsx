"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { InteractiveMedia } from "@/components/motion/InteractiveMedia";
import { AbstractMedia } from "@/components/visual/AbstractMedia";
import {
  featuredProjects,
  kindLabels,
  projects,
  statusLabels,
  statusLegend,
  type Project,
} from "@/data/projects";
import { mediaPaths } from "@/lib/media";
import { getLocalizedPath, type Dictionary, type Locale } from "@/lib/i18n";
import { useIsTouch, useReducedMotionPreferred } from "@/lib/hooks";
import { cx } from "@/lib/utils";

export function ProjectsSection({
  locale,
  dict,
  all = false,
}: {
  locale: Locale;
  dict: Dictionary;
  all?: boolean;
}) {
  const items = all ? projects : featuredProjects;

  return (
    <section id="projects" className="section-pad border-t border-white/10">
      <div className="editorial-grid">
        <div className="col-span-12 flex flex-wrap items-end justify-between gap-6 md:col-span-12">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.projects.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-section mt-6 max-w-4xl">
              {dict.projects.heading}
            </h2>
          </FadeIn>
          {!all ? (
            <Link
              href={getLocalizedPath(locale, "projects")}
              className="label-mono inline-flex min-h-11 items-center text-[12px] text-muted transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {dict.projects.viewAll} →
            </Link>
          ) : null}
        </div>

        <details className="col-span-12 mt-8 max-w-xl">
          <summary className="label-mono cursor-pointer list-none text-[12px] text-muted underline decoration-white/20 underline-offset-4 marker:content-none [&::-webkit-details-marker]:hidden">
            {dict.projects.statusLegend}
          </summary>
          <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[13px] text-muted">
            {statusLegend.map((entry) => (
              <li key={entry.status}>
                <span className="text-ink/90">
                  {statusLabels[entry.status][locale]}
                </span>
                <span className="text-muted"> — </span>
                <span>{entry.meaning[locale]}</span>
              </li>
            ))}
          </ul>
        </details>

        <div className="col-span-12 mt-16 grid grid-cols-1 gap-8 md:mt-24 md:grid-cols-12 md:gap-6">
          {items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              locale={locale}
              dict={dict}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  locale,
  dict,
  index,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  index: number;
}) {
  const touch = useIsTouch();
  const reduced = useReducedMotionPreferred();

  const span =
    project.layout === "full"
      ? "md:col-span-12"
      : project.layout === "wide"
        ? "md:col-span-8"
        : index % 3 === 0
          ? "md:col-span-7"
          : "md:col-span-5";

  const status = project.status ? statusLabels[project.status][locale] : null;
  const videoSrc =
    project.hasVideo && project.mediaType === "video"
      ? mediaPaths.projectVideo(project.videoSlug ?? project.slug)
      : undefined;
  const videoPosterSrc = project.videoSlug
    ? mediaPaths.videoPoster(project.videoSlug)
    : project.hasVideo
      ? mediaPaths.videoPoster(project.slug)
      : undefined;

  const poster = project.hasPoster ? (
    <div
      className={cx(
        "relative w-full",
        project.layout === "full" ? "aspect-[21/9]" : "aspect-[16/10]",
      )}
    >
      <Image
        src={mediaPaths.projectPoster(project.slug)}
        alt={project.title[locale]}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 70vw"
      />
    </div>
  ) : videoPosterSrc ? (
    <div
      className={cx(
        "relative w-full",
        project.layout === "full" ? "aspect-[21/9]" : "aspect-[16/10]",
      )}
    >
      <Image
        src={videoPosterSrc}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 70vw"
        aria-hidden
      />
      <div className="absolute inset-0 flex items-end p-5">
        <span className="label-mono text-[10px] text-ink/70">
          {kindLabels[project.kind][locale]}
        </span>
      </div>
    </div>
  ) : (
    <AbstractMedia
      motif={project.motif}
      className={cx(
        "w-full",
        project.layout === "full" ? "aspect-[21/9]" : "aspect-[16/10]",
      )}
      label={project.title[locale]}
    >
      <div className="absolute inset-0 flex items-end p-5">
        <span className="label-mono text-[10px] text-ink/70">
          {kindLabels[project.kind][locale]}
        </span>
      </div>
    </AbstractMedia>
  );

  return (
    <article className={cx("group col-span-full min-w-0", span)}>
      <Link
        href={getLocalizedPath(locale, `projects/${project.slug}`)}
        className="block min-w-0"
      >
        <InteractiveMedia
          cursor={videoSrc ? "play" : "view"}
          videoSrc={videoSrc}
          className="w-full"
          poster={poster}
        >
          {poster}
        </InteractiveMedia>

        <div
          data-card-meta
          className={cx(
            "mt-5 flex flex-wrap items-center gap-3 label-mono text-[12px] text-muted transition-transform duration-500 ease-out",
            !touch && !reduced && "group-hover:-translate-y-[3px]",
          )}
        >
          <span>{project.number}</span>
          {status ? (
            <>
              <span className="text-accent">/</span>
              <span
                className={cx(
                  project.status === "planned" ||
                    project.status === "in-development"
                    ? "text-muted"
                    : "text-ink/85",
                )}
              >
                {status}
              </span>
            </>
          ) : null}
          {project.year ? (
            <span className="md:ml-auto">{project.year}</span>
          ) : null}
        </div>
        <h3
          className={cx(
            "mt-3 max-w-2xl text-[clamp(24px,3vw,40px)] font-medium leading-[1.05] tracking-[-0.03em] transition-transform duration-500 ease-out",
            !touch && !reduced && "group-hover:-translate-y-[3px]",
          )}
        >
          {project.title[locale]}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {project.description[locale]}
        </p>
        <p
          data-card-arrow
          className={cx(
            "label-mono mt-5 inline-flex min-h-11 items-center gap-2 text-[12px] text-ink/85 transition-transform duration-300 ease-out",
            !touch && !reduced && "group-hover:translate-x-[7px]",
          )}
        >
          {dict.projects.explore}
          <span aria-hidden>→</span>
        </p>
      </Link>
    </article>
  );
}
