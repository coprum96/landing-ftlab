import type { Localized } from "@/data/research";

export type AgenticResearchArea = {
  id: string;
  code: string;
  title: Localized;
  summary: Localized;
  topics: Localized[];
  highlight?: {
    label: Localized;
    text: Localized;
  };
};

export type ArchitectureLayer = {
  id: string;
  title: Localized;
  items: Localized[];
};

/**
 * Flagship Agentic AI in Finance research programme data.
 */
export const researchCycle = [
  {
    id: "research",
    code: "01",
    title: { en: "RESEARCH", ru: "RESEARCH" },
    text: {
      en: "Study emerging agent architectures, financial workflows and systemic risks.",
      ru: "Изучаем архитектуры агентов, финансовые процессы и системные риски.",
    },
  },
  {
    id: "build",
    code: "02",
    title: { en: "BUILD", ru: "BUILD" },
    text: {
      en: "Create experimental financial agents, multi-agent systems and autonomous workflows.",
      ru: "Создаём экспериментальных финансовых агентов, мультиагентные системы и автономные процессы.",
    },
  },
  {
    id: "simulate",
    code: "03",
    title: { en: "SIMULATE", ru: "SIMULATE" },
    text: {
      en: "Run synthetic financial environments, fraud scenarios and market conditions.",
      ru: "Запускаем синтетические финансовые среды, сценарии мошенничества и рыночные условия.",
    },
  },
  {
    id: "attack",
    code: "04",
    title: { en: "ATTACK", ru: "ATTACK" },
    text: {
      en: "Adversarially test agents in controlled environments: red teaming, prompt injection, malicious tools, authority abuse and agent-to-agent manipulation.",
      ru: "Адверсериально тестируем агентов в контролируемых средах: red teaming, prompt injection, вредоносные инструменты, злоупотребление полномочиями и манипуляции между агентами.",
    },
  },
  {
    id: "measure",
    code: "05",
    title: { en: "MEASURE", ru: "MEASURE" },
    text: {
      en: "Evaluate financial decisions, autonomy, reliability, risk and behavioral outcomes.",
      ru: "Оцениваем финансовые решения, автономию, надёжность, риск и поведенческие исходы.",
    },
  },
  {
    id: "defend",
    code: "06",
    title: { en: "DEFEND", ru: "DEFEND" },
    text: {
      en: "Design controls for identity, authorization, fraud prevention, governance, monitoring and safe execution.",
      ru: "Проектируем контроли идентичности, авторизации, antifraud, governance, мониторинга и безопасного исполнения.",
    },
  },
] as const;

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "intent",
    title: {
      en: "HUMAN / ORGANIZATION INTENT",
      ru: "НАМЕРЕНИЕ ЧЕЛОВЕКА / ОРГАНИЗАЦИИ",
    },
    items: [
      { en: "Goals", ru: "Цели" },
      { en: "Mandates", ru: "Мандаты" },
      { en: "Risk appetite", ru: "Риск-аппетит" },
    ],
  },
  {
    id: "agent",
    title: { en: "FINANCIAL AGENT", ru: "ФИНАНСОВЫЙ АГЕНТ" },
    items: [
      { en: "Reasoning", ru: "Рассуждение" },
      { en: "Planning", ru: "Планирование" },
      { en: "Memory", ru: "Память" },
      { en: "Context", ru: "Контекст" },
    ],
  },
  {
    id: "authority",
    title: { en: "AUTHORITY LAYER", ru: "СЛОЙ ПОЛНОМОЧИЙ" },
    items: [
      { en: "Identity", ru: "Идентичность" },
      { en: "Mandate", ru: "Мандат" },
      { en: "Permissions", ru: "Права" },
      { en: "Limits", ru: "Лимиты" },
      { en: "Policy", ru: "Политика" },
    ],
  },
  {
    id: "network",
    title: { en: "AGENT NETWORK", ru: "СЕТЬ АГЕНТОВ" },
    items: [
      { en: "Specialized agents", ru: "Специализированные агенты" },
      { en: "A2A communication", ru: "A2A-коммуникация" },
      { en: "Tool use", ru: "Инструменты" },
      { en: "Orchestration", ru: "Оркестрация" },
    ],
  },
  {
    id: "risk",
    title: { en: "RISK & CONTROL", ru: "РИСК И КОНТРОЛЬ" },
    items: [
      { en: "Fraud", ru: "Fraud" },
      { en: "AML", ru: "AML" },
      { en: "Behavior", ru: "Поведение" },
      { en: "Runtime monitoring", ru: "Runtime-мониторинг" },
      { en: "Human oversight", ru: "Человеческий надзор" },
    ],
  },
  {
    id: "execution",
    title: { en: "EXECUTION", ru: "ИСПОЛНЕНИЕ" },
    items: [
      { en: "Bank APIs", ru: "Bank APIs" },
      { en: "MCP", ru: "MCP" },
      { en: "A2A", ru: "A2A" },
      { en: "UCP", ru: "UCP" },
      { en: "Payment APIs", ru: "Payment APIs" },
    ],
  },
  {
    id: "money",
    title: { en: "MONEY", ru: "ДЕНЬГИ" },
    items: [
      { en: "Bank accounts", ru: "Счета" },
      { en: "Cards", ru: "Карты" },
      { en: "Instant payments", ru: "Мгновенные платежи" },
      { en: "Tokenized deposits", ru: "Токенизированные депозиты" },
      { en: "Stablecoins", ru: "Стейблкоины" },
    ],
  },
  {
    id: "audit",
    title: { en: "AUDIT / GOVERNANCE", ru: "AUDIT / GOVERNANCE" },
    items: [
      { en: "Tracing", ru: "Трассировка" },
      { en: "Replay", ru: "Replay" },
      { en: "Evidence", ru: "Доказательства" },
      { en: "Accountability", ru: "Подотчётность" },
    ],
  },
];

