import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "../../packages/shared/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#f8dfe5",
        rose: "#ce8d98",
        champagne: "#f7f0df",
        ivory: "#fffdf8",
        gold: "#c7a464",
        ink: "#332c2a"
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui"
        ],
        serif: [
          "var(--font-serif)",
          "Georgia",
          "serif"
        ]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(74, 56, 47, 0.08)"
      },
      backgroundImage: {
        shimmer:
          "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(247,240,223,0.9) 46%, rgba(248,223,229,0.9))"
      }
    }
  },
  plugins: []
};

export default config;

