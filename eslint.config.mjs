import js from '@eslint/js';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  { ignores: ['dist/**', 'node_modules/**'] },

  js.configs.recommended,
  ...compat.extends('airbnb-base'),

  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['src/js/GamePlay.js'],
    rules: {
      'no-restricted-syntax': 'off',
      'no-alert': 'off',
    },
  },
  {
    files: ['src/js/generators.js'],
    rules: {
      'max-len': ['error', { code: 120, ignoreComments: true }],
    },
  },
];