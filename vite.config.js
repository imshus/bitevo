import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Domains the dev/preview server may be reached on (besides localhost)
const allowedHosts = ['bitevo.in', 'www.bitevo.in'];

export default defineConfig({
  plugins: [react()],
  server: { port: 2000, strictPort: true, allowedHosts },
  preview: { port: 2000, strictPort: true, allowedHosts },
});
