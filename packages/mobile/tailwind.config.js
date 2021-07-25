module.exports = {
  darkMode: 'class',
  purge: {
    content: ['./src/**/*.tsx', './src/**/*.jsx'],
  },
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    },
    extend: {
      fontSize: {
        tiny: '0.625rem',
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      colors: {
        black: '#191414',
        // Template
        green: {
          300: '#1aa64b',
          500: '#1db954',
          700: '#1ed760',
          800: '#4ac776',
          900: '#81fba6',
          950: '#b6ffd8',
        },
        teal: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          300: '#81E6D9',
          400: '#08e6e6',
          500: '#3ABAB4',
          600: '#319795',
          700: '#2C7A7B',
          800: '#285E61',
          900: '#234E52',
        },
      },

      lineHeight: {
        tighter: '1.15',
      },
      outline: {
        'no-chrome': 'none',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
    // Template added
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    translate: ['responsive', 'hover', 'focus', 'group-hover'],
    boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
  },
};
