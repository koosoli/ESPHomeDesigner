import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    prettier,
    // Ignore vendor libraries
    {
        ignores: [
            "**/dist/**",
            "**/build/**",
            "**/*.min.js",
            "custom_components/**/js/lib/**",
            "coverage/**",
            "node_modules/**",
            "oldversions/**",
            ".venv/**",
            "custom_components/!(esphome_designer)/**",
            "tmp/**",
            "**/tmp/**"
        ]
    },
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                // Core app globals
                jsyaml: "readonly",
                qrcode: "readonly",
                // Test globals
                vi: "readonly",
                afterEach: "readonly",
                beforeEach: "readonly",
                describe: "readonly",
                expect: "readonly",
                it: "readonly"
            }
        },
        rules: {
            "no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_"
                }
            ],
            "no-undef": "error",
            "no-console": "off"
        }
    }
];
