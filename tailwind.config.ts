import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Government Navy & Blue palette
        gov: {
          navy: "#0F1E36",        // Dark navy sidebar
          navyLight: "#182C4E",
          navyDark: "#0A1424",
          blue: "#0B4F9C",        // Government blue primary
          blueHover: "#083C77",
          blueLight: "#EBF3FC",
          gold: "#D97706",        // Saffron / gold accent for badges
          border: "#D1D5DB",
          bg: "#F8FAFC",          // Slate background
          card: "#FFFFFF",
          text: "#1E293B",
          muted: "#64748B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
