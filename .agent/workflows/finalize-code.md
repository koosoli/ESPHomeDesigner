---
description: How to finalize a coding task, run the CI quality gate, and build the distribution folder (/finalize)
---

When finishing any feature implementation, bug fix, or codebase change, the following steps MUST be taken unconditionally to ensure the codebase passes all CI checks and the `dist` folder is up to date before asking the user for review.

1. **Build the Production Distribution:**
// turbo
   Run `npm run build` to update the `dist` folder.
   
2. **Run the Local Quality Gate:**
// turbo
   Run `node scripts/quality_gate.cjs` to execute the full CI suite (ESLint, Vitest, TypeCheck, Bundle Size, Schema Hash, etc.).
   
3. **Address Common Failures:**
   - **Schema Hash Mismatch**: If the schema hash fails (e.g., after modifying `current_keys.json` or changing default widget properties), run `node scripts/schema_hash.cjs --update` to recalculate the baseline hash.
   - **ESLint Errors**: If ESLint fails due to "unused variables" (especially in newly created test files or mock functions), ensure you prefix the unused arguments with an underscore (e.g., change `w` to `_w`).
   - **Failing Snapshots**: If snapshot tests fail because of an intentional UI/export change, run `npm test -- -u` to update the snapshots.

4. **Final Verification:**
   Ensure the quality gate outputs "Result: ALL GATES PASSED". Do not notify the user of task completion until this is true, all tests pass, and the typescript build succeeds.

5. **Compile Upload List:**
   Before telling the user the task is complete, run `git status` or explicitly gather a list of **every file that was modified** (production code, unit tests, schemas, generated files in `dist/`, snapshot files, etc.). Provide this comprehensive list to the user so they know exactly what needs to be uploaded/committed to pass CI on their end.
