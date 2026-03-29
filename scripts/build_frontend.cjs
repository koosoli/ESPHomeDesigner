#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NODE = process.execPath;
const VITE_BIN = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
const { writeBuildMeta } = require('./dist_build_meta.cjs');

function main() {
    const args = [VITE_BIN, 'build', ...process.argv.slice(2)];
    const result = spawnSync(NODE, args, {
        cwd: ROOT,
        stdio: 'inherit',
        shell: false
    });

    if (result.status !== 0) {
        process.exit(result.status || 1);
    }

    writeBuildMeta();
    console.log('\nUpdated custom_components/esphome_designer/frontend/dist/build-meta.json');
}

main();
