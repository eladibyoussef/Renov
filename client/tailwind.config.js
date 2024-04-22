/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customBlue:'#E3F5FF',
        customGrey:'#B5B7C0',
        customPurple:'#0C0A67'
      }
    },
    fontFamily : {
      inter : [ "Inter", "sans-serif"],
      Outfit : [ "Outfit", 'sans-serif'],
      Poppins : [ "Poppins", "sans-serif"]

    }
  },
  plugins: [],
}

