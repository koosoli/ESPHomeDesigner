import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: ['./custom_components/esphome_designer/frontend/tests/setup.js'],
        include: ['custom_components/esphome_designer/frontend/tests/**/*.test.js'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['custom_components/esphome_designer/frontend/js/**/*.js'],
        },
    },
});
