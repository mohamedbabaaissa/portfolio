import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 5173,
      // While developing, /api is forwarded to the backend, so the cookie stays on one address.
      proxy: { '/api': env.VITE_PROXY_TARGET || 'http://localhost:3001' },
    },
  };
});
