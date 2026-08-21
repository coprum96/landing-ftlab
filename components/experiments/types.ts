export type ExperimentPhase =
  | "intro"
  | "stage1"
  | "stage2"
  | "broken"
  | "completed"
  | "anatomy";

export type SignalKey =
  | "urgency"
  | "loss"
  | "authority"
  | "forcedFlow"
  | "cognitiveLoad"
  | "commitment"
  | "timePressure";

export type SignalState = Record<SignalKey, boolean>;

/** Two short stages — easier to finish on mobile. */
export const STAGE_DURATION = {
  stage1: 30,
  stage2: 15,
} as const;

export const EMPTY_SIGNALS: SignalState = {
  urgency: false,
  loss: false,
  authority: false,
  forcedFlow: false,
  cognitiveLoad: false,
  commitment: false,
  timePressure: false,
};
