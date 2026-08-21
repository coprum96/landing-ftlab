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
  value: number;
  label: Localized;
};

export type EvidenceQualitative = {
  id: string;
  label: Localized;
};

/**
 * Source-backed evidence only. Do not add unverified impact numbers.
 */
export const evidenceMetrics: EvidenceMetric[] = [
  {
    id: "research-pillars",
    // Source: data/research.ts → researchAreas.length
    source: "data/research.ts#researchAreas",
    value: researchAreas.length,
    label: {
      en: "Research programs",
      ru: "Исследовательские программы",
    },
  },
  {
    id: "publications",
    // Source: data/publications.ts → publications.length (catalogued outputs)
    source: "data/publications.ts#publications",
    value: publications.length,
    label: {
      en: "Catalogued research outputs",
      ru: "Каталогизированные результаты",
    },
  },
  {
    id: "registered-ip",
    // Source: publications with type "patent" (software / database certificates)
    source: "data/publications.ts (type: patent)",
    value: publications.filter((p) => p.type === "patent").length,
    label: {
      en: "Registered software / databases",
      ru: "Зарегистрированные ПО / базы данных",
    },
  },
  {
    id: "projects",
    // Source: data/projects.ts → projects.length
    source: "data/projects.ts#projects",
    value: projects.length,
    label: {
      en: "Active initiatives",
      ru: "Инициативы лаборатории",
    },
  },
  {
    id: "partners",
    // Source: data/partners.ts → partners named in lab materials
    source: "data/partners.ts#partners",
    value: partners.length,
    label: {
      en: "Named institutional collaborations",
      ru: "Названные институциональные сотрудничества",
    },
  },
  {
    id: "programs",
    // Source: data/programs.ts → educationPrograms
    source: "data/programs.ts#educationPrograms",
    value: educationPrograms.length,
    label: {
      en: "Education & training formats",
      ru: "Образовательные форматы",
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
