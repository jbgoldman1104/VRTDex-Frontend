/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "#0a0c26",
        sec: "#45A2ED"
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}

