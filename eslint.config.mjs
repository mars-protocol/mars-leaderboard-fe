// @ts-check

import { fixupPluginRules } from '@eslint/compat'
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,

  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: ['src/types/generated/**/*'],
  },
  {
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
  },
  {
    rules: {
      // ...
      ...eslintPluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-prototype-builtins': 'off',
      'require-jsdoc': 'off',
      'no-useless-catch': 'off',
      '@typescript-eslint/ban-types': 'off',
      'no-case-declarations': 'off',
      'no-constant-binary-expression': 'off',
      'linebreak-style': ['warn', 'unix'],
      'no-undef': 'off',
      'sort-imports': [
        'warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      // Disable stricter react-hooks rules that conflict with Next.js patterns
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },
)
