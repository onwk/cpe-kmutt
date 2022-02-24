// tailwind.config.js
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      // textColor: {
      //   'base': '#25273A',
      //   'white': '#FFFFFF',
      // },
      //  fontFamily: {
      // //   // 'sans': ['ui-sans-serif', 'system-ui', ...],
      // //   // 'serif': ['ui-serif', 'Georgia', ...],
         'mono': ['ui-monospace', 'SFMono-Regular'],
      //     'base': ['Quicksand'],
      //   },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
  }
