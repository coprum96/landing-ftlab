import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { ResearchAreas } from "@/components/sections/ResearchAreas";
import { MethodsSection } from "@/components/sections/MethodsSection";
import { DecisionNetworkSection } from "@/components/sections/DecisionNetworkSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperimentsSection } from "@/components/sections/ExperimentsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { FieldNotesSection } from "@/components/sections/FieldNotesSection";
import { TrackSwitcher } from "@/components/ui/TrackSwitcher";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { labBrandName } from "@/data/lab";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: "research/human",
    title: `${dict.pages.research.title} - ${labBrandName(raw)}`,
    description: dict.pages.research.subtitle,
  });
}

/**
 * Human Financial Behavior universe.
 */
export default async function HumanResearchPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const page = dict.pages.research;

  return (
    <div className="page-top">
      <section className="section-pad pb-10 md:pb-16">
        <div className="editorial-grid">
          <div className="col-span-12">
            <TrackSwitcher
              locale={locale}
              active="human"
              humanLabel={dict.chooseDirection.human.code}
              agenticLabel={dict.chooseDirection.agentic.code}
              humanHref={getLocalizedPath(locale, "research/human")}
              agenticHref={getLocalizedPath(locale, "research/agentic-ai")}
            />
          </div>
          <div className="col-span-12 mt-10 md:col-span-10 md:mt-14">
            <FadeIn>
              <SectionLabel>{page.label}</SectionLabel>
              <h1 className="headline-section mt-6 max-w-5xl">{page.title}</h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
                {page.subtitle}
              </p>
              <p className="label-mono mt-8 text-[10px] tracking-[0.14em] text-ink/40">
                {page.meta}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <ResearchAreas locale={locale} dict={dict} />
      <MethodsSection locale={locale} dict={dict} />
      <DecisionNetworkSection dict={dict} />
      <ProjectsSection locale={locale} dict={dict} />
      <ExperimentsSection locale={locale} dict={dict} />
      <ImpactSection locale={locale} dict={dict} />
      <EducationSection locale={locale} dict={dict} />
      <PublicationsSection locale={locale} dict={dict} featuredOnly />
      <FieldNotesSection locale={locale} dict={dict} />
    </div>
  );
}
