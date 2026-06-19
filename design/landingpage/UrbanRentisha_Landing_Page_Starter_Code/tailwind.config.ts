import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ur: {
          page: "#F8FBF7",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          "card-soft": "#F1F8F2",
          border: "#DCE8DD",
          primary: "#166534",
          "primary-hover": "#14532D",
          secondary: "#0F766E",
          accent: "#84CC16",
          sand: "#F4E7C5",
          warning: "#F59E0B",
          "warning-bg": "#FFF7E6",
          error: "#DC2626",
          "error-bg": "#FEF2F2",
          success: "#16A34A",
          "success-bg": "#EAF7EE",
          navy: "#0F172A",
          "text-primary": "#0F172A",
          "text-secondary": "#475569",
          "text-muted": "#64748B",
          "text-inverse": "#FFFFFF",
          link: "#0F766E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "ur-soft": "0 20px 60px rgba(15, 23, 42, 0.08)",
        "ur-card": "0 12px 30px rgba(22, 101, 52, 0.08)",
      },
      borderRadius: {
        "ur-sm": "8px",
        ur: "12px",
        "ur-lg": "18px",
        "ur-xl": "24px",
      },
    },
  },
  plugins: [],
};

export default config;
