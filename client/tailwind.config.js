/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 
  theme: {
    extend: {

      colors:{
        customBlue:'#F9FBFF',
        customGrey:'#B5B7C0',
        customPurple:'#0C0A67',
       primary : "#265073",
        secondary: "#2D9596",
         loginBackground :"#2B6673"

      }
    },
    fontFamily : {
      inter : [ "Inter", "sans-serif"],
      Outfit : [ "Outfit", 'sans-serif'],
      Poppins : [ "Poppins", "sans-serif"],
      cursive: ["Allura" , "cursive"]


    },
       container: {
        center: true,
        padding: {
          default: "1rem",
          sm: "3rem",
        }
      }

  },
  plugins: [

  ],

}