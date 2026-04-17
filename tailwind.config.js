/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0B1E3F',
          800: '#0F2554',
          700: '#1E3A8A',
          500: '#3B82F6',
          300: '#93C5FD',
          100: '#DBEAFE',
        },
        space: {
          950: '#010810',
          900: '#020B18',
          800: '#051020',
          700: '#0A1628',
          600: '#0F1F35',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
