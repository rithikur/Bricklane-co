/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#1e1e1b',
        'neutral-grey': '#8c8c8c',
        'light-grey': '#cccccc',
      },
      fontFamily: {
        'display': ['"Red Hat Display"', 'sans-serif'],
      },
      borderRadius: {
        'std': '4px',
      }
    },
  },
  plugins: [],
}
