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
    'react/jsx-key': 'warn',
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-no-duplicate-props': 'warn',
    'react/jsx-no-target-blank': 'warn',
    'react/jsx-no-undef': 'warn',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/no-unknown-property': 'warn',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'warn',

    // React (eslint-plugin-react-hooks)
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Other
    'array-callback-return': 'warn',
    // Disabling "camelcase" in favor of "@typescript-eslint/camelcase"
    camelcase: 'off',
    eqeqeq: ['error', 'always', { null: 'never' }],
    // Disabling "indent" because it gets confused with JSX in some cases.
    indent: 'off',
    'prefer-const': 'off',
    'no-alert': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    curly: 'warn',
    'eol-last': 'warn',
    'guard-for-in': 'warn',
    'no-duplicate-imports': ['warn', { includeExports: true }],
    'no-floating-decimal': 'warn',
    'no-new': 'warn',
    'no-proto': 'warn',
    'no-return-assign': 'warn',
    'no-underscore-dangle': ['warn', { allowAfterThis: true }],
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
