import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "text-secondary": "var(--color-text-secondary)",
      },
      boxShadow: {
        showcase: "0 20px 50px rgba(15, 23, 42, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
