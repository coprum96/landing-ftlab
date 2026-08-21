export type Localized = { en: string; ru: string };

export type ResearchArea = {
  id: string;
  code: string;
  number: string;
  slug: string;
  title: Localized;
  question: Localized;
  method: Localized[];
  output: Localized[];
  application: Localized;
  visualFamily: "human" | "signal" | "system" | "action";
  motif: "grid" | "pulse" | "orbit" | "mesh";
};

/**
 * Official research taxonomy from `Справка ЛАБ СФТ.docx`.
 */
export const researchAreas: ResearchArea[] = [
  {
    id: "cognitive-behavioral-security",
    code: "R/01",
    number: "01",
    slug: "cognitive-behavioral-security",
    title: {
      en: "Cognitive-Behavioral Security",
      ru: "Когнитивно-поведенческая безопасность",
    },
    question: {
      en: "Which psychological mechanisms become exploitable under social-engineering pressure — and which interventions restore protective action?",
      ru: "Какие психологические механизмы эксплуатируются под давлением социальной инженерии — и какие интервенции возвращают защитное действие?",
    },
    method: [
      {
        en: "Laboratory simulations of fraudulent scenarios",
        ru: "Лабораторные симуляции мошеннических сценариев",
      },
      {
        en: "Neurophysiological response measurement",
        ru: "Нейрофизиологические измерения реакций",
      },
      {
        en: "Behavioral trainers, games, VR, eye tracking",
        ru: "Поведенческие тренажёры, игры, VR, айтрекинг",
      },
      {
        en: "Testing protective interventions",
        ru: "Тестирование защитных интервенций",
      },
    ],
    output: [
      {
        en: "Atlas of Cognitive Vulnerabilities",
        ru: "Атлас когнитивных уязвимостей",
      },
      {
        en: "Maps of exploitable psychological mechanisms",
        ru: "Карты эксплуатируемых психологических механизмов",
      },
      {
        en: "Evidence on intervention effectiveness",
        ru: "Данные об эффективности интервенций",
      },
    ],
    application: {
      en: "Financial institutions, regulators, and security training environments.",
      ru: "Финансовые организации, регуляторы и среды обучения безопасности.",
    },
    visualFamily: "human",
    motif: "pulse",
  },
  {
    id: "digital-victimology",
    code: "R/02",
    number: "02",
    slug: "digital-victimology",
    title: {
      en: "Digital Victimology",
      ru: "Цифровая виктимология",
    },
    question: {
      en: "How do victimization patterns form across social-engineering incidents — and can risk be predicted before harm occurs?",
      ru: "Как формируются паттерны виктимизации в инцидентах социальной инженерии — и можно ли предсказать риск до причинения вреда?",
    },
    method: [
      {
        en: "Depersonalized incident case aggregation",
        ru: "Агрегация деперсонализированных кейсов инцидентов",
      },
      {
        en: "MECE profiling and victim clustering",
        ru: "MECE-профилирование и кластеризация жертв",
      },
      {
        en: "Predictive ML models of victimization",
        ru: "Предиктивные ML-модели виктимизации",
      },
      {
        en: "Monitoring evolution of fraud schemes",
        ru: "Мониторинг эволюции мошеннических схем",
      },
    ],
    output: [
      {
        en: "Russian Social-Engineering Incident Database (RBDISIN)",
        ru: "Российская база данных инцидентов социальной инженерии (РБДИСИН)",
      },
      {
        en: "Behavioral Vulnerability Index (population)",
        ru: "Индекс поведенческой уязвимости населения (ИПУ)",
      },
      {
        en: "Risk and cluster analytics",
        ru: "Риск- и кластер-аналитика",
      },
    ],
    application: {
      en: "Fraud analytics, SupTech/RegTech monitoring, and targeted prevention.",
      ru: "Антифрод-аналитика, SupTech/RegTech-мониторинг и целевая профилактика.",
    },
    visualFamily: "signal",
    motif: "mesh",
  },
  {
    id: "protective-behavioral-technologies",
    code: "R/03",
    number: "03",
    slug: "protective-behavioral-technologies",
    title: {
      en: "Protective Behavioral Technologies",
      ru: "Защитные технологии поведения",
    },
    question: {
      en: "Which tools change real protective behavior — not only awareness — at the moment of risk?",
      ru: "Какие инструменты меняют реальное защитное поведение — а не только осведомлённость — в момент риска?",
    },
    method: [
      {
        en: "Inoculation interventions in controlled settings",
        ru: "Прививочные (inoculation) интервенции в контролируемой среде",
      },
      {
        en: "Behavioral checklists and action algorithms",
        ru: "Поведенческие чек-листы и алгоритмы действий",
      },
      {
        en: "Nudge design for banking interfaces",
        ru: "Проектирование nudge-инструментов для банковских интерфейсов",
      },
      {
        en: "Education formats scored by behavioral change",
        ru: "Образовательные форматы с метриками изменения поведения",
      },
    ],
    output: [
      {
        en: "Inoculation programs and protective protocols",
        ru: "Inoculation-программы и защитные протоколы",
      },
      {
        en: "Interface nudges and checklists",
        ru: "Интерфейсные подталкивания и чек-листы",
      },
      {
        en: "Interactive anti-fraud trainers",
        ru: "Интерактивные антифрод-тренажёры",
      },
    ],
    application: {
      en: "Banking apps, staff training, and public protective communication.",
      ru: "Банковские приложения, обучение сотрудников и защитная коммуникация для населения.",
    },
    visualFamily: "action",
    motif: "orbit",
  },
  {
    id: "regulatory-analytics",
    code: "R/04",
    number: "04",
    slug: "regulatory-analytics",
    title: {
      en: "Regulatory Analytics",
      ru: "Регуляторная аналитика",
    },
    question: {
      en: "How can behavioral evidence be translated into policy, guidance, and measurable regulatory impact?",
      ru: "Как перевести поведенческие данные в политику, рекомендации и измеримое регуляторное воздействие?",
    },
    method: [
      {
        en: "Comparative analysis of global regulatory practice",
        ru: "Сравнительный анализ мировых регуляторных практик",
      },
      {
        en: "Regulatory impact assessment of existing measures",
        ru: "Оценка регуляторного воздействия действующих мер",
      },
      {
        en: "Monitoring of legislative initiatives",
        ru: "Мониторинг законодательных инициатив",
      },
      {
        en: "Expert support for financial-sector policy",
        ru: "Экспертное сопровождение политики финансового сектора",
      },
    ],
    output: [
      {
        en: "Recommendations for financial regulators and agencies",
        ru: "Рекомендации для финансовых регуляторов и ведомств",
      },
      {
        en: "Policy briefs and impact assessments",
        ru: "Политические записки и оценки воздействия",
      },
      {
        en: "Evidence packages for fraud-prevention strategy",
        ru: "Пакеты доказательств для стратегии противодействия мошенничеству",
      },
    ],
    application: {
      en: "Bank of Russia, Rosfinmonitoring, MVD, Investigative Committee, and industry associations.",
      ru: "Банк России, Росфинмониторинг, МВД, Следственный комитет и отраслевые ассоциации.",
    },
    visualFamily: "system",
    motif: "grid",
  },
];

