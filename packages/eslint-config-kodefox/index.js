module.exports = {
  env: {
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['eslint-comments', 'import', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    // TypeScript (@typescript-eslint/eslint-plugin)
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Boolean: { message: 'Use boolean instead', fixWith: 'boolean' },
          Number: { message: 'Use number instead', fixWith: 'number' },
          String: { message: 'Use string instead', fixWith: 'string' },
          Symbol: { message: 'Use symbol instead', fixWith: 'symbol' },
        },
      },
    ],

    // ESLint (eslint-plugin-eslint-comments)
    'eslint-comments/no-unused-disable': 'warn',

    // Import/export syntax (eslint-plugin-import)
    'import/no-useless-path-segments': [
      'warn',
      {
        noUselessIndex: true,
      },
    ],
    'import/order': ['warn', { 'newlines-between': 'always' }],

    // Custom
    'array-callback-return': 'warn',
    curly: 'warn',
    'dot-notation': 'warn',
    'eol-last': 'warn',
    eqeqeq: ['error', 'always', { null: 'never' }],
    'guard-for-in': 'warn',
    'no-alert': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-duplicate-imports': ['warn', { includeExports: true }],
    'no-floating-decimal': 'warn',
    'no-new': 'warn',
    'no-proto': 'warn',
    'no-return-assign': 'warn',
    'no-underscore-dangle': ['warn', { allowAfterThis: true }],
    'no-unneeded-ternary': 'warn',
    'one-var': ['warn', 'never'],
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'off',
    radix: 'warn',
    yoda: 'warn',
  },
};
