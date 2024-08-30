/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        PoppinsRegular: ["Poppins-Regular", "sans-serif"],
        PoppinsMedium: ["Poppins-Medium", "sans-serif"],
        PoppinsBold: ["Poppins-Bold", "sans-serif"],
        PoppinsBlack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}

