const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const arenaPlugin = require('./eslint-rules');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  js.configs.recommended,
  ...compat.extends('expo', 'prettier'),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'react-native': require('eslint-plugin-react-native'),
      prettier: require('eslint-plugin-prettier'),
      arena: arenaPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        __DEV__: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/display-name': 'off',
      'no-console': 'error',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'arena/arena-design-tokens': 'error',
      'arena/arena-file-structure': 'warn',
      'arena/arena-best-practices': 'warn',
      'arena/arena-no-comments': 'error',
      'arena/arena-no-hardcoded-constants': 'error',
      'arena/arena-use-ui-components': 'error',
      'arena/arena-no-custom-text-styles': 'error',
      'arena/arena-use-alert-context': 'error',
      'arena/arena-no-emoji-icons': 'error',
      'arena/arena-list-padding': 'error',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/core-modules': ['@env'],
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks'),
      'react-native': require('eslint-plugin-react-native'),
      prettier: require('eslint-plugin-prettier'),
      arena: arenaPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      globals: {
        __DEV__: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/display-name': 'off',
      'no-console': 'error',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'arena/arena-design-tokens': 'error',
      'arena/arena-file-structure': 'warn',
      'arena/arena-best-practices': 'warn',
      'arena/arena-no-comments': 'error',
      'arena/arena-no-hardcoded-constants': 'error',
      'arena/arena-use-ui-components': 'error',
      'arena/arena-no-custom-text-styles': 'error',
      'arena/arena-use-alert-context': 'error',
      'arena/arena-no-emoji-icons': 'error',
      'arena/arena-list-padding': 'error',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: [
      'src/config/sportsConfig.ts',
      'src/components/error-boundary/**',
      'src/constants/**',
    ],
    rules: {
      'arena/arena-design-tokens': 'off',
      'arena/arena-no-comments': 'off',
      'arena/arena-best-practices': 'off',
    },
  },
  {
    files: [
      'src/components/animatedSplashScreen/**',
      'src/components/header/utils/**',
      'src/screens/notificationsScreen/components/**',
    ],
    rules: {
      'arena/arena-design-tokens': 'off',
    },
  },
  {
    files: ['src/screens/**', 'src/components/**'],
    rules: {
      'arena/arena-list-padding': 'off',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '*.config.js',
      '*.config.ts',
      'eslint-rules/',
      'jest.setup.js',
      'jest.config.js',
      'src/screens/componentsShowcaseScreen/**',
    ],
  },
];
