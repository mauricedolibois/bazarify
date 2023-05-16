/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Pacifico', 'serif'],
      },
      colors: {
        ourPrimaryColor: "#DEAE31",     //bg-yellow-500
        ourLightGray: "#D8D8D8",        //text-gray-300
        ourDarkGray: "#5E5E5E",         //text-gray-700
        ourGray: "#A6A6A6",             //text-gray-400
        ourBackgroundColor: "#f5f5f5",  //bg-gray-100
        ourSuperDarkGray: "#303030",    //text-gray-900
        ourPrimaryColorHover: "#CC9E28" //bg-yellow-600
      }
    },
  },
  plugins: [],
}