export const agenticResearchAreas: AgenticResearchArea[] = [
  {
    id: "agent-identity",
    code: "/01",
    title: { en: "Agent Identity", ru: "Идентичность агента" },
    summary: {
      en: "How does a financial institution identify a non-human financial actor?",
      ru: "Как финансовая организация идентифицирует нечеловеческого финансового актора?",
    },
    topics: [
      { en: "Agent identity & ownership", ru: "Идентичность и владелец" },
      { en: "Model / provider identity", ru: "Идентичность модели / провайдера" },
      { en: "Credentials & provenance", ru: "Учётные данные и provenance" },
      { en: "Persistent agent identity", ru: "Устойчивая идентичность агента" },
      { en: "Trusted execution", ru: "Trusted execution" },
    ],
    highlight: {
      label: { en: "Know Your Agent - KYA", ru: "Know Your Agent - KYA" },
      text: {
        en: "KYC, KYB and KYT are not enough. Autonomous finance introduces KYA - Know Your Agent.",
        ru: "KYC, KYB и KYT недостаточно. Автономные финансы требуют KYA - Know Your Agent.",
      },
    },
  },
  {
    id: "delegated-authority",
    code: "/02",
    title: { en: "Delegated Authority", ru: "Делегированные полномочия" },
    summary: {
      en: "How financial authority transfers from humans or organizations to autonomous systems.",
      ru: "Как финансовая власть передаётся от людей или организаций автономным системам.",
    },
    topics: [
      { en: "Financial mandates", ru: "Финансовые мандаты" },
      { en: "Permission boundaries", ru: "Границы прав" },
      { en: "Transaction & time limits", ru: "Лимиты транзакций и времени" },
      { en: "Category & asset restrictions", ru: "Ограничения по категориям и активам" },
      { en: "Approval thresholds & revocation", ru: "Пороги одобрения и отзыв" },
      { en: "Delegation between agents", ru: "Делегирование между агентами" },
    ],
    highlight: {
      label: { en: "Core question", ru: "Ключевой вопрос" },
      text: {
        en: "What exactly should an AI agent be allowed to do with money?",
        ru: "Что именно AI-агенту должно быть разрешено делать с деньгами?",
      },
    },
  },
  {
    id: "agentic-payments",
    code: "/03",
    title: { en: "Agentic Payments", ru: "Agentic Payments" },
    summary: {
      en: "Autonomous payments and agent-initiated financial transactions.",
      ru: "Автономные платежи и финансовые транзакции, инициированные агентами.",
    },
    topics: [
      { en: "Agent wallets", ru: "Кошельки агентов" },
      { en: "Virtual cards & delegated credentials", ru: "Виртуальные карты и делегированные credentials" },
      { en: "AP2 & agentic commerce", ru: "AP2 и agentic commerce" },
      { en: "Machine payments", ru: "Machine payments" },
      { en: "Programmable payment intent", ru: "Программируемый payment intent" },
    ],
  },
  {
    id: "m2m-finance",
    code: "/04",
    title: { en: "Machine-to-Machine Finance", ru: "Machine-to-Machine Finance" },
    summary: {
      en: "Financial activity initiated and completed entirely by software agents - without a human initiating each transaction.",
      ru: "Финансовая активность, полностью инициированная и завершённая программными агентами - без человека на каждой транзакции.",
    },
    topics: [
      { en: "M2M micropayments", ru: "M2M-микроплатежи" },
      { en: "API-native money", ru: "API-native money" },
      { en: "Stablecoins & tokenized deposits", ru: "Стейблкоины и токенизированные депозиты" },
      { en: "Programmable settlement", ru: "Программируемый settlement" },
      { en: "Economic behavior of agents", ru: "Экономическое поведение агентов" },
    ],
  },
  {
    id: "agent-risk",
    code: "/05",
    title: { en: "Financial Agent Risk", ru: "Риск финансового агента" },
    summary: {
      en: "Traditional systems score customers, transactions, merchants and devices. We research Agent Risk.",
      ru: "Традиционные системы скорят клиентов, транзакции, мерчантов и устройства. Мы исследуем Agent Risk.",
    },
    topics: [
      { en: "Owner & model provider", ru: "Владелец и провайдер модели" },
      { en: "Permissions & autonomy level", ru: "Права и уровень автономии" },
      { en: "Financial history", ru: "Финансовая история" },
      { en: "Behavioral deviation", ru: "Поведенческие отклонения" },
      { en: "Tool access & external agents", ru: "Доступ к инструментам и внешним агентам" },
      { en: "Compromise indicators", ru: "Индикаторы компрометации" },
    ],
    highlight: {
      label: { en: "Agent Risk Score", ru: "Agent Risk Score" },
      text: {
        en: "A continuous risk assessment for autonomous financial actors.",
        ru: "Непрерывная оценка риска автономных финансовых акторов.",
      },
    },
  },
  {
    id: "agentic-fraud",
    code: "/06",
    title: {
      en: "Agentic Fraud & Loss Prevention",
      ru: "Agentic Fraud и предотвращение потерь",
    },
    summary: {
      en: "Fraud where AI agents exist on both sides - and the decision of whether a financial action should happen at all.",
      ru: "Мошенничество, где AI-агенты есть с обеих сторон - и решение, должно ли финансовое действие произойти вообще.",
    },
    topics: [
      { en: "Autonomous scam agents", ru: "Автономные scam-агенты" },
      { en: "Agent-assisted social engineering", ru: "Agent-assisted social engineering" },
      { en: "Compromised financial agents", ru: "Скомпрометированные финансовые агенты" },
      { en: "Malicious merchant agents", ru: "Вредоносные merchant-агенты" },
      { en: "Defense agents & intervention", ru: "Defense-агенты и вмешательство" },
    ],
    highlight: {
      label: { en: "Financial Action Risk", ru: "Financial Action Risk" },
      text: {
        en: "Intent × Identity × Behavior × Agent × Context × Transaction → ALLOW / CHALLENGE / LIMIT / DELAY / BLOCK / ESCALATE",
        ru: "Intent × Identity × Behavior × Agent × Context × Transaction → ALLOW / CHALLENGE / LIMIT / DELAY / BLOCK / ESCALATE",
      },
    },
  },
  {
    id: "agentic-aml",
    code: "/07",
    title: { en: "Agentic AML & KYC", ru: "Agentic AML & KYC" },
    summary: {
      en: "Autonomous financial-crime investigation and continuous relationship risk state.",
      ru: "Автономное расследование финансовых преступлений и непрерывное состояние риска отношений.",
    },
    topics: [
      { en: "Evidence & transaction analysis agents", ru: "Агенты evidence и анализа транзакций" },
      { en: "Relationship / graph agents", ru: "Агенты связей / графов" },
      { en: "Typology & risk agents", ru: "Агенты типологий и риска" },
      { en: "Case agents + human investigator", ru: "Case-агенты + человек-следователь" },
      { en: "Continuous KYC", ru: "Continuous KYC" },
    ],
  },
  {
    id: "autonomous-treasury",
    code: "/08",
    title: { en: "Autonomous Treasury", ru: "Автономное казначейство" },
    summary: {
      en: "Agentic liquidity, FX, working capital and intercompany cash management under policy constraints.",
      ru: "Agentic-управление ликвидностью, FX, оборотным капиталом и внутригрупповыми переводами в рамках политики.",
    },
    topics: [
      { en: "Liquidity & cash positioning", ru: "Ликвидность и cash positioning" },
      { en: "FX & hedging", ru: "FX и хеджирование" },
      { en: "Working capital", ru: "Оборотный капитал" },
      { en: "Intercompany transfers", ru: "Внутригрупповые переводы" },
      { en: "Yield & counterparty exposure", ru: "Доходность и контрагентский риск" },
    ],
    highlight: {
      label: { en: "Autonomous cycle", ru: "Автономный цикл" },
      text: {
        en: "Sense → Forecast → Decide → Execute → Verify → Audit",
        ru: "Sense → Forecast → Decide → Execute → Verify → Audit",
      },
    },
  },
  {
    id: "agentic-wealth",
    code: "/09",
    title: { en: "Agentic Investing & Wealth", ru: "Agentic Investing & Wealth" },
    summary: {
      en: "From model portfolios to agents that research, simulate, construct, rebalance and monitor.",
      ru: "От модельных портфелей к агентам, которые исследуют, симулируют, конструируют, ребалансируют и мониторят.",
    },
    topics: [
      { en: "Portfolio analysis & construction", ru: "Анализ и конструирование портфеля" },
      { en: "Market research & simulation", ru: "Рыночное исследование и симуляция" },
      { en: "Risk analysis & rebalancing", ru: "Анализ риска и ребалансировка" },
      { en: "Order preparation", ru: "Подготовка ордеров" },
      { en: "Long-term goal management", ru: "Управление долгосрочными целями" },
    ],
    highlight: {
      label: { en: "Transition", ru: "Переход" },
      text: {
        en: "Questionnaire → Model Portfolio → Goals → Context → Research → Simulation → Strategy → Execution → Monitoring",
        ru: "Анкета → Модельный портфель  →  Цели → Контекст → Research → Simulation → Strategy → Execution → Monitoring",
      },
    },
  },
  {
    id: "credit-underwriting",
    code: "/10",
    title: { en: "Credit & Underwriting Agents", ru: "Кредитные и underwriting-агенты" },
    summary: {
      en: "Autonomous and semi-autonomous credit analysis with explainability, oversight and regulatory constraints.",
      ru: "Автономный и полуавтономный кредитный анализ с объяснимостью, надзором и регуляторными ограничениями.",
    },
    topics: [
      { en: "Underwriting & document analysis", ru: "Underwriting и анализ документов" },
      { en: "Affordability & risk assessment", ru: "Платёжеспособность и оценка риска" },
      { en: "Loan servicing", ru: "Сопровождение кредитов" },
      { en: "Portfolio monitoring", ru: "Мониторинг портфеля" },
      { en: "Human oversight & regulation", ru: "Человеческий надзор и регулирование" },
    ],
  },
  {
    id: "autonomous-insurance",
    code: "/11",
    title: { en: "Autonomous Insurance", ru: "Автономное страхование" },
    summary: {
      en: "Underwriting, FNOL, claims investigation and policy servicing by specialized agents.",
      ru: "Underwriting, FNOL, расследование убытков и обслуживание полисов специализированными агентами.",
    },
    topics: [
      { en: "Underwriting agents", ru: "Underwriting-агенты" },
      { en: "FNOL & claims agents", ru: "FNOL и claims-агенты" },
      { en: "Risk analysis", ru: "Анализ риска" },
      { en: "Autonomous quotations", ru: "Автономные котировки" },
      { en: "Agent-assisted investigation", ru: "Agent-assisted расследование" },
    ],
  },
  {
    id: "finance-ops",
    code: "/12",
    title: { en: "Financial Operations Agents", ru: "Агенты финансовых операций" },
    summary: {
      en: "Toward exception-driven finance operations - agents execute standard workflows; humans manage exceptions.",
      ru: "К exception-driven финансовым операциям - агенты исполняют стандартные процессы; люди управляют исключениями.",
    },
    topics: [
      { en: "Reconciliation", ru: "Сверка" },
      { en: "AP / AR & collections", ru: "AP / AR и взыскание" },
      { en: "Reporting & finance close", ru: "Отчётность и закрытие периода" },
      { en: "Expense review & disputes", ru: "Проверка расходов и споры" },
      { en: "Operational investigations", ru: "Операционные расследования" },
    ],
  },
];

