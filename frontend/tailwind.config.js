/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      sm: "320px",
      md: "375px",
      lg: "425px",
      tb: "768px",
    },
    extend: {
      keyframes: {
        fadeout: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-200%)" },
        },
        opening: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        rotateLine: {
          "0%": {
            transform: "rotateX(0deg) rotateY(-0deg)",
          },
          "100%": {
            transform: "rotateX(90deg) rotateY(90deg)",
          },
        },
      },
      animation: {
        opening: "opening 0.5s",
        fadeout: "fadeout 0.1s",
        rotating: "rotateLine 0.5s",
      },
    },
  },
  plugins: [],
};
