module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off',
    'linebreak-style': 0,
    'react/jsx-props-no-spreading': 'off',
  },
};
