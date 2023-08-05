const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.slate[50],
        secondary: colors.slate[900],
        'on-primary': colors.slate[900],
        'on-secondary': colors.slate[50],
        'on-primary-light': colors.gray[500],
        'action-primary': colors.blue[800],
        'action-primary-active': colors.blue[600],
        'action-invalid': colors.red[500],
        'action-destructive': colors.red[800],
        'action-destructive-active': colors.red[600],
        'primary-hover': colors.gray[200],
        'primary-accent': colors.gray[100],
        'primary-accent-border': colors.gray[300],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        defined: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px -1px 3px rgba(0, 0, 0, 0.25)',
        'defined-inset':
          'inset 0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px -1px 3px rgba(0, 0, 0, 0.25)',
      },
      gridTemplateColumns: {
        'auto-fill-card-md': 'repeat(auto-fill, 386px)',
        'custom-1': '1fr 1fr 1fr 3fr 5rem',
        'custom-2': '3fr 2fr 1fr 7.5rem',
        '2-by-2': '10rem 1fr 1fr',
        'custom-3': '1fr 1fr 2.5rem',
        'custom-4': '2fr 4fr 1fr 2.5rem',
        'custom-5': '1fr 1fr 5rem',
        'chess-board': 'repeat(8, 1fr)',
      },
      gridTemplateRows: {
        'chess-board': 'repeat(8, 1fr)',
      },
      animation: {
        'bounce-d-1': 'bounce 1s infinite .1s',
        'bounce-d-2': 'bounce 1s infinite .2s',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
