import { colors, exposureColor } from "@/lib/design-tokens";

interface Props {
  score: number;
  label: string;
}

export default function ScoreGauge({ score, label }: Props) {
  const { fill, textClass } = exposureColor(score);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={colors.hairlineSoft}
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={fill}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-display-sm font-normal ${textClass}`}>
            {score}
          </span>
        </div>
      </div>
      <p className="text-caption text-muted mt-sm text-center max-w-[8rem]">
        {label}
      </p>
    </div>
  );
}
