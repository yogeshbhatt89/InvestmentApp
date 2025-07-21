import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL, // http://localhost:8080
        changeOrigin: true, // Ensure the Origin header matches the target
        secure: false, // Disable SSL verification for local development
        rewrite: path => path.replace(/^\/api/, '/api'), // Preserve the /api prefix
      },
      '/auth': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
      '/investments': {
        target: process.env.VITE_API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@modules': '/src/modules',
    },
  },
})
