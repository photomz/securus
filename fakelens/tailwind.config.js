/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
  darkMode: 'class',
  purge: {
    content: ['./src/**/*.tsx', './public/index.html'],
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
        button: 'var(--color-button-text)',
        transparent: 'transparent',
        primary: {
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          'washed-out': 'var(--color-secondary-washed-out)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          disabled: 'var(--color-accent-disabled)',
        },
        black: '#191414',
        // Template
        gray: {
          100: '#FBFBFB',
          200: '#EAEAEA',
          300: '#DFDFDF',
          400: '#999999',
          500: '#7F7F7F',
          600: '#666666',
          700: '#4C4C4C',
          800: '#333333',
          900: '#191919',
        },
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

      boxShadow: {
        outlineLg: '0 0 0 4pt var(--color-primary-800)',
        outlineMd: '0 0 0 2pt var(--color-primary-800)',
        outlineSm: '0 0 0 1pt var(--color-primary-800)',
      },
      borderColor: {
        'color-800': 'var(--color-primary-800)',
      },
      outline: {
        'no-chrome': 'none',
      },
      transitionTimingFunction: {
        'in-out-hard': 'cubic-bezier(.77, 0, .175, 1)',
      },
      transitionDuration: {
        400: '400ms',
      },
      keyframes: {
        breathe: {
          '0%, 100%': {
            boxShadow: '0 0 20px 2px var(--color-primary-100-translucent)',
            borderColor: 'var(--color-primary-300)',
          },
          '50%': {
            boxShadow: '0 0 20px 2px transparent',
            borderColor: 'var(--color-primary-700)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
      },
      animation: {
        'breathe-slow': 'breathe 5s infinite ease-in-out',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  variants: {
    scrollbar: ['rounded', 'dark'],
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
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')],
};