export const attackSurfaces: Localized[] = [
  { en: "Prompt injection", ru: "Prompt injection" },
  { en: "Indirect prompt injection", ru: "Indirect prompt injection" },
  { en: "Malicious documents", ru: "Вредоносные документы" },
  { en: "Compromised tool output", ru: "Скомпрометированный вывод инструментов" },
  { en: "Poisoned financial context", ru: "Отравленный финансовый контекст" },
  { en: "Malicious APIs", ru: "Вредоносные API" },
  { en: "Manipulated counterparties", ru: "Манипулируемые контрагенты" },
  { en: "Identity spoofing", ru: "Подмена идентичности" },
  { en: "Authority escalation", ru: "Эскалация полномочий" },
  { en: "Permission abuse", ru: "Злоупотребление правами" },
  { en: "Agent-to-agent manipulation", ru: "Манипуляции агент-агент" },
  { en: "Malicious agent delegation", ru: "Вредоносное делегирование" },
  { en: "Memory poisoning", ru: "Отравление памяти" },
  { en: "Transaction manipulation", ru: "Манипуляция транзакцией" },
  { en: "Compromised external agents", ru: "Скомпрометированные внешние агенты" },
  { en: "Abnormal agent behavior", ru: "Аномальное поведение агента" },
];

export const offensiveAgentStages: Localized[] = [
  { en: "Discovery", ru: "Discovery" },
  { en: "Targeting", ru: "Targeting" },
  { en: "Social Engineering", ru: "Social Engineering" },
  { en: "Payment Manipulation", ru: "Payment Manipulation" },
  { en: "Fraud Execution", ru: "Fraud Execution" },
];

