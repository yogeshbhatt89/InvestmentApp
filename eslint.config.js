import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import * as tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import parser from '@typescript-eslint/parser'

const compat = new FlatCompat()

export default [
  js.configs.recommended,
  ...compat.extends('plugin:react/recommended'),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parser,
      globals: {
        console: true,
        document: true,
        window: true,
        node: true,
        es2021: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettier,
      react: react,
      'react-hooks': reactHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    env: {
      browser: true,
      node: true,
    },
  },
]
