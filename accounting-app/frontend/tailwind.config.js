/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#1A80AA',
          'primary-dark': '#163C6C',
          secondary: '#25638C',
          surface: '#F7F9FB',
          white: '#FFFFFF',
          border: '#D8E1E8',
          text: {
            dark: '#10243A',
            medium: '#5C6B7A',
            light: '#7B8A97',
          },
        },
      },
      spacing: {
        'page': '24px',
      },
      shadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '8px',
        'input': '6px',
      },
    },
  },
  plugins: [],
}
