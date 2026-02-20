import { defineConfig } from 'vite';
import { resolve } from 'path';

const frontendRoot = resolve(__dirname);

export default defineConfig({
    root: frontendRoot,
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['tests/**/*.test.js'],
    }
});
