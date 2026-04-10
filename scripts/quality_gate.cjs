const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FRONTEND = path.join(ROOT, 'custom_components', 'esphome_designer', 'frontend');
const JS_DIR = path.join(FRONTEND, 'js');
const FEATURES_DIR = path.join(FRONTEND, 'features');
const baselinesPath = path.join(__dirname, 'baselines.json');
const baselines = JSON.parse(fs.readFileSync(baselinesPath, 'utf8'));
const ROOT_ARTIFACT_PATTERNS = [
    /^coverage_full\.json$/i,
    /^comment\.json$/i,
    /^comment_body\.txt$/i,
    /^debug_output\.yaml$/i,
    /^debug_yaml\.js$/i,
    /^dynamic_refs\.txt$/i,
    /^err\.txt$/i,
    /^eslint_.*\.json$/i,
    /^esphome_designer_test\.zip$/i,
    /^fail_line\.txt$/i,
    /^lint_.*\.txt$/i,
    /^out.*\.json$/i,
    /^quality.*\.txt$/i,
    /^temp_yaml_generator\.js$/i,
    /^test_.*\.(json|txt)$/i,
    /^text_cov\.txt$/i,
    /^vitest_update\.txt$/i
];
const FRONTEND_ARTIFACT_PATTERNS = [
    /^build_(?:error\.log|full\.txt|log\.txt)$/i,
    /^debug\.js$/i,
    /^eslint-results\.txt$/i,
    /^eslint\.log$/i,
    /^eslint_.*\.(?:txt|json)$/i,
    /^keyboard_error(?:_utf8)?\.txt$/i,
    /^lint_final\.json$/i,
    /^out\.(?:txt|xml)$/i,
    /^parse_xml\.js$/i,
    /^strip_output\.txt$/i,
    /^test(?:_(?:fail|logs|out))?\.(?:txt|log|json)$/i,
    /^vitest_(?:debug\.js|log\.txt|out\.json)$/i
];
const GITIGNORE_ROOT_PATTERNS = loadGitignoreRootPatterns();

const args = new Set(process.argv.slice(2));
const UPDATE_MODE = args.has('--update-baselines');
const JSON_MODE = args.has('--json');
const stageArg = process.argv.find((arg) => arg.startsWith('--stage='));
const proofDirArg = process.argv.find((arg) => arg.startsWith('--proof-dir='));
const STAGE = stageArg ? Number.parseInt(stageArg.split('=')[1], 10) : null;
const PROOF_DIR = proofDirArg ? path.resolve(ROOT, proofDirArg.split('=')[1]) : null;

const COLORS = {
    GREEN: '\x1b[32m',
    RED: '\x1b[31m',
    YELLOW: '\x1b[33m',
    CYAN: '\x1b[36m',
    BOLD: '\x1b[1m',
    RESET: '\x1b[0m'
};

const startedAt = new Date().toISOString();
const commandRecords = [];

function sha256(content) {
    return crypto.createHash('sha256').update(content || '', 'utf8').digest('hex');
}

function rel(filePath) {
    return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function globToRegex(glob) {
    const escaped = glob
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '[^/]*')
        .replace(/\?/g, '[^/]');
    return new RegExp(`^${escaped}$`, 'i');
}

