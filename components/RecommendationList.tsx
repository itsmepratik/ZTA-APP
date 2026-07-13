import type { ThreatScore } from "@/lib/types";

const TENET_RECOMMENDATIONS: Record<string, string> = {
  T1_Resources:
    "Formally inventory and classify all AI models, APIs, and datasets as protected resources.",
  T2_SecuredComms:
    "Enforce mutual authentication and encryption for all service-to-service traffic, including AI-to-database calls.",
  T3_PerSessionAccess:
    "Scope access to individual sessions and, for AI workflows, to individual tool calls rather than blanket trust.",
  T4_DynamicPolicy:
    "Introduce context-aware policy enforcement that reacts to anomalous request volume or behaviour.",
  T5_MonitorIntegrity:
    "Extend integrity monitoring beyond device health to include AI output behaviour and model drift.",
  T6_DynamicAuth:
    "Apply strict, continuous authentication to non-human identities such as AI agents and service accounts.",
  T7_PostureData:
    "Log AI prompts, tool calls, and responses in sufficient detail to support post-incident investigation.",
};

export default function RecommendationList({
  scores,
}: {
  scores: ThreatScore[];
}) {
  const topThreats = [...scores]
    .sort((a, b) => b.exposureScore - a.exposureScore)
    .slice(0, 3);

  const tenetSet = new Set<string>();
  topThreats.forEach((t) => t.weakestTenets.forEach((tn) => tenetSet.add(tn)));

  const recommendations = Array.from(tenetSet)
    .map((t) => TENET_RECOMMENDATIONS[t])
    .filter(Boolean);

  if (recommendations.length === 0) return null;

  return (
    <section className="feature-card">
      <h3 className="text-title-md mb-base">Priority Recommendations</h3>
      <ol className="space-y-sm">
        {recommendations.map((rec, i) => (
          <li
            key={i}
            className="flex gap-base text-body-sm text-body bg-canvas-soft border border-hairline rounded-lg px-base py-sm"
          >
            <span className="text-ink font-mono text-code shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{rec}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
