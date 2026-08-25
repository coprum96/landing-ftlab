import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

/** Legacy /research → /research/human */
export default async function ResearchIndexRedirect({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) redirect("/en/research/human");
  redirect(`/${raw}/research/human`);
}
