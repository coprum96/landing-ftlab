import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ResearchAreas } from "@/components/sections/ResearchAreas";
import { MethodsSection } from "@/components/sections/MethodsSection";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: "research",
    title: `${dict.pages.research.title} — FinTechLab / SPbU`,
    description: dict.pages.research.subtitle,
  });
}

export default async function ResearchPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="page-top">
      <div className="editorial-grid section-pad pb-0">
        <div className="col-span-12 md:col-span-9">
          <SectionLabel>/ {dict.nav.research}</SectionLabel>
          <h1 className="headline-section mt-6">{dict.pages.research.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            {dict.pages.research.subtitle}
          </p>
        </div>
      </div>
      <ResearchAreas locale={locale} dict={dict} />
      <MethodsSection locale={locale} dict={dict} />
    </div>
  );
}
