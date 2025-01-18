/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js,ts}", "./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#8E7AB5",
        secondary: "#B784B7",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
