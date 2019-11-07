module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'eslint-comments', 'react', 'react-hooks'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    // TypeScript (@typescript-eslint/eslint-plugin)
    '@typescript-eslint/camelcase': ['error', { properties: 'always' }],
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],

    // ESLint (eslint-plugin-eslint-comments)
    'eslint-comments/no-unused-disable': 'warn',

    // React (eslint-plugin-react)
    'react/no-unknown-property': 'warn',
    'react/prop-types': 'warn',

    // React (eslint-plugin-react-hooks)
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Other
    'array-callback-return': 'warn',
    // Disabling "camelcase" in favor of "@typescript-eslint/camelcase"
    camelcase: 'off',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // Disabling "indent" because it gets confused with JSX in some cases.
    indent: 'off',
    'prefer-const': 'off',
    'no-alert': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    curly: 'warn',
    'eol-last': 'warn',
    'guard-for-in': 'warn',
    'no-shadow': ['error', { builtinGlobals: true }],
    'no-floating-decimal': 'warn',
    'no-new': 'warn',
    'no-proto': 'warn',
    'no-return-assign': 'warn',
    'no-unneeded-ternary': 'warn',
    'one-var': ['warn', 'never'],
    'prefer-arrow-callback': 'warn',
    radix: 'warn',
    yoda: 'warn',

    // Code Style
    'array-bracket-spacing': ['warn', 'never'],
    'arrow-parens': 'warn',
    'arrow-spacing': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'brace-style': ['warn', '1tbs', { allowSingleLine: false }],
    'comma-dangle': ['warn', 'always-multiline'],
    'comma-spacing': 'warn',
    'jsx-quotes': ['warn', 'prefer-double'],
    'key-spacing': 'warn',
    'keyword-spacing': 'warn',
    'no-extra-parens': ['warn', 'functions'],
    'no-extra-semi': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-multi-spaces': 'warn',
    'no-spaced-func': 'warn',
    'no-trailing-spaces': 'warn',
    quotes: [
      'warn',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
    'semi-spacing': 'warn',
    semi: 'warn',
    'space-before-blocks': 'warn',
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': 'warn',
    'space-infix-ops': 'warn',
    'space-unary-ops': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
