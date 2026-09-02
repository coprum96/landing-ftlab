export type Localized = { en: string; ru: string };

export type GateDecision = "ALLOW" | "REVIEW" | "BLOCK";

export type SignalLevel = "low" | "medium" | "high";

export type ControlScenario = {
  id: string;
  label: Localized;
  intent: Localized;
  agent: Localized;
  action: Localized;
  signals: {
    intentFidelity: SignalLevel;
    behavioralRisk: SignalLevel;
    contextRisk: SignalLevel;
    authority: SignalLevel;
    exposure: SignalLevel;
  };
  decision: GateDecision;
  rationale: Localized;
};

/** Conceptual pre-execution demo scenarios - not live model output. */
export const controlScenarios: ControlScenario[] = [
  {
    id: "aligned",
    label: {
      en: "Aligned transfer",
      ru: "Согласованный перевод",
    },
    intent: {
      en: "Pay the listed vendor invoice within the approved limit.",
      ru: "Оплатить указанный счёт поставщика в пределах лимита.",
    },
    agent: {
      en: "Agent prepares a transfer matching the invoice and mandate.",
      ru: "Агент готовит перевод, соответствующий счёту и мандату.",
    },
    action: {
      en: "Transfer €1,840 to known vendor IBAN.",
      ru: "Перевод €1,840 на известный IBAN поставщика.",
    },
    signals: {
      intentFidelity: "high",
      behavioralRisk: "low",
      contextRisk: "low",
      authority: "high",
      exposure: "low",
    },
    decision: "ALLOW",
    rationale: {
      en: "Intent, authority and exposure stay inside the mandate. No behavioral or context anomaly.",
      ru: "Намерение, полномочия и экспозиция остаются в рамках мандата. Нет поведенческой или контекстной аномалии.",
    },
  },
  {
    id: "goal-drift",
    label: {
      en: "Goal drift",
      ru: "Дрейф цели",
    },
    intent: {
      en: "Settle one approved invoice. Nothing else.",
      ru: "Оплатить один утверждённый счёт. Ничего больше.",
    },
    agent: {
      en: "Agent expands the task: also prepay the next month to 'optimize cashflow'.",
      ru: "Агент расширяет задачу: ещё и предоплата за следующий месяц для 'оптимизации'.",
    },
    action: {
      en: "Transfer €1,840 + €4,200 prepayment to same vendor.",
      ru: "Перевод €1,840 + предоплата €4,200 тому же поставщику.",
    },
    signals: {
      intentFidelity: "low",
      behavioralRisk: "high",
      contextRisk: "medium",
      authority: "medium",
      exposure: "high",
    },
    decision: "REVIEW",
    rationale: {
      en: "The action is partially authorized, but no longer faithful to the original intent. Human confirmation is required.",
      ru: "Действие частично авторизовано, но больше не верно исходному намерению. Нужно подтверждение человека.",
    },
  },
  {
    id: "context-manip",
    label: {
      en: "Context manipulation",
      ru: "Манипуляция контекстом",
    },
    intent: {
      en: "Pay the vendor only after normal verification.",
      ru: "Платить поставщику только после обычной проверки.",
    },
    agent: {
      en: "Urgent counterparty message claims the IBAN changed and payment must happen now.",
      ru: "Срочное сообщение контрагента: IBAN сменился, платёж нужен немедленно.",
    },
    action: {
      en: "Transfer €1,840 to a new IBAN under time pressure.",
      ru: "Перевод €1,840 на новый IBAN под давлением времени.",
    },
    signals: {
      intentFidelity: "low",
      behavioralRisk: "high",
      contextRisk: "high",
      authority: "medium",
      exposure: "high",
    },
    decision: "BLOCK",
    rationale: {
      en: "Context risk and behavioral change dominate. Authorization alone is not enough to let execution proceed.",
      ru: "Доминируют контекстный риск и изменение поведения. Одной авторизации недостаточно для исполнения.",
    },
  },
];

export const signalLabels: Record<
  keyof ControlScenario["signals"],
  Localized
> = {
  intentFidelity: { en: "Intent Fidelity", ru: "Верность намерению" },
  behavioralRisk: { en: "Behavioral Risk", ru: "Поведенческий риск" },
  contextRisk: { en: "Context Risk", ru: "Контекстный риск" },
  authority: { en: "Authority Fit", ru: "Соответствие полномочиям" },
  exposure: { en: "Financial Exposure", ru: "Финансовая экспозиция" },
};
