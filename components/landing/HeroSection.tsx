import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-sky" aria-hidden />
      <div className="landing-hero-hills" aria-hidden />

      <div className="relative z-10 flex flex-col items-center pt-36 sm:pt-44 pb-0 px-4">
        <p className="flex items-center gap-2 text-white/80 text-sm font-medium mb-8">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-white/10">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 1.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11z" />
            </svg>
          </span>
          SME Security Readiness
        </p>

        <h1 className="text-center text-white max-w-3xl">
          <span className="block font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.04em]">
            Assess once.
          </span>
          <span className="block font-serif italic text-[clamp(2.5rem,7vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] mt-1">
            Know your gaps.
          </span>
        </h1>

        <p className="mt-6 text-center text-white/75 text-base sm:text-lg max-w-xl leading-relaxed font-sans">
          Score your Zero Trust posture against AI-powered threats — prompt
          injection, model extraction, and AI-assisted social engineering — using
          a validated model built on MITRE ATLAS and NIST SP 800-207.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Link href="/assessment" className="landing-cta-pill">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM7.25 4.5v3.25H4.5v1.5h2.75V12h1.5V9.25H11.5v-1.5H8.75V4.5h-1.5z" />
            </svg>
            Start Assessment
          </Link>
          <p className="text-white/50 text-xs sm:text-sm">
            21 questions &middot; ~5 minutes &middot; No data leaves your browser
          </p>
        </div>

        <div className="w-full max-w-4xl mt-14 sm:mt-20">
        </div>
      </div>

      <div className="landing-hero-fade" aria-hidden />
    </section>
  );
}
