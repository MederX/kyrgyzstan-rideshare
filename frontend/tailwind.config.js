/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tg: {
          blue: "#2AABEE",
          bg: "#efeff4",
        },
      },
    },
  },
  plugins: [],
};
