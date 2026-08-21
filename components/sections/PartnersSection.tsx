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
  const items = partners.filter((p) => p.featured && p.logo);

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

        <div className="col-span-12 mt-16 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((partner) => (
            <div
              key={partner.id}
              className="group flex min-h-[120px] flex-col justify-between bg-[#080808] px-5 py-5 transition-colors duration-300 hover:bg-[#0e0e0e]"
            >
              <div className="flex h-16 items-center">
                <Image
                  src={partner.logo!}
                  alt={partner.name[locale]}
                  width={220}
                  height={64}
                  unoptimized
                  className="h-10 w-auto max-w-[170px] object-contain object-left opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:h-11 sm:max-w-[190px]"
                />
              </div>
              <div className="mt-5">
                <p className="text-[13px] leading-snug text-ink/75">
                  {partner.name[locale]}
                </p>
                <p className="label-mono mt-2 text-[9px] text-muted">
                  {partner.relationLabel[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
