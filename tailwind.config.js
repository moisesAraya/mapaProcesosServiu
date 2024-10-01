/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'serviu-blue': '#0054a6',
        'serviu-blue-light': '#0072ce',
        'serviu-blue-dark': '#003e7e',
        'estrategico-start': '#c0392b',
        'estrategico-end': '#e74c3c',
        'operacional-start': '#2980b9',
        'operacional-end': '#3498db',
        'soporte-start': '#27ae60',
        'soporte-end': '#2ecc71',
      },
      backgroundImage: theme => ({
        'estrategico-gradient': `linear-gradient(135deg, ${theme('colors.estrategico-start')} 0%, ${theme('colors.estrategico-end')} 100%)`,
        'operacional-gradient': `linear-gradient(135deg, ${theme('colors.operacional-start')} 0%, ${theme('colors.operacional-end')} 100%)`,
        'soporte-gradient': `linear-gradient(135deg, ${theme('colors.soporte-start')} 0%, ${theme('colors.soporte-end')} 100%)`,
      }),
      boxShadow: {
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-hover': '0 6px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