export const defensiveAgentStages: Localized[] = [
  { en: "Behavior Analysis", ru: "Behavior Analysis" },
  { en: "Intent Analysis", ru: "Intent Analysis" },
  { en: "Fraud Detection", ru: "Fraud Detection" },
  { en: "Investigation", ru: "Investigation" },
  { en: "Intervention", ru: "Intervention" },
];

export const humanAgentQuestions: Localized[] = [
  { en: "When do people trust financial agents?", ru: "Когда люди доверяют финансовым агентам?" },
  {
    en: "When do people delegate authority?",
    ru: "Когда люди делегируют полномочия?",
  },
  {
    en: "Do users understand what agents are allowed to do?",
    ru: "Понимают ли пользователи, что агентам разрешено делать?",
  },
  {
    en: "How does automation bias affect financial decisions?",
    ru: "Как automation bias влияет на финансовые решения?",
  },
  {
    en: "Can humans recognize abnormal agent behavior?",
    ru: "Могут ли люди распознать аномальное поведение агента?",
  },
  {
    en: "Does an agent increase susceptibility to financial manipulation?",
    ru: "Увеличивает ли агент уязвимость к финансовой манипуляции?",
  },
  {
    en: "Can fraudsters manipulate the human through an agent?",
    ru: "Могут ли мошенники манипулировать человеком через агента?",
  },
  {
    en: "Can the agent manipulate the human?",
    ru: "Может ли агент манипулировать человеком?",
  },
  {
    en: "When should a system interrupt the user?",
    ru: "Когда система должна прервать пользователя?",
  },
  {
    en: "What level of friction protects without destroying usability?",
    ru: "Какой уровень трения защищает, не разрушая usability?",
  },
];