function loadGitignoreRootPatterns() {
    const gitignorePath = path.join(ROOT, '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
        return [];
    }

    return fs.readFileSync(gitignorePath, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#') && !line.startsWith('!'))
        .filter((line) => line.startsWith('/') && !line.endsWith('/'))
        .map((line) => line.slice(1))
        .map(globToRegex);
}

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function normalizeCoveragePath(filePath) {
    return path.resolve(filePath).replace(/\//g, '\\');
}

function computeLinePctFromRawCoverage(entry) {
    if (!entry || !entry.statementMap || !entry.s) return null;

    const totalLines = new Set();
    const coveredLines = new Set();

    Object.entries(entry.statementMap).forEach(([statementId, location]) => {
        const hits = entry.s[statementId] || 0;
        const startLine = location.start.line;
        const endLine = location.end.line;
        for (let line = startLine; line <= endLine; line += 1) {
            totalLines.add(line);
            if (hits > 0) coveredLines.add(line);
        }
    });

    if (totalLines.size === 0) return null;
    return Number(((coveredLines.size / totalLines.size) * 100).toFixed(2));
}

function hashPath(targetPath) {
    const stat = fs.statSync(targetPath);
    if (stat.isFile()) {
        return sha256(fs.readFileSync(targetPath));
    }

    const entries = [];
    function walk(dir) {
        const children = fs.readdirSync(dir).sort();
        children.forEach((child) => {
            const childPath = path.join(dir, child);
            const childStat = fs.statSync(childPath);
            if (childStat.isDirectory()) {
                walk(childPath);
                return;
            }
            entries.push(`${rel(childPath)}:${sha256(fs.readFileSync(childPath))}`);
        });
    }

    walk(targetPath);
    return sha256(entries.join('\n'));
}

function getGitSha() {
    try {
        return execSync('git rev-parse HEAD', {
            cwd: ROOT,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore']
        }).trim();
    } catch {
        return null;
    }
}

function resolvePythonCommand() {
    const candidates = ['python', 'py -3'];
    for (const candidate of candidates) {
        const result = run(`${candidate} --version`);
        if (result.status === 0) {
            return candidate;
        }
    }
    return null;
}

function run(cmd, options = {}) {
    try {
        const stdout = execSync(cmd, {
            cwd: ROOT,
            encoding: 'utf8',
            maxBuffer: 10 * 1024 * 1024,
            stdio: ['pipe', 'pipe', 'pipe'],
            ...options
        });
        const commandIndex = commandRecords.push({
            cmd,
            cwd: rel(ROOT),
            exit: 0,
            stdout_sha256: sha256(stdout),
            stderr_sha256: sha256('')
        }) - 1;
        return { stdout, stderr: '', status: 0, commandIndex };
    } catch (error) {
        const stdout = error.stdout ? error.stdout.toString() : '';
        const stderr = error.stderr ? error.stderr.toString() : '';
        const status = error.status || 1;
        const commandIndex = commandRecords.push({
            cmd,
            cwd: rel(ROOT),
            exit: status,
            stdout_sha256: sha256(stdout),
            stderr_sha256: sha256(stderr)
        }) - 1;
        return { stdout, stderr, status, error, commandIndex };
    }
}

function attachArtifacts(commandIndex, artifactPaths) {
    if (commandIndex == null || commandIndex < 0 || commandIndex >= commandRecords.length) return;
    const artifacts = artifactPaths
        .filter((filePath) => fs.existsSync(filePath))
        .map((filePath) => ({
            path: rel(filePath),
            sha256: hashPath(filePath)
        }));
    if (artifacts.length > 0) {
        commandRecords[commandIndex].artifacts = artifacts;
    }
}

function makeGate(section, gate, passed, details, extras = {}) {
    return { section, gate, passed, details, ...extras };
}

function collectDiagnosticLines(output, matchers = [], maxLines = 3) {
    const lines = `${output || ''}`
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length === 0) return [];

    const matched = matchers.length === 0
        ? lines
        : lines.filter((line) => matchers.some((matcher) => matcher.test(line)));

    const source = matched.length > 0 ? matched : lines.slice(-maxLines);
    return source.slice(0, maxLines);
}

function formatDiagnosticSummary(prefix, lines) {
    if (!lines || lines.length === 0) return prefix;
    return `${prefix}: ${lines.join(' | ')}`;
}

function emitFailureContext(gate, result, maxLines = 40) {
    const stdoutLines = `${result.stdout || ''}`
        .split(/\r?\n/)
        .filter((line) => line.trim());
    const stderrLines = `${result.stderr || ''}`
        .split(/\r?\n/)
        .filter((line) => line.trim());

    console.error(`\n${COLORS.RED}[${gate}] command failed${COLORS.RESET}`);

    if (stdoutLines.length > 0) {
        console.error(`${COLORS.BOLD}[${gate}] stdout${COLORS.RESET}`);
        stdoutLines.slice(0, maxLines).forEach((line) => console.error(line));
        if (stdoutLines.length > maxLines) {
            console.error(`... (${stdoutLines.length - maxLines} more stdout lines)`);
        }
    }

    if (stderrLines.length > 0) {
        console.error(`${COLORS.BOLD}[${gate}] stderr${COLORS.RESET}`);
        stderrLines.slice(0, maxLines).forEach((line) => console.error(line));
        if (stderrLines.length > maxLines) {
            console.error(`... (${stderrLines.length - maxLines} more stderr lines)`);
        }
    }
}

function checkEslint() {
    const result = run('npx eslint . --format json');
    try {
        const report = JSON.parse(result.stdout);
        const errors = report.reduce((sum, file) => sum + file.errorCount, 0);
        const passed = errors <= baselines.eslintErrors;
        return makeGate('web', 'ESLint', passed, passed ? `${errors} errors` : `${errors} errors (max: ${baselines.eslintErrors})`);
    } catch {
        return makeGate('web', 'ESLint', false, 'Failed to parse ESLint JSON output');
    }
}

let vitestSummary = null;
function prepareVitestCoverageRun() {
    const runId = `quality-gate-${process.pid}-${Date.now()}`;
    const coverageDir = path.join(ROOT, 'tmp', 'coverage', runId);
    const reportDir = path.join(ROOT, 'tmp', 'reports', 'quality-gate');
    const reportPath = path.join(reportDir, 'vitest-report.json');

    fs.rmSync(coverageDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
    fs.rmSync(reportPath, { force: true, maxRetries: 5, retryDelay: 50 });

    ensureDir(coverageDir);
    ensureDir(reportDir);
    return { coverageDir, reportPath };
}

function runVitestCoverageCommand(attempt = 1) {
    const { coverageDir, reportPath } = prepareVitestCoverageRun();
    // The default worker pool can hang during V8 coverage finalization on Windows
    // even after the JSON test report is fully written. Force the threads pool so
    // release/quality runs complete deterministically in this environment.
    const poolArgs = process.platform === 'win32' ? '--pool=threads ' : '';
    const reporters = [
        '--coverage.reporter=json-summary',
        '--coverage.reporter=json',
        '--coverage.reporter=html'
    ].join(' ');
    const result = run(
        `npx vitest run ${poolArgs}--coverage ${reporters} --coverage.reportsDirectory=${rel(coverageDir)} --reporter=json --outputFile=${rel(reportPath)}`
    );

    if (result.status !== 0 && attempt === 1) {
        return runVitestCoverageCommand(2);
    }

    return { result, coverageDir, reportPath };
}

function runVitestWithCoverage() {
    if (vitestSummary) return vitestSummary;

    console.log(`${COLORS.CYAN}  Running Vitest with Coverage...${COLORS.RESET}`);
    const { result, coverageDir, reportPath } = runVitestCoverageCommand();

    try {
        const coveragePath = path.join(coverageDir, 'coverage-summary.json');
        const rawCoveragePath = path.join(coverageDir, 'coverage-final.json');
        if (!fs.existsSync(reportPath)) {
            throw new Error('vitest-report.json was not produced');
        }

        const report = readJson(reportPath);
        if (typeof report.numPassedTests !== 'number' || typeof report.numFailedTests !== 'number') {
            throw new Error('vitest-report.json missing expected summary fields');
        }

        let coverage = null;
        if (fs.existsSync(coveragePath)) {
            coverage = readJson(coveragePath);
            if (!coverage.total || !coverage.total.lines || typeof coverage.total.lines.pct !== 'number') {
                throw new Error('coverage-summary.json missing total.lines.pct');
            }
        }

        const rawCoverage = fs.existsSync(rawCoveragePath) ? readJson(rawCoveragePath) : null;

        attachArtifacts(result.commandIndex, [reportPath, coveragePath, rawCoveragePath]);
        vitestSummary = {
            report,
            coverage,
            rawCoverage,
            status: result.status
        };
    } catch (error) {
        vitestSummary = { error: 'Failed to run tests or parse reports', details: error.message };
    }

    return vitestSummary;
}

function checkVitest() {
    const summary = runVitestWithCoverage();
    if (summary.error) return makeGate('web', 'Vitest', false, summary.error);

    const passed = summary.report.numFailedTests === 0 && summary.report.numFailedTestSuites === 0;
    const regression = summary.report.numPassedTests < baselines.testCount;
    let details = `${summary.report.numPassedTests} passed, ${summary.report.numFailedTests} failed`;
    if (regression) details += ` (REGRESSION: baseline was ${baselines.testCount})`;

    return makeGate('web', 'Vitest', passed && !regression, details);
}

function checkCoverage() {
    const summary = runVitestWithCoverage();
    if (summary.error) return makeGate('web', 'Coverage', false, summary.error);
    if (!summary.coverage) return makeGate('web', 'Coverage', false, 'coverage-summary.json not found');

    const lineCoverage = summary.coverage.total.lines.pct;
    const passed = lineCoverage >= (baselines.coverageMin - 0.01);
    return makeGate('web', 'Coverage', passed, `${lineCoverage}% lines (min: ${baselines.coverageMin}%)`);
}

function checkFileCoverage() {
    const summary = runVitestWithCoverage();
    if (summary.error) return makeGate('web', 'FileCoverage', false, summary.error);
    if (!summary.coverage && !summary.rawCoverage) return makeGate('web', 'FileCoverage', false, 'coverage artifacts not found');

    const configured = baselines.fileCoverageMins || {};
    const entries = Object.entries(configured);
    if (entries.length === 0) {
        return makeGate('web', 'FileCoverage', true, '0 files configured', { fileCoverageMins: {} });
    }

    const measured = {};
    const details = [];
    const failures = [];

    entries.forEach(([relativePath, minPct]) => {
        const normalizedRel = relativePath.replace(/\\/g, '/');
        const absolutePath = path.resolve(ROOT, relativePath);
        const normalizedAbs = normalizeCoveragePath(absolutePath);
        const rawCoverageEntry = summary.rawCoverage?.[absolutePath]
            || summary.rawCoverage?.[normalizedAbs]
            || summary.rawCoverage?.[absolutePath.replace(/\//g, '\\')];
        let actual = computeLinePctFromRawCoverage(rawCoverageEntry);

        if (actual == null) {
            const coverageEntry = summary.coverage?.[absolutePath]
                || summary.coverage?.[path.normalize(absolutePath)]
                || summary.coverage?.[normalizedAbs];

            if (coverageEntry && coverageEntry.lines && typeof coverageEntry.lines.pct === 'number') {
                actual = coverageEntry.lines.pct;
            }
        }

        if (actual == null) {
            failures.push(`${normalizedRel} missing`);
            details.push(`${normalizedRel} missing from coverage`);
            return;
        }

        measured[normalizedRel] = actual;
        details.push(`${path.basename(normalizedRel)} ${actual}% (min: ${minPct}%)`);
        if (actual < (minPct - 0.01)) {
            failures.push(`${normalizedRel} ${actual}% < ${minPct}%`);
        }
    });

    return makeGate('web', 'FileCoverage', failures.length === 0, details.join(', '), { fileCoverageMins: measured });
}

function checkTypeScriptBase() {
    const result = run('npx tsc --noEmit -p tsconfig.json');
    if (result.status === 0) {
        return makeGate('web', 'TypeScriptBase', true, 'Frontend config passes');
    }

    emitFailureContext('TypeScriptBase', result);
    const details = collectDiagnosticLines(`${result.stdout}\n${result.stderr}`, [/error TS\d+:/i], 2);
    return makeGate('web', 'TypeScriptBase', false, formatDiagnosticSummary('Base config type errors detected', details));
}

function checkTypeScript() {
    const result = run('npx tsc --noEmit -p tsconfig.strict.json');
    if (result.status === 0) {
        return makeGate('web', 'TypeScript', true, 'No type errors');
    }

    emitFailureContext('TypeScript', result);
    const details = collectDiagnosticLines(`${result.stdout}\n${result.stderr}`, [/error TS\d+:/i], 2);
    return makeGate('web', 'TypeScript', false, formatDiagnosticSummary('Type errors detected', details));
}

function checkBuild() {
    const result = run('node scripts/build_frontend.cjs');
    const distPath = path.join(FRONTEND, 'dist');
    attachArtifacts(result.commandIndex, [distPath]);
    return makeGate('web', 'Build', result.status === 0, result.status === 0 ? 'Success' : 'Build failed');
}

function checkGlobals() {
    let count = 0;
    function walk(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (file !== 'lib' && file !== 'node_modules') walk(fullPath);
            } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                const matches = content.match(/window\./g);
                if (matches) count += matches.length;
            }
        }
    }
    walk(JS_DIR);
    const passed = count <= baselines.windowRefsMax;
    return makeGate('web', 'Globals', passed, `${count} window.* refs (max: ${baselines.windowRefsMax})`);
}

function walkSourceFiles(dir, onFile) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== 'dist' && file !== 'lib') {
                walkSourceFiles(fullPath, onFile);
            }
            continue;
        }

        if ((file.endsWith('.js') || file.endsWith('.ts')) && !file.endsWith('.min.js')) {
            onFile(fullPath);
        }
    }
}

