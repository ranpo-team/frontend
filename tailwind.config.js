/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        toastIn: {
          '0%': { opacity: 0, transform: 'translateY(1rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        toastOut: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(1rem)' },
        },
      },
      animation: {
        toastIn: 'toastIn 0.3s ease-out forwards',
        toastOut: 'toastOut 0.3s ease-in forwards',
      },
    },
  },
  plugins: [],
};
