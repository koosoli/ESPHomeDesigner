/**
 * RC7 API Surface Audit
 * 
 * Extracts every exported function and class method from RC7 source files,
 * then checks if each symbol exists in the current codebase.
 * 
 * Output: ✅ Found | ⚠️ Relocated | ❌ Missing
 * 
 * Usage: node scripts/rc7_api_audit.cjs
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Paths ──────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const RC7_JS = path.join(ROOT, 'oldversions', 'RC7', 'esphome_designer', 'frontend', 'js');
const CURRENT_JS = path.join(ROOT, 'custom_components', 'esphome_designer', 'frontend', 'js');
const CURRENT_FEATURES = path.join(ROOT, 'custom_components', 'esphome_designer', 'frontend', 'features');

// ── Symbol Extraction ──────────────────────────────────────────────────
function extractSymbols(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const symbols = [];
    const relPath = path.relative(RC7_JS, filePath).replace(/\\/g, '/');

    // 1. export function NAME
    const exportFnRe = /export\s+(?:default\s+)?function\s+(\w+)/g;
    let m;
    while ((m = exportFnRe.exec(content)) !== null) {
        symbols.push({ name: m[1], type: 'function', source: relPath });
    }

    // 2. export class NAME — then extract methods inside
    const classRe = /(?:export\s+(?:default\s+)?)?class\s+(\w+)\s*(?:extends\s+\w+\s*)?\{/g;
    while ((m = classRe.exec(content)) !== null) {
        const className = m[1];
        symbols.push({ name: className, type: 'class', source: relPath });

        // Find the class body (simplified: find matching brace)
        const startIdx = m.index + m[0].length;
        let depth = 1;
        let idx = startIdx;
        while (idx < content.length && depth > 0) {
            if (content[idx] === '{') depth++;
            if (content[idx] === '}') depth--;
            idx++;
        }
        const classBody = content.slice(startIdx, idx - 1);

        // Extract method names (methodName( pattern, not keywords)
        const methodRe = /^\s+(?:async\s+)?(\w+)\s*\(/gm;
        let mm;
        while ((mm = methodRe.exec(classBody)) !== null) {
            const name = mm[1];
            // Skip constructor, keywords, and common false positives
            if (['constructor', 'if', 'for', 'while', 'switch', 'catch', 'return', 'throw', 'new', 'typeof', 'delete', 'void', 'const', 'let', 'var', 'function'].includes(name)) continue;
            symbols.push({ name: `${className}.${name}`, type: 'method', source: relPath });
        }
    }

    // 3. export { NAME, NAME2 }
    const reExportRe = /export\s*\{([^}]+)\}/g;
    while ((m = reExportRe.exec(content)) !== null) {
        const names = m[1].split(',').map(n => n.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
        for (const name of names) {
            if (!symbols.find(s => s.name === name)) {
                symbols.push({ name, type: 'reexport', source: relPath });
            }
        }
    }

    // 4. Top-level export const NAME = function / arrow
    const exportConstRe = /export\s+(?:const|let|var)\s+(\w+)\s*=/g;
    while ((m = exportConstRe.exec(content)) !== null) {
        if (!symbols.find(s => s.name === m[1])) {
            symbols.push({ name: m[1], type: 'const', source: relPath });
        }
    }

    return symbols;
}

// ── Recursive File Walk ────────────────────────────────────────────────
function walkJsFiles(dir) {
    const results = [];
    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...walkJsFiles(fullPath));
        } else if (entry.name.endsWith('.js') && !entry.name.endsWith('.test.js')) {
            results.push(fullPath);
        }
    }
    return results;
}

// ── Grep Current Codebase ──────────────────────────────────────────────
function findInCurrent(symbolName) {
    // Extract just the leaf name (for methods like "ClassName.methodName", search for "methodName")
    const searchName = symbolName.includes('.') ? symbolName.split('.').pop() : symbolName;

    // Search in JS/TS files under current codebase
    const searchDirs = [CURRENT_JS, CURRENT_FEATURES];
    const matchFiles = [];

    for (const dir of searchDirs) {
        if (!fs.existsSync(dir)) continue;
        try {
            // Use a simple regex: word boundary + name + opening paren or space/colon
            const cmd = `findstr /S /R /I /M "\\<${searchName}\\>" "${dir}\\*.js" "${dir}\\*.ts" 2>NUL`;
            const result = execSync(cmd, { encoding: 'utf-8', timeout: 5000 }).trim();
            if (result) {
                matchFiles.push(...result.split(/\r?\n/).filter(Boolean));
            }
        } catch {
            // findstr returns non-zero if no matches
        }
    }

    return matchFiles;
}

// ── Main ───────────────────────────────────────────────────────────────
function main() {
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║              RC7 → Current API Surface Audit                ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    // Check RC7 source exists
    if (!fs.existsSync(RC7_JS)) {
        console.error(`ERROR: RC7 source not found at: ${RC7_JS}`);
        process.exit(1);
    }

    // 1. Extract all symbols from RC7
    const rc7Files = walkJsFiles(RC7_JS);
    console.log(`📂 Scanning ${rc7Files.length} RC7 source files...\n`);

    const allSymbols = [];
    for (const file of rc7Files) {
        const symbols = extractSymbols(file);
        allSymbols.push(...symbols);
    }

    // Deduplicate by name (keep first occurrence)
    const seen = new Set();
    const uniqueSymbols = allSymbols.filter(s => {
        if (seen.has(s.name)) return false;
        seen.add(s.name);
        return true;
    });

    console.log(`🔍 Extracted ${uniqueSymbols.length} unique symbols from RC7\n`);

    // 2. Check each symbol in current codebase
    const found = [];
    const relocated = [];
    const missing = [];

    for (const sym of uniqueSymbols) {
        const matches = findInCurrent(sym.name);

        if (matches.length === 0) {
            missing.push(sym);
        } else {
            // Check if it's in the "same" file (by basename)
            const rc7Base = path.basename(sym.source, '.js');
            const matchBases = matches.map(f => path.basename(f, '.js').replace('.ts', ''));
            const inSameFile = matchBases.some(b => b === rc7Base || b.includes(rc7Base) || rc7Base.includes(b));

            if (inSameFile) {
                found.push({ ...sym, currentFiles: matches });
            } else {
                relocated.push({ ...sym, currentFiles: matches });
            }
        }
    }

    // 3. Report
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`  ✅ Found in same location:  ${found.length}`);
    console.log(`  ⚠️  Relocated (refactored):  ${relocated.length}`);
    console.log(`  ❌ Missing:                  ${missing.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (relocated.length > 0) {
        console.log('⚠️  RELOCATED SYMBOLS (moved to different files during refactor):\n');
        for (const sym of relocated) {
            const shortFiles = sym.currentFiles.slice(0, 2).map(f => path.relative(ROOT, f).replace(/\\/g, '/'));
            console.log(`  ${sym.type.padEnd(8)} ${sym.name.padEnd(40)} ${sym.source}`);
            console.log(`           → ${shortFiles.join(', ')}${sym.currentFiles.length > 2 ? ` (+${sym.currentFiles.length - 2} more)` : ''}`);
        }
        console.log('');
    }

    if (missing.length > 0) {
        console.log('❌ MISSING SYMBOLS (not found in current codebase):\n');
        for (const sym of missing) {
            console.log(`  ${sym.type.padEnd(8)} ${sym.name.padEnd(40)} was in: ${sym.source}`);
        }
        console.log('');
    }

    // Summary
    const total = uniqueSymbols.length;
    const pctFound = ((found.length + relocated.length) / total * 100).toFixed(1);
    console.log(`📊 Coverage: ${pctFound}% of RC7 API surface present in current codebase`);
    console.log(`   (${found.length} same location + ${relocated.length} relocated) / ${total} total\n`);

    if (missing.length > 0) {
        console.log(`⚠️  ${missing.length} symbols need investigation — they may have been intentionally removed,`);
        console.log('   renamed, or inlined during the cleanup.\n');
    } else {
        console.log('✅ All RC7 symbols accounted for in the current codebase!\n');
    }

    // Exit code: non-zero if there are missing symbols
    process.exitCode = missing.length > 0 ? 1 : 0;
}

main();