export const governanceTrace: Localized[] = [
  { en: "Intent", ru: "Intent" },
  { en: "Reasoning", ru: "Reasoning" },
  { en: "Tool", ru: "Tool" },
  { en: "Permission", ru: "Permission" },
  { en: "Action", ru: "Action" },
  { en: "Transaction", ru: "Transaction" },
  { en: "Outcome", ru: "Outcome" },
  { en: "Audit", ru: "Audit" },
];

export const replayFields: Localized[] = [
  { en: "Original intent", ru: "Исходное намерение" },
  { en: "Model state / version", ru: "Состояние / версия модели" },
  { en: "Relevant context", ru: "Релевантный контекст" },
  { en: "Tools used", ru: "Использованные инструменты" },
  { en: "Agent interactions", ru: "Взаимодействия агентов" },
  { en: "Authorization", ru: "Авторизация" },
  { en: "Reasoning trace / decision evidence", ru: "Трассировка рассуждения / evidence решения" },
  { en: "Transaction", ru: "Транзакция" },
  { en: "Final outcome", ru: "Итоговый исход" },
];

export const simulationScenarios: Localized[] = [
  { en: "Historical market replay", ru: "Исторический market replay" },
  { en: "Synthetic customers", ru: "Синтетические клиенты" },
  { en: "Synthetic fraud campaigns", ru: "Синтетические fraud-кампании" },
  { en: "Liquidity shocks", ru: "Шоки ликвидности" },
  { en: "Bank-run scenarios", ru: "Сценарии bank run" },
  { en: "FX shocks", ru: "FX-шоки" },
  { en: "Sanctions events", ru: "Санкционные события" },
  { en: "Compromised agents", ru: "Скомпрометированные агенты" },
  { en: "Adversarial tool responses", ru: "Адверсериальные ответы инструментов" },
  { en: "Agent coordination", ru: "Координация агентов" },
  { en: "Systemic behavior", ru: "Системное поведение" },
];

