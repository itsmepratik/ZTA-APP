import matrixData from "@/data/matrix.json";
import type {
  MatrixRow,
  Tenet,
  ImplementationLevel,
  ThreatScore,
  AssessmentResult,
  Coverage,
} from "./types";
 
const matrix = matrixData as MatrixRow[];
 
// Numeric weights: how much a gap at this tenet contributes to exposure
// Full coverage = tenet fully mitigates the tactic if implemented
// Partial = tenet only partially mitigates even if implemented
// None = tenet implementation is irrelevant to this tactic
const COVERAGE_WEIGHT: Record<Coverage, number> = {
  Full: 1.0,
  Partial: 0.5,
  None: 0,
};
 
const IMPLEMENTATION_SCORE: Record<ImplementationLevel, number> = {
  Implemented: 1.0,
  Partial: 0.5,
  Absent: 0,
};
 
/**
 * For a single tactic, exposure = 100 - (weighted mitigation achieved)
 * Weighted mitigation sums each tenet's (coverage_weight * implementation_score),
 * normalised against the maximum possible mitigation for that tactic.
 */
function scoreTactic(
  row: MatrixRow,
  tenetLevels: Record<Tenet, ImplementationLevel>
): ThreatScore {
  const tenets = Object.keys(row.coverage) as Tenet[];
 
  let achieved = 0;
  let maxPossible = 0;
  const tenetContribution: { tenet: Tenet; gap: number }[] = [];
 
  for (const tenet of tenets) {
    const coverageWeight = COVERAGE_WEIGHT[row.coverage[tenet]];
    const implementation = IMPLEMENTATION_SCORE[tenetLevels[tenet]];
 
    achieved += coverageWeight * implementation;
    maxPossible += coverageWeight;
 
    // gap = how much this tenet SHOULD contribute but currently doesn't
    const gap = coverageWeight * (1 - implementation);
    tenetContribution.push({ tenet, gap });
  }
 
  const mitigationRatio = maxPossible > 0 ? achieved / maxPossible : 0;
  const exposureScore = Math.round((1 - mitigationRatio) * 100);
 
  // rank tenets contributing most to exposure, top 2
  const weakestTenets = tenetContribution
    .sort((a, b) => b.gap - a.gap)
    .filter((t) => t.gap > 0)
    .slice(0, 2)
    .map((t) => t.tenet);
 
  return {
    tactic: row.tactic,
    exposureScore,
    weakestTenets,
  };
}
 
export function runAssessment(
  tenetLevels: Record<Tenet, ImplementationLevel>
): AssessmentResult {
  const threatScores = matrix.map((row) => scoreTactic(row, tenetLevels));
 
  const overallExposure = Math.round(
    threatScores.reduce((sum, t) => sum + t.exposureScore, 0) /
      threatScores.length
  );
 
  return {
    tenetLevels,
    threatScores,
    overallExposure,
  };
}
