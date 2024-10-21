import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'client',
  server: {
    port: 3000, // Puedes cambiar el puerto si lo deseas
    open: true, // Abre el navegador automáticamente
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'private.key')), // Ruta a tu clave privada
      cert: fs.readFileSync(path.resolve(__dirname, 'certificate.crt')), // Ruta a tu certificado
    },
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