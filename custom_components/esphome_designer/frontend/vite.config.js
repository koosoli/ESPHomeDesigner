import { defineConfig } from 'vite';

import { resolve } from 'path';

export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@core': resolve(__dirname, 'js/core'),
            '@features': resolve(__dirname, 'features'),
            '@io': resolve(__dirname, 'js/io'),
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    }
});
