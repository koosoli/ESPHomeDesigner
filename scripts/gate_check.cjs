const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const STATE_FILE = path.join(__dirname, 'gate_state.json');

const stageArg = process.argv.find((arg) => arg.startsWith('--stage='));
if (!stageArg) {
    console.error('Usage: node gate_check.cjs --stage=N');
    process.exit(1);
}

const stage = Number.parseInt(stageArg.split('=')[1], 10);
const proofDir = path.join(ROOT, 'tmp', 'proof', `stage-${stage}`);

try {
    execSync(`node scripts/quality_gate.cjs --json --proof-dir=${JSON.stringify(rel(proofDir))} --stage=${stage}`, {
        cwd: ROOT,
        stdio: 'inherit'
    });

    let state = {};
    if (fs.existsSync(STATE_FILE)) {
        state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }

    state[`stage${stage}`] = {
        passed: true,
        timestamp: new Date().toISOString(),
        proof: rel(path.join(proofDir, 'proof.json'))
    };

    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
    process.exit(0);
} catch {
    process.exit(1);
}

function rel(filePath) {
    return path.relative(ROOT, filePath).replace(/\\/g, '/');
}
