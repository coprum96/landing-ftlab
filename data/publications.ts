export type Localized = { en: string; ru: string };

export type PublicationType =
  | "journal"
  | "conference"
  | "dataset"
  | "working"
  | "patent"
  | "book";

export type Publication = {
  id: string;
  year: number;
  type: PublicationType;
  researchAreaId?: string;
  title: Localized;
  authors: string;
  venue: Localized;
  href?: string;
  note?: Localized;
  hasPreview?: boolean;
};

/**
 * Only items with clear authorship from supplied publication lists.
 * BE Guide 2026 is excluded (external context).
 */
export const publications: Publication[] = [
  {
    id: "pub-bank-employee-portrait-2026",
    year: 2026,
    type: "journal",
    researchAreaId: "protective-behavioral-technologies",
    title: {
      en: "Psychological Portrait of a Bank Employee: From Vulnerability to Resilience under Financial Fraud",
      ru: "Психологический портрет сотрудника банка: от уязвимости к устойчивости в условиях финансового мошенничества",
    },
    authors: "Medyanik O.V., Kuznetsov S.V., Medyanik A.I., Gasymov E.Sh.",
    venue: {
      en: "Review of Pedagogical Research, 8(3)",
      ru: "Обзор педагогических исследований, Т. 8, № 3",
    },
  },
  {
    id: "pub-tosunyan-medyanik-2026",
    year: 2026,
    type: "journal",
    researchAreaId: "regulatory-analytics",
    title: {
      en: "Behavioral Economics and Financial Security: Psychological Mechanisms of Vulnerability and Trust",
      ru: "Поведенческая экономика и финансовая безопасность: психологические механизмы уязвимости и доверия",
    },
    authors: "Tosunyan G.A., Medyanik O.V.",
    venue: {
      en: "Vestnik of Saint Petersburg University. Economics, 42(2)",
      ru: "Вестник Санкт-Петербургского университета. Экономика, 42(2)",
    },
    note: {
      en: "IN PRESS — listed as in publication process in the supplied bibliography.",
      ru: "В ПЕЧАТИ — в предоставленном списке трудов указано как «в процессе публикации».",
    },
  },
  {
    id: "pub-golden-detector-2025",
    year: 2025,
    type: "patent",
    researchAreaId: "protective-behavioral-technologies",
    title: {
      en: "Interactive Training Program in Financial Fraud Prevention: Golden Detector Simulator",
      ru: "Программа интерактивного обучения защите от финансового мошенничества и социальной инженерии. Тренажёр-симулятор «Золотой Детектор»",
    },
    authors: "Medyanik O.V., Medyanik S.I.",
    venue: {
      en: "Software registration certificate 2025696334",
      ru: "Свидетельство о регистрации программы для ЭВМ 2025696334",
    },
  },
  {
    id: "pub-financial-suggestion-2025",
    year: 2025,
    type: "journal",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Propensity to Financial Suggestion: Neuropsychological and Psychophysiological Factors",
      ru: "Склонность к финансовой суггестии: нейропсихологические и психофизиологические факторы",
    },
    authors: "Medyanik O.V., Shoshina I.I., Legostaeva N.I., Medyanik S.I.",
    venue: {
      en: "Russian Psychological Journal, 22(2), 227–248",
      ru: "Российский психологический журнал, Т. 22, № 2, с. 227–248",
    },
    href: "https://www.researchgate.net/publication/395064038_Psihofiziologiceskie_aspekty_sklonnosti_k_finansovoj_suggestii_i_vozmoznye_algoritmy_protivodejstvia",
  },
  {
    id: "pub-comparative-manipulation-2025",
    year: 2025,
    type: "journal",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Comparative Analysis of Psychological Mechanisms of Manipulative Influence in Street and Telephone Financial Fraud",
      ru: "Компаративный анализ психологических механизмов манипулятивного воздействия в уличном и телефонном финансовом мошенничестве",
    },
    authors: "Medyanik O.V.",
    venue: {
      en: "Theory of State and Law, 3(45), 344–360",
      ru: "Теория государства и права, № 3(45), с. 344–360",
    },
  },
  {
    id: "pub-conceptual-model-fraud-2025",
    year: 2025,
    type: "conference",
    researchAreaId: "digital-victimology",
    title: {
      en: "Conceptual Model of Financial Fraud across Communication Environments",
      ru: "Концептуальная модель финансового мошенничества в различных коммуникационных средах",
    },
    authors: "Medyanik O.V.",
    venue: {
      en: "Ananyev Readings — 2025",
      ru: "Ананьевские чтения — 2025",
    },
  },
  {
    id: "pub-protection-strategies-2024",
    year: 2024,
    type: "journal",
    researchAreaId: "protective-behavioral-technologies",
    title: {
      en: "Psychological Strategies of Russians’ Protection from Suggestive Financial Influence: Cluster Analysis",
      ru: "Психологические стратегии защиты россиян от суггестивного финансового воздействия: кластерный анализ",
    },
    authors: "Medyanik O.V.",
    venue: {
      en: "Herald of Vyatka State University, 1(151), 129–148",
      ru: "Вестник Вятского государственного университета, № 1(151), с. 129–148",
    },
    href: "https://vestnik43.ru/assets/mgr/docs/vyatsu/151(1)2024/14.-medyanik.pdf",
  },
  {
    id: "pub-cyberfraud-victims-2024",
    year: 2024,
    type: "journal",
    researchAreaId: "digital-victimology",
    title: {
      en: "Victims of Cyber Fraudsters: From Credulity to Exposure",
      ru: "Жертвы кибермошенников: от доверчивости к разоблачению",
    },
    authors: "Medyanik O.V., Legostaeva N.I., Medyanik S.I.",
    venue: {
      en: "Diary of Science, 11(95)",
      ru: "Дневник науки, № 11(95)",
    },
  },
  {
    id: "pub-dual-symbiosis-2024",
    year: 2024,
    type: "conference",
    researchAreaId: "digital-victimology",
    title: {
      en: "Dual Symbiosis of Digital Financial Technologies and Cyber Fraud",
      ru: "Дуальный симбиоз цифровых финансовых технологий и кибермошенничества",
    },
    authors: "Legostaeva N.I., Medyanik O.V.",
    venue: {
      en: "Digital Technologies and Law (Kazan)",
      ru: "Цифровые технологии и право (Казань)",
    },
  },
  {
    id: "pub-financial-anxiety-db-2023",
    year: 2023,
    type: "patent",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Database for Assessing Consumer Financial Anxiety (Financial Anxiety)",
      ru: "База данных для оценки финансовой тревожности потребителей (Financial Anxiety)",
    },
    authors: "Medyanik O.V., Zelenchuk I.V.",
    venue: {
      en: "Database registration certificate 2023620674",
      ru: "Свидетельство о регистрации базы данных 2023620674",
    },
  },
  {
    id: "pub-insurance-behavior-db-2023",
    year: 2023,
    type: "patent",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Database for Assessing Insurance Behavior (Insurance Behavior Assessment)",
      ru: "База данных для оценки страхового поведения (Insurance Behavior Assessment)",
    },
    authors: "Medyanik O.V., Zelenchuk I.V.",
    venue: {
      en: "Database registration certificate 2023624637",
      ru: "Свидетельство о регистрации базы данных 2023624637",
    },
  },
  {
    id: "pub-fintech-user-behavior-2022",
    year: 2022,
    type: "patent",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Program for Determining Types of User Financial Behavior (Fintech User Behavior)",
      ru: "Программа для определения типов финансового поведения пользователей (Fintech User Behavior)",
    },
    authors: "Medyanik O.V., Zelenchuk I.V.",
    venue: {
      en: "Software registration certificate 2022667946",
      ru: "Свидетельство о регистрации программы для ЭВМ 2022667946",
    },
  },
  {
    id: "pub-neuropsychology-suggestion-2025",
    year: 2025,
    type: "book",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Neuropsychology of Financial Suggestion",
      ru: "Нейропсихология финансового внушения",
    },
    authors: "Medyanik O.V., Shoshina I.I.",
    venue: {
      en: "LitRes",
      ru: "ЛитРес",
    },
    href: "https://www.litres.ru/book/olga-viktorovna-medyanik/neyropsihologiya-finansovogo-vnusheniya-71980084/",
  },
  {
    id: "pub-communication-victims-2025",
    year: 2025,
    type: "book",
    researchAreaId: "protective-behavioral-technologies",
    title: {
      en: "Communicating with Victims of Financial Suggestion: Guidelines and Workshop for Bank Staff",
      ru: "Общение с жертвами финансового внушения: учебно-методические рекомендации и практикум для банковских сотрудников",
    },
    authors: "Medyanik O.V., Nizovskikh N.A.",
    venue: {
      en: "LitRes",
      ru: "ЛитРес",
    },
    href: "https://www.litres.ru/book/olga-viktorovna-medy/obschenie-s-zhertvami-finansovogo-vnusheniya-uchebno-71556292/",
  },
];