function checkSuppressions() {
    const noCheckFiles = new Set();
    let ignoreCoreIoCount = 0;

    [JS_DIR, FEATURES_DIR].forEach((dir) => {
        walkSourceFiles(dir, (filePath) => {
            const content = fs.readFileSync(filePath, 'utf8');
            if (/@ts-nocheck/g.test(content)) {
                noCheckFiles.add(rel(filePath));
            }
        });
    });

    const coreDir = path.join(JS_DIR, 'core');
    const ioDir = path.join(JS_DIR, 'io');
    [coreDir, ioDir].forEach((dir) => {
        if (!fs.existsSync(dir)) return;
        walkSourceFiles(dir, (filePath) => {
            const content = fs.readFileSync(filePath, 'utf8');
            const ignores = content.match(/@ts-ignore/g);
            if (ignores) ignoreCoreIoCount += ignores.length;
        });
    });

    const noCheckCount = noCheckFiles.size;
    const maxNoCheck = typeof baselines.tsNoCheckMax === 'number' ? baselines.tsNoCheckMax : 17;
    const maxIgnoreCoreIo = typeof baselines.tsIgnoreCoreIoMax === 'number' ? baselines.tsIgnoreCoreIoMax : 0;
    const passed = noCheckCount <= maxNoCheck && ignoreCoreIoCount <= maxIgnoreCoreIo;
    return makeGate(
        'repo',
        'Suppressions',
        passed,
        `@ts-nocheck files ${noCheckCount} (max: ${maxNoCheck}), @ts-ignore(core+io) ${ignoreCoreIoCount} (max: ${maxIgnoreCoreIo})`
    );
}

