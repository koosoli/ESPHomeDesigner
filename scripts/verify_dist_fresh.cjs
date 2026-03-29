#!/usr/bin/env node

const path = require('path');
const {
    DIST_META_PATH,
    verifyBuildMeta
} = require('./dist_build_meta.cjs');

const ROOT = path.join(__dirname, '..');

function rel(filePath) {
    return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function main() {
    const result = verifyBuildMeta();

    if (!result.ok) {
        console.error('dist output is stale or incomplete. Run npm run build (or npm run release:prepare:skip-hassfest) and upload the full custom_components/esphome_designer/frontend/dist directory.');
        result.errors.forEach((error) => console.error(`- ${error}`));
        process.exit(1);
    }

    console.log(`dist output is up to date. ${rel(DIST_META_PATH)} matches the current sources and active dist files.`);
}

main();
