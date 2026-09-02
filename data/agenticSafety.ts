export type Localized = { en: string; ru: string };

export type TrackStatus = "active" | "building" | "research" | "planned";

export type SafetyTrack = {
  id: string;
  code: string;
  status: TrackStatus;
  label: Localized;
  title: Localized;
  headline: Localized;
  description: Localized;
  question: Localized;
  focus: Localized[];
  productNote?: Localized;
  parallel?: {
    human: Localized;
    agent: Localized;
  };
};

/** Core research chain for Agentic Financial Safety */
export const safetyChain: Localized[] = [
  { en: "Human Intent", ru: "Намерение человека" },
  { en: "Agent Behavior", ru: "Поведение агента" },
  { en: "Financial Action", ru: "Финансовое действие" },
  { en: "Loss Prevention", ru: "Предотвращение потерь" },
];

export const humanDecisionChain: Localized[] = [
  { en: "Human", ru: "Человек" },
  { en: "Pressure", ru: "Давление" },
  { en: "Behavioral Change", ru: "Изменение поведения" },
  { en: "Decision", ru: "Решение" },
  { en: "Loss", ru: "Потеря" },
];

export const agentDecisionChain: Localized[] = [
  { en: "Human", ru: "Человек" },
  { en: "Intent", ru: "Намерение" },
  { en: "Delegation", ru: "Делегирование" },
  { en: "AI Agent", ru: "AI-агент" },
  { en: "Decision", ru: "Решение" },
  { en: "Financial Action", ru: "Финансовое действие" },
  { en: "Loss", ru: "Потеря" },
];

export const intentFidelitySteps: Localized[] = [
  { en: "Human Intent", ru: "Намерение человека" },
  { en: "Agent Interpretation", ru: "Интерпретация агента" },
  { en: "Proposed Action", ru: "Предлагаемое действие" },
  { en: "Intent Fidelity", ru: "Верность намерению" },
];

export const governanceFlow = {
  agent: { en: "AI Agent", ru: "AI-агент" },
  proposed: { en: "Proposed Financial Action", ru: "Предлагаемое финансовое действие" },
  layer: { en: "FTLAB Control Layer", ru: "Контрольный слой лаборатории СФТ" },
  signals: [
    { en: "Intent Fidelity", ru: "Верность намерению" },
    { en: "Behavioral Risk", ru: "Поведенческий риск" },
    { en: "Context Risk", ru: "Контекстный риск" },
    { en: "Authority", ru: "Полномочия" },
    { en: "Financial Exposure", ru: "Финансовая экспозиция" },
  ],
  policy: { en: "Policy Engine", ru: "Policy Engine" },
  decisions: [
    { en: "ALLOW", ru: "ALLOW" },
    { en: "REVIEW", ru: "REVIEW" },
    { en: "BLOCK", ru: "BLOCK" },
  ],
  execution: { en: "Execution", ru: "Исполнение" },
};

export const multiAgentLoop: Localized[] = [
  { en: "Agent A", ru: "Агент A" },
  { en: "Agent B", ru: "Агент B" },
  { en: "Market / Payment System", ru: "Рынок / платёжная система" },
  { en: "Agent C", ru: "Агент C" },
  { en: "Agent A", ru: "Агент A" },
];

