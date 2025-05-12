import { defineConfig } from 'vite'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL, // http://localhost:8080
        changeOrigin: true, // Ensure the Origin header matches the target
        secure: false, // Disable SSL verification for local development
        rewrite: path => path.replace(/^\/api/, '/api'), // Preserve the /api prefix
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
