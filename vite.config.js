import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true, // يسمح بالوصول من الهاتف عبر الشبكة المحلية
        port: 3000,
        open: true  // يفتح المتصفح تلقائياً
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        minify: 'terser', // ضغط الكود لأقصى حد
    }
});