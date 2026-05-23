import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: __dirname,
  plugins: [react({ jsxRuntime: 'classic' })],
  resolve: {
    alias: {
      'react-planner': path.resolve(__dirname, '../src/index'),
    },
  },
  server: {
    port: 9000,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  assetsInclude: ['**/*.mtl', '**/*.obj'],
  define: {
    global: 'globalThis',
  },
});
