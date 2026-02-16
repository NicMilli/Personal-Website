import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        pastel: {
          pink: "#FFD6E0",
          blue: "#C1E3FF",
          purple: "#E0C3FC",
          green: "#C1F0C1",
          yellow: "#FFF3C4",
          peach: "#FFDAB9",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
