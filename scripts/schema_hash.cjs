const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const contractFiles = [
    path.join(__dirname, '../custom_components/esphome_designer/frontend/tests/features/__snapshots__/plugin_defaults_snapshot.test.js.snap'),
    path.join(__dirname, '../custom_components/esphome_designer/frontend/tests/features/__snapshots__/plugin_export_smoke.test.js.snap'),
];

let contentStr = '';
for (const contractFile of contractFiles) {
    if (!fs.existsSync(contractFile)) {
        console.error(`Missing schema contract artifact: ${contractFile}`);
        process.exit(1);
    }

    const normalized = fs.readFileSync(contractFile, 'utf8').replace(/\r\n/g, '\n');
    contentStr += `# ${path.basename(contractFile)}\n${normalized}\n`;
}

const hash = crypto.createHash('sha256').update(contentStr).digest('hex');
const baselinesPath = path.join(__dirname, 'baselines.json');

try {
    const baselines = JSON.parse(fs.readFileSync(baselinesPath, 'utf8'));

    if (process.argv.includes('--update')) {
        baselines.schemaHash = hash;
        fs.writeFileSync(baselinesPath, JSON.stringify(baselines, null, 2) + '\n');
        console.log(`Schema hash updated: ${hash}`);
        process.exit(0);
    } else if (process.argv.includes('--check')) {
        if (baselines.schemaHash !== hash) {
            console.error(`Schema hash mismatch. Expected ${baselines.schemaHash}, got ${hash}`);
            console.error('If the schema change was intentional, run: node scripts/schema_hash.cjs --update');
            process.exit(1);
        }
        process.exit(0);
    } else {
        console.log(hash);
    }
} catch (e) {
    console.error('Failed to read baselines.json', e);
    process.exit(1);
}
