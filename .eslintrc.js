module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    'eqeqeq': 'warn',
    'curly': 'warn',
    'no-else-return': 'warn',
    'no-empty-function': 'warn',
    'no-eval': 'error',
  },
};
