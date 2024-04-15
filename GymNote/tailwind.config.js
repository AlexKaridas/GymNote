/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/app.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      background: "#212129",
      foreground: "#4c5265",
      secondary: "#323949",
      third: "#3d3e51",
      fourth: "#40445a",
      fifth: "#243B55",
      sixth: "#141E30",
      seventh: "#101725",
      white: "#ffffff",
      black: "#000000",
      red: "#FF0000",
      purple: "#7856ff",
      green: "#008000",
      gradientStart: "hsla(288, 20%, 75%, 1)",
      gradientEnd: "hsla(197, 65%, 42%, 1)",
      lightGreen: "#17b6b7",
      overlay: "rgba(42, 40, 40, 0.5)",
    },
    backgroundImage: {
      gradient:
        "linear-gradient(90deg, hsla(288, 20%, 75%, 1) 0%, hsla(197, 65%, 42%, 1) 100%)",
    },
  },
  plugins: [],
};
