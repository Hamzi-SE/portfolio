import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import generateMarkdownSnapshot from './plugins/generate-markdown-snapshot.js';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), generateMarkdownSnapshot()],
});
