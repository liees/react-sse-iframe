import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    server: {
        port: 3000,
        open: true, // 启动时自动打开浏览器
        cors: true, // 启用 CORS（便于本地开发）
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    preview: {
        port: 5000,
    },
});
