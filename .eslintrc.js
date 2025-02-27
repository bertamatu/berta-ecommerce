module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // ES6 specific rules
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],

    // React specific rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

    // TypeScript specific rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
