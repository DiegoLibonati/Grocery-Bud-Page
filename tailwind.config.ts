import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./*.{html,js,ts,jsx,tsx}", "./src/**/*.{html,js,ts,jsx,tsx}"],
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

export default config;
