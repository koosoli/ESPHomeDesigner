#!/usr/bin/env node

const { execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FRONTEND_DIR = path.join(ROOT, 'custom_components', 'esphome_designer', 'frontend');
const DIST_DIR = path.join(FRONTEND_DIR, 'dist');
const DIST_META_PATH = path.join(DIST_DIR, 'build-meta.json');
const DIST_MANIFEST_PATH = path.join(DIST_DIR, '.vite', 'manifest.json');
const VITE_CONFIG_PATH = path.join(ROOT, 'vite.config.js');
const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');
const PACKAGE_LOCK_PATH = path.join(ROOT, 'package-lock.json');

const TEXT_EXTENSIONS = new Set([
    '.cjs',
    '.css',
    '.csv',
    '.d.ts',
    '.html',
    '.js',
    '.json',
    '.md',
    '.mjs',
    '.svg',
    '.ts',
    '.txt',
    '.yaml',
    '.yml'
]);

const SOURCE_DIRS = ['assets', 'css', 'features', 'hardware', 'js', 'panel'];
const SOURCE_FILES = ['editor.css', 'index.html', 'materialdesignicons-webfont.ttf'];

function compareStrings(left, right) {
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
}

function rel(filePath) {
    return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function isTextFile(filePath) {
    return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function normalizeBufferForPath(filePath, buffer) {
    if (!isTextFile(filePath)) {
        return buffer;
    }

    return Buffer.from(
        buffer
            .toString('utf8')
            .replace(/^\uFEFF/, '')
            .replace(/\r\n/g, '\n'),
        'utf8'
    );
}

function normalizedFileBuffer(filePath) {
    return normalizeBufferForPath(filePath, fs.readFileSync(filePath));
}

function createHash() {
    return crypto.createHash('sha256');
}

function collectFiles(rootDir, relativeStart) {
    const startPath = path.join(rootDir, relativeStart);
    const files = [];

    if (!fs.existsSync(startPath)) {
        return files;
    }

    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true }).sort((a, b) => compareStrings(a.name, b.name));
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
                continue;
            }
            files.push(fullPath);
        }
    }

    if (fs.statSync(startPath).isDirectory()) {
        walk(startPath);
        return files;
    }

    files.push(startPath);
    return files;
}

function getBuildInputFiles() {
    const files = [
        VITE_CONFIG_PATH,
        PACKAGE_JSON_PATH,
        PACKAGE_LOCK_PATH,
    ];

    for (const dir of SOURCE_DIRS) {
        files.push(...collectFiles(FRONTEND_DIR, dir));
    }

    for (const file of SOURCE_FILES) {
        files.push(...collectFiles(FRONTEND_DIR, file));
    }

    return files
        .filter((filePath) => fs.existsSync(filePath))
        .sort((a, b) => compareStrings(rel(a), rel(b)));
}

function computeSourceSignature() {
    const files = getBuildInputFiles();
    const hash = createHash();

    for (const filePath of files) {
        hash.update(rel(filePath));
        hash.update('\0');
        hash.update(normalizedFileBuffer(filePath));
        hash.update('\0');
    }

    return {
        signature: hash.digest('hex'),
        files: files.map(rel)
    };
}

function git(relativeArgs, options = {}) {
    return execFileSync('git', relativeArgs, {
        cwd: ROOT,
        encoding: Object.prototype.hasOwnProperty.call(options, 'encoding') ? options.encoding : 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
        maxBuffer: options.maxBuffer ?? 32 * 1024 * 1024
    });
}

function gitPath(relativePath) {
    return relativePath.replace(/\\/g, '/');
}

function hasGitRef(ref = 'HEAD') {
    try {
        git(['rev-parse', '--verify', `${ref}^{commit}`]);
        return true;
    } catch {
        return false;
    }
}

function readGitBlob(relativePath, ref = 'HEAD') {
    return git(['cat-file', 'blob', `${ref}:${gitPath(relativePath)}`], {
        encoding: null,
        maxBuffer: 64 * 1024 * 1024
    });
}

function getGitBuildInputFiles(ref = 'HEAD') {
    const paths = [
        'vite.config.js',
        'package.json',
        'package-lock.json',
        ...SOURCE_DIRS.map((dir) => `custom_components/esphome_designer/frontend/${dir}`),
        ...SOURCE_FILES.map((file) => `custom_components/esphome_designer/frontend/${file}`)
    ];
    const output = git(['ls-tree', '-r', '--name-only', ref, '--', ...paths]);

    return output
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .sort(compareStrings);
}