function checkRootArtifacts() {
    const offenders = fs.readdirSync(ROOT, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((name) => ROOT_ARTIFACT_PATTERNS.some((pattern) => pattern.test(name)))
        .filter((name) => !GITIGNORE_ROOT_PATTERNS.some((pattern) => pattern.test(name)))
        .sort();

    if (offenders.length === 0) {
        return makeGate('repo', 'RootArtifacts', true, 'No root artifact files');
    }

    const preview = offenders.slice(0, 8).join(', ');
    const suffix = offenders.length > 8 ? ` (+${offenders.length - 8} more)` : '';
    return makeGate('repo', 'RootArtifacts', false, `${offenders.length} files: ${preview}${suffix}`);
}

function checkFrontendArtifacts() {
    const offenders = fs.readdirSync(FRONTEND, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name)
        .filter((name) => FRONTEND_ARTIFACT_PATTERNS.some((pattern) => pattern.test(name)))
        .sort();

    if (offenders.length === 0) {
        return makeGate('repo', 'FrontendArtifacts', true, 'No frontend artifact files');
    }

    const preview = offenders.slice(0, 8).join(', ');
    const suffix = offenders.length > 8 ? ` (+${offenders.length - 8} more)` : '';
    return makeGate('repo', 'FrontendArtifacts', false, `${offenders.length} files: ${preview}${suffix}`);
}

function checkPythonSmoke() {
    const pythonCmd = resolvePythonCommand();
    if (!pythonCmd) {
        return makeGate('python', 'PythonSmoke', false, 'No Python interpreter found');
    }

    const result = run(`${pythonCmd} -m compileall custom_components/esphome_designer`);
    if (result.status === 0) {
        return makeGate('python', 'PythonSmoke', true, `compileall via ${pythonCmd}`);
    }

    emitFailureContext('PythonSmoke', result);
    const details = collectDiagnosticLines(`${result.stdout}\n${result.stderr}`, [/error/i, /Traceback/i], 2);
    return makeGate('python', 'PythonSmoke', false, formatDiagnosticSummary(`compileall failed via ${pythonCmd}`, details));
}

function checkPythonTests() {
    const pythonCmd = resolvePythonCommand();
    if (!pythonCmd) {
        return makeGate('python', 'PythonTests', false, 'No Python interpreter found');
    }

    const pythonCode = [
        'import json, sys, unittest',
        'suite = unittest.defaultTestLoader.discover("tests_python", pattern="test_*.py")',
        'count = suite.countTestCases()',
        'result = unittest.TextTestRunner(verbosity=2).run(suite)',
        'print("__PYTHON_TESTS__" + json.dumps({"count": count, "ok": result.wasSuccessful()}))',
        'sys.exit(0 if result.wasSuccessful() else 1)'
    ].join('; ');
    const escapedCode = pythonCode.replace(/"/g, '\\"');
    const result = run(`${pythonCmd} -c "${escapedCode}"`);
    const marker = result.stdout.split(/\r?\n/).find((line) => line.startsWith('__PYTHON_TESTS__'));
    const summary = marker ? JSON.parse(marker.replace('__PYTHON_TESTS__', '')) : null;
    const testCount = summary?.count || 0;

    if (result.status !== 0) {
        emitFailureContext('PythonTests', result);
        const details = collectDiagnosticLines(
            `${result.stdout}\n${result.stderr}`,
            [/^FAIL:/, /^ERROR:/, /^FAILED\b/, /^Traceback/i, /AssertionError/i],
            3
        );
        return makeGate('python', 'PythonTests', false, formatDiagnosticSummary(`Failures via ${pythonCmd}`, details));
    }
    if (testCount === 0) {
        return makeGate('python', 'PythonTests', false, `0 tests discovered via ${pythonCmd}`);
    }
    return makeGate('python', 'PythonTests', true, `${testCount} tests via ${pythonCmd}`);
}

function checkSchemaHash() {
    const result = run('node scripts/schema_hash.cjs --check');
    return makeGate('repo', 'SchemaHash', result.status === 0, result.status === 0 ? 'Hash matches baseline' : 'Hash mismatch');
}

function checkBundleSize() {
    const distPath = path.join(FRONTEND, 'dist');
    if (!fs.existsSync(distPath)) {
        return makeGate('web', 'BundleSize', false, 'dist/ directory not found');
    }

    let totalSize = 0;
    function walk(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) walk(fullPath);
            else totalSize += stat.size;
        }
    }
    walk(distPath);

    const passed = baselines.bundleSizeMax === 0 || totalSize <= baselines.bundleSizeMax;
    const maxText = baselines.bundleSizeMax === 0 ? 'Unset' : `${(baselines.bundleSizeMax / 1024).toFixed(0)}KB`;
    return makeGate('web', 'BundleSize', passed, `${(totalSize / 1024).toFixed(0)}KB (max: ${maxText})`);
}

