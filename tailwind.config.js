/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        charcoal: "#1A1A1C",
        slate: "#2C2C2E",
        ash: "#54545A",
        fog: "#8A8A8E",
        mist: "#C9C8C3",
        bone: "#F4F3EF",
        paper: "#FFFFFF",
        tag: "#FF5A1F",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      boxShadow: {
        card: "0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.12)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
