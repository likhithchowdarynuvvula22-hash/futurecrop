/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#f7f9f7',
          100: '#f4ebd9',
          200: '#e9d5b8',
          300: '#dbc194',
          400: '#c9a96f',
          500: '#b8924b',
          600: '#a67c3c',
          700: '#8b6530',
          800: '#6f4f27',
          900: '#5a3f1f',
          950: '#2e1f0f',
        },
        forest: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce4bc',
          300: '#8ed08e',
          400: '#5ab55a',
          500: '#2e8b57',
          600: '#236b42',
          700: '#1d5535',
          800: '#19442b',
          900: '#153924',
          950: '#0a1f11',
        },
        gold: {
          50: '#fefbf0',
          100: '#fdf4d9',
          200: '#fae8b2',
          300: '#f6d980',
          400: '#f1c54d',
          500: '#e4a11b',
          600: '#d08b15',
          700: '#ac6b14',
          800: '#8c5318',
          900: '#734418',
          950: '#422309',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
