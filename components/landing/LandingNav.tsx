import Link from "next/link";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Frameworks", href: "#frameworks" },
  { label: "Features", href: "#features" },
];

export default function LandingNav() {
  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex flex-col items-center px-4 gap-2">
      <nav className="landing-nav">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="landing-nav-logo" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M12 2L4 7v10l8 5 8-5V7L12 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 12l8-5M12 12L4 7M12 12v10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="text-white font-medium text-sm tracking-tight">
            ZTA Readiness
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="landing-nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Link href="/assessment" className="landing-nav-cta">
          Start
        </Link>
      </nav>
    </header>
  );
}
