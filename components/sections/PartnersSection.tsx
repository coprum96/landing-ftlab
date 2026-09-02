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
    <section
      id="partners"
      className="section-anchor section-pad border-t border-white/10"
    >
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

        <ul className="col-span-12 mt-12 grid list-none grid-cols-2 gap-px bg-white/10 p-0 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5">
          {items.map((partner, index) => (
            <li
              key={partner.id}
              className="flex min-h-[112px] flex-col justify-between bg-[#080808] px-5 py-5"
            >
              <div className="flex h-14 items-center sm:h-16">
                <Image
                  src={partner.logo!}
                  alt={partner.name[locale]}
                  width={220}
                  height={64}
                  unoptimized
                  loading={index < 5 ? "eager" : "lazy"}
                  className="h-10 w-auto max-w-[170px] object-contain object-left opacity-90 sm:h-11 sm:max-w-[190px]"
                />
              </div>
              <div className="mt-4">
                <p className="text-[13px] leading-snug text-ink/75">
                  {partner.name[locale]}
                </p>
                <p className="label-mono mt-2 text-[10px] text-muted">
                  {partner.relationLabel[locale]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
