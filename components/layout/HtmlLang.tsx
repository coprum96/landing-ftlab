"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

export function HtmlLang({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  useEffect(() => {
    const segment = pathname?.split("/").filter(Boolean)[0];
    const next = isLocale(segment || "") ? segment : locale;
    document.documentElement.lang = next;
  }, [locale, pathname]);

  return null;
}
