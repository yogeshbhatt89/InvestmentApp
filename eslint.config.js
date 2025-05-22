import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import parser from '@typescript-eslint/parser'

const compat = new FlatCompat()

export default [
  // Global settings that apply to all files.
  {
    languageOptions: {
      parser,
    },
    plugins: {
      react,
    },
    rules: {
      // Disable these rules globally
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },

  // ESLint recommended config
  js.configs.recommended,

  // React recommended config (from our compatibility helper)
  ...compat.extends('plugin:react/recommended'),

  // Configuration for TS/TSX files.
  {
    files: ['**/*.{ts,tsx}', 'mock/*.cjs'],
    languageOptions: {
      parser,
      globals: {
        console: true,
        document: true,
        window: true,
        node: true,
        es2021: true,
        setTimeout: true,
        HTMLElement: true,
        localStorage: true,
        HTMLInputElement: true,
        HTMLDivElement: true,
        process: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier,
      'react-hooks': reactHooks,
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
]
