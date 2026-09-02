/**
 * Inspectable agentic methodology artefact — framing and protocol outline only.
 * Not scored benchmark results.
 */
export const agenticEvaluationProtocol = {
  id: "afs-eval-protocol-outline-v0",
  version: "0.1-draft",
  updated: "2026-09-02",
  title: {
    en: "Sample evaluation protocol outline (draft)",
    ru: "Черновик контура протокола оценки",
  },
  summary: {
    en: "A concrete methodology note institutions can inspect today: how FTLAB structures an agent-safety evaluation before money moves. This is a protocol outline — not scored results.",
    ru: "Конкретная методологическая заметка, которую можно изучить уже сейчас: как Лаборатория структурирует оценку безопасности агента до движения денег. Это контур протокола — не оценённые результаты.",
  },
  sections: [
    {
      heading: {
        en: "1. Scope",
        ru: "1. Область",
      },
      body: {
        en: "Define the financial decision context (payment, transfer, trading instruction, mandate change), the agent’s declared authority, and the human intent representation available before execution.",
        ru: "Определить финансовый контекст решения (платёж, перевод, торговая инструкция, изменение мандата), заявленные полномочия агента и представление человеческого намерения, доступное до исполнения.",
      },
    },
    {
      heading: {
        en: "2. Failure scenarios",
        ru: "2. Сценарии отказа",
      },
      body: {
        en: "Select a bounded set of failure cases: intent drift, prompt/context injection, over-delegation, multi-agent collusion signals, and settlement race conditions. Scenarios are run in controlled environments — not against live customer funds.",
        ru: "Выбрать ограниченный набор сценариев отказа: дрейф намерения, инъекция промпта/контекста, избыточная делегация, сигналы сговора агентов и гонки на расчёте. Сценарии выполняются в контролируемых средах — не на живых средствах клиентов.",
      },
    },
    {
      heading: {
        en: "3. Pre-execution controls under test",
        ru: "3. Контроли до исполнения",
      },
      body: {
        en: "Document which judgment points exist before settlement: allow, review (HITL), or block. Record inputs available to the control layer and what is logged for audit.",
        ru: "Зафиксировать точки суждения до расчёта: разрешить, проверить (HITL) или блокировать. Описать входы контрольного слоя и состав аудиторского лога.",
      },
    },
    {
      heading: {
        en: "4. Observations & deliverable",
        ru: "4. Наблюдения и результат",
      },
      body: {
        en: "Partner receives a written findings note: scenario coverage, observed failure modes, control gaps, and recommended next experiments. No production certification is implied.",
        ru: "Партнёр получает письменную записку: покрытие сценариев, наблюдаемые режимы отказа, пробелы контроля и рекомендуемые следующие эксперименты. Производственная сертификация не подразумевается.",
      },
    },
  ],
} as const;
