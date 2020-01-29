module.exports = {
  'env': {
    'browser': false,
    'es6': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint/',
  ],
  'rules': {
    'new-cap': ['error', {
        'properties': false
    }]
  },
};
