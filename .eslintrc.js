// eslint --fix 
// 该指令可以使用，只会修改一些 空格，换行，删除空行，引号的错误。标签是否自关闭。
// 一个变量没有使用并不会删除。

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  // 'parser': 'babel-eslint',
  'extends': [
    'airbnb',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      // 'jsx': true,
      'impliedStrict': true,
      // 兼容旧的装饰器语法
      'legacyDecorators': true
    },
  },
  'rules': {
     // 'off' or 0 - turn the rule off
     // 'warn' or 1 - turn the rule on as a warning (doesn’t affect exit code)
     // 'error' or 2 - turn the rule on as an error (exit code will be 1)
    'no-console': [0],
    // 必须使用分号，而不是使用 ASI 机制
    // webstorm 提示根据 ECMAScript 标准提示必须加分号，可在设置中关掉
    // 为什么我不使用分号？ 干净简介
    'semi': [0],
    // 强制数组和对象进行解构？
    'prefer-destructuring': [0],

    // 用于 jsx 元素的静态抽象语法树检测
    // 点击事件必须有键盘事件绑定
    'jsx-a11y/click-events-have-key-events': [0],
    // 静态元素不能进行交互，如给 div 添加 click 事件
    'jsx-a11y/no-static-element-interactions': [0],
    // 当一个元素是非必传时可以不用设置默认值
    'react/require-default-props': [0],
    // jsx 文件名扩展
    'react/jsx-filename-extension': ["error", { "extensions": [".js", ".jsx", "tsx", "ts"] }],
    // 强制 boolean使用简写
    'react/jsx-boolean-value': [0],
    'func-names': 0,
    'comma-dangle': 0,
    // 是否允许 debugger 语句
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 所有的扩展可忽略，处理 svg
    "import/extensions": ["error", "never", { "svg": "always" }],
    // 是否允许隐藏的 any
    "@typescript-eslint/no-explicit-any": [0],
    "@typescript-eslint/no-unused-vars": [2],
    // 箭头函数的括号
    "arrow-parens": [0],
  },
  'settings': {
    "import/extensions": [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ],
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.js', '.jsx', '.tsx'],
        map: [
          ['net', './net/'],
          ['components', './src/components/'],
          ['modules', './src/modules/'],
          ['assets', './assets/'],
          ['@pages', './src/pages/'],
        ],
      }
    }
  }
};