function checkPlugins() {
    const dirs = fs.readdirSync(FEATURES_DIR);
    let count = 0;
    for (const dir of dirs) {
        if (fs.existsSync(path.join(FEATURES_DIR, dir, 'plugin.js'))) {
            count++;
        }
    }
    const passed = count >= baselines.pluginCount;
    return makeGate('web', 'Plugins', passed, `${count} plugins (min: ${baselines.pluginCount})`);
}

function checkSourceLines() {
    let lines = 0;
    function walk(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (file !== 'lib') walk(fullPath);
            } else if ((file.endsWith('.js') || file.endsWith('.ts')) && !file.endsWith('.min.js')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                lines += content.split('\n').length;
            }
        }
    }
    walk(JS_DIR);
    const warning = lines > baselines.sourceLines * 1.1;
    return makeGate('repo', 'SourceLines', true, `${lines} lines (baseline: ${baselines.sourceLines})`, { warning });
}

function printResults(results) {
    console.log(`${COLORS.BOLD}${COLORS.CYAN}Running Quality Gates...${COLORS.RESET}\n`);
    console.log(`  ${COLORS.BOLD}${'Gate'.padEnd(20)}${'Status'.padEnd(12)}Details${COLORS.RESET}`);
    console.log(`  ${'-'.repeat(60)}`);

    results.forEach((result) => {
        let status = `${COLORS.GREEN}PASS${COLORS.RESET}`;
        if (!result.passed) status = `${COLORS.RED}FAIL${COLORS.RESET}`;
        if (result.warning) status = `${COLORS.YELLOW}WARN${COLORS.RESET}`;
        console.log(`  ${result.gate.padEnd(20)}${status.padEnd(21)}${result.details}`);
    });

    console.log(`\n  ${'-'.repeat(60)}`);
}

