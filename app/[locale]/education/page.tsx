import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EducationSection } from "@/components/sections/EducationSection";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: "education",
    title: `${dict.pages.education.title} — FinTechLab / SPbU`,
    description: dict.pages.education.subtitle,
  });
}

export default async function EducationPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="page-top">
      <div className="editorial-grid section-pad pb-0">
        <div className="col-span-12 md:col-span-9">
          <SectionLabel>/ {dict.nav.education}</SectionLabel>
          <h1 className="headline-section mt-6">{dict.pages.education.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            {dict.pages.education.subtitle}
          </p>
        </div>
      </div>
      <EducationSection locale={locale} dict={dict} all />
    </div>
  );
}
