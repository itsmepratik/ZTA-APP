"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import questionsData from "@/data/questions.json";
import QuestionCard from "@/components/QuestionCard";
import { saveAssessment } from "@/lib/assessment-storage";
import type { Question, Tenet, ImplementationLevel } from "@/lib/types";

const questions = questionsData as Question[];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ImplementationLevel>>(
    {}
  );

  const current = questions[currentIndex];

  function handleAnswer(level: ImplementationLevel) {
    const updated = { ...answers, [current.id]: level };
    setAnswers(updated);

    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      const tenetAnswers: Record<Tenet, ImplementationLevel[]> = {} as Record<
        Tenet,
        ImplementationLevel[]
      >;
      questions.forEach((q) => {
        const answer = updated[q.id];
        if (!tenetAnswers[q.tenet]) tenetAnswers[q.tenet] = [];
        if (answer) tenetAnswers[q.tenet].push(answer);
      });

      const levelScore: Record<ImplementationLevel, number> = {
        Implemented: 1,
        Partial: 0.5,
        Absent: 0,
      };

      const tenetLevels: Record<string, ImplementationLevel> = {};
      (Object.keys(tenetAnswers) as Tenet[]).forEach((tenet) => {
        const vals = tenetAnswers[tenet];
        const avg =
          vals.reduce((sum, v) => sum + levelScore[v], 0) / vals.length;
        tenetLevels[tenet] =
          avg >= 0.75 ? "Implemented" : avg >= 0.25 ? "Partial" : "Absent";
      });

      const stored = saveAssessment(
        tenetLevels as Record<Tenet, ImplementationLevel>
      );
      router.push(`/results?id=${stored.id}`);
    }
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  return (
    <main className="page-shell flex flex-col items-center justify-center py-section px-base sm:px-xl">
      <QuestionCard
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        text={current.text}
        value={answers[current.id] ?? null}
        onAnswer={handleAnswer}
      />
      {currentIndex > 0 && (
        <button onClick={handleBack} className="btn-tertiary mt-xl">
          ← Back
        </button>
      )}
    </main>
  );
}
