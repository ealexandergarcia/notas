import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root:'client',
  server: {
    port: 3000, // Puedes cambiar el puerto si lo deseas
    open: true, // Abre el navegador automáticamente
  },
  build: {
    outDir: 'dist', // Directorio de salida para la construcción
  },
  resolve: {
    alias: {
      '@': '/src', // Alias para facilitar la importación de módulos
    },
  },
})