import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/', // Root path for custom domain
  build: {
    outDir: 'docs',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router'],
          three: ['three', '@react-three/fiber', '@react-three/drei']
        }
      }
    }
  }
})
