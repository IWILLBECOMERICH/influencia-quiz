/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        'neon': '#00ffc8',
        'neon-dark': '#00a878',
        'neon2': '#7c3aed',
        'gold': '#f59e0b',
        'hot': '#ff3d71',
        'success': '#00e676',
        'bg-dark': '#050510',
        'card-bg': 'rgba(12,12,30,0.9)',
        'border-color': 'rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #00ffc8, #00a878)',
        'gold-gradient': 'linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)',
        'neon2-gradient': 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.4s ease',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 200, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 200, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
      },
    },
  },
  plugins: [],
}
