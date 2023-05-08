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
        ourPrimaryColor: "#DEAE31",
        ourLightGray: "#D8D8D8",
        ourDarkGray: "#5E5E5E",
        ourGray: "#A6A6A6",
        ourBackgroundColor: "#f5f5f5"
      }
    },
  },
  plugins: [],
}