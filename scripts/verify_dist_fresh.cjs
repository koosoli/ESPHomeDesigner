#!/usr/bin/env node

const path = require('path');
const {
    DIST_META_PATH,
    hasGitRef,
    verifyBuildMeta,
    verifyBuildMetaFromGitRef
} = require('./dist_build_meta.cjs');

const ROOT = path.join(__dirname, '..');
const IS_CI = process.env.GITHUB_ACTIONS === 'true' || process.env.CI === 'true';

function rel(filePath) {
    return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function main() {
    const workspaceResult = verifyBuildMeta();

    if (workspaceResult.ok) {
        console.log(`dist output is up to date. ${rel(DIST_META_PATH)} matches the current sources and active dist files.`);
        return;
    }

    if (IS_CI && hasGitRef('HEAD')) {
        const headResult = verifyBuildMetaFromGitRef('HEAD');

        if (headResult.ok) {
            console.warn('dist verification failed in the checked-out workspace, but the committed HEAD tree is internally consistent. Allowing CI to continue.');
            workspaceResult.errors.forEach((error) => console.warn(`- workspace-only mismatch: ${error}`));
            return;
        }

        console.error('Committed HEAD verification also failed:');
        headResult.errors.forEach((error) => console.error(`- ${error}`));
    }

    console.error('dist output is stale or incomplete. Run npm run build (or npm run release:prepare:skip-hassfest) and upload the full custom_components/esphome_designer/frontend/dist directory.');
    workspaceResult.errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
}

main();
