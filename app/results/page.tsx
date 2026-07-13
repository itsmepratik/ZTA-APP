"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  getAssessment,
  getCurrentAssessmentId,
  getLatestAssessment,
  toAssessmentResult,
} from "@/lib/assessment-storage";
import type { AssessmentResult } from "@/lib/types";
import ScoreGauge from "@/components/ScoreGauge";
import ThreatBreakdown from "@/components/ThreatBreakdown";
import RecommendationList from "@/components/RecommendationList";

function ResultsContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [completedAt, setCompletedAt] = useState<string | null>(null);

  useEffect(() => {
    const id =
      searchParams.get("id") ??
      getCurrentAssessmentId() ??
      getLatestAssessment()?.id;

    if (!id) return;

    const stored = getAssessment(id);
    if (!stored) return;

    setResult(toAssessmentResult(stored));
    setCompletedAt(stored.completedAt);
  }, [searchParams]);

  if (!result) {
    return (
      <main className="page-shell flex flex-col items-center justify-center px-base text-center">
        <p className="text-body-md text-muted mb-base">
          No assessment data found.
        </p>
        <div className="flex flex-col sm:flex-row gap-sm">
          <Link href="/assessment" className="btn-primary">
            Take the assessment
          </Link>
          <Link href="/assessments" className="btn-secondary">
            View saved assessments
          </Link>
        </div>
      </main>
    );
  }

  const topThreats = [...result.threatScores]
    .sort((a, b) => b.exposureScore - a.exposureScore)
    .slice(0, 3);

  const formattedDate = completedAt
    ? new Date(completedAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <main className="page-shell py-section">
      <div className="content-container max-w-3xl space-y-section">
        <header className="text-center">
          <p className="text-section-label mb-xs">Assessment Complete</p>
          <h1 className="text-display-md mb-lg">
            Your Zero Trust vs. AI Threat Exposure
          </h1>
          {formattedDate && (
            <p className="text-caption text-muted mb-lg">
              Completed {formattedDate}
            </p>
          )}
          <ScoreGauge
            score={result.overallExposure}
            label="Overall AI threat exposure"
          />
        </header>

        <section className="feature-card">
          <h2 className="text-title-md mb-base">
            Most exposed threat categories
          </h2>
          <ThreatBreakdown scores={topThreats} />
        </section>

        <section className="feature-card">
          <h2 className="text-title-md mb-base">Full breakdown</h2>
          <ThreatBreakdown scores={result.threatScores} />
        </section>

        <RecommendationList scores={result.threatScores} />

        <footer className="text-center pt-xl hairline-divider space-y-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-sm">
            <Link href="/assessment" className="btn-tertiary text-body-sm">
              Retake assessment
            </Link>
            <Link href="/assessments" className="btn-tertiary text-body-sm">
              View all assessments
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <main className="page-shell flex flex-col items-center justify-center px-base text-center">
          <p className="text-body-md text-muted">Loading results…</p>
        </main>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