export const systemicRiskChain: Localized[] = [
  { en: "100,000 portfolio agents", ru: "100 000 портфельных агентов" },
  { en: "Same market signal", ru: "Один и тот же рыночный сигнал" },
  { en: "Similar models", ru: "Похожие модели" },
  { en: "Similar reasoning", ru: "Похожие рассуждения" },
  { en: "Similar execution", ru: "Похожее исполнение" },
  { en: "SELL", ru: "SELL" },
];

export const systemicTopics: Localized[] = [
  { en: "Agent herding", ru: "Agent herding" },
  { en: "Correlated decision making", ru: "Коррелированные решения" },
  { en: "Market instability", ru: "Рыночная нестабильность" },
  { en: "Machine-speed bank runs", ru: "Bank run на скорости машин" },
  { en: "Liquidity cascades", ru: "Каскады ликвидности" },
  { en: "Feedback loops", ru: "Обратные связи" },
  { en: "Agent collusion", ru: "Сговор агентов" },
  { en: "Emergent coordination", ru: "Эмерджентная координация" },
];

export const liabilityActors: Localized[] = [
  { en: "User", ru: "Пользователь" },
  { en: "Agent developer", ru: "Разработчик агента" },
  { en: "Model provider", ru: "Провайдер модели" },
  { en: "Bank", ru: "Банк" },
  { en: "Broker", ru: "Брокер" },
  { en: "Payment network", ru: "Платёжная сеть" },
  { en: "Merchant", ru: "Мерчант" },
  { en: "Tool provider", ru: "Провайдер инструментов" },
];

