export type Localized = { en: string; ru: string };

export type FieldNote = {
  id: string;
  date: string;
  category: Localized;
  title: Localized;
  excerpt: Localized;
  motif: "notes" | "conference" | "data" | "collab";
};

/**
 * Editorial field notes grounded in verified lab milestones — not fabricated events.
 */
export const fieldNotes: FieldNote[] = [
  {
    id: "note-01",
    date: "2025-12-17",
    category: { en: "Registered technology", ru: "Зарегистрированная технология" },
    title: {
      en: "Golden Detector training software registered",
      ru: "Зарегистрирован тренажёр «Золотой Детектор»",
    },
    excerpt: {
      en: "Software certificate 2025696334 records the interactive simulator for financial-fraud and social-engineering defense. Full deployment is planned for October 2026.",
      ru: "Свидетельство 2025696334 фиксирует интерактивный симулятор защиты от финансового мошенничества и социальной инженерии. Полное развёртывание планируется на октябрь 2026.",
    },
    motif: "data",
  },
  {
    id: "note-02",
    date: "2025-09-05",
    category: { en: "Research forum", ru: "Научный форум" },
    title: {
      en: "Cognitive Shield round table supported at SPbU",
      ru: "Круглый стол «Когнитивный щит» поддержан в СПбГУ",
    },
    excerpt: {
      en: "SPbU scientific-event support for the round table on social-engineering counterpractice in banking (through 2026).",
      ru: "Поддержка научного мероприятия СПбГУ для круглого стола о практике противодействия социальной инженерии в банковской сфере (до 2026).",
    },
    motif: "conference",
  },
  {
    id: "note-03",
    date: "2025-01-01",
    category: { en: "Laboratory", ru: "Лаборатория" },
    title: {
      en: "FinTechLab SPbU established as interdisciplinary center",
      ru: "FinTechLab СПбГУ как междисциплинарный центр",
    },
    excerpt: {
      en: "Laboratory materials date formation to 2025 — linking behavioral economics, information security, and financial technology at SPbU.",
      ru: "В материалах лаборатории образование центра датируется 2025 годом — на стыке поведенческой экономики, информационной безопасности и финансовых технологий СПбГУ.",
    },
    motif: "notes",
  },
  {
    id: "note-04",
    date: "2024-01-01",
    category: { en: "Implementation", ru: "Внедрение" },
    title: {
      en: "Cognitive Shield methodology moves into credit organizations",
      ru: "Методика «Когнитивный щит» входит в кредитные организации",
    },
    excerpt: {
      en: "Team materials describe methodological rollout for social-engineering defense across multiple credit organizations and regions.",
      ru: "В материалах команды описано методическое внедрение защиты от социальной инженерии в ряде кредитных организаций и регионов.",
    },
    motif: "collab",
  },
];
