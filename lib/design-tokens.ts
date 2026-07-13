/** Design tokens from DESIGN.md — single source for programmatic use. */

export const colors = {
  primary: "#f54e00",
  primaryActive: "#d04200",
  ink: "#26251e",
  body: "#5a5852",
  bodyStrong: "#26251e",
  muted: "#807d72",
  mutedSoft: "#a09c92",
  hairline: "#e6e5e0",
  hairlineSoft: "#efeee8",
  hairlineStrong: "#cfcdc4",
  canvas: "#f7f7f4",
  canvasSoft: "#fafaf7",
  surfaceCard: "#ffffff",
  surfaceStrong: "#e6e5e0",
  onPrimary: "#ffffff",
  timelineThinking: "#dfa88f",
  timelineGrep: "#9fc9a2",
  timelineRead: "#9fbbe0",
  timelineEdit: "#c0a8dd",
  timelineDone: "#c08532",
  semanticError: "#cf2d56",
  semanticSuccess: "#1f8a65",
} as const;

export const spacing = {
  xxs: "4px",
  xs: "8px",
  sm: "12px",
  base: "16px",
  md: "20px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  section: "80px",
} as const;

export const rounded = {
  none: "0px",
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  pill: "9999px",
} as const;

/** Exposure score colors — semantic only, not timeline pastels. */
export function exposureColor(score: number): {
  fill: string;
  textClass: "text-semantic-success" | "text-muted" | "text-semantic-error";
} {
  if (score >= 66) return { fill: colors.semanticError, textClass: "text-semantic-error" };
  if (score >= 33) return { fill: colors.muted, textClass: "text-muted" };
  return { fill: colors.semanticSuccess, textClass: "text-semantic-success" };
}
