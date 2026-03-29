#!/usr/bin/env node

const { spawnSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'custom_components', 'esphome_designer', 'frontend', 'dist');
const MANIFEST_PATH = path.join(ROOT, 'custom_components', 'esphome_designer', 'manifest.json');
const PACKAGE_PATH = path.join(ROOT, 'package.json');
const PACKAGE_LOCK_PATH = path.join(ROOT, 'package-lock.json');
const HEADER_PATH = path.join(
    ROOT,
    'custom_components',
    'esphome_designer',
    'frontend',
    'js',
    'ui',
    'components',
    'header.html'
);
const RELEASE_NOTES_PATH = path.join(ROOT, 'release_notes.md');
const UPLOAD_MANIFEST_PATH = path.join(ROOT, 'tmp', 'release-upload-manifest.txt');
const NODE = process.execPath;
const SKIP_HASSFEST = process.argv.includes('--skip-hassfest');
const { DIST_META_PATH, verifyBuildMeta } = require('./dist_build_meta.cjs');

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function readText(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function rel(filePath) {
    return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

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

function runStep(label, command, args) {
    console.log(`\n==> ${label}`);
    const result = spawnSync(command, args, {
        cwd: ROOT,
        stdio: 'inherit',
        shell: false
    });

    if (result.status !== 0) {
        process.exit(result.status || 1);
    }
}

function releaseDisplayVersion(version) {
    const rcMatch = version.match(/^(.+)-rc\.(.+)$/i);
    if (rcMatch) {
        return `v${rcMatch[1]} RC${rcMatch[2]}`;
    }

    const betaMatch = version.match(/^(.+)-beta\.(.+)$/i);
    if (betaMatch) {
        return `v${betaMatch[1]} BETA${betaMatch[2]}`;
    }

    const alphaMatch = version.match(/^(.+)-alpha\.(.+)$/i);
    if (alphaMatch) {
        return `v${alphaMatch[1]} ALPHA${alphaMatch[2]}`;
    }

    return `v${version}`;
}

function assertCondition(condition, message) {
    if (!condition) {
        console.error(`Release preflight failed: ${message}`);
        process.exit(1);
    }
}

function firstNonEmptyLine(text) {
    return text.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || '';
}

function distContainsText(targetText) {
    if (!fs.existsSync(DIST_DIR)) {
        return false;
    }

    const stack = [DIST_DIR];
    while (stack.length > 0) {
        const currentDir = stack.pop();
        const entries = fs.readdirSync(currentDir);
        for (const entry of entries) {
            const entryPath = path.join(currentDir, entry);
            const stat = fs.statSync(entryPath);
            if (stat.isDirectory()) {
                stack.push(entryPath);
                continue;
            }
            const text = fs.readFileSync(entryPath, 'utf8');
            if (text.includes(targetText)) {
                return true;
            }
        }
    }

    return false;
}

function writeUploadManifest(version, displayVersion, distChanges) {
    fs.mkdirSync(path.dirname(UPLOAD_MANIFEST_PATH), { recursive: true });

    const lines = [
        `ESPHome Designer release upload checklist`,
        `Generated: ${new Date().toISOString()}`,
        `Version: ${version}`,
        `GUI label: ${displayVersion}`,
        '',
        'Required upload set for a version/frontend release:',
        '- custom_components/esphome_designer/manifest.json',
        '- package.json',
        '- package-lock.json',
        '- release_notes.md',
        '- custom_components/esphome_designer/frontend/js/ui/components/header.html',
        '- custom_components/esphome_designer/frontend/dist/',
        '',
        'Important:',
        '- Upload the whole custom_components/esphome_designer/frontend/dist directory, not just one or two hashed assets.',
        '- Make sure custom_components/esphome_designer/frontend/dist/build-meta.json is included; CI uses it to verify the shipped frontend bundle.',
        '- GitHub Pages builds from source, but the Home Assistant package and CI dist-freshness check depend on dist staying in sync.',
        '',
        'Upload these too if you changed them locally:',
        '- .github/workflows/test.yml',
        '- .github/workflows/release.yml',
        '- .github/workflows/deploy-pages.yml',
        '- .github/workflows/hassfest.yaml',
        '- scripts/check_baseline_governance.cjs',
        '- requirements-dev.txt',
        '- tests_python/',
        '- tsconfig.strict.json',
        '- strict-shims.d.ts',
        '- jsconfig.json'
    ];

    if (distChanges.length > 0) {
        lines.push('', 'dist files refreshed during preflight:');
        distChanges.forEach((change) => lines.push(`- ${change}`));
    }

    fs.writeFileSync(UPLOAD_MANIFEST_PATH, `${lines.join('\n')}\n`, 'utf8');
    console.log(`\nWrote upload checklist to ${rel(UPLOAD_MANIFEST_PATH)}`);
}

function main() {
    const manifest = readJson(MANIFEST_PATH);
    const pkg = readJson(PACKAGE_PATH);
    const lock = readJson(PACKAGE_LOCK_PATH);
    const header = readText(HEADER_PATH);
    const releaseNotes = readText(RELEASE_NOTES_PATH);
    const version = String(manifest.version || '').trim();
    const displayVersion = releaseDisplayVersion(version);
    const topReleaseHeading = firstNonEmptyLine(releaseNotes);

    assertCondition(version.length > 0, `${rel(MANIFEST_PATH)} must define a version`);
    assertCondition(pkg.version === version, `${rel(PACKAGE_PATH)} must match manifest version ${version}`);
    assertCondition(lock.version === version, `${rel(PACKAGE_LOCK_PATH)} top-level version must match manifest version ${version}`);
    assertCondition(
        lock.packages && lock.packages[''] && lock.packages[''].version === version,
        `${rel(PACKAGE_LOCK_PATH)} root package version must match manifest version ${version}`
    );
    assertCondition(
        header.includes(displayVersion),
        `${rel(HEADER_PATH)} must contain the GUI label ${displayVersion}`
    );
    assertCondition(
        topReleaseHeading.startsWith(`## ${displayVersion}`),
        `${rel(RELEASE_NOTES_PATH)} must start with ## ${displayVersion}`
    );

    const before = snapshotDir(DIST_DIR);
    runStep('Build frontend bundle', NODE, [path.join('scripts', 'build_frontend.cjs')]);
    const after = snapshotDir(DIST_DIR);
    const distChanges = diffSnapshots(before, after);

    if (distChanges.length > 0) {
        console.log('\nFrontend dist changed during preflight. Upload the whole dist directory to GitHub.');
        distChanges.slice(0, 20).forEach((change) => console.log(`- ${change}`));
        if (distChanges.length > 20) {
            console.log(`- ... and ${distChanges.length - 20} more`);
        }
    } else {
        console.log('\nFrontend dist was already current before the rebuild.');
    }

    assertCondition(distContainsText(displayVersion), `built dist does not contain ${displayVersion}`);
    const distMeta = verifyBuildMeta();
    assertCondition(
        distMeta.ok,
        `${rel(DIST_META_PATH)} must match the rebuilt dist${distMeta.errors.length ? ` (${distMeta.errors.join('; ')})` : ''}`
    );

    runStep('Baseline governance', NODE, [path.join('scripts', 'check_baseline_governance.cjs')]);
    runStep('Home Assistant integration verification', NODE, [path.join('scripts', 'verify_ha_integration.cjs')]);
    runStep('Canonical quality gate', NODE, [path.join('scripts', 'quality_gate.cjs'), '--json', '--proof-dir=tmp/proof/release-preflight']);

    if (!SKIP_HASSFEST) {
        runStep('Hassfest pre-push parity', NODE, [path.join('scripts', 'pre_push_check.cjs')]);
    } else {
        console.log('\n==> Hassfest pre-push parity skipped by flag');
    }

    writeUploadManifest(version, displayVersion, distChanges);
    console.log('\nRelease preflight passed.');
}

main();
