import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import {lab, labBrandName} from "@/data/lab";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type LegalKey = "privacy" | "personalData" | "terms" | "researchDisclaimer";

type Props = {
  params: Promise<{ locale: string }>;
};

function pageConfig(key: LegalKey) {
  const path =
    key === "privacy"
      ? "privacy"
      : key === "personalData"
        ? "personal-data"
        : key === "researchDisclaimer"
          ? "research-disclaimer"
          : "terms";
  return { key, path };
}

export function makeLegalPage(legalKey: LegalKey) {
  const { path } = pageConfig(legalKey);

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale: raw } = await params;
    if (!isLocale(raw)) return {};
    const dict = getDictionary(raw);
    const page = dict.legal[legalKey];
    return buildPageMetadata({
      locale: raw,
      path,
      title: `${page.title} — ${labBrandName(raw)}`,
      description: page.intro,
    });
  }

  async function Page({ params }: Props) {
    const { locale: raw } = await params;
    if (!isLocale(raw)) notFound();
    const locale = raw as Locale;
    const dict = getDictionary(locale);
    const page = dict.legal[legalKey];

    return (
      <div className="page-top">
        <section className="section-pad">
          <div className="editorial-grid">
            <div className="col-span-12 md:col-span-8">
              <FadeIn>
                <SectionLabel>/ {page.title}</SectionLabel>
                <h1 className="headline-section mt-6">{page.title}</h1>
                <p className="label-mono mt-4 text-[12px] text-accent">
                  {page.updated}
                </p>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                  {page.intro}
                </p>
                <div className="mt-12 space-y-10 border-t border-white/10 pt-10">
                  {page.sections.map((section) => (
                    <article key={section.h}>
                      <h2 className="text-xl font-medium tracking-[-0.02em] md:text-2xl">
                        {section.h}
                      </h2>
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted md:text-base">
                        {section.p}
                      </p>
                    </article>
                  ))}
                </div>
                <p className="label-mono mt-16 text-[12px] text-muted">
                  {lab.contactEmail}
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return { generateMetadata, Page };
}
