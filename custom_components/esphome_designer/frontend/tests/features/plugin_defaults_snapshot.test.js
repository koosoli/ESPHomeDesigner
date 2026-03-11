import { describe, it, expect } from 'vitest';

// Use Vite's glob import to find all plugins
const plugins = import.meta.glob('../../features/*/plugin.js', { eager: true });

describe('Plugin Defaults Snapshots', () => {
    Object.entries(plugins).forEach(([path, module]) => { // eslint-disable-line no-unused-vars
        const plugin = module.default;
        if (!plugin || !plugin.id) return;

        it(`should match snapshot for defaults of ${plugin.id}`, () => {
            expect(plugin.defaults).toMatchSnapshot();
        });
    });
});
