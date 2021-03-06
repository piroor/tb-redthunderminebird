/*eslint-env commonjs*/
/*eslint quote-props: ['error', "always"] */

module.exports = {
  'root': true,

  // https://qiita.com/kurkuru/items/d4eebd34f0898c6a2d5a
  // this is required to accept `import.meta.url`
  'parser': 'babel-eslint',

  'parserOptions': {
    'ecmaVersion': 2018,
  },

  'env': {
    'browser': true,
    'es6': true,
    'webextensions': true,
    'node': true,
  },

  'settings': {
    'import/resolver': {
      'babel-module': {
        'root': ['./'],
      }
    }
  },

  'rules': {
    // stylisitc problem
    'indent': ['warn', 2, {
      'SwitchCase': 1,
      'MemberExpression': 1,
      'CallExpression': {
        'arguments': 'first',
      },
      'VariableDeclarator': {
        'var': 2,
        'let': 2,
        'const': 3,
      }
    }],
    'quotes': ['warn', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true,
    }],
  }
};
