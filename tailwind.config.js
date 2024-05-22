/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "form-row": "1fr 2fr 1fr",
      },
    },
  },
  plugins: [],
};
