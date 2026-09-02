import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { labBrandName } from "@/data/lab";

type Props = { params: Promise<{ locale: string }> };


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: "projects",
    title: `${dict.pages.projects.title} — ${labBrandName(raw)}`,
    description: dict.pages.projects.subtitle,
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="page-top">
      <div className="editorial-grid section-pad pb-0">
        <div className="col-span-12 md:col-span-9">
          <SectionLabel>/ {dict.nav.projects}</SectionLabel>
          <h1 className="headline-section mt-6">{dict.pages.projects.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            {dict.pages.projects.subtitle}
          </p>
        </div>
      </div>
      <ProjectsSection locale={locale} dict={dict} all />
      <ImpactSection locale={locale} dict={dict} />
    </div>
  );
}
