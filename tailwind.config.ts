import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        tech: {
          dark: '#0F172A',
          gray: '#1E293B',
          light: '#334155',
          accent: '#06B6D4',
          neon: '#4ADE80',
          highlight: '#0EA5E9'
        },
        matrix: {
          green: '#00FF41',
          dark: '#002800',
          light: '#00BB41',
          glow: '#0FFF50',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(10, 37, 64, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 37, 64, 0.8) 1px, transparent 1px)',
        'tech-pattern': 'radial-gradient(#0EA5E9 1px, transparent 1px)',
        'matrix-rain': 'linear-gradient(180deg, #0F172A 0%, #064E3B 100%)',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.matrix.green"), 0 0 20px theme("colors.matrix.green")',
        'neon-strong': '0 0 10px theme("colors.matrix.green"), 0 0 30px theme("colors.matrix.green"), 0 0 50px theme("colors.matrix.green")',
        'cyber': '0 0 0 1px rgba(6, 182, 212, 0.05), 0 4px 20px rgba(6, 182, 212, 0.15)',
        'cyber-strong': '0 0 0 1px rgba(6, 182, 212, 0.1), 0 8px 30px rgba(6, 182, 212, 0.25)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'matrix-glow': 'matrix-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'matrix-glow': {
          '0%, 100%': { boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41' },
          '50%': { boxShadow: '0 0 15px #00FF41, 0 0 30px #00FF41' },
        },
      },
    },
  },
  plugins: [],
}

export default config 