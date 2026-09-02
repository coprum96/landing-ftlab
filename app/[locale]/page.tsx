import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { FieldVideoSection } from "@/components/sections/FieldVideoSection";
import { ChooseDirectionSection } from "@/components/sections/ChooseDirectionSection";
import { EvidenceSection } from "@/components/sections/EvidenceSection";
import { PeopleSection } from "@/components/sections/PeopleSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { CollaborationSection } from "@/components/sections/CollaborationSection";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.title,
    description: dict.meta.description,
  });
}

/**
 * Homepage = lab identity + research gateway.
 * Human track: /research/human
 * Agentic track: /research/agentic-ai
 */
export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <FieldVideoSection dict={dict} />
      <ChooseDirectionSection locale={locale} dict={dict} />
      <EvidenceSection locale={locale} dict={dict} />
      <ManifestoSection dict={dict} />
      <PeopleSection locale={locale} dict={dict} />
      <PartnersSection locale={locale} dict={dict} />
      <CollaborationSection locale={locale} dict={dict} />
    </>
  );
}
