import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

/** Legacy /agentic-ai → /research/agentic-ai */
export default async function AgenticAiLegacyRedirect({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) redirect("/en/research/agentic-ai");
  redirect(`/${raw}/research/agentic-ai`);
}
