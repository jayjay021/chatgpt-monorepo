import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/node_modules/",
        "**/build/",
        "**/node_modules/",
        "**/build/",
        "**/dist/",
        "**/*.d.ts",
    ],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        react: fixupPluginRules(react),
        "jsx-a11y": fixupPluginRules(jsxA11Y),
        prettier: fixupPluginRules(prettier),
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "no-console": "warn",
        "no-unused-vars": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": "error",

        "import/order": ["error", {
            groups: ["builtin", "external", "internal"],

            pathGroups: [{
                pattern: "react",
                group: "external",
                position: "before",
            }],

            pathGroupsExcludedImportTypes: ["react"],
            "newlines-between": "always",
        }],
    },
}];