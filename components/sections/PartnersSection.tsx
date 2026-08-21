import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/RevealText";
import { partners } from "@/data/partners";
import type { Dictionary, Locale } from "@/lib/i18n";

export function PartnersSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const featured = partners.filter((p) => p.featured);
  const rest = partners.filter((p) => !p.featured);

  return (
    <section id="partners" className="section-pad border-t border-white/10">
      <div className="editorial-grid">
        <div className="col-span-12 md:col-span-7">
          <FadeIn>
            <div data-reveal-number>
              <SectionLabel>{dict.partners.label}</SectionLabel>
            </div>
            <h2 data-reveal-title className="headline-display mt-6">
              {dict.partners.heading}
            </h2>
            <p
              data-reveal-block
              className="mt-6 max-w-lg text-sm leading-relaxed text-muted"
            >
              {dict.partners.supporting}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-12 mt-16 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((partner) => (
            <div
              key={partner.id}
              className="flex min-h-[140px] flex-col justify-between bg-[#080808] px-6 py-6"
            >
              <div className="flex h-12 items-center">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name[locale]}
                    width={180}
                    height={48}
                    className="h-10 w-auto max-w-[180px] object-contain opacity-80"
                  />
                ) : (
                  <span className="text-sm font-medium tracking-[-0.02em]">
                    {partner.name[locale]}
                  </span>
                )}
              </div>
              <div className="mt-6">
                {partner.logo ? (
                  <p className="text-sm text-ink/80">{partner.name[locale]}</p>
                ) : null}
                <p className="label-mono mt-2 text-[10px] text-muted">
                  {partner.relationLabel[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {rest.length > 0 ? (
          <div className="col-span-12 mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {rest.map((partner) => (
              <div key={partner.id} className="min-w-[180px]">
                <p className="text-sm text-ink/80">{partner.name[locale]}</p>
                <p className="label-mono mt-1 text-[10px] text-muted">
                  {partner.relationLabel[locale]}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
