module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      main: 'calc(100vh - 40px)',
    },
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Lato', 'san-serif'],
      },
      colors: {
        gray: {
          100: '#EAEBEC',
          200: '#caccce',
          300: '#959a9d',
          400: '#5f6366',
          500: '#313335',
          600: '#141515',
        },
        blue: {
          100: '#E4E9F1',
          200: '#BBC9DD',
          300: '#859EC1',
          400: '#4D6D9A',
          500: '#293A51',
          600: '#0E131B',
        },
        lightBlue: {
          100: '#E1ECF4',
          200: '#C4DAE9',
          300: '#86B3D1',
          400: '#4385B1',
          500: '#274E68',
          600: '#0B161E',
        },
        green: {
          100: '#E2F1F3',
          200: '#C6E4E7',
          300: '#99CED3',
          400: '#54ADB6',
          500: '#316D72',
          600: '#0C1B1D',
        },
        pink: {
          100: '#FBEFF1',
          200: '#F3CED5',
          300: '#E79CAA',
          400: '#DB6B80',
          500: '#C5304B',
          600: '#21080D',
        },
      },
      backgroundSize: {
        '1.5rem': '1.5rem',
      },
      backgroundPosition: {
        'left-1rem': 'center left 1rem',
        'right-1rem': 'center right 1rem',
      },
    },
  },
  variants: {
    extend: {
      pointerEvents: ['disabled'],
    },
  },
  plugins: [],
};
