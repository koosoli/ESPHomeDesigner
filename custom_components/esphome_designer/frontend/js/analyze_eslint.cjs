const fs = require('fs');
const path = require('path');
if (!fs.existsSync('eslint_report.json')) { console.log('No report found.'); process.exit(0); }
const data = JSON.parse(fs.readFileSync('eslint_report.json', 'utf8'));
let warningCount = 0;
/** @param {any} file */
data.forEach(file => {
    if (file.warningCount > 0) {
        console.log('--- ' + path.relative(process.cwd(), file.filePath));
        /** @param {any} msg */
        file.messages.forEach(msg => {
            if (msg.severity === 1) { // 1 is warning
                console.log('  Line ' + msg.line + ': ' + msg.message + ' [' + msg.ruleId + ']');
                warningCount++;
            }
        });
    }
});
console.log('Total warnings: ' + warningCount);
