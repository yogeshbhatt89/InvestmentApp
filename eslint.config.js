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
    // This configuration object has no "files" property – it’s global.
    languageOptions: {
      // With the new JSX transform, you can use parserOptions if necessary.
      // With flat config, specifying the parser at the top level may help.
      parser,
    },
    plugins: {
      react: react,
    },
    rules: {
      // Disable these rules globally so that you don't have to import React in every TSX file.
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
  // Recommended settings for JavaScript.
  js.configs.recommended,
  // Extend the recommended React config.
  ...compat.extends('plugin:react/recommended'),
  // Settings for all TypeScript/TSX files.
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
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // Unused variables can be ignored if they begin with an underscore.
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  // File-specific config for TableWrapperComponent.tsx.
  {
    // Use a glob that accurately matches your file.
    files: ['src/modules/Table/TableWrapperComponent.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