function updateBaselines(results) {
    const measured = {};
    results.forEach((result) => {
        if (result.gate === 'ESLint') measured.eslintErrors = Number.parseInt(result.details, 10) || 0;
        if (result.gate === 'Vitest') {
            const match = result.details.match(/(\d+) passed/);
            measured.testCount = match ? Number.parseInt(match[1], 10) : baselines.testCount;
        }
        if (result.gate === 'Globals') {
            const match = result.details.match(/(\d+) window/);
            const current = match ? Number.parseInt(match[1], 10) : baselines.windowRefsMax;
            measured.windowRefsMax = Math.min(current, baselines.windowRefsMax || current);
        }
        if (result.gate === 'Plugins') {
            const match = result.details.match(/(\d+) plugins/);
            measured.pluginCount = match ? Number.parseInt(match[1], 10) : baselines.pluginCount;
        }
        if (result.gate === 'SourceLines') {
            const match = result.details.match(/(\d+) lines/);
            measured.sourceLines = match ? Number.parseInt(match[1], 10) : baselines.sourceLines;
        }
        if (result.gate === 'Coverage') {
            const match = result.details.match(/(\d[\d.]+)% lines/);
            const current = match ? Number.parseFloat(match[1]) : baselines.coverageMin;
            measured.coverageMin = Math.max(current, baselines.coverageMin || current);
        }
        if (result.gate === 'FileCoverage') {
            const next = {};
            const configured = baselines.fileCoverageMins || {};
            Object.entries(configured).forEach(([relativePath, baseline]) => {
                const current = result.fileCoverageMins?.[relativePath.replace(/\\/g, '/')] ?? baseline;
                next[relativePath.replace(/\\/g, '/')] = Math.max(current, baseline);
            });
            measured.fileCoverageMins = next;
        }
        if (result.gate === 'Suppressions') {
            const noCheck = result.details.match(/@ts-nocheck(?: files)? (\d+)/);
            const ignore = result.details.match(/@ts-ignore\(core\+io\) (\d+)/);
            measured.tsNoCheckMax = noCheck ? Number.parseInt(noCheck[1], 10) : (baselines.tsNoCheckMax ?? 17);
            measured.tsIgnoreCoreIoMax = ignore ? Number.parseInt(ignore[1], 10) : (baselines.tsIgnoreCoreIoMax ?? 0);
        }
        if (result.gate === 'BundleSize') {
            const match = result.details.match(/(\d+)KB/);
            const currentKb = match ? Number.parseInt(match[1], 10) : 0;
            const nextMax = currentKb > 0 ? currentKb * 1024 * 1.05 : baselines.bundleSizeMax;
            measured.bundleSizeMax = Math.round(nextMax);
        }
    });

    measured.testFiles = baselines.testFiles;
    measured.schemaHash = baselines.schemaHash;
    measured.fileCoverageMins = measured.fileCoverageMins || baselines.fileCoverageMins || {};

    console.log(`\n  ${COLORS.CYAN}Updating baselines:${COLORS.RESET}`);
    Object.entries(measured).forEach(([key, value]) => {
        const old = baselines[key];
        const arrow = value !== old ? `${old} -> ${value}` : `${value} (unchanged)`;
        console.log(`    ${key}: ${arrow}`);
    });

    fs.writeFileSync(baselinesPath, JSON.stringify(measured, null, 2) + '\n');
    console.log(`\n  ${COLORS.GREEN}Baselines updated!${COLORS.RESET}\n`);
}

