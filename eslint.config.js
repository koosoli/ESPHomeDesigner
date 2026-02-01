import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    prettier,
    // Ignore vendor libraries
    {
        ignores: [
            "custom_components/**/js/lib/**",
            "coverage/**",
            "node_modules/**"
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
                AppState: "readonly",
                DEVICE_PROFILES: "readonly",
                createWidget: "readonly",
                showToast: "readonly",
                on: "readonly",
                emit: "readonly",
                EVENTS: "readonly",
                deepClone: "readonly",
                hasHaBackend: "readonly",
                PluginRegistry: "readonly",
                jsyaml: "readonly",
                qrcode: "readonly",
                // API globals
                getHaHeaders: "readonly",
                HA_API_BASE: "readonly",
                // Test globals
                vi: "readonly",
                // Utility globals
                Logger: "readonly",
                isRGBDevice: "readonly",
                CALENDAR_HELPER_SCRIPT: "readonly",
                loadExternalProfiles: "readonly",
                findAndSelect: "readonly",
                // UI/Factory globals
                app: "readonly",
                WidgetFactory: "readonly",
                SUPPORTED_DEVICE_IDS: "readonly",
                uploadHardwareTemplate: "readonly",
                generateCustomHardwareYaml: "readonly",
                saveLayoutToBackend: "readonly",
                loadLayoutIntoState: "readonly",
                CANVAS_WIDTH: "readonly",
                attempts: "writable"
            }
        },
        rules: {
            "no-unused-vars": [
                "warn",
                {
                    "argsIgnorePattern": "^_"
                }
            ],
            "no-undef": "error",
            "no-console": "off"
        }
    }
];
