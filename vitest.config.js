import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const frontendRoot = resolve(__dirname, 'custom_components/esphome_designer/frontend');

export default defineConfig({
    resolve: {
        alias: {
            '@core': resolve(frontendRoot, 'js/core'),
            '@features': resolve(frontendRoot, 'features'),
            '@io': resolve(frontendRoot, 'js/io')
        }
    },
    test: {
        cache: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./custom_components/esphome_designer/frontend/tests/setup.js'],
        include: ['custom_components/esphome_designer/frontend/tests/**/*.test.js'],
        coverage: {
            reporter: ['text', 'json', 'json-summary', 'html'],
            include: [
                'custom_components/esphome_designer/frontend/js/**/*.js',
                'custom_components/esphome_designer/frontend/features/**/*.js'
            ],
        },
    },
});