function computeSignatureFromFiles(files, readBuffer) {
    const hash = createHash();

    for (const relativePath of files) {
        hash.update(relativePath);
        hash.update('\0');
        hash.update(readBuffer(relativePath));
        hash.update('\0');
    }

    return hash.digest('hex');
}

function computeSourceSignatureFromGitRef(ref = 'HEAD') {
    const files = getGitBuildInputFiles(ref);

    return {
        signature: computeSignatureFromFiles(
            files,
            (relativePath) => normalizeBufferForPath(relativePath, readGitBlob(relativePath, ref))
        ),
        files
    };
}

function readDistManifest() {
    if (!fs.existsSync(DIST_MANIFEST_PATH)) {
        return null;
    }

    return JSON.parse(fs.readFileSync(DIST_MANIFEST_PATH, 'utf8'));
}

function collectActiveDistFilesFromManifest(manifest) {
    const files = new Set(['.vite/manifest.json', 'index.html']);

    for (const entry of Object.values(manifest)) {
        if (!entry || typeof entry !== 'object') {
            continue;
        }

        if (typeof entry.file === 'string') {
            files.add(entry.file);
        }

        for (const field of ['css', 'assets']) {
            const values = Array.isArray(entry[field]) ? entry[field] : [];
            for (const value of values) {
                if (typeof value === 'string') {
                    files.add(value);
                }
            }
        }
    }

    return [...files].sort(compareStrings);
}

function collectActiveDistFiles() {
    const manifest = readDistManifest();
    if (!manifest) {
        return [];
    }

    return collectActiveDistFilesFromManifest(manifest);
}

function readDistManifestFromGitRef(ref = 'HEAD') {
    try {
        return JSON.parse(readGitBlob('custom_components/esphome_designer/frontend/dist/.vite/manifest.json', ref).toString('utf8'));
    } catch {
        return null;
    }
}

function computeActiveDistSignature() {
    const activeFiles = collectActiveDistFiles();
    const hash = createHash();

    for (const relativePath of activeFiles) {
        const fullPath = path.join(DIST_DIR, relativePath);
        if (!fs.existsSync(fullPath)) {
            return {
                signature: null,
                files: activeFiles,
                missing: relativePath
            };
        }

        hash.update(relativePath);
        hash.update('\0');
        hash.update(normalizedFileBuffer(fullPath));
        hash.update('\0');
    }

    return {
        signature: hash.digest('hex'),
        files: activeFiles,
        missing: null
    };
}

function computeActiveDistSignatureFromGitRef(ref = 'HEAD') {
    const manifest = readDistManifestFromGitRef(ref);
    if (!manifest) {
        return {
            signature: null,
            files: [],
            missing: '.vite/manifest.json'
        };
    }

    const activeFiles = collectActiveDistFilesFromManifest(manifest);
    const hash = createHash();

    for (const relativePath of activeFiles) {
        const gitRelativePath = `custom_components/esphome_designer/frontend/dist/${relativePath}`;
        let buffer;
        try {
            buffer = readGitBlob(gitRelativePath, ref);
        } catch {
            return {
                signature: null,
                files: activeFiles,
                missing: relativePath
            };
        }

        hash.update(relativePath);
        hash.update('\0');
        hash.update(normalizeBufferForPath(relativePath, buffer));
        hash.update('\0');
    }

    return {
        signature: hash.digest('hex'),
        files: activeFiles,
        missing: null
    };
}

function readBuildMeta() {
    if (!fs.existsSync(DIST_META_PATH)) {
        return null;
    }

    return JSON.parse(fs.readFileSync(DIST_META_PATH, 'utf8'));
}

function readBuildMetaFromGitRef(ref = 'HEAD') {
    try {
        return JSON.parse(
            readGitBlob('custom_components/esphome_designer/frontend/dist/build-meta.json', ref).toString('utf8')
        );
    } catch {
        return null;
    }
}

