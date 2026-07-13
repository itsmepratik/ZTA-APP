/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f54e00",
          active: "#d04200",
        },
        ink: "#26251e",
        body: {
          DEFAULT: "#5a5852",
          strong: "#26251e",
        },
        muted: {
          DEFAULT: "#807d72",
          soft: "#a09c92",
        },
        hairline: {
          DEFAULT: "#e6e5e0",
          soft: "#efeee8",
          strong: "#cfcdc4",
        },
        canvas: {
          DEFAULT: "#f7f7f4",
          soft: "#fafaf7",
        },
        surface: {
          card: "#ffffff",
          strong: "#e6e5e0",
        },
        "on-primary": "#ffffff",
        timeline: {
          thinking: "#dfa88f",
          grep: "#9fc9a2",
          read: "#9fbbe0",
          edit: "#c0a8dd",
          done: "#c08532",
        },
        semantic: {
          error: "#cf2d56",
          success: "#1f8a65",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-mega": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.135rem", fontWeight: "400" }],
        "display-lg": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.045rem", fontWeight: "400" }],
        "display-md": ["1.625rem", { lineHeight: "1.25", letterSpacing: "-0.0203125rem", fontWeight: "400" }],
        "display-sm": ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.006875rem", fontWeight: "400" }],
        "title-md": ["1.125rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        "title-sm": ["1rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
        "body-md": ["1rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "400" }],
        "caption-uppercase": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.055rem", fontWeight: "600" }],
        code: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" }],
        button: ["0.875rem", { lineHeight: "1", letterSpacing: "0", fontWeight: "500" }],
        "nav-link": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "500" }],
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        base: "16px",
        md: "20px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        section: "80px",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        pill: "9999px",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
