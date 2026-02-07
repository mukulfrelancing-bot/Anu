[file name]: tailwind.config.js
[file content begin]
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'cursive': ['Dancing Script', 'cursive'],
        'elegant': ['Great Vibes', 'cursive'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 20s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'scan-line': 'scan-line 2s linear infinite',
        'whisper-float': 'whisper-float 3.5s forwards',
        'spin-slow': 'spin-slow 8s linear infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'scale-up': 'scale-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'unfurl': 'unfurl 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '20%': { opacity: '0.5' },
          '80%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-20vh) rotate(360deg)', opacity: '0' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'whisper-float': {
          '0%': { transform: 'translate(-50%, 20px)', opacity: '0' },
          '10%': { transform: 'translate(-50%, 0)', opacity: '1' },
          '90%': { transform: 'translate(-50%, 0)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -20px)', opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-up': {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        unfurl: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
          },
  },
  plugins: [],
}
  [file content end]
  
