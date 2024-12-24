import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures the built files go to the 'dist' folder
  },
})

// npm run dev -- --port 8000  frontend
