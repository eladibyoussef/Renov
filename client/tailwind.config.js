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
        customGrey:'#807A75',
        customPurple:'#0C0A67'
      }
    },
    fontFamily : {
      inter : [ "Inter", "sans-serif"],
      Outfit : [ "Outfit", 'sans-serif']
    }
  },
  plugins: [],
}

