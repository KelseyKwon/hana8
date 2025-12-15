import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // tailwind 등을 꽂아줄 수 있다
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
});
