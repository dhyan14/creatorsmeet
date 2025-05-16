/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        dark: {
          900: '#0f172a',
          800: '#1e293b', 
          700: '#334155',
          600: '#475569',
        },
        glow: {
          green: '#22c55e',
        }
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgba(34, 197, 94, 0.5)',
        'glow-md': '0 0 15px rgba(34, 197, 94, 0.5)',
        'glow-lg': '0 0 25px rgba(34, 197, 94, 0.5)',
      },
      backgroundImage: {
        'dark-glow': 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15), transparent 50%)',
      },
    },
  },
  plugins: [],
} 