export const safetyTracks: SafetyTrack[] = [
  {
    id: "intent-fidelity",
    code: "01",
    status: "active",
    label: { en: "Intent Fidelity", ru: "Верность намерению" },
    title: { en: "Intent Fidelity", ru: "Верность намерению" },
    headline: {
      en: "Does the action still represent what the human wanted?",
      ru: "Отражает ли действие то, что хотел человек?",
    },
    description: {
      en: "We study the gap between human intent, delegated authority, agent interpretation and final financial action.",
      ru: "Мы изучаем разрыв между намерением человека, делегированными полномочиями, интерпретацией агента и итоговым финансовым действием.",
    },
    question: {
      en: "How can we measure whether an autonomous financial action faithfully represents the user's original intent?",
      ru: "Как измерить, верно ли автономное финансовое действие отражает исходное намерение пользователя?",
    },
    focus: [
      { en: "Intent Fidelity", ru: "Intent Fidelity" },
      { en: "Proof of Intent", ru: "Proof of Intent" },
      { en: "Intent–Permission Gap", ru: "Intent–Permission Gap" },
      { en: "Delegated Authority", ru: "Delegated Authority" },
      { en: "Risk-Based Confirmation", ru: "Risk-Based Confirmation" },
      { en: "Human Approval", ru: "Human Approval" },
      { en: "Intent Integrity", ru: "Intent Integrity" },
    ],
  },
  {
    id: "behavioral-integrity",
    code: "02",
    status: "active",
    label: {
      en: "Agent Behavioral Integrity",
      ru: "Поведенческая целостность агента",
    },
    title: {
      en: "Agent Behavioral Integrity",
      ru: "Поведенческая целостность агента",
    },
    headline: {
      en: "When does an authorized agent begin behaving abnormally?",
      ru: "Когда авторизованный агент начинает вести себя аномально?",
    },
    description: {
      en: "We study behavioral changes that occur before an autonomous agent produces an unsafe economic outcome.",
      ru: "Мы изучаем поведенческие изменения, которые возникают до того, как автономный агент создаёт небезопасный экономический исход.",
    },
    question: {
      en: "Is the authorized agent still behaving as intended?",
      ru: "Ведёт ли себя авторизованный агент по-прежнему так, как задумано?",
    },
    focus: [
      { en: "Agent Behavioral Baseline", ru: "Agent Behavioral Baseline" },
      { en: "Context Manipulation", ru: "Context Manipulation" },
      { en: "Goal Drift", ru: "Goal Drift" },
      { en: "Agentic Loops", ru: "Agentic Loops" },
      { en: "Behavioral Anomalies", ru: "Behavioral Anomalies" },
      { en: "Compromised Agent Detection", ru: "Compromised Agent Detection" },
      { en: "Prompt-Based Manipulation", ru: "Prompt-Based Manipulation" },
      { en: "Behavioral Red Teaming", ru: "Behavioral Red Teaming" },
    ],
    parallel: {
      human: {
        en: "Pressure → Behavioral Change → Decision → Loss",
        ru: "Давление → Изменение поведения → Решение → Потеря",
      },
      agent: {
        en: "Context Manipulation → Behavioral Change → Decision → Loss",
        ru: "Манипуляция контекстом → Изменение поведения → Решение → Потеря",
      },
    },
  },
  {
    id: "execution-governance",
    code: "03",
    status: "building",
    label: {
      en: "Financial Execution Governance",
      ru: "Управление финансовым исполнением",
    },
    title: {
      en: "Financial Execution Governance",
      ru: "Управление финансовым исполнением",
    },
    headline: {
      en: "Should this financial action actually be executed?",
      ru: "Должно ли это финансовое действие быть исполнено?",
    },
    description: {
      en: "We research pre-execution controls for autonomous financial systems.",
      ru: "Мы исследуем контроли до исполнения для автономных финансовых систем.",
    },
    question: {
      en: "What signals decide ALLOW, REVIEW or BLOCK before settlement?",
      ru: "Какие сигналы решают ALLOW, REVIEW или BLOCK до settlement?",
    },
    productNote: {
      en: "Active research and prototype direction - not a finished commercial product.",
      ru: "Активное исследование и прототип - не готовый коммерческий продукт.",
    },
    focus: [
      { en: "Financial Loss Prevention", ru: "Financial Loss Prevention" },
      { en: "Pre-Execution Risk Scoring", ru: "Pre-Execution Risk Scoring" },
      { en: "Policy Enforcement", ru: "Policy Enforcement" },
      { en: "Behavioral Firewall", ru: "Behavioral Firewall" },
      { en: "Financial Exposure", ru: "Financial Exposure" },
      { en: "Transaction Controls", ru: "Transaction Controls" },
      { en: "Circuit Breakers", ru: "Circuit Breakers" },
      { en: "Observability", ru: "Observability" },
      { en: "Allow / Review / Block", ru: "Allow / Review / Block" },
    ],
  },
  {
    id: "machine-speed",
    code: "04",
    status: "research",
    label: {
      en: "Machine-Speed & Multi-Agent Risk",
      ru: "Машинная скорость и мультиагентный риск",
    },
    title: {
      en: "Machine-Speed & Multi-Agent Risk",
      ru: "Машинная скорость и мультиагентный риск",
    },
    headline: {
      en: "What happens when autonomous agents transact and react at machine speed?",
      ru: "Что происходит, когда автономные агенты проводят операции и реагируют на скорости машин?",
    },
    description: {
      en: "We study financial risk created when autonomous agents interact with other agents, payment systems and programmable money without continuous human supervision.",
      ru: "Мы изучаем финансовый риск, возникающий когда автономные агенты взаимодействуют с другими агентами, платёжными системами и programmable money без постоянного человеческого надзора.",
    },
    question: {
      en: "As decision time approaches settlement time, where does intervention remain possible?",
      ru: "Когда время решения приближается к времени settlement, где ещё возможно вмешательство?",
    },
    focus: [
      { en: "Agent-to-Agent Interaction", ru: "Agent-to-Agent Interaction" },
      { en: "Machine-to-Machine Commerce", ru: "Machine-to-Machine Commerce" },
      { en: "Autonomous Payments", ru: "Autonomous Payments" },
      { en: "Multi-Agent Cascades", ru: "Multi-Agent Cascades" },
      { en: "Machine-Speed Escalation", ru: "Machine-Speed Escalation" },
      { en: "Systemic Risk", ru: "Systemic Risk" },
      { en: "Programmable Money", ru: "Programmable Money" },
      { en: "Stablecoin Execution", ru: "Stablecoin Execution" },
      { en: "Financial Circuit Breakers", ru: "Financial Circuit Breakers" },
    ],
  },
];

