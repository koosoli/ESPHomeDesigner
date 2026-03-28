#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const PYTHON_BIN = process.platform === 'win32'
    ? path.join('Scripts', 'python.exe')
    : path.join('bin', 'python');

function resolvePythonCommand() {
    const candidates = [];

    if (process.env.VIRTUAL_ENV) {
        candidates.push(path.join(process.env.VIRTUAL_ENV, PYTHON_BIN));
    }

    candidates.push(path.join(ROOT, '.venv', PYTHON_BIN));
    candidates.push('python');

    for (const candidate of candidates) {
        if (!candidate.includes(path.sep) || fs.existsSync(candidate)) {
            return candidate;
        }
    }

    return 'python';
}

const python = resolvePythonCommand();
const result = spawnSync(python, process.argv.slice(2), {
    cwd: ROOT,
    stdio: 'inherit',
    shell: false
});

if (result.error) {
    console.error(`Failed to start Python via '${python}': ${result.error.message}`);
    process.exit(1);
}

process.exit(result.status ?? 1);
