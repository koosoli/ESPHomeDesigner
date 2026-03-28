const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const REPORT_DIR = path.join(ROOT, 'tmp', 'benchmarks');
const REPORT_PATH = path.join(REPORT_DIR, 'workflow_perf_report.json');
const SUMMARY_PATH = path.join(REPORT_DIR, 'workflow_perf_summary.json');
const BASELINE_PATH = path.join(__dirname, 'benchmark_baselines.json');
const PERF_TEST_PATH = 'custom_components/esphome_designer/frontend/tests/performance/workflow_perf.test.js';
const UPDATE_BASELINE = process.argv.includes('--update-baseline');
const BASELINE_SLACK_RATIO = 2.5;
const BASELINE_SLACK_MS = 120;

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
    fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function collectBenchmarks(report) {
    const expectedPath = PERF_TEST_PATH.replace(/\\/g, '/');
    const suite = (report.testResults || []).find((entry) => {
        const normalizedName = String(entry.name || '').replace(/\\/g, '/');
        return normalizedName.endsWith(expectedPath);
    });
    const assertions = suite ? suite.assertionResults || [] : [];
    return assertions.map((result) => ({
        name: result.fullName || result.title,
        durationMs: result.duration || 0,
        status: result.status
    })).sort((a, b) => a.name.localeCompare(b.name));
}

function createThreshold(durationMs) {
    return Math.max(Math.ceil(durationMs * BASELINE_SLACK_RATIO), durationMs + BASELINE_SLACK_MS);
}

function buildBaseline(summary) {
    return {
        generatedAt: new Date().toISOString(),
        slackRatio: BASELINE_SLACK_RATIO,
        slackMs: BASELINE_SLACK_MS,
        totalDurationMsMax: createThreshold(summary.totalDurationMs),
        tests: summary.tests.map((test) => ({
            name: test.name,
            maxDurationMs: createThreshold(test.durationMs)
        }))
    };
}

function loadBaseline() {
    if (!fs.existsSync(BASELINE_PATH)) {
        return null;
    }
    return readJson(BASELINE_PATH);
}

function compareToBaseline(summary, baseline) {
    if (!baseline) {
        return {
            passed: false,
            issues: [`Missing benchmark baseline at ${path.relative(ROOT, BASELINE_PATH).replace(/\\/g, '/')}`],
            tests: summary.tests.map((test) => ({
                ...test,
                maxDurationMs: null,
                deltaMs: null,
                status: 'untracked'
            })),
            total: {
                durationMs: summary.totalDurationMs,
                maxDurationMs: null,
                deltaMs: null,
                status: 'untracked'
            }
        };
    }

    const baselineByName = new Map((baseline.tests || []).map((test) => [test.name, test]));
    const seen = new Set();
    const issues = [];
    const tests = summary.tests.map((test) => {
        const baselineTest = baselineByName.get(test.name);
        seen.add(test.name);
        if (!baselineTest) {
            issues.push(`New benchmark missing baseline: ${test.name}`);
            return {
                ...test,
                maxDurationMs: null,
                deltaMs: null,
                status: 'untracked'
            };
        }

        const deltaMs = test.durationMs - baselineTest.maxDurationMs;
        const status = test.durationMs <= baselineTest.maxDurationMs ? 'pass' : 'fail';
        if (status === 'fail') {
            issues.push(`${test.name} ${test.durationMs}ms > ${baselineTest.maxDurationMs}ms`);
        }
        return {
            ...test,
            maxDurationMs: baselineTest.maxDurationMs,
            deltaMs,
            status
        };
    });

    for (const baselineTest of baseline.tests || []) {
        if (!seen.has(baselineTest.name)) {
            issues.push(`Benchmark missing from current run: ${baselineTest.name}`);
        }
    }

    const totalMax = baseline.totalDurationMsMax ?? null;
    const totalDelta = totalMax == null ? null : summary.totalDurationMs - totalMax;
    const totalStatus = totalMax == null
        ? 'untracked'
        : (summary.totalDurationMs <= totalMax ? 'pass' : 'fail');
    if (totalStatus === 'fail') {
        issues.push(`Total duration ${summary.totalDurationMs}ms > ${totalMax}ms`);
    }

    return {
        passed: issues.length === 0,
        issues,
        tests,
        total: {
            durationMs: summary.totalDurationMs,
            maxDurationMs: totalMax,
            deltaMs: totalDelta,
            status: totalStatus
        }
    };
}

function printSummary(summary, comparison) {
    console.log(`Workflow benchmark summary (${summary.generatedAt})`);
    summary.tests.forEach((test) => {
        const result = comparison.tests.find((entry) => entry.name === test.name);
        const maxText = result?.maxDurationMs == null ? 'untracked' : `${result.maxDurationMs} ms`;
        const deltaText = result?.deltaMs == null ? '' : ` (${result.deltaMs >= 0 ? '+' : ''}${result.deltaMs} ms)`;
        console.log(`- ${test.durationMs.toString().padStart(4, ' ')} ms  ${test.name}  [max: ${maxText}]${deltaText}`);
    });
    const totalMaxText = comparison.total.maxDurationMs == null ? 'untracked' : `${comparison.total.maxDurationMs} ms`;
    const totalDeltaText = comparison.total.deltaMs == null ? '' : ` (${comparison.total.deltaMs >= 0 ? '+' : ''}${comparison.total.deltaMs} ms)`;
    console.log(`Total assertion duration: ${summary.totalDurationMs} ms  [max: ${totalMaxText}]${totalDeltaText}`);
    if (comparison.issues.length > 0) {
        console.log('Benchmark issues:');
        comparison.issues.forEach((issue) => console.log(`- ${issue}`));
    }
}

function main() {
    ensureDir(REPORT_DIR);

    execFileSync(
        process.platform === 'win32' ? 'cmd' : 'npx',
        process.platform === 'win32'
            ? ['/c', 'npx', 'vitest', 'run', PERF_TEST_PATH, '--reporter=json', `--outputFile=${path.relative(ROOT, REPORT_PATH)}`]
            : ['vitest', 'run', PERF_TEST_PATH, '--reporter=json', `--outputFile=${path.relative(ROOT, REPORT_PATH)}`],
        {
            cwd: ROOT,
            stdio: 'inherit'
        }
    );

    const report = readJson(REPORT_PATH);
    const tests = collectBenchmarks(report);
    const totalDurationMs = tests.reduce((sum, test) => sum + test.durationMs, 0);
    const summary = {
        generatedAt: new Date().toISOString(),
        source: path.relative(ROOT, REPORT_PATH).replace(/\\/g, '/'),
        totalDurationMs,
        tests
    };

    if (UPDATE_BASELINE) {
        writeJson(BASELINE_PATH, buildBaseline(summary));
    }

    const baseline = loadBaseline();
    const comparison = compareToBaseline(summary, baseline);
    const output = {
        ...summary,
        baselineSource: path.relative(ROOT, BASELINE_PATH).replace(/\\/g, '/'),
        comparison
    };

    writeJson(SUMMARY_PATH, output);
    printSummary(summary, comparison);

    if (!comparison.passed) {
        process.exitCode = 1;
    }
}

main();
