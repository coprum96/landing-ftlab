import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { FieldVideoSection } from "@/components/sections/FieldVideoSection";
import { ResearchAreas } from "@/components/sections/ResearchAreas";
import { MethodsSection } from "@/components/sections/MethodsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { EvidenceSection } from "@/components/sections/EvidenceSection";
import { ExperimentsSection } from "@/components/sections/ExperimentsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { PeopleSection } from "@/components/sections/PeopleSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { FieldNotesSection } from "@/components/sections/FieldNotesSection";
import { ConferenceAnnounce } from "@/components/sections/ConferenceAnnounce";
import { DecisionNetworkSection } from "@/components/sections/DecisionNetworkSection";
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

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <FieldVideoSection dict={dict} />
      <ConferenceAnnounce locale={locale} dict={dict} />
      <ResearchAreas locale={locale} dict={dict} />
      <MethodsSection locale={locale} dict={dict} />
      <DecisionNetworkSection dict={dict} />
      <ProjectsSection locale={locale} dict={dict} />
      <EvidenceSection locale={locale} dict={dict} />
      <ImpactSection locale={locale} dict={dict} />
      <ExperimentsSection locale={locale} dict={dict} />
      <EducationSection locale={locale} dict={dict} />
      <ManifestoSection dict={dict} />
      <PublicationsSection locale={locale} dict={dict} featuredOnly />
      <PeopleSection locale={locale} dict={dict} />
      <FieldNotesSection locale={locale} dict={dict} />
      <PartnersSection locale={locale} dict={dict} />
      <CollaborationSection dict={dict} />
    </>
  );
}
