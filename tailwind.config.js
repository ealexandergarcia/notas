/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./client/index.html",
      "./client/src/**/*.{js,ts,jsx,tsx,css,vue}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'box': "url('/client/src/assets/img/box.svg')",
          'footer-texture': "url('/img/footer-texture.png')",
        },
        colors: {
          'custom-green': {
            DEFAULT: '#285430',
            light: '#5F8D4E',
            dark: '#1A3A1E',
          },
          'custom-black': {
            DEFAULT: '#181C32'
          },
          'custom-grey': {
            DEFAULT: '#C9C9C9',
            light: '#FAFAFA'
          },
          // Puedes agregar más colores personalizados si es necesario
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  