export const infrastructureBlocks: {
  code: string;
  title: Localized;
  role: Localized;
}[] = [
  {
    code: "MCP",
    title: { en: "MCP", ru: "MCP" },
    role: { en: "Agent ↔ tools / data", ru: "Агент ↔ инструменты / данные" },
  },
  {
    code: "A2A",
    title: { en: "A2A", ru: "A2A" },
    role: { en: "Agent ↔ agent", ru: "Агент ↔ агент" },
  },
  {
    code: "UCP",
    title: { en: "UCP", ru: "UCP" },
    role: { en: "Agent ↔ commerce", ru: "Агент ↔ commerce" },
  },
  {
    code: "AP2",
    title: { en: "AP2", ru: "AP2" },
    role: {
      en: "Agent ↔ authenticated payment authority",
      ru: "Агент ↔ аутентифицированные платёжные полномочия",
    },
  },
  {
    code: "WLT",
    title: { en: "Agent wallets", ru: "Кошельки агентов" },
    role: {
      en: "Persistent agent payment identity",
      ru: "Устойчивая платёжная идентичность агента",
    },
  },
  {
    code: "MPP",
    title: { en: "Machine payment protocols", ru: "Machine payment protocols" },
    role: {
      en: "API-native settlement rails",
      ru: "API-native рельсы settlement",
    },
  },
  {
    code: "SC",
    title: { en: "Stablecoins", ru: "Стейблкоины" },
    role: {
      en: "Programmable value transfer",
      ru: "Программируемый перевод ценности",
    },
  },
  {
    code: "TD",
    title: { en: "Tokenized deposits", ru: "Токенизированные депозиты" },
    role: {
      en: "Bank money for autonomous systems",
      ru: "Банковские деньги для автономных систем",
    },
  },
  {
    code: "IP",
    title: { en: "Instant payments", ru: "Мгновенные платежи" },
    role: {
      en: "Real-time agent settlement",
      ru: "Settlement агентов в реальном времени",
    },
  },
  {
    code: "PS",
    title: { en: "Programmable settlement", ru: "Программируемый settlement" },
    role: {
      en: "Conditional machine-native money movement",
      ru: "Условное machine-native движение денег",
    },
  },
];

export const industrySignals: Localized[] = [
  { en: "Visa Intelligent Commerce / Agentic Directory / Agent Score", ru: "Visa Intelligent Commerce / Agentic Directory / Agent Score" },
  { en: "Mastercard Agent Pay / Agent Pay for Machines", ru: "Mastercard Agent Pay / Agent Pay for Machines" },
  { en: "Google AP2 / UCP", ru: "Google AP2 / UCP" },
  { en: "MCP / A2A", ru: "MCP / A2A" },
  { en: "Stripe Issuing for Agents / Machine Payments Protocol", ru: "Stripe Issuing for Agents / Machine Payments Protocol" },
  { en: "Scalable Capital agentic investing / MCP", ru: "Scalable Capital agentic investing / MCP" },
  { en: "Interactive Brokers MCP", ru: "Interactive Brokers MCP" },
  { en: "Fiserv agentOS / FIS banking agents", ru: "Fiserv agentOS / FIS banking agents" },
  { en: "Microsoft Finance Agent", ru: "Microsoft Finance Agent" },
];

export const radarHorizons: {
  id: string;
  period: Localized;
  items: Localized[];
}[] = [
  {
    id: "near",
    period: { en: "2026-2027", ru: "2026-2027" },
    items: [
      { en: "Agent-enabled banking", ru: "Agent-enabled banking" },
      { en: "Financial MCP interfaces", ru: "Financial MCP interfaces" },
      { en: "Agentic fraud investigation", ru: "Agentic fraud investigation" },
      { en: "AI payment credentials", ru: "AI payment credentials" },
      { en: "Agent wallets", ru: "Кошельки агентов" },
      { en: "Agentic treasury pilots", ru: "Пилоты agentic treasury" },
      { en: "Autonomous finance operations", ru: "Автономные finance operations" },
    ],
  },
  {
    id: "mid",
    period: { en: "2027-2028", ru: "2027-2028" },
    items: [
      { en: "Know Your Agent infrastructure", ru: "Инфраструктура Know Your Agent" },
      { en: "Agent Risk Scores", ru: "Agent Risk Scores" },
      { en: "Agent Trust Layers", ru: "Agent Trust Layers" },
      { en: "Delegated Authority Engines", ru: "Delegated Authority Engines" },
      { en: "Financial Agent Firewalls", ru: "Financial Agent Firewalls" },
      { en: "Autonomous Treasury OS", ru: "Autonomous Treasury OS" },
      { en: "Continuous KYC", ru: "Continuous KYC" },
      { en: "Agent-to-Agent payments", ru: "Agent-to-Agent payments" },
      { en: "Agent governance infrastructure", ru: "Инфраструктура governance агентов" },
      { en: "Financial agent observability", ru: "Observability финансовых агентов" },
      { en: "Agent certification", ru: "Сертификация агентов" },
      { en: "Agent liability insurance", ru: "Страхование ответственности агентов" },
    ],
  },
  {
    id: "far",
    period: { en: "Longer horizon", ru: "Дальний горизонт" },
    items: [
      { en: "Autonomous economic actors", ru: "Автономные экономические акторы" },
      { en: "Machine-native financial institutions", ru: "Machine-native финансовые институты" },
      { en: "Agent financial markets", ru: "Финансовые рынки агентов" },
      { en: "Self-operating corporate finance", ru: "Самоуправляемые корпоративные финансы" },
      { en: "Agent-to-agent credit", ru: "Кредит агент-агент" },
      { en: "Autonomous financial ecosystems", ru: "Автономные финансовые экосистемы" },
    ],
  },
];

