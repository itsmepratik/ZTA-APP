// Core types for the ZTA vs AI Threats Readiness Tool
 
export type Coverage = "Full" | "Partial" | "None";
 
export type Tenet =
  | "T1_Resources"
  | "T2_SecuredComms"
  | "T3_PerSessionAccess"
  | "T4_DynamicPolicy"
  | "T5_MonitorIntegrity"
  | "T6_DynamicAuth"
  | "T7_PostureData";
 
export type AtlasTactic =
  | "Reconnaissance"
  | "ResourceDevelopment"
  | "InitialAccess"
  | "MLModelAccess"
  | "PromptInjection"
  | "Exfiltration"
  | "Impact"
  | "AISupplyChainCompromise";
 
// One row of the validated threat-mapping matrix
export interface MatrixRow {
  tactic: AtlasTactic;
  coverage: Record<Tenet, Coverage>;
  rationale: string; // short justification, used in results page tooltips
}
 
// A single assessment question, mapped to the tenet it evaluates
export interface Question {
  id: string;
  tenet: Tenet;
  text: string;
  // user answer maps directly to an implementation level for that tenet
}
 
export type ImplementationLevel = "Implemented" | "Partial" | "Absent";
 
export interface Answer {
  questionId: string;
  level: ImplementationLevel;
}
 
// Output: per-tactic exposure score after scoring engine runs
export interface ThreatScore {
  tactic: AtlasTactic;
  exposureScore: number; // 0 (fully covered) to 100 (fully exposed)
  weakestTenets: Tenet[]; // tenets driving the exposure, for recommendations
}
 
export interface AssessmentResult {
  tenetLevels: Record<Tenet, ImplementationLevel>;
  threatScores: ThreatScore[];
  overallExposure: number;
}
