export type Localized = { en: string; ru: string };

export type ProjectKind =
  | "research-program"
  | "research-infrastructure"
  | "tool"
  | "educational"
  | "implementation";

export type ProjectStatus =
  | "active-research"
  | "in-development"
  | "planned"
  | "pilot"
  | "implemented"
  | "educational"
  | "data-infrastructure"
  | "registered-ip";

export type Project = {
  id: string;
  number: string;
  slug: string;
  kind: ProjectKind;
  status?: ProjectStatus;
  researchAreaId?: string;
  title: Localized;
  question?: Localized;
  description: Localized;
  overview?: Localized;
  method?: Localized[];
  output?: Localized[];
  application?: Localized;
  year?: number;
  mediaType: "image" | "video";
  hasVideo?: boolean;
  hasPoster?: boolean;
  videoSlug?: string;
  motif: "grid" | "pulse" | "orbit" | "signal" | "mesh" | "flow";
  layout: "wide" | "half" | "full";
  featured?: boolean;
  meta?: Localized;
};

export const statusLabels: Record<ProjectStatus, Localized> = {
  "active-research": { en: "ACTIVE RESEARCH", ru: "АКТИВНОЕ ИССЛЕДОВАНИЕ" },
  "in-development": { en: "IN DEVELOPMENT", ru: "В РАЗРАБОТКЕ" },
  planned: { en: "PLANNED", ru: "ПЛАНИРУЕТСЯ" },
  pilot: { en: "PILOT", ru: "ПИЛОТ" },
  implemented: { en: "IMPLEMENTED", ru: "ВНЕДРЕНО" },
  educational: { en: "EDUCATIONAL", ru: "ОБРАЗОВАНИЕ" },
  "data-infrastructure": {
    en: "DATA INFRASTRUCTURE",
    ru: "ДАННЫЕ / ИНФРАСТРУКТУРА",
  },
  "registered-ip": { en: "REGISTERED IP", ru: "ЗАРЕГИСТРИРОВАНО" },
};

export const kindLabels: Record<ProjectKind, Localized> = {
  "research-program": { en: "Research program", ru: "Исследовательская программа" },
  "research-infrastructure": {
    en: "Research infrastructure",
    ru: "Исследовательская инфраструктура",
  },
  tool: { en: "Tool / technology", ru: "Инструмент / технология" },
  educational: { en: "Educational program", ru: "Образовательная программа" },
  implementation: { en: "Implementation", ru: "Внедрение" },
};

/**
 * Source-backed initiatives. Status omitted when evidence is weak.
 */
