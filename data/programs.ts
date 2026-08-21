export type Localized = { en: string; ru: string };

export type ProgramStatus =
  | "active"
  | "launching"
  | "in-development"
  | "recurring"
  | "pilot";

export type ProgramKind =
  | "masters"
  | "dop"
  | "online-course"
  | "training"
  | "campaign"
  | "community";

export type EducationProgram = {
  id: string;
  code: string;
  kind: ProgramKind;
  status?: ProgramStatus;
  title: Localized;
  description: Localized;
  audience?: Localized;
  href?: string;
  featured?: boolean;
};

export const programStatusLabels: Record<ProgramStatus, Localized> = {
  active: { en: "ACTIVE", ru: "АКТИВНО" },
  launching: { en: "LAUNCHING 2026", ru: "ЗАПУСК 2026" },
  "in-development": { en: "IN DEVELOPMENT", ru: "В РАЗРАБОТКЕ" },
  recurring: { en: "RECURRING", ru: "РЕГУЛЯРНО" },
  pilot: { en: "PILOT", ru: "ПИЛОТ" },
};

export const programKindLabels: Record<ProgramKind, Localized> = {
  masters: { en: "Master’s program", ru: "Магистратура" },
  dop: { en: "Additional education", ru: "ДОП" },
  "online-course": { en: "Online course", ru: "Онлайн-курс" },
  training: { en: "Training", ru: "Обучение / тренинг" },
  campaign: { en: "Campaign", ru: "Кампания" },
  community: { en: "Student initiative", ru: "Студенческая инициатива" },
};

