import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ur: {
          bg: "#060B0A",
          "bg-soft": "#0B1512",
          card: "#0E1A16",
          "card-hover": "#12241D",
          border: "#1F352B",
          "border-strong": "#2E5A45",
          primary: "#16A34A",
          "primary-hover": "#15803D",
          mint: "#34D399",
          cyan: "#22D3EE",
          warning: "#F59E0B",
          success: "#22C55E",
          "success-bg": "#0D2818",
          text: "#F8FAFC",
          muted: "#94A3B8",
          subtle: "#64748B"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        "green-glow": "0 0 70px rgba(22, 163, 74, 0.24)",
        "soft-dark": "0 24px 80px rgba(0, 0, 0, 0.35)",
        "image-glow": "0 28px 90px rgba(22, 163, 74, 0.22)"
      },
      borderRadius: {
        "ur-sm": "8px",
        ur: "12px",
        "ur-lg": "18px",
        "ur-xl": "28px"
      }
    }
  },
  plugins: []
};

export default config;