export type MethodInstrument = {
  id: string;
  code: string;
  title: Localized;
  description: Localized;
};

export const methodInstruments: MethodInstrument[] = [
  {
    id: "behavioral-experiments",
    code: "M/01",
    title: {
      en: "Controlled behavioral experiments",
      ru: "Контролируемые поведенческие эксперименты",
    },
    description: {
      en: "Simulation of fraudulent scenarios in a safe laboratory environment.",
      ru: "Симуляция мошеннических сценариев в безопасной лабораторной среде.",
    },
  },
  {
    id: "immersive-training",
    code: "M/02",
    title: {
      en: "Immersive trainers & VR",
      ru: "Иммерсивные тренажёры и VR",
    },
    description: {
      en: "Games, simulators, and immersive scenarios for pressure-conditioned learning.",
      ru: "Игры, симуляторы и иммерсивные сценарии для обучения в условиях давления.",
    },
  },
  {
    id: "eye-tracking-neuro",
    code: "M/03",
    title: {
      en: "Eye tracking & neurophysiology",
      ru: "Айтрекинг и нейрофизиология",
    },
    description: {
      en: "Measurement of attention and physiological response under manipulative stimuli.",
      ru: "Измерение внимания и физиологических реакций при манипулятивных стимулах.",
    },
  },
  {
    id: "behavioral-analytics",
    code: "M/04",
    title: {
      en: "Behavioral analytics & clustering",
      ru: "Поведенческая аналитика и кластеризация",
    },
    description: {
      en: "MECE profiling, cluster models, and large-scale pattern monitoring.",
      ru: "MECE-профилирование, кластерные модели и мониторинг паттернов на больших данных.",
    },
  },
  {
    id: "predictive-ml",
    code: "M/05",
    title: {
      en: "Predictive modeling",
      ru: "Предиктивное моделирование",
    },
    description: {
      en: "Machine-learning approaches to victimization and vulnerability risk.",
      ru: "Подходы машинного обучения к риску виктимизации и уязвимости.",
    },
  },
  {
    id: "intervention-design",
    code: "M/06",
    title: {
      en: "Intervention & nudge design",
      ru: "Дизайн интервенций и подталкиваний",
    },
    description: {
      en: "Inoculation protocols, checklists, and interface nudges tested against real behavior.",
      ru: "Inoculation-протоколы, чек-листы и интерфейсные подталкивания, проверяемые по реальному поведению.",
    },
  },
];

export type ImpactStage = {
  id: string;
  code: string;
  title: Localized;
  description: Localized;
};

export const impactPipeline: ImpactStage[] = [
  {
    id: "observe",
    code: "01",
    title: { en: "Observe", ru: "Наблюдать" },
    description: {
      en: "Human behavior under financial and social-engineering pressure.",
      ru: "Поведение человека под финансовым и социально-инженерным давлением.",
    },
  },
  {
    id: "measure",
    code: "02",
    title: { en: "Measure", ru: "Измерять" },
    description: {
      en: "Experiments, neurophysiological signals, and incident data.",
      ru: "Эксперименты, нейрофизиологические сигналы и данные об инцидентах.",
    },
  },
  {
    id: "model",
    code: "03",
    title: { en: "Model", ru: "Моделировать" },
    description: {
      en: "Vulnerability mechanisms, victim clusters, and predictive risk.",
      ru: "Механизмы уязвимости, кластеры жертв и предиктивный риск.",
    },
  },
  {
    id: "design",
    code: "04",
    title: { en: "Design", ru: "Проектировать" },
    description: {
      en: "Interventions, trainers, nudges, and protective protocols.",
      ru: "Интервенции, тренажёры, подталкивания и защитные протоколы.",
    },
  },
  {
    id: "test",
    code: "05",
    title: { en: "Test", ru: "Проверять" },
    description: {
      en: "Behavioral-change metrics — action, not only knowledge.",
      ru: "Метрики изменения поведения — действие, а не только знание.",
    },
  },
  {
    id: "implement",
    code: "06",
    title: { en: "Implement", ru: "Внедрять" },
    description: {
      en: "Financial institutions, regulators, and educational systems.",
      ru: "Финансовые организации, регуляторы и образовательные системы.",
    },
  },
];
