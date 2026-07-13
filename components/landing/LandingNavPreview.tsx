import type { ReactNode } from "react";

type PreviewItem = {
  label: string;
  meta: string;
  category: string;
  score?: number;
  severity?: "critical" | "high" | "medium" | "info";
  icon: ReactNode;
  accent: string;
  bar?: string;
};

const PREVIEW_ITEMS: PreviewItem[] = [
  {
    label: "Prompt Injection",
    meta: "78% exposed",
    category: "Threat",
    score: 78,
    severity: "critical",
    accent: "from-red-500/40 via-red-500/10 to-transparent",
    bar: "bg-gradient-to-r from-red-500 to-orange-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path
          d="M4 5.5h12M4 9h8M4 12.5h10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="15.5" cy="12.5" r="2.5" fill="currentColor" opacity="0.9" />
      </svg>
    ),
  },
  {
    label: "Per-Session Access",
    meta: "Weakest tenet",
    category: "Tenet",
    severity: "high",
    accent: "from-amber-400/40 via-amber-400/10 to-transparent",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect
          x="5"
          y="9"
          width="10"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7.5 9V7a2.5 2.5 0 015 0v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="10" cy="12.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "NIST 800-207",
    meta: "7 tenets scored",
    category: "Standard",
    severity: "info",
    accent: "from-blue-400/40 via-blue-400/10 to-transparent",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path
          d="M6 3.5h8l2.5 2.5V16.5H6V3.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M14 3.5V6h2.5M8 10h4M8 13h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "MITRE ATLAS",
    meta: "8 tactics mapped",
    category: "Framework",
    severity: "info",
    accent: "from-emerald-400/40 via-emerald-400/10 to-transparent",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="3" y="3" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11.5" y="3" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="11.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Model Extraction",
    meta: "62% exposed",
    category: "Threat",
    score: 62,
    severity: "high",
    accent: "from-orange-400/40 via-orange-400/10 to-transparent",
    bar: "bg-gradient-to-r from-orange-500 to-amber-400",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path
          d="M10 3v10M10 13l-3.5 3.5M10 13l3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 7.5h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const SEVERITY_STYLES = {
  critical: "bg-red-500/20 text-red-300 border-red-400/30",
  high: "bg-amber-500/20 text-amber-200 border-amber-400/30",
  medium: "bg-orange-500/20 text-orange-200 border-orange-400/30",
  info: "bg-blue-500/15 text-blue-200 border-blue-400/25",
};

function PreviewCard({ item }: { item: PreviewItem }) {
  return (
    <article className="landing-nav-preview-card group">
      <div
        className={`landing-nav-preview-card-glow bg-gradient-to-br ${item.accent}`}
        aria-hidden
      />
      <div className="landing-nav-preview-card-inner">
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <span className="landing-nav-preview-category">{item.category}</span>
          {item.severity && (
            <span
              className={`landing-nav-preview-severity ${SEVERITY_STYLES[item.severity]}`}
            >
              {item.severity}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="landing-nav-preview-icon">{item.icon}</div>
          <div className="min-w-0 flex-1">
            <p className="landing-nav-preview-label">{item.label}</p>
            <p className="landing-nav-preview-meta font-mono">{item.meta}</p>
          </div>
        </div>

        {item.score !== undefined && item.bar && (
          <div className="mt-3">
            <div className="landing-nav-preview-bar-track">
              <div
                className={`landing-nav-preview-bar-fill ${item.bar}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function LandingNavPreview() {
  const loop = [...PREVIEW_ITEMS, ...PREVIEW_ITEMS];

  return (
    <div className="landing-nav-preview hidden sm:block">
      <div className="landing-nav-preview-chrome" aria-hidden />
      <div className="landing-nav-preview-header">
        <div className="flex items-center gap-2">
          <span className="landing-nav-preview-live" aria-hidden />
          <span className="landing-nav-preview-live-label">Live feed</span>
        </div>
        <span className="landing-nav-preview-header-meta font-mono">
          5 signals · 8 tactics tracked
        </span>
      </div>

      <div className="landing-nav-preview-viewport">
        <div className="landing-nav-preview-track">
          {loop.map((item, i) => (
            <PreviewCard key={`${item.label}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
