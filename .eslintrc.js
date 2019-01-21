module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always'],
    code: 120,
    'arrow-parens': ['error', 'always'],
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
  },
};
