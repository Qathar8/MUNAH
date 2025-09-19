/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0B0B0B',
          muted: '#7A7A7A',
        },
        accent: {
          gold: '#D4AF37',
          whatsapp: '#24A54B',
        },
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};