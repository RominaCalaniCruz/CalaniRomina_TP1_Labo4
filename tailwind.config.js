/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFAE7E',
        secondary: '#4A2359',
        tertiary: '#14eb80',
        accent: '#2b2d2f',
        background: '#1a1a2e',
      },
      
      fontFamily: {
        sans: ['"Playpen"', 'sans-serif'],
        bonie: ['"Bonie"', 'sans-serif'],
        playpen: ['"Playpen"', 'sans-serif']
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideOutDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        slideInUp: 'slideInUp 0.3s ease-out',
        slideOutDown: 'slideOutDown 0.3s ease-in',
      },
    },
  },
  plugins: [
    require('flowbite/plugin') 
  ],
}

