import { runAssessment } from "@/lib/scoring";
import type { AssessmentResult, ImplementationLevel, Tenet } from "@/lib/types";

const STORAGE_KEY = "zta-assessments";
const CURRENT_ID_KEY = "zta-current-assessment-id";

export interface StoredAssessment {
  id: string;
  completedAt: string;
  tenetLevels: Record<Tenet, ImplementationLevel>;
  overallExposure: number;
  topThreat: string;
}

function readAll(): StoredAssessment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredAssessment[];
  } catch {
    return [];
  }
}

function writeAll(assessments: StoredAssessment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
}

export function getAssessments(): StoredAssessment[] {
  return readAll().sort(
    (a, b) =>
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
}

export function getAssessment(id: string): StoredAssessment | null {
  return readAll().find((a) => a.id === id) ?? null;
}

export function getLatestAssessment(): StoredAssessment | null {
  const sorted = getAssessments();
  return sorted[0] ?? null;
}

export function getCurrentAssessmentId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CURRENT_ID_KEY);
}

export function saveAssessment(
  tenetLevels: Record<Tenet, ImplementationLevel>
): StoredAssessment {
  const result = runAssessment(tenetLevels);
  const topThreat = [...result.threatScores].sort(
    (a, b) => b.exposureScore - a.exposureScore
  )[0];

  const stored: StoredAssessment = {
    id: crypto.randomUUID(),
    completedAt: new Date().toISOString(),
    tenetLevels,
    overallExposure: result.overallExposure,
    topThreat: topThreat?.tactic ?? "Unknown",
  };

  const assessments = readAll();
  assessments.push(stored);
  writeAll(assessments);
  localStorage.setItem(CURRENT_ID_KEY, stored.id);

  return stored;
}

export function deleteAssessment(id: string) {
  const assessments = readAll().filter((a) => a.id !== id);
  writeAll(assessments);

  if (localStorage.getItem(CURRENT_ID_KEY) === id) {
    localStorage.removeItem(CURRENT_ID_KEY);
  }
}

export function toAssessmentResult(
  stored: StoredAssessment
): AssessmentResult {
  return runAssessment(stored.tenetLevels);
}
