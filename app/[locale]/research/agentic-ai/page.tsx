import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgenticHeroSection } from "@/components/sections/agentic/AgenticHeroSection";
import { AgenticStakesSection } from "@/components/sections/agentic/AgenticStakesSection";
import { AgenticEcosystemSection } from "@/components/sections/agentic/AgenticEcosystemSection";
import { AgenticEcoJump } from "@/components/sections/agentic/AgenticEcoJump";
import { AgenticAutonomySection } from "@/components/sections/agentic/AgenticAutonomySection";
import { AgenticQuestionSection } from "@/components/sections/agentic/AgenticQuestionSection";
import { AgenticCycleSection } from "@/components/sections/agentic/AgenticCycleSection";
import { AgenticArchitectureSection } from "@/components/sections/agentic/AgenticArchitectureSection";
import { AgenticResearchAreasSection } from "@/components/sections/agentic/AgenticResearchAreasSection";
import { AgenticThreatSection } from "@/components/sections/agentic/AgenticThreatSection";
import { AgenticHorizonCompactSection } from "@/components/sections/agentic/AgenticHorizonCompactSection";
import { AgenticCloseSection } from "@/components/sections/agentic/AgenticCloseSection";
import {
  getDictionary,
  getLocalizedPath,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: "research/agentic-ai",
    title: `${dict.pages.agenticAi.title} - FinTechLab / SPbU`,
    description: dict.pages.agenticAi.supporting,
  });
}

/**
 * Agentic AI in Finance - compressed flagship narrative.
 * Hero → Why now → Map → Transition → Method → Architecture →
 * Priority fronts → Threat → Horizon → Close/CTA
 */
export default async function AgenticAiResearchPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const humanHref = getLocalizedPath(locale, "research/human");
  const agenticHref = getLocalizedPath(locale, "research/agentic-ai");

  return (
    <div className="page-top">
      <AgenticHeroSection
        locale={locale}
        dict={dict}
        humanHref={humanHref}
        agenticHref={agenticHref}
      />
      <AgenticStakesSection dict={dict} />
      <AgenticEcosystemSection locale={locale} dict={dict} />
      <AgenticAutonomySection dict={dict} />
      <AgenticQuestionSection dict={dict} />
      <AgenticCycleSection locale={locale} dict={dict} />
      <AgenticArchitectureSection locale={locale} dict={dict} />
      <AgenticResearchAreasSection locale={locale} dict={dict} />
      <AgenticThreatSection locale={locale} dict={dict} />
      <AgenticHorizonCompactSection locale={locale} dict={dict} />
      <AgenticCloseSection
        locale={locale}
        dict={dict}
        humanHref={humanHref}
      />

      <AgenticEcoJump label={dict.pages.agenticAi.ecosystem.jump} />
    </div>
  );
}
