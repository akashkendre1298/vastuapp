import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove TypeScript test configuration if not using TypeScript
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // Ensure this file is in JavaScript
  }
});
