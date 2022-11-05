/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors:{
      'ungu' : '#AD67C8',
      'oren-login' : '#DC9B23',
      'abu-abu' : '#ECEEF0',
      'ijo-login' : '#5E8782',
      'pink-login' : '#E795AB',
      'ijo-header' : '#61CFC2'
    },
       rotate: {
        '360': '360deg',
      },
      width: {
        '128' : '32rem'
      },
      height: {
        '128': '32rem',
      }
    }
  },
  plugins: [],
}