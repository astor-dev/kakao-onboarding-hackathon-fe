import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { copyFileSync } from 'fs';
import { join } from 'path';


const fullRepoName = process.env.GITHUB_REPOSITORY; 
const base = fullRepoName ? `/${fullRepoName.split('/')[1]}/` : '/';

// GitHub Pages 404 해결을 위한 플러그인
const githubPages404Plugin = () => {
  return {
    name: 'github-pages-404',
    closeBundle() {
      // 빌드 완료 후 index.html을 404.html로 복사
      const distPath = join(__dirname, 'dist');
      const indexPath = join(distPath, 'index.html');
      const notFoundPath = join(distPath, '404.html');
      
      try {
        copyFileSync(indexPath, notFoundPath);
        console.log('✓ 404.html created for GitHub Pages');
      } catch (error) {
        console.warn('Failed to create 404.html:', error);
      }
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    githubPages404Plugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: true,
  },
  base,
})
