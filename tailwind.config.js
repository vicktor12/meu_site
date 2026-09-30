/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#03060D',
        ink: { 900: '#060C18', 800: '#0A1322', 700: '#101B30' },
        neon: { DEFAULT: '#22E5FF', dim: '#7DEFFF' },
        volt: '#3B82F6',
        amber: { signal: '#FFB547' },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [
    ({ addVariant }) => addVariant('pointer-fine', '@media (pointer: fine)'),
  ],
}