function buildProofBundle(results, allPassed) {
    const sections = { repo: [], web: [], python: [] };
    results.forEach((result) => {
        sections[result.section] = sections[result.section] || [];
        sections[result.section].push({
            gate: result.gate,
            passed: result.passed,
            details: result.details,
            warning: !!result.warning
        });
    });

    const summary = {
        tests_passed: null,
        tests_failed: null,
        coverage_lines_pct: null
    };

    const vitestGate = results.find((result) => result.gate === 'Vitest');
    if (vitestGate) {
        const match = vitestGate.details.match(/(\d+) passed, (\d+) failed/);
        if (match) {
            summary.tests_passed = Number.parseInt(match[1], 10);
            summary.tests_failed = Number.parseInt(match[2], 10);
        }
    }

    const coverageGate = results.find((result) => result.gate === 'Coverage');
    if (coverageGate) {
        const match = coverageGate.details.match(/(\d[\d.]+)% lines/);
        if (match) {
            summary.coverage_lines_pct = Number.parseFloat(match[1]);
        }
    }

    return {
        phase: STAGE == null ? 'quality-gate' : `stage-${STAGE}`,
        stage: STAGE,
        started_at: startedAt,
        finished_at: new Date().toISOString(),
        git_sha: getGitSha(),
        baselines,
        sections,
        commands: commandRecords,
        metrics: summary,
        decision: allPassed ? 'pass' : 'fail'
    };
}