export const afsbEnvironments: Localized[] = [
  { en: "Payments", ru: "Платежи" },
  { en: "Bank Transfers", ru: "Банковские переводы" },
  { en: "E-commerce", ru: "E-commerce" },
  { en: "Invoice Payments", ru: "Оплата счетов" },
  { en: "Stablecoin Transfers", ru: "Stablecoin-переводы" },
  { en: "Trading", ru: "Торговля" },
  { en: "Agent-to-Agent Transactions", ru: "Транзакции агент–агент" },
];

export const afsbScenarios: Localized[] = [
  { en: "Context Manipulation", ru: "Context Manipulation" },
  { en: "Prompt Injection", ru: "Prompt Injection" },
  { en: "Goal Drift", ru: "Goal Drift" },
  { en: "Memory Poisoning", ru: "Memory Poisoning" },
  { en: "Tool Misuse", ru: "Tool Misuse" },
  { en: "Agent Loops", ru: "Agent Loops" },
  { en: "Counterparty Manipulation", ru: "Counterparty Manipulation" },
  { en: "Privilege / Authority Misuse", ru: "Privilege / Authority Misuse" },
  { en: "Multi-Agent Influence", ru: "Multi-Agent Influence" },
];

export const afsbMetrics: Localized[] = [
  { en: "Intent Fidelity", ru: "Intent Fidelity" },
  { en: "Attack Success Rate", ru: "Attack Success Rate" },
  { en: "Financial Loss", ru: "Financial Loss" },
  { en: "Loss Prevented", ru: "Loss Prevented" },
  { en: "False Positive Rate", ru: "False Positive Rate" },
  { en: "Intervention Rate", ru: "Intervention Rate" },
  { en: "Behavioral Deviation", ru: "Behavioral Deviation" },
];

export function getTrackById(id: string) {
  return safetyTracks.find((t) => t.id === id);
}
