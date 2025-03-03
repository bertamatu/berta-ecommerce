import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Import plugins using dynamic import to avoid ESM/CJS issues
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'dist/**',
      'build/**',
      '.vercel/**',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'react/no-unescaped-entities': 'off',
    },
  },
  // TailwindCSS rules
  ...compat.extends('plugin:tailwindcss/recommended'),
  // Testing Library rules
  ...compat.extends('plugin:testing-library/react'),
  // Cypress rules
  {
    files: ['cypress/**/*.{js,jsx,ts,tsx}', '**/*.cy.{js,jsx,ts,tsx}'],
    ...compat.extends('plugin:cypress/recommended'),
  },
];

export default eslintConfig;
