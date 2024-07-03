/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          "white-l": "#F2F4F6",
          white: "#FFFFFF",
          blue: "#161D6F",
          "blue-dark": "#0A0E3F",
          green: "#1EE3CF",
          purple: "#6B48FF",
        },
      },
      fontFamily: {
        noor: ["NOOR"],
      },
    },
  },
  plugins: [],
};
