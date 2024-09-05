import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '10.10.102.125',
    port: 5173,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'public/ssl/server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'public/ssl/server.crt')),
    // },    
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'public/ssl/10.10.102.125-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'public/ssl/10.10.102.125.pem')),
    // },
    // proxy: {
    //   '/api': {
    //     target: 'http://10.10.102.48:8080',
    //     changeOrigin: true,
    //     secure: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
});