export const educationPrograms: EducationProgram[] = [
  {
    id: "masters-behavioral-economics",
    code: "E/001",
    kind: "masters",
    status: "pilot",
    title: {
      en: "Behavioral Economics and Economic Psychology",
      ru: "Поведенческая экономика и экономическая психология",
    },
    description: {
      en: "SPbU master’s program; described as a Bank of Russia pilot project with banking and industry collaborators.",
      ru: "Магистратура СПбГУ; в материалах лаборатории — пилотный проект Банка России с банковскими и индустриальными участниками.",
    },
    href: "https://spbu.ru/postupayushchim/programms/magistratura/povedencheskaya-ekonomika-i-ekonomicheskaya-psikhologiya",
    featured: true,
  },
  {
    id: "masters-platform-economy",
    code: "E/002",
    kind: "masters",
    status: "active",
    title: {
      en: "Platform Economy",
      ru: "Платформенная экономика",
    },
    description: {
      en: "SPbU master’s program developed with regulatory and industry collaborators named in laboratory materials.",
      ru: "Магистратура СПбГУ, в материалах лаборатории — совместно с регуляторными и индустриальными участниками.",
    },
    href: "https://spbu.ru/postupayushchim/programms/magistratura/platformennaya-ekonomika",
    featured: true,
  },
  {
    id: "dop-behavioral-economics",
    code: "E/003",
    kind: "dop",
    status: "active",
    title: {
      en: "DOP: Behavioral Economics and Economic Psychology",
      ru: "ДОП «Поведенческая экономика и экономическая психология»",
    },
    description: {
      en: "Additional professional education track at SPbU.",
      ru: "Программа дополнительного образования СПбГУ.",
    },
    href: "https://spbu.ru/postupayushchim/programms/dopolnitelnyeprogrammy/povedencheskaya-ekonomika-i-ekonomicheskaya",
    featured: true,
  },
  {
    id: "dop-antifraud-remote",
    code: "E/004",
    kind: "dop",
    title: {
      en: "DOP: Antifraud Protection in Remote Banking Channels",
      ru: "ДОП «Антифрод-защита в дистанционном канале банков»",
    },
    description: {
      en: "Additional professional education focused on remote-channel antifraud.",
      ru: "Дополнительное образование по антифрод-защите в дистанционных каналах.",
    },
  },
  {
    id: "dop-nudge",
    code: "E/005",
    kind: "dop",
    status: "in-development",
    title: {
      en: "Network DOP: Behavioral Nudging in Finance",
      ru: "Сетевая ДОП «Поведенческое подталкивание в финансах (nudge)»",
    },
    description: {
      en: "In development with the Academy of Competency Development. Related materials also use the working title “Architect of Financial Choice / Architect of Nudges”.",
      ru: "В разработке с «Академией развития компетенций». В смежных материалах также встречается рабочее название «Архитектор финансового выбора / Архитектор Nudges».",
    },
  },
  {
    id: "course-cognitive-shield",
    code: "E/006",
    kind: "online-course",
    status: "launching",
    title: {
      en: "Cognitive Shield: Information Security in the Digital World",
      ru: "Когнитивный щит: информационная безопасность в цифровом мире",
    },
    description: {
      en: "Online course for first-year students: cyber threats, personal data, social networks, deepfakes, practical defense skills.",
      ru: "Онлайн-курс для студентов 1-го курса: киберугрозы, персональные данные, соцсети, дипфейки, практические навыки защиты.",
    },
    audience: {
      en: "All first-year students",
      ru: "Все студенты 1-го курса",
    },
    featured: true,
  },
  {
    id: "course-behavioral-security-finance",
    code: "E/007",
    kind: "online-course",
    status: "launching",
    title: {
      en: "Behavioral Security in the Financial Environment",
      ru: "Поведенческая безопасность в финансовой среде",
    },
    description: {
      en: "Online course on financial literacy, banking, credit, insurance, digital payments, and case analysis.",
      ru: "Онлайн-курс о финансовой грамотности, банках, кредитах, страховании, цифровых платежах и разборе кейсов.",
    },
    audience: {
      en: "Year 1–2 students",
      ru: "Студенты 1–2 курсов",
    },
    featured: true,
  },
  {
    id: "training-cognitive-shield-banks",
    code: "E/008",
    kind: "training",
    status: "recurring",
    title: {
      en: "Cognitive Shield for Bank Employees",
      ru: "«Когнитивный щит» для сотрудников банков",
    },
    description: {
      en: "Practice program on countering social engineering, delivered with banking association and Bank of Russia structures.",
      ru: "Практическая программа противодействия социальной инженерии совместно с банковской ассоциацией и структурами Банка России.",
    },
    featured: true,
  },
  {
    id: "cbr-online-behavioral",
    code: "E/009",
    kind: "online-course",
    title: {
      en: "Online courses for the Bank of Russia",
      ru: "Онлайн-курсы для Банка России",
    },
    description: {
      en: "Courses on psychological aspects of financial fraud perception/counteraction and behavioral economics for regulator staff.",
      ru: "Курсы о психологических аспектах восприятия и противодействия финансовому мошенничеству и поведенческой экономике для сотрудников регулятора.",
    },
  },
  {
    id: "nudge-camp",
    code: "E/010",
    kind: "training",
    title: {
      en: "NUDGE CAMP 2.0",
      ru: "NUDGE CAMP 2.0",
    },
    description: {
      en: "Summer school immersing young researchers in the science of decision-making.",
      ru: "Летняя школа с погружением молодых исследователей в науку о принятии решений.",
    },
  },
  {
    id: "cyber-ambassadors",
    code: "E/011",
    kind: "community",
    title: {
      en: "Cyber Ambassadors of SPbU",
      ru: "Кибер-амбассадоры СПбГУ",
    },
    description: {
      en: "Student leadership initiative in behavioral and cyber security.",
      ru: "Студенческая лидерская инициатива в области поведенческой и кибербезопасности.",
    },
  },
  {
    id: "campaign-stop-signals",
    code: "E/012",
    kind: "campaign",
    status: "recurring",
    title: {
      en: "Stop-Signals of Fraud",
      ru: "«Стоп-сигналы мошенничества»",
    },
    description: {
      en: "Mass information campaign: posters, infographics, and short videos.",
      ru: "Массовая информационная кампания: плакаты, инфографика и короткие видео.",
    },
  },
];
