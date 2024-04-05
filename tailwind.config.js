/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      BTN: "#D6B751",
      Error: "#EC2424",
      beige: "#E4E6C3",
      purple: "#DD35FF",
      purpleActive: "#D710FF"
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "forest", "business", "coffee", "black"],
  },
};
