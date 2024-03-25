/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        icon: "icon 5s ease infinite",
      },
      keyframes: {
        icon: {
          "0%, 100%": {
            "background-color": "#B564B6",
          },
          "50%": {
            "background-color": "#93dfca",
          },
        },
      },
    },
  },
  plugins: [],
};
