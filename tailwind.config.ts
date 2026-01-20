/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#FFFFFF",
          dark: "#18191A",
          accent: "#9E9E9E",
        },
      },
      fontFamily: {
        rajdhani: ["var(--font-rajdhani)", "system-ui", "sans-serif"],
      },
      keyframes: {
        heroSwap: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        heroSwap: "heroSwap 700ms ease-out both",
      },
    },
  },
  plugins: [],
};
