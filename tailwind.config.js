/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#8E7AB5",
        secondary: "#B784B7",
        white: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        primary: ["Roboto", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