function writeProofBundle(bundle) {
    if (!JSON_MODE || !PROOF_DIR) return;
    ensureDir(PROOF_DIR);
    fs.writeFileSync(path.join(PROOF_DIR, 'proof.json'), JSON.stringify(bundle, null, 2) + '\n');
}

const results = [
    checkEslint(),
    checkVitest(),
    checkTypeScriptBase(),
    checkTypeScript(),
    checkBuild(),
    checkRootArtifacts(),
    checkFrontendArtifacts(),
    checkGlobals(),
    checkSuppressions(),
    checkPythonSmoke(),
    checkPythonTests(),
    checkPlugins(),
    checkSourceLines(),
    checkCoverage(),
    checkFileCoverage(),
    checkSchemaHash(),
    checkBundleSize()
];

printResults(results);

const allPassed = results.every((result) => result.passed);
const proofBundle = buildProofBundle(results, allPassed);
writeProofBundle(proofBundle);

if (!allPassed) {
    console.log(`\n  ${COLORS.BOLD}${COLORS.RED}Result: QUALITY GATES FAILED${COLORS.RESET}\n`);
    process.exit(1);
}

if (UPDATE_MODE) {
    updateBaselines(results);
}

console.log(`\n  ${COLORS.BOLD}${COLORS.GREEN}Result: ALL GATES PASSED${COLORS.RESET}\n`);
process.exit(0);