export const researchConcepts: {
  id: string;
  code: string;
  title: Localized;
  text: Localized;
}[] = [
  {
    id: "kya",
    code: "C/01",
    title: { en: "KNOW YOUR AGENT", ru: "KNOW YOUR AGENT" },
    text: {
      en: "Identity and trust infrastructure for non-human financial actors.",
      ru: "Инфраструктура идентичности и доверия для нечеловеческих финансовых акторов.",
    },
  },
  {
    id: "trust-layer",
    code: "C/02",
    title: { en: "AGENT TRUST LAYER", ru: "AGENT TRUST LAYER" },
    text: {
      en: "Identity, authority, intent, risk, policy and audit between agents and financial infrastructure.",
      ru: "Идентичность, полномочия, intent, риск, политика и audit между агентами и финансовой инфраструктурой.",
    },
  },
  {
    id: "risk-score",
    code: "C/03",
    title: { en: "AGENT RISK SCORE", ru: "AGENT RISK SCORE" },
    text: {
      en: "Continuous risk assessment for autonomous financial agents.",
      ru: "Непрерывная оценка риска автономных финансовых агентов.",
    },
  },
  {
    id: "firewall",
    code: "C/04",
    title: { en: "FINANCIAL AGENT FIREWALL", ru: "FINANCIAL AGENT FIREWALL" },
    text: {
      en: "Runtime control deciding ALLOW / CHALLENGE / LIMIT / DELAY / BLOCK / ESCALATE.",
      ru: "Runtime-контроль, решающий ALLOW / CHALLENGE / LIMIT / DELAY / BLOCK / ESCALATE.",
    },
  },
  {
    id: "treasury",
    code: "C/05",
    title: { en: "AUTONOMOUS TREASURY", ru: "AUTONOMOUS TREASURY" },
    text: {
      en: "Agentic liquidity, FX and cash management under institutional policy.",
      ru: "Agentic-управление ликвидностью, FX и cash под институциональной политикой.",
    },
  },
  {
    id: "replay",
    code: "C/06",
    title: { en: "FINANCIAL ACTION REPLAY", ru: "FINANCIAL ACTION REPLAY" },
    text: {
      en: "Reconstruct why an autonomous financial action occurred.",
      ru: "Восстановить, почему произошло автономное финансовое действие.",
    },
  },
  {
    id: "sim-lab",
    code: "C/07",
    title: { en: "AGENT SIMULATION LAB", ru: "AGENT SIMULATION LAB" },
    text: {
      en: "Controlled environments for testing financial agents at scale.",
      ru: "Контролируемые среды для тестирования финансовых агентов в масштабе.",
    },
  },
];

export const actionRiskDecisions: Localized[] = [
  { en: "ALLOW", ru: "ALLOW" },
  { en: "CHALLENGE", ru: "CHALLENGE" },
  { en: "LIMIT", ru: "LIMIT" },
  { en: "DELAY", ru: "DELAY" },
  { en: "BLOCK", ru: "BLOCK" },
  { en: "ESCALATE", ru: "ESCALATE" },
];

export const actionRiskInputs: Localized[] = [
  { en: "Intent", ru: "Intent" },
  { en: "Identity", ru: "Identity" },
  { en: "Behavior", ru: "Behavior" },
  { en: "Agent", ru: "Agent" },
  { en: "Context", ru: "Context" },
  { en: "Transaction", ru: "Transaction" },
];

/** @deprecated Prefer agenticResearchAreas */
export type AgenticDomain = {
  id: string;
  code: string;
  title: Localized;
  question: Localized;
};

/** @deprecated Prefer agenticResearchAreas */
export const agenticDomains: AgenticDomain[] = agenticResearchAreas.map((a) => ({
  id: a.id,
  code: a.code.replace("/", "A"),
  title: a.title,
  question: a.summary,
}));
