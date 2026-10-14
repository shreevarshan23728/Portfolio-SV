/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dimension: {
          950: '#030305',
          900: '#07070c',
          850: '#0b0c14',
          800: '#11131e',
          700: '#1c1f2e',
          silver: '#e2e8f0',
          chrome: '#cbd5e1',
        },
        neon: {
          cyan: '#00f0ff',
          violet: '#8a2be2',
          electric: '#0066ff',
          emerald: '#00ffaa',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        'widest-plus': '0.3em',
        'ultra': '0.5em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
