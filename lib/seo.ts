import type { Metadata } from "next";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { mediaPaths } from "@/lib/media";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.ftlab.space";

export function getSiteUrl() {
  return SITE_URL;
}

export function absoluteUrl(path = "") {
  const clean = path.replace(/^\/+/, "");
  return clean ? `${SITE_URL}/${clean}` : SITE_URL;
}

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  image = mediaPaths.ogDefault,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const localizedPath = path
    ? `/${locale}/${path.replace(/^\/+/, "")}`
    : `/${locale}`;
  const enPath = path ? `/en/${path.replace(/^\/+/, "")}` : "/en";
  const ruPath = path ? `/ru/${path.replace(/^\/+/, "")}` : "/ru";
  const canonical = absoluteUrl(localizedPath);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl(enPath),
        ru: absoluteUrl(ruPath),
        "x-default": absoluteUrl(enPath),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ru" ? "ru_RU" : "en_US",
      url: canonical,
      title,
      description,
      siteName: locale === "ru" ? "Лаборатория современных финансовых технологий" : "FinTechLab",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function localeHtmlLang(locale: Locale) {
  return locale;
}

export { defaultLocale };
