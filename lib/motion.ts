/**
 * Central motion intensity / timing knobs.
 * Tune these to adjust feel without hunting through components.
 */
export const motion = {
  /** Hero entrance (~1–1.2s total) */
  hero: {
    lineDuration: 0.75,
    lineStagger: 0.1,
    lineEase: "power4.out",
    descriptionDelay: 0.35,
    descriptionDuration: 0.6,
    metaDelay: 0.55,
    metaDuration: 0.5,
    cursorMaxX: 3,
    cursorMaxY: 2,
    lightOpacity: 0.03,
  },

  /** Choose Direction — origin → divergence */
  chooseDirection: {
    revealDuration: 0.75,
    hoverDuration: 0.5,
    pointerInfluence: 0.012,
  },

  /** Background decision network canvas */
  network: {
    nodeMin: 40,
    nodeMax: 80,
    connectDistance: 155,
    lineOpacityMin: 0.02,
    lineOpacityMax: 0.12,
    cursorRadius: 150,
    cursorMaxDisplace: 7,
    driftAmplitude: 18,
    signalDurationMs: [700, 1200] as const,
    signalIntervalMs: [8000, 16000] as const,
  },

  /**
   * Agentic Execution Lattice — directed financial control mesh.
   * Distinct from Human Decision Network (organic constellation).
   */
  agenticField: {
    laneCount: 7,
    laneCountMd: 5,
    laneCountTouch: 4,
    packetMax: 10,
    packetSpeed: 0.22,
    gateHoldMs: 280,
    a2aDistance: 120,
    cursorCorridor: 48,
    cursorRadius: 56,
  },

  /** Scroll reveals */
  reveal: {
    start: "top 80%",
    numberDuration: 0.4,
    titleDuration: 0.7,
    contentDuration: 0.6,
    contentY: 16,
  },

  /** Decision Network section stages */
  stages: {
    mutedOpacity: 0.35,
    activeOpacity: 1,
    microY: -2,
    microScale: 1.01,
  },

  /** Research / project cards */
  card: {
    imageScale: 1.025,
    imageDuration: 0.6,
    borderDefault: "rgba(255,255,255,0.12)",
    borderHover: "rgba(255,255,255,0.28)",
    metaMove: 3,
    arrowMove: 7,
    parallaxMax: 5,
    tiltMax: 1,
  },

  /** Links */
  link: {
    textShift: 2,
    arrowShift: 7,
    duration: 0.28,
  },

  /** Page transitions */
  page: {
    panelDuration: 0.45,
    fadeDuration: 0.45,
  },

  /** Header */
  header: {
    scrollThreshold: 64,
    hideDelta: 8,
  },
} as const;
