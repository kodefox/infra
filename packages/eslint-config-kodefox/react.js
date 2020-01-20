module.exports = {
  extends: 'kodefox',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
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
    'react/self-closing-comp': 'warn',

    // React (eslint-plugin-react-hooks)
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
