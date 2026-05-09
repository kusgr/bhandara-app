/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Baloo 2', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      colors: {
        saffron: {
          50:  '#fff8ed',
          100: '#ffefd5',
          200: '#ffdba8',
          300: '#ffc171',
          400: '#ff9d38',
          500: '#ff7d0f',
          600: '#f05f05',
          700: '#c74406',
          800: '#9e360d',
          900: '#7f2e0e',
        },
        turmeric: {
          400: '#f5c842',
          500: '#f0b429',
        },
        leafgreen: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        }
      }
    },
  },
  plugins: [],
}
