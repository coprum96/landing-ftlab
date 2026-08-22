export type Localized = { en: string; ru: string };

export type PartnerCategory =
  | "regulator"
  | "association"
  | "financial"
  | "industry"
  | "security"
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
 * Organizations named in laboratory materials / ecosystem.
 * Logos optimized for dark UI (transparent PNG).
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
      en: "Association of Russian Banks (ARB)",
      ru: "Ассоциация российских банков (АРБ)",
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
    id: "kaspersky",
    name: {
      en: "Kaspersky",
      ru: "Лаборатория Касперского",
    },
    category: "security",
    relation: "ecosystem",
    relationLabel: {
      en: "Cybersecurity ecosystem",
      ru: "Кибербезопасная экосистема",
    },
    logo: "/media/partners/kaspersky.png",
    featured: true,
  },
  {
    id: "positive-technologies",
    name: {
      en: "Positive Technologies",
      ru: "Positive Technologies",
    },
    category: "security",
    relation: "ecosystem",
    relationLabel: {
      en: "Cybersecurity ecosystem",
      ru: "Кибербезопасная экосистема",
    },
    logo: "/media/partners/positive-technologies.png",
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
    id: "rwb",
    name: {
      en: "RWB",
      ru: "RWB",
    },
    category: "industry",
    relation: "program-collaboration",
    relationLabel: {
      en: "Program collaboration",
      ru: "Программное сотрудничество",
    },
    logo: "/media/partners/rwb.png",
    featured: true,
    note: {
      en: "International technology company (rwb.ru).",
      ru: "Международная технологическая компания (rwb.ru).",
    },
  },
  {
    id: "iarep",
    name: {
      en: "IAREP",
      ru: "IAREP",
    },
    category: "academic",
    relation: "collaboration",
    relationLabel: {
      en: "International research association",
      ru: "Международная исследовательская ассоциация",
    },
    logo: "/media/partners/iarep.png",
    featured: true,
    note: {
      en: "International Association for Research in Economic Psychology.",
      ru: "Международная ассоциация исследований в области экономической психологии.",
    },
  },
  {
    id: "spbmtsb",
    name: {
      en: "SPIMEX (SpbMTSB)",
      ru: "СПбМТСБ",
    },
    category: "industry",
    relation: "ecosystem",
    relationLabel: {
      en: "Named ecosystem partner",
      ru: "Указан в экосистеме партнёров",
    },
    logo: "/media/partners/spbmtsb.png",
    featured: true,
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
    logo: "/media/partners/reso-green.png",
    featured: true,
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
    logo: "/media/partners/rosfinmonitoring.png",
    featured: true,
  },
  {
    id: "yandex",
    name: {
      en: "Yandex",
      ru: "Яндекс",
    },
    category: "industry",
    relation: "ecosystem",
    relationLabel: {
      en: "Named ecosystem partner",
      ru: "Указан в экосистеме партнёров",
    },
    logo: "/media/partners/yandex.png",
    featured: true,
  },
  {
    id: "ozon",
    name: {
      en: "Ozon",
      ru: "Ozon",
    },
    category: "industry",
    relation: "ecosystem",
    relationLabel: {
      en: "Named ecosystem partner",
      ru: "Указан в экосистеме партнёров",
    },
    logo: "/media/partners/ozon.png",
    featured: true,
  },
];

export const partnerCategoryLabels: Record<PartnerCategory, Localized> = {
  regulator: { en: "Regulators", ru: "Регуляторы" },
  association: { en: "Associations", ru: "Ассоциации" },
  financial: { en: "Financial institutions", ru: "Финансовые организации" },
  industry: { en: "Industry", ru: "Индустрия" },
  security: { en: "Cybersecurity", ru: "Кибербезопасность" },
  academic: { en: "Academic", ru: "Академия" },
};
