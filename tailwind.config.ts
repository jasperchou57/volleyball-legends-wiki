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
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        border: "var(--border)",
        accent: {
          blue: "#3b82f6",
          indigo: "#6366f1",
        },
        "accent-navy": "var(--accent-navy)",
        "accent-orange": "var(--accent-orange)",
        "accent-teal": "var(--accent-teal)",
        "accent-gold": "var(--accent-gold)",
        "surface-raised": "var(--surface-raised)",
        muted: "#9ca3af",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
