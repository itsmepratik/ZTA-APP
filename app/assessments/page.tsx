"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  deleteAssessment,
  getAssessments,
  type StoredAssessment,
} from "@/lib/assessment-storage";
import { exposureColor } from "@/lib/design-tokens";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<StoredAssessment[]>([]);

  useEffect(() => {
    setAssessments(getAssessments());
  }, []);

  function handleDelete(id: string) {
    deleteAssessment(id);
    setAssessments(getAssessments());
  }

  return (
    <main className="page-shell py-section">
      <div className="content-container max-w-3xl space-y-section">
        <header className="text-center">
          <p className="text-section-label mb-xs">History</p>
          <h1 className="text-display-md mb-base">Saved Assessments</h1>
          <p className="text-body-sm text-muted max-w-md mx-auto">
            Your completed assessments are stored locally in this browser and
            persist across sessions.
          </p>
        </header>

        {assessments.length === 0 ? (
          <div className="feature-card text-center py-xxl">
            <p className="text-body-md text-muted mb-base">
              No saved assessments yet.
            </p>
            <Link href="/assessment" className="btn-primary">
              Take your first assessment
            </Link>
          </div>
        ) : (
          <ul className="space-y-base">
            {assessments.map((assessment) => {
              const { textClass } = exposureColor(assessment.overallExposure);

              return (
                <li key={assessment.id} className="feature-card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-base">
                    <div className="min-w-0">
                      <p className="text-caption text-muted mb-xs">
                        {formatDate(assessment.completedAt)}
                      </p>
                      <p className="text-title-sm mb-xs">
                        Overall exposure:{" "}
                        <span className={textClass}>
                          {assessment.overallExposure}/100
                        </span>
                      </p>
                      <p className="text-body-sm text-muted">
                        Top threat: {assessment.topThreat}
                      </p>
                    </div>

                    <div className="flex items-center gap-sm shrink-0">
                      <Link
                        href={`/results?id=${assessment.id}`}
                        className="btn-primary"
                      >
                        View results
                      </Link>
                      <button
                        onClick={() => handleDelete(assessment.id)}
                        className="btn-secondary"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <footer className="text-center pt-xl hairline-divider">
          <Link href="/assessment" className="btn-tertiary text-body-sm">
            Take new assessment
          </Link>
        </footer>
      </div>
    </main>
  );
}
