#!/usr/bin/env node

const { execFileSync } = require('child_process');

const BASELINE_FILES = new Set([
  'scripts/baselines.json'
]);

const ALLOWED_COMPANION_PATTERNS = [
  /^docs\//i,
  /^tmp\/proof\//i,
  /^coverage\//i,
  /^TASKS\.md$/i,
  /^README(?:\.[^/]+)?$/i,
  /^CHANGELOG(?:\.[^/]+)?$/i,
  /\.md$/i
];

function normalizePath(filePath) {
  return String(filePath || '').replace(/\\/g, '/').replace(/^\.\//, '');
}

function isBaselineFile(filePath) {
  return BASELINE_FILES.has(normalizePath(filePath));
}

function isAllowedCompanion(filePath) {
  const normalized = normalizePath(filePath);
  return ALLOWED_COMPANION_PATTERNS.some((pattern) => pattern.test(normalized));
}

function parseCliFiles(argv) {
  const filesFlagIndex = argv.indexOf('--files');
  if (filesFlagIndex === -1) return null;
  return argv.slice(filesFlagIndex + 1).map(normalizePath).filter(Boolean);
}

function isInsideGitWorkTree() {
  try {
    const output = execFileSync('git', ['rev-parse', '--is-inside-work-tree'], { encoding: 'utf8' }).trim();
    return output === 'true';
  } catch {
    return false;
  }
}

function getChangedFilesFromGit() {
  const eventName = process.env.GITHUB_EVENT_NAME || '';
  const baseRef = process.env.GITHUB_BASE_REF || '';

  if (eventName === 'pull_request' && baseRef) {
    return execFileSync('git', ['diff', '--name-only', `origin/${baseRef}...HEAD`], { encoding: 'utf8' })
      .split(/\r?\n/)
      .map(normalizePath)
      .filter(Boolean);
  }

  try {
    return execFileSync('git', ['diff', '--name-only', 'HEAD~1..HEAD'], { encoding: 'utf8' })
      .split(/\r?\n/)
      .map(normalizePath)
      .filter(Boolean);
  } catch {
    return execFileSync('git', ['diff', '--name-only', 'HEAD'], { encoding: 'utf8' })
      .split(/\r?\n/)
      .map(normalizePath)
      .filter(Boolean);
  }
}

function main() {
  const cliFiles = parseCliFiles(process.argv.slice(2));
  let changedFiles = cliFiles;

  if (!changedFiles) {
    if (!isInsideGitWorkTree()) {
      console.log('Baseline governance skipped: no git work tree and no --files override.');
      process.exit(0);
    }
    changedFiles = getChangedFilesFromGit();
  }

  if (!changedFiles.length) {
    console.log('Baseline governance passed: no changed files detected.');
    process.exit(0);
  }

  const baselineChanges = changedFiles.filter(isBaselineFile);
  if (!baselineChanges.length) {
    console.log('Baseline governance passed: no baseline files changed.');
    process.exit(0);
  }

  const disallowedCompanions = changedFiles.filter((filePath) => {
    return !isBaselineFile(filePath) && !isAllowedCompanion(filePath);
  });

  if (disallowedCompanions.length > 0) {
    console.error('Baseline governance failed: baseline files changed together with behavior files.');
    console.error(`Baseline files: ${baselineChanges.join(', ')}`);
    console.error(`Disallowed companion files: ${disallowedCompanions.join(', ')}`);
    process.exit(1);
  }

  console.log(`Baseline governance passed: ${baselineChanges.join(', ')} changed without behavior files.`);
}

main();
