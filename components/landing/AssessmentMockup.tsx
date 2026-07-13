interface Props {
  variant: "hero" | "feature";
}

const THREATS = [
  { name: "Prompt Injection", score: 78, color: "bg-red-400" },
  { name: "ML Model Access", score: 62, color: "bg-amber-400" },
  { name: "Exfiltration", score: 45, color: "bg-neutral-400" },
  { name: "Initial Access", score: 31, color: "bg-emerald-400" },
];

export default function AssessmentMockup({ variant }: Props) {
  const isHero = variant === "hero";

  return (
    <div
      className={
        isHero
          ? "landing-glass-card p-3 sm:p-4"
          : "landing-mockup-dark mx-auto max-w-3xl"
      }
    >
      <div
        className={
          isHero
            ? "rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950/90 backdrop-blur-xl border border-white/10"
            : "rounded-2xl sm:rounded-3xl overflow-hidden"
        }
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-neutral-900/80">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
          </div>
          <span className="flex-1 text-center text-[0.6875rem] text-neutral-500 font-mono">
            ZTA vs AI Threats — Results
          </span>
        </div>

        <div className="p-4 sm:p-6">
          {/* Score header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[0.625rem] uppercase tracking-widest text-neutral-500 mb-1">
                Overall exposure
              </p>
              <p className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                64
                <span className="text-lg text-neutral-500 font-normal ml-1">
                  /100
                </span>
              </p>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[6px] border-red-400/80 border-t-neutral-700 flex items-center justify-center">
              <span className="text-xs text-red-400 font-mono">High</span>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
            {["All threats", "Top 3", "Recommendations"].map((tab, i) => (
              <span
                key={tab}
                className={`shrink-0 text-[0.6875rem] px-3 py-1.5 rounded-full ${
                  i === 0
                    ? "bg-white text-neutral-900 font-medium"
                    : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Threat cards grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {THREATS.map((t) => (
              <div
                key={t.name}
                className="bg-neutral-800/80 rounded-xl p-3 border border-white/5"
              >
                <p className="text-[0.625rem] text-neutral-400 mb-2 line-clamp-2 leading-snug">
                  {t.name}
                </p>
                <div className="h-1 rounded-full bg-neutral-700 mb-2">
                  <div
                    className={`h-1 rounded-full ${t.color}`}
                    style={{ width: `${t.score}%` }}
                  />
                </div>
                <p className="text-[0.625rem] text-neutral-500 font-mono">
                  {t.score}% exposed
                </p>
              </div>
            ))}
          </div>

          {/* Recommendation preview */}
          <div className="mt-4 bg-neutral-800/60 rounded-xl p-3 border border-white/5">
            <p className="text-[0.625rem] uppercase tracking-wider text-neutral-500 mb-1.5">
              Priority recommendation
            </p>
            <p className="text-[0.6875rem] text-neutral-300 leading-relaxed">
              Scope access to individual sessions and, for AI workflows, to
              individual tool calls rather than blanket trust.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
