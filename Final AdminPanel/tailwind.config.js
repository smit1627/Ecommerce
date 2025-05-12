/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // required for dark mode to work
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2d3748', // Custom gray
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        floatUp: 'floatUp 10s linear infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { bottom: '-10%', opacity: '0', transform: 'translateX(0) scale(1)' },
          '30%': { opacity: '0.6' },
          '100%': { bottom: '110%', opacity: '0', transform: 'translateX(-10px) scale(1.3)' },
        },
      },
    },
  },
  plugins: [],
};
