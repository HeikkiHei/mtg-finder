import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

// Flat config (ESLint 10). Formatting is owned by Prettier, so this only
// carries code-quality rules: ESLint + typescript-eslint recommended.
export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/coverage/**',
      'backend/recognition/data/**',
      '**/next-env.d.ts'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node }
    },
    rules: {
      // TypeScript already resolves identifiers; no-undef only causes false
      // positives (globals, type names) under flat config.
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  },
  {
    // Browser globals for the Next.js frontend.
    files: ['frontend/**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser }
    }
  }
)
