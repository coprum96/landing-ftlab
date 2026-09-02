import { partners } from "@/data/partners";
import { educationPrograms } from "@/data/programs";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { researchAreas } from "@/data/research";

export type Localized = { en: string; ru: string };

export type EvidenceMetric = {
  id: string;
  /** Developer note: where the number is derived from */
  source: string;
  /** Site path (without locale) for the catalogue behind this metric */
  hrefPath: string;
  value: number;
  label: Localized;
  definition: Localized;
};

export type EvidenceQualitative = {
  id: string;
  label: Localized;
};

/** ISO date — bump when catalogue contents change materially */
export const evidenceLastUpdated = "2026-09-02";

/**
 * Source-backed evidence only. Do not add unverified impact numbers.
 * Values are computed from structured site data so they stay consistent
 * with the linked catalogues.
 */
export const evidenceMetrics: EvidenceMetric[] = [
  {
    id: "research-pillars",
    source: "data/research.ts#researchAreas",
    hrefPath: "research/human",
    value: researchAreas.length,
    label: {
      en: "Research programs",
      ru: "Исследовательские программы",
    },
    definition: {
      en: "Count of research program areas defined in the lab catalogue.",
      ru: "Число исследовательских программ в каталоге лаборатории.",
    },
  },
  {
    id: "publications",
    source: "data/publications.ts#publications",
    hrefPath: "publications",
    value: publications.length,
    label: {
      en: "Catalogued research outputs",
      ru: "Каталогизированные результаты",
    },
    definition: {
      en: "All catalogued publications, reports and registered outputs on this site.",
      ru: "Все каталогизированные публикации, отчёты и зарегистрированные результаты на сайте.",
    },
  },
  {
    id: "registered-ip",
    source: "data/publications.ts (type: patent)",
    hrefPath: "publications",
    value: publications.filter((p) => p.type === "patent").length,
    label: {
      en: "Registered software / databases",
      ru: "Зарегистрированные ПО / базы данных",
    },
    definition: {
      en: "Catalogued outputs marked as registered software or database certificates.",
      ru: "Каталогизированные результаты с типом зарегистрированного ПО или базы данных.",
    },
  },
  {
    id: "projects",
    source: "data/projects.ts#projects",
    hrefPath: "projects",
    value: projects.length,
    label: {
      en: "Active initiatives",
      ru: "Инициативы лаборатории",
    },
    definition: {
      en: "Count of initiatives listed in the projects catalogue.",
      ru: "Число инициатив в каталоге проектов.",
    },
  },
  {
    id: "partners",
    source: "data/partners.ts#partners",
    hrefPath: "#partners",
    value: partners.length,
    label: {
      en: "Named institutional collaborations",
      ru: "Названные институциональные сотрудничества",
    },
    definition: {
      en: "Institutions named in laboratory materials on this site.",
      ru: "Институции, названные в материалах лаборатории на этом сайте.",
    },
  },
  {
    id: "programs",
    source: "data/programs.ts#educationPrograms",
    hrefPath: "education",
    value: educationPrograms.length,
    label: {
      en: "Education & training formats",
      ru: "Образовательные форматы",
    },
    definition: {
      en: "Count of education and training formats in the programmes catalogue.",
      ru: "Число образовательных форматов в каталоге программ.",
    },
  },
];

export const evidenceQualitative: EvidenceQualitative[] = [
  {
    id: "peer-reviewed",
    label: {
      en: "Peer-reviewed research",
      ru: "Рецензируемые исследования",
    },
  },
  {
    id: "behavioral-experiments",
    label: {
      en: "Applied behavioral experiments",
      ru: "Прикладные поведенческие эксперименты",
    },
  },
  {
    id: "registered-software",
    label: {
      en: "Registered research software",
      ru: "Зарегистрированное исследовательское ПО",
    },
  },
  {
    id: "institutional",
    label: {
      en: "Institutional collaborations",
      ru: "Институциональные сотрудничества",
    },
  },
];
