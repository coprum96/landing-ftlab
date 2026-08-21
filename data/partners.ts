export type Localized = { en: string; ru: string };

export type PartnerCategory =
  | "regulator"
  | "association"
  | "financial"
  | "industry"
  | "academic";

export type PartnerRelation =
  | "collaboration"
  | "program-collaboration"
  | "ecosystem";

export type Partner = {
  id: string;
  name: Localized;
  category: PartnerCategory;
  relation: PartnerRelation;
  relationLabel: Localized;
  /** Logo under /public/media/partners */
  logo?: string;
  featured?: boolean;
  note?: Localized;
};

/**
 * Only organizations with clear source support.
 * Logos included only when assets exist.
 * Relationship labels stay conservative (see content-review.md).
 */
export const partners: Partner[] = [
  {
    id: "bank-of-russia",
    name: {
      en: "Bank of Russia",
      ru: "Банк России",
    },
    category: "regulator",
    relation: "collaboration",
    relationLabel: {
      en: "Regulatory collaboration",
      ru: "Регуляторное сотрудничество",
    },
    logo: "/media/partners/bank-of-russia.png",
    featured: true,
    note: {
      en: "Appears across research, education, and antifraud content workstreams.",
      ru: "Упоминается в исследовательских, образовательных и антифрод-направлениях.",
    },
  },
  {
    id: "association-of-banks-of-russia",
    name: {
      en: "Association of Banks of Russia",
      ru: "Ассоциация банков России",
    },
    category: "association",
    relation: "collaboration",
    relationLabel: {
      en: "Industry association collaboration",
      ru: "Сотрудничество с банковской ассоциацией",
    },
    logo: "/media/partners/association-of-banks-of-russia.png",
    featured: true,
  },
  {
    id: "ingosstrakh",
    name: {
      en: "Ingosstrakh",
      ru: "Ингосстрах",
    },
    category: "financial",
    relation: "program-collaboration",
    relationLabel: {
      en: "Program collaboration",
      ru: "Программное сотрудничество",
    },
    logo: "/media/partners/ingosstrakh.png",
    featured: true,
    note: {
      en: "Named among organizations linked to the Behavioral Economics master’s pilot.",
      ru: "Указан среди организаций, связанных с пилотной магистратурой по поведенческой экономике.",
    },
  },
  {
    id: "alfa-bank",
    name: {
      en: "Alfa-Bank",
      ru: "Альфа-Банк",
    },
    category: "financial",
    relation: "collaboration",
    relationLabel: {
      en: "Collaboration",
      ru: "Сотрудничество",
    },
    logo: "/media/partners/alfa-bank.png",
    featured: true,
  },
  {
    id: "wildberries-russ",
    name: {
      en: "Wildberries & Russ (RVB)",
      ru: "ООО «РВБ» (Wildberries & Russ)",
    },
    category: "industry",
    relation: "program-collaboration",
    relationLabel: {
      en: "Program collaboration",
      ru: "Программное сотрудничество",
    },
    logo: "/media/partners/wildberries-russ.png",
    featured: true,
  },
  {
    id: "spbmtsb",
    name: {
      en: "Saint Petersburg International Mercantile Exchange (SpbMTSB)",
      ru: "СПбМТСБ",
    },
    category: "industry",
    relation: "ecosystem",
    relationLabel: {
      en: "Named ecosystem partner",
      ru: "Указан в экосистеме партнёров",
    },
  },
  {
    id: "reso-garantiya",
    name: {
      en: "RESO-Garantiya",
      ru: "СПАО «Ресо-Гарантия»",
    },
    category: "financial",
    relation: "program-collaboration",
    relationLabel: {
      en: "Program collaboration",
      ru: "Программное сотрудничество",
    },
  },
  {
    id: "rosfinmonitoring",
    name: {
      en: "Rosfinmonitoring",
      ru: "Росфинмониторинг",
    },
    category: "regulator",
    relation: "collaboration",
    relationLabel: {
      en: "Regulatory collaboration",
      ru: "Регуляторное сотрудничество",
    },
  },
];

export const partnerCategoryLabels: Record<PartnerCategory, Localized> = {
  regulator: { en: "Regulators", ru: "Регуляторы" },
  association: { en: "Associations", ru: "Ассоциации" },
  financial: { en: "Financial institutions", ru: "Финансовые организации" },
  industry: { en: "Industry", ru: "Индустрия" },
  academic: { en: "Academic", ru: "Академия" },
};
