import { describe, it, expect } from "vitest";
import { runAssessment } from "../lib/scoring";
import type { Tenet, ImplementationLevel } from "../lib/types";
 
const allTenets: Tenet[] = [
  "T1_Resources",
  "T2_SecuredComms",
  "T3_PerSessionAccess",
  "T4_DynamicPolicy",
  "T5_MonitorIntegrity",
  "T6_DynamicAuth",
  "T7_PostureData",
];
 
function makeLevels(level: ImplementationLevel) {
  return Object.fromEntries(allTenets.map((t) => [t, level])) as Record<
    Tenet,
    ImplementationLevel
  >;
}
 
describe("runAssessment", () => {
  it("gives 0 exposure when fully implemented, except ResourceDevelopment which stays 100 by design", () => {
    const result = runAssessment(makeLevels("Implemented"));
    result.threatScores.forEach((s) => {
      if (s.tactic === "ResourceDevelopment") {
        // ZTA has zero coverage for this tactic (all tenets rated "None"),
        // so implementation level cannot affect it — exposure is fixed at 100
        expect(s.exposureScore).toBe(100);
      } else {
        expect(s.exposureScore).toBe(0);
      }
    });
  });
 
  it("gives 100 exposure across all tactics when every tenet is absent", () => {
    const result = runAssessment(makeLevels("Absent"));
    result.threatScores.forEach((s) => expect(s.exposureScore).toBe(100));
    expect(result.overallExposure).toBe(100);
  });
 
  it("ResourceDevelopment stays 100 exposure regardless of tenet implementation, since ZTA has no coverage for it", () => {
    const fullyImplemented = runAssessment(makeLevels("Implemented"));
    const rd = fullyImplemented.threatScores.find(
      (s) => s.tactic === "ResourceDevelopment"
    );
    // all coverage weights are 0 for this tactic, so maxPossible = 0,
    // mitigationRatio defaults to 0, exposure = 100
    expect(rd?.exposureScore).toBe(100);
  });
 
  it("PromptInjection remains high exposure even with strong auth/comms, since those tenets don't cover it", () => {
    const levels = makeLevels("Absent");
    levels.T6_DynamicAuth = "Implemented";
    levels.T2_SecuredComms = "Implemented";
    const result = runAssessment(levels);
    const pi = result.threatScores.find((s) => s.tactic === "PromptInjection");
    // T6 and T2 have "None" coverage for PromptInjection, so implementing them
    // should not reduce this tactic's exposure at all
    expect(pi?.exposureScore).toBe(100);
  });
 
  it("InitialAccess exposure drops significantly when strong auth and secured comms are implemented", () => {
    const levels = makeLevels("Absent");
    levels.T6_DynamicAuth = "Implemented";
    levels.T2_SecuredComms = "Implemented";
    const result = runAssessment(levels);
    const ia = result.threatScores.find((s) => s.tactic === "InitialAccess");
    expect(ia!.exposureScore).toBeLessThan(100);
  });
 
  it("identifies the correct weakest tenets for a partially covered tactic", () => {
    const levels = makeLevels("Implemented");
    levels.T5_MonitorIntegrity = "Absent";
    const result = runAssessment(levels);
    const recon = result.threatScores.find(
      (s) => s.tactic === "Reconnaissance"
    );
    expect(recon?.weakestTenets).toContain("T5_MonitorIntegrity");
  });
});
 