export const projects: Project[] = [
  {
    id: "golden-detector",
    number: "T/001",
    slug: "golden-detector",
    kind: "tool",
    status: "registered-ip",
    researchAreaId: "protective-behavioral-technologies",
    title: {
      en: "Golden Detector Simulator",
      ru: "Тренажёр-симулятор «Золотой Детектор»",
    },
    question: {
      en: "Can interactive immersion raise resistance to financial fraud and social engineering?",
      ru: "Может ли интерактивное погружение повысить устойчивость к финансовому мошенничеству и социальной инженерии?",
    },
    description: {
      en: "Registered interactive training program for protection against financial fraud and social engineering.",
      ru: "Зарегистрированная программа интерактивного обучения защите от финансового мошенничества и социальной инженерии.",
    },
    overview: {
      en: "Registered software certificate № 2025696334 (17.12.2025). Full deployment is planned for October 2026. Built as an immersive, personalized, gamified trainer for resistance to financial fraud and social engineering.",
      ru: "Свидетельство о регистрации программы для ЭВМ № 2025696334 (17.12.2025). Полное развёртывание планируется на октябрь 2026. Иммерсивный, персонализированный, геймифицированный тренажёр устойчивости к финансовому мошенничеству и социальной инженерии.",
    },
    method: [
      {
        en: "Interactive scenario-based training",
        ru: "Интерактивное обучение на сценариях",
      },
      {
        en: "Immersive and gamified simulation",
        ru: "Иммерсивная и геймифицированная симуляция",
      },
      {
        en: "Controlled exposure to fraud pressure in a safe environment",
        ru: "Контролируемое столкновение с давлением мошенничества в безопасной среде",
      },
    ],
    output: [
      {
        en: "Registered training software (certificate 2025696334)",
        ru: "Зарегистрированное обучающее ПО (свидетельство 2025696334)",
      },
      {
        en: "Measurable resistance testing environment",
        ru: "Среда тестирования устойчивости",
      },
    ],
    application: {
      en: "Banks, educational programs, and antifraud training. Live research demo available as a separate pilot interface.",
      ru: "Банки, образовательные программы и антифрод-обучение. Живое исследовательское демо доступно как отдельный пилотный интерфейс.",
    },
    year: 2025,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "incoming-call",
    motif: "pulse",
    layout: "wide",
    featured: true,
    meta: {
      en: "Registered software · Full deployment planned Oct 2026",
      ru: "Зарегистрированное ПО · Полное развёртывание — октябрь 2026",
    },
  },
  {
    id: "cognitive-shield",
    number: "I/001",
    slug: "cognitive-shield",
    kind: "implementation",
    status: "implemented",
    researchAreaId: "protective-behavioral-technologies",
    title: {
      en: "Cognitive Shield",
      ru: "«Когнитивный щит»",
    },
    question: {
      en: "How can bank staff and the public practice resistance to social engineering — not only learn about it?",
      ru: "Как сотрудники банков и население могут практиковать устойчивость к социальной инженерии — а не только узнавать о ней?",
    },
    description: {
      en: "Practice-oriented program for countering social engineering and financial fraud in the banking sector and for the public.",
      ru: "Практико-ориентированная программа противодействия социальной инженерии и финансовому мошенничеству для банковского сектора и населения.",
    },
    overview: {
      en: "Developed as a comprehensive training methodology. Materials have been used with credit organizations across regions; related workstreams include programs with the Association of Banks of Russia and Bank of Russia structures. CV evidence notes use across 30+ credit organizations.",
      ru: "Комплексная учебная методика. Материалы использовались кредитными организациями в регионах; связанные треки включают программы с Ассоциацией банков России и структурами Банка России. По данным CV — использование в 30+ кредитных организациях.",
    },
    method: [
      {
        en: "Practice-oriented staff and public training formats",
        ru: "Практико-ориентированные форматы обучения сотрудников и населения",
      },
      {
        en: "Methodological materials for banking-sector delivery",
        ru: "Методические материалы для банковского сектора",
      },
      {
        en: "Regional delivery with Bank of Russia / ABR collaboration tracks",
        ru: "Региональная доставка совместно с треками Банка России / АБР",
      },
    ],
    output: [
      {
        en: "Staff and public training formats",
        ru: "Форматы обучения сотрудников и населения",
      },
      {
        en: "Methodological materials for banks",
        ru: "Методические материалы для банков",
      },
    ],
    application: {
      en: "Credit organizations, regional Bank of Russia networks, public campaigns.",
      ru: "Кредитные организации, региональные сети Банка России, публичные кампании.",
    },
    year: 2024,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "university-seminar",
    motif: "signal",
    layout: "half",
    featured: true,
  },
  {
    id: "atlas-cognitive-vulnerabilities",
    number: "D/001",
    slug: "atlas-cognitive-vulnerabilities",
    kind: "research-infrastructure",
    status: "active-research",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Atlas of Cognitive Vulnerabilities",
      ru: "Атлас когнитивных уязвимостей",
    },
    question: {
      en: "Which psychological mechanisms are systematically exploited in financial fraud?",
      ru: "Какие психологические механизмы системно эксплуатируются в финансовом мошенничестве?",
    },
    description: {
      en: "A systematized map of psychological mechanisms and vulnerabilities exploited by fraudsters, grounded in experiments and surveys.",
      ru: "Систематизированная карта психологических механизмов и уязвимостей, эксплуатируемых мошенниками, на основе экспериментов и опросов.",
    },
    overview: {
      en: "Official laboratory direction under Cognitive-Behavioral Security: build a systematized map of psychological mechanisms exploited in financial fraud, grounded in laboratory experiments and surveys, with planned linkage to demographic groups.",
      ru: "Официальное направление лаборатории в рамках когнитивно-поведенческой безопасности: систематизированная карта психологических механизмов, эксплуатируемых в финансовом мошенничестве, на основе лабораторных экспериментов и опросов, с планируемой привязкой к демографическим группам.",
    },
    method: [
      {
        en: "Laboratory experiments and surveys",
        ru: "Лабораторные эксперименты и опросы",
      },
      {
        en: "Systematization of exploited psychological mechanisms",
        ru: "Систематизация эксплуатируемых психологических механизмов",
      },
    ],
    output: [
      {
        en: "Research atlas / structured vulnerability map (in progress)",
        ru: "Исследовательский атлас / структурированная карта уязвимостей (в работе)",
      },
    ],
    application: {
      en: "Supports protective interventions, education design, and antifraud communication.",
      ru: "Поддерживает защитные интервенции, дизайн образования и антифрод-коммуникацию.",
    },
    year: 2026,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "perception-signal",
    motif: "grid",
    layout: "half",
    featured: true,
  },
  {
    id: "rbdisin",
    number: "D/002",
    slug: "rbdisin",
    kind: "research-infrastructure",
    status: "in-development",
    researchAreaId: "digital-victimology",
    title: {
      en: "RBDISIN — Social-Engineering Incident Database",
      ru: "РБДИСИН — база инцидентов социальной инженерии",
    },
    question: {
      en: "Can depersonalized partner cases become a shared research infrastructure for antifraud science?",
      ru: "Могут ли деперсонализированные кейсы партнёров стать общей исследовательской инфраструктурой антифрод-науки?",
    },
    description: {
      en: "Russian database of social-engineering incidents: depersonalized cases from partners for analysis, modeling, and experimentation.",
      ru: "Российская база данных инцидентов социальной инженерии: деперсонализированные кейсы от партнёров для анализа, моделирования и экспериментов.",
    },
    overview: {
      en: "Named in official laboratory materials as an infrastructure to create and maintain: depersonalized social-engineering incident cases from partners for analysis, modeling, and experimentation. Status: in development — not presented as a live public product.",
      ru: "В официальных материалах лаборатории — инфраструктура для создания и ведения: деперсонализированные кейсы инцидентов социальной инженерии от партнёров для анализа, моделирования и экспериментов. Статус: в разработке — не представлено как публичный продукт.",
    },
    method: [
      {
        en: "Depersonalized case aggregation from partners",
        ru: "Агрегация деперсонализированных кейсов от партнёров",
      },
      {
        en: "Analysis, modeling, and experimental reuse of incident data",
        ru: "Анализ, моделирование и экспериментальное использование данных об инцидентах",
      },
    ],
    output: [
      {
        en: "Shared research database architecture (in development)",
        ru: "Архитектура общей исследовательской базы (в разработке)",
      },
    ],
    application: {
      en: "Research modeling, antifraud experimentation, partner analytics.",
      ru: "Исследовательское моделирование, антифрод-эксперименты, партнёрская аналитика.",
    },
    year: 2026,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "physiological-signals",
    motif: "mesh",
    layout: "half",
    featured: true,
  },
  {
    id: "behavioral-vulnerability-index",
    number: "D/003",
    slug: "behavioral-vulnerability-index",
    kind: "research-infrastructure",
    status: "planned",
    researchAreaId: "digital-victimology",
    title: {
      en: "Behavioral Vulnerability Index",
      ru: "Индекс поведенческой уязвимости населения",
    },
    description: {
      en: "Planned quarterly analytic product on population behavioral vulnerability.",
      ru: "Планируемый ежеквартальный аналитический продукт о поведенческой уязвимости населения.",
    },
    year: 2026,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "reveal-black",
    motif: "flow",
    layout: "half",
    featured: true,
  },
  {
    id: "cbr-targeted-content",
    number: "I/002",
    slug: "cbr-targeted-antifraud-content",
    kind: "implementation",
    status: "implemented",
    researchAreaId: "regulatory-analytics",
    title: {
      en: "Regionally Differentiated Antifraud Content",
      ru: "Регионально дифференцированный антифрод-контент",
    },
    question: {
      en: "How should protective communication differ across Russia’s federal districts?",
      ru: "Как должна различаться защитная коммуникация по федеральным округам России?",
    },
    description: {
      en: "Targeted content developed for the Bank of Russia Information Security Department: cluster analysis across 8 federal districts, 6 persona types, and differentiated strategies.",
      ru: "Таргетированный контент для Департамента информационной безопасности Банка России: кластерный анализ 8 федеральных округов, 6 типовых персон и дифференцированные стратегии.",
    },
    overview: {
      en: "Deliverables include MECE audience classification, communication strategies, and concrete content examples per profile.",
      ru: "Результаты включают MECE-классификацию аудиторий, коммуникационные стратегии и примеры контента для каждого профиля.",
    },
    method: [
      {
        en: "Cluster analysis across 8 federal districts",
        ru: "Кластерный анализ 8 федеральных округов",
      },
      {
        en: "Persona-based communication strategy design",
        ru: "Дизайн коммуникационных стратегий на основе персон",
      },
    ],
    output: [
      {
        en: "6 persona types with differentiated strategies",
        ru: "6 типовых персон с дифференцированными стратегиями",
      },
      {
        en: "Content examples per audience profile",
        ru: "Примеры контента для каждого профиля аудитории",
      },
    ],
    application: {
      en: "Bank of Russia Information Security Department antifraud campaigns.",
      ru: "Антифрод-кампании Департамента информационной безопасности Банка России.",
    },
    year: 2025,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "financial-decision",
    motif: "orbit",
    layout: "full",
    featured: true,
  },
  {
    id: "fintech-user-behavior",
    number: "T/002",
    slug: "fintech-user-behavior",
    kind: "tool",
    status: "registered-ip",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Fintech User Behavior",
      ru: "Fintech User Behavior",
    },
    description: {
      en: "Registered program for determining types of user financial behavior.",
      ru: "Зарегистрированная программа для определения типов финансового поведения пользователей.",
    },
    year: 2022,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "abstract-scientific",
    motif: "grid",
    layout: "half",
    meta: {
      en: "Certificate 2022667946",
      ru: "Свидетельство 2022667946",
    },
  },
  {
    id: "financial-anxiety-db",
    number: "T/003",
    slug: "financial-anxiety-assessment",
    kind: "tool",
    status: "registered-ip",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Financial Anxiety Assessment Database",
      ru: "База данных оценки финансовой тревожности",
    },
    description: {
      en: "Registered database for assessing consumer financial anxiety.",
      ru: "Зарегистрированная база данных для оценки финансовой тревожности потребителей.",
    },
    year: 2023,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "vr-figure",
    motif: "pulse",
    layout: "half",
    meta: {
      en: "Certificate 2023620674",
      ru: "Свидетельство 2023620674",
    },
  },
  {
    id: "insurance-behavior-db",
    number: "T/004",
    slug: "insurance-behavior-assessment",
    kind: "tool",
    status: "registered-ip",
    researchAreaId: "cognitive-behavioral-security",
    title: {
      en: "Insurance Behavior Assessment Database",
      ru: "База данных оценки страхового поведения",
    },
    description: {
      en: "Registered database for assessing insurance behavior patterns.",
      ru: "Зарегистрированная база данных для оценки страхового поведения.",
    },
    year: 2023,
    mediaType: "image",
    motif: "mesh",
    layout: "half",
    meta: {
      en: "Certificate 2023624637",
      ru: "Свидетельство 2023624637",
    },
  },
  {
    id: "predictor",
    number: "T/005",
    slug: "predictor",
    kind: "tool",
    status: "planned",
    researchAreaId: "digital-victimology",
    title: {
      en: "Predictor — Victimization Risk Models",
      ru: "«Предиктор» — модели риска виктимизации",
    },
    description: {
      en: "Planned machine-learning algorithms for individual victimization risk, described in laboratory prospective materials.",
      ru: "Планируемые алгоритмы машинного обучения индивидуального риска виктимизации — по перспективным материалам лаборатории.",
    },
    year: 2026,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "decision-network",
    motif: "signal",
    layout: "half",
  },
  {
    id: "protective-nudges",
    number: "T/006",
    slug: "protective-nudges",
    kind: "tool",
    status: "in-development",
    researchAreaId: "protective-behavioral-technologies",
    title: {
      en: "Protective Interface Nudges",
      ru: "Защитные интерфейсные подталкивания",
    },
    description: {
      en: "Interface elements and behavioral checklists designed for embedding into banking applications at moments of suspicious action.",
      ru: "Элементы интерфейса и поведенческие чек-листы для встройки в банковские приложения в момент подозрительного действия.",
    },
    overview: {
      en: "Protective behavioral technologies track: design interface nudges and behavioral checklists that banks can embed into applications to warn users at the moment of suspicious action. Described in laboratory directions and prospective materials as work in development.",
      ru: "Направление защитных технологий поведения: проектирование интерфейсных подталкиваний и поведенческих чек-листов, которые банки могут встраивать в приложения для предупреждения в момент подозрительного действия. В материалах лаборатории — работа в разработке.",
    },
    method: [
      {
        en: "Interface nudge design for banking applications",
        ru: "Дизайн интерфейсных подталкиваний для банковских приложений",
      },
      {
        en: "Behavioral checklists for risk situations",
        ru: "Поведенческие чек-листы для ситуаций риска",
      },
    ],
    output: [
      {
        en: "Embeddable protective interface patterns (in development)",
        ru: "Встраиваемые защитные интерфейсные паттерны (в разработке)",
      },
    ],
    application: {
      en: "Banking apps and digital financial channels at moments of elevated risk.",
      ru: "Банковские приложения и цифровые финансовые каналы в моменты повышенного риска.",
    },
    year: 2026,
    mediaType: "video",
    hasVideo: true,
    videoSlug: "hand-action",
    motif: "flow",
    layout: "half",
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
