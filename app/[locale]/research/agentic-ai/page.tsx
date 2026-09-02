import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgenticHeroSection } from "@/components/sections/agentic/AgenticHeroSection";
import { AgenticBridgeSection } from "@/components/sections/agentic/AgenticBridgeSection";
import { AgenticMotionBand } from "@/components/sections/agentic/AgenticMotionBand";
import { AgenticTracksSection } from "@/components/sections/agentic/AgenticTracksSection";
import { AgenticPartnershipCta } from "@/components/sections/agentic/AgenticPartnershipCta";
import { AgenticOffersSection } from "@/components/sections/agentic/AgenticOffersSection";
import { AgenticSwarmSection } from "@/components/sections/agentic/AgenticSwarmSection";
import { AgenticControlLayerDemo } from "@/components/sections/agentic/AgenticControlLayerDemo";
import { AgenticAfsbSection } from "@/components/sections/agentic/AgenticAfsbSection";
import { AgenticCloseSection } from "@/components/sections/agentic/AgenticCloseSection";
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
    path: "research/agentic-ai",
    title: `${dict.pages.agenticAi.title} - ${labBrandName(raw)}`,
    description: dict.pages.agenticAi.supporting,
  });
}

/**
 * Agentic Financial Safety - focused research programme.
 * Hero → Bridge → Motion → Tracks → Mid CTA → Offers → Swarm → Control → Mid CTA → AFSB → Close
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
      <AgenticBridgeSection locale={locale} dict={dict} />
      <AgenticMotionBand dict={dict} />
      <AgenticTracksSection locale={locale} dict={dict} />
      <AgenticPartnershipCta dict={dict} />
      <AgenticOffersSection locale={locale} dict={dict} />
      <AgenticSwarmSection dict={dict} />
      <AgenticControlLayerDemo locale={locale} dict={dict} />
      <AgenticPartnershipCta dict={dict} id="partnership-after-demo" />
      <AgenticAfsbSection locale={locale} dict={dict} />
      <AgenticCloseSection
        locale={locale}
        dict={dict}
        humanHref={humanHref}
      />
    </div>
  );
}
