module.exports = {
  // 用于预定义全局变量
  env: {
    es6: true, // 启动es6全局变量
    browser: true, // 浏览器全局变量window, document等
    node: true // 启用node全局变量global等
  },
  // 扩展了之面配置的额外配置选项。
  // 现在我们正在使用 airbnb 的 linting 规则，这些规则被扩展到 jest，然后是 jest-enzyme。
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'jest-enzyme',
    'plugin:css-modules/recommended'
  ],
  // 插件基本上就是我们想要使用的 linting 规则
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'react',
    'css-modules',
    'pug',
    'prettier'
  ],
  // 默认情况下，ESLint 使用 Espree，但因为我们使用了 babel，我们还需要使用 Babel-ESLint
  parser: 'babel-eslint',
  // 如果我们将 Espree 的默认解析器更改为 babel-eslint，需要指定 parserOptions
  /*
  告诉 ESLint，ecmaVersion 是 6。
  因为我们在 EcmaScript 模块（而不是 script）中编写代码，所以我们将 sourceType 指定为 module。
  由于我们使用了 React，引入了 JSX，所以在 ecmaFeatures 中加了 jsx 选项，并将其设置为 true。
  */
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      module: true
    }
  },
  // 更改或覆盖添加的规则 off warn error
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.
    'arrow-parens': 'off', // Incompatible with prettier
    'object-curly-newline': 'off', // Incompatible with prettier
    'no-mixed-operators': 'off', // Incompatible with prettier
    'arrow-body-style': 'off', // Not our taste?
    'function-paren-newline': 'off', // Incompatible with prettier
    'no-plusplus': 'off',
    'operator-linebreak': 'off',
    'global-require': 'off',
    'no-undef': 'off',
    'no-confusing-arrow': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'space-before-function-paren': 0, // Incompatible with prettier
    'max-len': ['error', 200, 2, { ignoreUrls: true }], // airbnb is allowing some edge cases
    'no-console': 'warn', // airbnb is using warn
    'no-alert': 'warn', // airbnb is using warn
    'no-param-reassign': 'off', // Not our taste?
    'consistent-return': 'off',
    radix: 'off', // parseInt, parseFloat radix turned off. Not my taste.
    'react/require-default-props': 'off', // airbnb use error
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }], // airbnb is using .jsx
    'prefer-destructuring': 'off',
    'react/button-has-type': 'off',
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-find-dom-node': 'off', // I don't know
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off', // Is still buggy
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['to'] }
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id']
        }
      }
    ], // for nested label htmlFor error
    'prettier/prettier': ['error']
  }
};
