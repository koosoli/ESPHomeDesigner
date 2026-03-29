#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const NODE = process.execPath;
const SKIP_HASSFEST = process.argv.includes('--skip-hassfest');

function runStep(label, command, args, options = {}) {
    console.log(`\n==> ${label}`);
    const result = spawnSync(command, args, {
        cwd: ROOT,
        stdio: 'inherit',
        shell: false,
        ...options
    });

    if (result.status !== 0) {
        process.exit(result.status || 1);
    }
}

function dockerReady() {
    const result = spawnSync('docker', ['info'], {
        cwd: ROOT,
        stdio: 'ignore',
        shell: false
    });
    return result.status === 0;
}

function main() {
    runStep('Baseline governance', [NODE][0], ['scripts/check_baseline_governance.cjs']);
    runStep('Frontend dist freshness', [NODE][0], ['scripts/verify_dist_fresh.cjs']);
    runStep('Frontend quality gate', [NODE][0], ['scripts/quality_gate.cjs', '--json', '--proof-dir=tmp/proof/pre-push']);
    runStep('Home Assistant integration verification', [NODE][0], ['scripts/verify_ha_integration.cjs']);

    if (SKIP_HASSFEST) {
        console.log('\n==> Hassfest skipped by flag');
        return;
    }

    if (!dockerReady()) {
        console.error('\nHassfest pre-push check failed: Docker is not running.');
        console.error('Start Docker Desktop and rerun npm run verify:pre-push.');
        console.error('If you intentionally want to skip Hassfest, run npm run verify:pre-push -- --skip-hassfest.');
        process.exit(1);
    }

    runStep('Hassfest container', 'docker', [
        'run',
        '--rm',
        '--mount',
        `type=bind,source=${ROOT},target=/github/workspace`,
        'ghcr.io/home-assistant/hassfest',
        '--core-path=/usr/src/homeassistant',
        '--integration-path',
        '/github/workspace/custom_components/esphome_designer'
    ]);

    console.log('\nLocal pre-push verification passed.');
}

main();
