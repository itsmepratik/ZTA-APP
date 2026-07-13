const FRAMEWORKS = [
  { name: "MITRE ATLAS", detail: "AI threat taxonomy" },
  { name: "NIST SP 800-207", detail: "Zero Trust Architecture" },
  { name: "7 ZTA Tenets", detail: "Implementation scoring" },
  { name: "8 AI Tactics", detail: "Exposure mapping" },
  { name: "SME Focus", detail: "Practical controls" },
  { name: "Browser-only", detail: "No data collection" },
];

export default function TrustBadges() {
  return (
    <section id="frameworks" className="bg-white py-16 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-16">
          {FRAMEWORKS.map((f) => (
            <li key={f.name} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center mb-2">
                <span className="text-[0.625rem] font-bold text-neutral-400 tracking-wider">
                  {f.name.split(" ")[0].slice(0, 3).toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-semibold text-neutral-800">
                {f.name}
              </span>
              <span className="text-[0.6875rem] text-neutral-400 mt-0.5">
                {f.detail}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="text-center max-w-2xl mx-auto">
          <span className="block font-display text-[clamp(2rem,5vw,3.25rem)] font-bold text-neutral-900 leading-[1.1] tracking-[-0.03em]">
            Your posture,
          </span>
          <span className="block font-serif italic text-[clamp(2rem,5vw,3.25rem)] text-neutral-900 leading-[1.1] tracking-[-0.02em]">
            wherever it matters
          </span>
        </h2>
      </div>
    </section>
  );
}
