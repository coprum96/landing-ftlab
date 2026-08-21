export type Localized = { en: string; ru: string };

export const lab = {
  name: {
    en: "FinTechLab SPbU",
    ru: "FinTechLab СПбГУ",
  },
  fullName: {
    en: "Laboratory of Modern Financial Technologies, Saint Petersburg State University",
    ru: "Лаборатория современных финансовых технологий Санкт-Петербургского государственного университета",
  },
  founded: 2025,
  institution: {
    en: "Saint Petersburg State University",
    ru: "Санкт-Петербургский государственный университет",
  },
  /**
   * Public lab contact mailbox on ftlab.space.
   * Create/configure this address in Namecheap email (or your DNS mail provider).
   */
  contactEmail: "legal@ftlab.space",
  linkedInUrl: "https://www.linkedin.com/company/ftlab-space/",
  mission: {
    en: "Build a scientific and applied base for countering behavioral vulnerabilities in modern financial threats — integrating behavioral economics, neuroscience, digital victimology, and financial-security practice.",
    ru: "Формирование научной и прикладной базы для системного противодействия поведенческим уязвимостям человека в условиях современных финансовых угроз — через интеграцию поведенческой экономики, нейронауки, цифровой виктимологии и практики финансовой безопасности.",
  },
  positioning: {
    en: "Behavior × Finance × Technology × Security",
    ru: "Поведение × Финансы × Технологии × Безопасность",
  },
  competenceCenter: {
    en: "Competence Center “Behavioral Security in the Financial Sphere”",
    ru: "Центр компетенций «Поведенческая безопасность в финансовой сфере»",
  },
  competenceFocus: {
    en: "Building active behavioral immunity through controlled confrontation with threat in a safe environment — a behavioral inoculation approach.",
    ru: "Формирование активного поведенческого иммунитета через методологию «поведенческой вакцинации» — устойчивости к манипуляциям через контролируемое столкновение с угрозой в безопасной среде.",
  },
  roadmap: {
    en: "Roadmap 2025–2027",
    ru: "Дорожная карта 2025–2027",
  },
} as const;
