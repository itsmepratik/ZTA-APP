import type { ThreatScore } from "@/lib/types";

const TACTIC_LABELS: Record<string, string> = {
  Reconnaissance: "Reconnaissance",
  ResourceDevelopment: "Resource Development",
  InitialAccess: "Initial Access",
  MLModelAccess: "ML Model Access",
  PromptInjection: "Prompt Injection / LLM Manipulation",
  Exfiltration: "Exfiltration",
  Impact: "Impact",
  AISupplyChainCompromise: "AI Supply Chain Compromise",
};

const TENET_LABELS: Record<string, string> = {
  T1_Resources: "Resource Identification",
  T2_SecuredComms: "Secured Communications",
  T3_PerSessionAccess: "Per-Session Access",
  T4_DynamicPolicy: "Dynamic Policy",
  T5_MonitorIntegrity: "Integrity Monitoring",
  T6_DynamicAuth: "Dynamic Authentication",
  T7_PostureData: "Posture Data Collection",
};

function barClass(score: number) {
  if (score >= 66) return "exposure-bar-error";
  if (score >= 33) return "exposure-bar-moderate";
  return "exposure-bar-success";
}

export default function ThreatBreakdown({
  scores,
}: {
  scores: ThreatScore[];
}) {
  const sorted = [...scores].sort((a, b) => b.exposureScore - a.exposureScore);

  return (
    <div className="w-full space-y-base">
      {sorted.map((s) => (
        <div key={s.tactic}>
          <div className="flex justify-between text-body-sm mb-xxs">
            <span className="text-ink font-medium">
              {TACTIC_LABELS[s.tactic] ?? s.tactic}
            </span>
            <span className="text-muted font-mono text-code">
              {s.exposureScore}% exposed
            </span>
          </div>
          <div className="exposure-track">
            <div
              className={barClass(s.exposureScore)}
              style={{ width: `${s.exposureScore}%` }}
            />
          </div>
          {s.weakestTenets.length > 0 && (
            <p className="text-caption text-muted-soft mt-xxs">
              Weakest controls:{" "}
              {s.weakestTenets.map((t) => TENET_LABELS[t] ?? t).join(", ")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
