/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 
  theme: {
    extend: {
      colors: {
        primary : "#265073",
        secondary: "#2D9596",
      },
      fontFamily:{
        cursive: ["Allura" , "cursive"],
      },
      container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "3rem",
        }
      }
    },
  },
  plugins: [],

}