#!/usr/bin/env node

const { spawnSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'custom_components', 'esphome_designer', 'frontend', 'dist');
const NODE = process.execPath;
const VITE_BIN = path.join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');

function hashBuffer(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
}

function snapshotDir(dirPath) {
    const snapshot = new Map();

    if (!fs.existsSync(dirPath)) {
        return snapshot;
    }

    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir).sort();
        for (const entry of entries) {
            const entryPath = path.join(currentDir, entry);
            const stat = fs.statSync(entryPath);
            if (stat.isDirectory()) {
                walk(entryPath);
                continue;
            }
            const relativePath = path.relative(dirPath, entryPath).replace(/\\/g, '/');
            snapshot.set(relativePath, hashBuffer(fs.readFileSync(entryPath)));
        }
    }

    walk(dirPath);
    return snapshot;
}

function diffSnapshots(before, after) {
    const changes = [];
    const allPaths = new Set([...before.keys(), ...after.keys()]);

    for (const relativePath of [...allPaths].sort()) {
        const previous = before.get(relativePath);
        const current = after.get(relativePath);
        if (previous === current) continue;

        if (previous == null) {
            changes.push(`added ${relativePath}`);
            continue;
        }

        if (current == null) {
            changes.push(`removed ${relativePath}`);
            continue;
        }

        changes.push(`changed ${relativePath}`);
    }

    return changes;
}

function runBuild() {
    return spawnSync(NODE, [VITE_BIN, 'build'], {
        cwd: ROOT,
        stdio: 'inherit',
        shell: false
    });
}

function main() {
    const before = snapshotDir(DIST_DIR);
    const result = runBuild();

    if (result.status !== 0) {
        process.exit(result.status || 1);
    }

    const after = snapshotDir(DIST_DIR);
    const changes = diffSnapshots(before, after);

    if (changes.length > 0) {
        console.error('dist output is stale. Run npm run build and upload/commit the updated custom_components/esphome_designer/frontend/dist files.');
        changes.slice(0, 20).forEach((change) => console.error(`- ${change}`));
        if (changes.length > 20) {
            console.error(`- ... and ${changes.length - 20} more`);
        }
        process.exit(1);
    }

    console.log('dist output is up to date.');
}

main();
