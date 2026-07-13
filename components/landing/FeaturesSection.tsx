import Link from "next/link";
import AssessmentMockup from "./AssessmentMockup";

const TAGS = [
  "Prompt injection",
  "Model extraction",
  "Per-session access",
  "Dynamic policy",
  "Integrity monitoring",
  "AI supply chain",
  "Social engineering",
  "Posture data",
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white pb-20 sm:pb-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-neutral-500 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          A validated threat-mapping model scores your current security controls
          against modern AI attack patterns — and shows exactly where Zero Trust
          gaps leave you exposed.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {TAGS.map((tag) => (
            <span key={tag} className="landing-feature-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div id="how-it-works" className="max-w-5xl mx-auto">
        <div className="landing-feature-panel">
          <h2 className="text-center mb-10 sm:mb-14 px-4">
            <span className="block font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-neutral-900 leading-[1.15] tracking-[-0.03em]">
              Measure exposure
            </span>
            <span className="block font-serif italic text-[clamp(1.75rem,4vw,2.75rem)] text-neutral-900 leading-[1.15] tracking-[-0.02em]">
              without switching tools
            </span>
          </h2>

          <AssessmentMockup variant="feature" />

          <div className="flex justify-center mt-10 sm:mt-14">
            <Link href="/assessment" className="landing-cta-dark">
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
