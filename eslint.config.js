import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import parser from '@typescript-eslint/parser'

const compat = new FlatCompat()

export default [
  // Global config for all TS/TSX files
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
      prettier: prettier,
      react: react,
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
  // File-specific config for TableWrapperComponent.tsx
  {
    files: ['**/TableWrapperComponent.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Extend additional configs (order matters – later items override earlier ones)
  ...compat.extends('plugin:react/recommended'),
  js.configs.recommended,
]
