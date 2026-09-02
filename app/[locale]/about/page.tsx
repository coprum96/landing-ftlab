import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import {lab, labBrandName} from "@/data/lab";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    path: "about",
    title: `${dict.pages.about.title} — ${labBrandName(raw)}`,
    description: dict.pages.about.subtitle,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="page-top">
      <section className="section-pad">
        <div className="editorial-grid">
          <div className="col-span-12 md:col-span-8">
            <FadeIn>
              <SectionLabel>/ {dict.nav.about}</SectionLabel>
              <h1 className="headline-section mt-6">{dict.pages.about.title}</h1>
              <p className="mt-8 text-xl leading-relaxed text-muted md:text-2xl">
                {dict.pages.about.subtitle}
              </p>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                {dict.pages.about.body}
              </p>
              <div className="mt-12 space-y-6 border-t border-white/10 pt-10">
                <div>
                  <p className="label-mono text-[10px] text-accent">MISSION</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {lab.mission[locale]}
                  </p>
                </div>
                <div>
                  <p className="label-mono text-[10px] text-accent">
                    {lab.competenceCenter[locale]}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {lab.competenceFocus[locale]}
                  </p>
                </div>
                <p className="label-mono text-[11px] text-ink/70">
                  {lab.positioning[locale]} · {lab.roadmap[locale]}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <ImpactSection locale={locale} dict={dict} />
      <PartnersSection locale={locale} dict={dict} />
    </div>
  );
}
