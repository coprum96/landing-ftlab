import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { HtmlLang } from "@/components/layout/HtmlLang";
import { MediaCursor } from "@/components/motion/MediaCursor";
import { ConferenceAnnounce } from "@/components/sections/ConferenceAnnounce";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  return buildPageMetadata({
    locale: raw,
    title: dict.meta.title,
    description: dict.meta.description,
  });
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div lang={locale} data-locale={locale}>
      <HtmlLang locale={locale} />
      <SmoothScroll>
        <MediaCursor labels={dict.cursor} />
        <Header locale={locale} dict={dict} />
        <div className="pt-[var(--header-h)]">
          <ConferenceAnnounce locale={locale} dict={dict} />
          <PageTransition>
            <main id="main">{children}</main>
          </PageTransition>
          <Footer locale={locale} dict={dict} />
        </div>
      </SmoothScroll>
    </div>
  );
}
