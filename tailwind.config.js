/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "body-bg-light": "#e0e7ff",
        primary: "#6366f1",
        secondary: "#312e81",

        "body-bg-dark": "#1e293b",
        "secondary-dark": "#e0e7ff",
      },
    },
    container: {
      center: true,
      padding: "16px",
    },
    fontFamily: {
      sans: ["'Nunito'", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