function writeBuildMeta() {
    if (!fs.existsSync(DIST_DIR)) {
        throw new Error(`dist directory does not exist: ${rel(DIST_DIR)}`);
    }

    const source = computeSourceSignature();
    const dist = computeActiveDistSignature();
    if (dist.missing) {
        throw new Error(`dist is missing an active manifest file: ${dist.missing}`);
    }

    const meta = {
        schemaVersion: 1,
        sourceSignature: source.signature,
        activeDistSignature: dist.signature,
        sourceInputCount: source.files.length,
        activeDistFileCount: dist.files.length,
        activeDistFiles: dist.files
    };

    fs.mkdirSync(DIST_DIR, { recursive: true });
    fs.writeFileSync(DIST_META_PATH, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
    return meta;
}

function verifyBuildMeta() {
    const errors = [];
    const meta = readBuildMeta();

    if (!fs.existsSync(DIST_DIR)) {
        errors.push(`missing ${rel(DIST_DIR)}`);
        return { ok: false, errors, meta: null };
    }

    if (!fs.existsSync(DIST_MANIFEST_PATH)) {
        errors.push(`missing ${rel(DIST_MANIFEST_PATH)}`);
        return { ok: false, errors, meta: null };
    }

    if (!meta) {
        errors.push(`missing ${rel(DIST_META_PATH)}`);
        return { ok: false, errors, meta: null };
    }

    if (meta.schemaVersion !== 1) {
        errors.push(`${rel(DIST_META_PATH)} schemaVersion must be 1`);
    }

    const source = computeSourceSignature();
    if (meta.sourceSignature !== source.signature) {
        errors.push('build metadata source signature does not match current build inputs');
    }

    const dist = computeActiveDistSignature();
    if (dist.missing) {
        errors.push(`dist is missing active manifest file ${dist.missing}`);
    } else if (meta.activeDistSignature !== dist.signature) {
        errors.push('build metadata dist signature does not match the active dist files');
    }

    if (
        !Array.isArray(meta.activeDistFiles)
        || meta.activeDistFiles.length !== dist.files.length
        || meta.activeDistFiles.some((file, index) => file !== dist.files[index])
    ) {
        errors.push('build metadata active dist file list does not match the current manifest-backed dist files');
    }

    return {
        ok: errors.length === 0,
        errors,
        meta
    };
}

function verifyBuildMetaFromGitRef(ref = 'HEAD') {
    const errors = [];

    if (!hasGitRef(ref)) {
        errors.push(`git ref ${ref} is not available`);
        return { ok: false, errors, meta: null };
    }

    const meta = readBuildMetaFromGitRef(ref);

    if (!meta) {
        errors.push(`missing ${rel(DIST_META_PATH)} in ${ref}`);
        return { ok: false, errors, meta: null };
    }

    if (meta.schemaVersion !== 1) {
        errors.push(`${rel(DIST_META_PATH)} schemaVersion must be 1`);
    }

    const source = computeSourceSignatureFromGitRef(ref);
    if (meta.sourceSignature !== source.signature) {
        errors.push(`build metadata source signature does not match ${ref} build inputs`);
    }

    const dist = computeActiveDistSignatureFromGitRef(ref);
    if (dist.missing) {
        errors.push(`dist is missing active manifest file ${dist.missing} in ${ref}`);
    } else if (meta.activeDistSignature !== dist.signature) {
        errors.push(`build metadata dist signature does not match ${ref} active dist files`);
    }

    if (
        !Array.isArray(meta.activeDistFiles)
        || meta.activeDistFiles.length !== dist.files.length
        || meta.activeDistFiles.some((file, index) => file !== dist.files[index])
    ) {
        errors.push(`build metadata active dist file list does not match the ${ref} manifest-backed dist files`);
    }

    return {
        ok: errors.length === 0,
        errors,
        meta
    };
}

if (require.main === module) {
    const mode = process.argv[2];

    if (mode === '--write') {
        const meta = writeBuildMeta();
        console.log(`Wrote ${rel(DIST_META_PATH)} for ${meta.activeDistFileCount} active dist files.`);
        process.exit(0);
    }

    if (mode === '--check') {
        const result = verifyBuildMeta();
        if (!result.ok) {
            result.errors.forEach((error) => console.error(`- ${error}`));
            process.exit(1);
        }
        console.log(`${rel(DIST_META_PATH)} matches current build inputs and active dist files.`);
        process.exit(0);
    }

    if (mode === '--check-head') {
        const result = verifyBuildMetaFromGitRef('HEAD');
        if (!result.ok) {
            result.errors.forEach((error) => console.error(`- ${error}`));
            process.exit(1);
        }
        console.log(`${rel(DIST_META_PATH)} matches committed HEAD build inputs and active dist files.`);
        process.exit(0);
    }

    console.error('Usage: node scripts/dist_build_meta.cjs --write|--check|--check-head');
    process.exit(1);
}

module.exports = {
    DIST_DIR,
    DIST_MANIFEST_PATH,
    DIST_META_PATH,
    collectActiveDistFiles,
    collectActiveDistFilesFromManifest,
    computeActiveDistSignature,
    computeActiveDistSignatureFromGitRef,
    computeSourceSignature,
    computeSourceSignatureFromGitRef,
    hasGitRef,
    normalizeBufferForPath,
    readBuildMetaFromGitRef,
    readBuildMeta,
    verifyBuildMeta,
    verifyBuildMetaFromGitRef,
    writeBuildMeta
};
