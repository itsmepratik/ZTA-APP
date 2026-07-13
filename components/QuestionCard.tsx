"use client";

import type { ImplementationLevel } from "@/lib/types";

interface Props {
  questionNumber: number;
  totalQuestions: number;
  text: string;
  value: ImplementationLevel | null;
  onAnswer: (level: ImplementationLevel) => void;
}

const OPTIONS: { level: ImplementationLevel; label: string; hint: string }[] = [
  {
    level: "Implemented",
    label: "Yes, fully",
    hint: "This is in place and consistently enforced",
  },
  {
    level: "Partial",
    label: "Partially",
    hint: "Some coverage exists but it's inconsistent or incomplete",
  },
  {
    level: "Absent",
    label: "No",
    hint: "This is not currently in place",
  },
];

export default function QuestionCard({
  questionNumber,
  totalQuestions,
  text,
  value,
  onAnswer,
}: Props) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="w-full max-w-xl mx-auto feature-card">
      <div className="flex justify-between items-center mb-base text-caption text-muted">
        <span>
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="font-mono text-code">{Math.round(progress)}%</span>
      </div>

      <div className="progress-track mb-xl">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <h2 className="text-title-md mb-xl leading-snug">{text}</h2>

      <div className="space-y-sm">
        {OPTIONS.map((opt) => (
          <button
            key={opt.level}
            onClick={() => onAnswer(opt.level)}
            className={`option-row ${
              value === opt.level ? "option-row-selected" : ""
            }`}
          >
            <div className="text-title-sm">{opt.label}</div>
            <div className="text-body-sm text-muted mt-xxs">{opt.hint}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
