import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "10.10.102.125",
    host: "10.10.102.104",
    port: 5173,
  },
})
