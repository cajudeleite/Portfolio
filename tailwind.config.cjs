/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ca5e04',
          50: '#fffbea',
          100: '#fff5c5',
          200: '#ffeb86',
          300: '#ffda48',
          400: '#ffc71d',
          500: '#fca504',
          600: '#e07c00',
          700: '#ca5e04',
          800: '#96420a',
          900: '#7b360c'
        },
        secondary: {
          DEFAULT: '#399b1b',
          50: '#effce9',
          100: '#ddf8cf',
          200: '#bcf1a5',
          300: '#91e670',
          400: '#6bd744',
          500: '#4cbc26',
          600: '#399b1b',
          700: '#2d7219',
          800: '#275b19',
          900: '#244d1a'
        },
        dark: {
          DEFAULT: '#093361',
          50: '#edfaff',
          100: '#d6f2ff',
          200: '#b6eaff',
          300: '#84dfff',
          400: '#4acaff',
          500: '#20acff',
          600: '#088eff',
          700: '#0276f3',
          800: '#095ec4',
          900: '#093361'
        },
        light: {
          DEFAULT: '#ecece8',
          50: '#f7f7f5',
          100: '#ecece8',
          200: '#d8d7d0',
          300: '#bfbfb2',
          400: '#a5a392',
          500: '#928f7d',
          600: '#868170',
          700: '#706b5e',
          800: '#5c5850',
          900: '#4c4942'
        }
      },
      fontFamily: {
        exan: ["EXAN", "sans-serif"],
        nunito: ["Nunito", "sans-serif"]
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
