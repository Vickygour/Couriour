import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    host: true,          // same as 0.0.0.0 (simple & recommended)
    port: 5174,
  },


  build: {
    target: 'es2022', // modern JS support (top-level await safe)
  },
});
