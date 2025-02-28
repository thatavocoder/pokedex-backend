module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [ 'error', { argsIgnorePattern: '^_' } ],
    'no-console': [ 'warn', { allow: [ 'warn', 'error' ] } ],
    'prettier/prettier': 'error',
  },
  env: {
    node: true,
    es6: true,
  },
}; 