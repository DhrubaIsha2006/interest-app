// tailwind.config.js
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lavender: '#F0F1F7',
        brand: '#5B5FC7',      // primary purple
        muted: '#6b7280',
        bg: '#F0F1F7'
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px'
      },
      boxShadow: {
        'card': '0 10px 40px rgba(15,23,42,0.06)'
      },
      container: { center: true, padding: '1rem' }
    }
  },
  plugins: []
}
