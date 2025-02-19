// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;

import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import tailwind from 'eslint-plugin-tailwindcss';
import testingLibrary from 'eslint-plugin-testing-library';

export default antfu(
  {
    react: true,
    typescript: true,

    lessOpinionated: true,
    isInEditor: false,

    stylistic: {
      semi: true,
    },

    formatters: {
      css: true,
    },

    ignores: ['migrations/**/*', 'next-env.d.ts', 'src/components/ui/*'],
  },
  ...tailwind.configs['flat/recommended'],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    files: ['**/*.test.ts?(x)'],
    ...testingLibrary.configs['flat/react'],
    ...jestDom.configs['flat/recommended'],
  },
  {
    files: ['**/*.spec.ts', '**/*.e2e.ts'],
    ...playwright.configs['flat/recommended'],
  },
  {
    rules: {
      'antfu/no-top-level-await': 'off', // Allow top-level await
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'ts/consistent-type-definitions': 'off', // Use `type` instead of `interface`
      'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'node/prefer-global/process': 'off', // Allow using `process.env`
      'test/padding-around-all': 'error', // Add padding in test files
      'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles
      'react/require-default-props': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',

      // 'antfu/no-top-level-await': 'off', // Allow top-level await
      // 'style/brace-style': ['error', '1tbs'], // Use the default brace style
      // 'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
      // 'react/prefer-destructuring-assignment': 'off', // Allow manually setting ref
      // 'react/require-default-props': 'off',
      // 'react/no-unknown-property': 'off', // Prevents auto-modification of JSX props
      // 'react/no-unused-prop-types': 'off', // Avoids unnecessary prop type checks
      // 'react/no-unescaped-entities': 'off', // Stops unnecessary refactoring of JSX text
      // 'react/jsx-props-no-spreading': 'off', // Allows spreading props like `{...props}`
      // 'react/jsx-no-bind': 'off', // Allows inline functions (useful for event handlers)
      // 'react/jsx-key': 'warn', // Keep key warnings (important)
      // 'react/no-unknown-property': 'off', // Ensures ref stays unchanged
      // 'react/display-name': 'off', // Prevents auto-removal of display names
      // 'tailwindcss/classnames-order': 'off', // Avoids auto-sorting classnames

    },
  },
);
