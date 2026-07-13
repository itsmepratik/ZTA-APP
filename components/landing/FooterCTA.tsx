import Link from "next/link";

export default function FooterCTA() {
  return (
    <section className="bg-white py-20 sm:py-28 px-4 border-t border-neutral-100">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="mb-6">
          <span className="block font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-neutral-900 leading-[1.15] tracking-[-0.03em]">
            Ready to find
          </span>
          <span className="block font-serif italic text-[clamp(1.75rem,4vw,2.5rem)] text-neutral-900 leading-[1.15] tracking-[-0.02em]">
            your gaps?
          </span>
        </h2>
        <p className="text-neutral-500 mb-8 max-w-md mx-auto">
          21 questions. Five minutes. A clear picture of where Zero Trust
          leaves you exposed to AI threats.
        </p>
        <Link href="/assessment" className="landing-cta-dark">
          Start Assessment
        </Link>
      </div>
    </section>
  );
}
