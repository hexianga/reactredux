module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb"
  ],
  "plugins": [
    "react"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "impliedStrict": true,
      // 兼容旧的装饰器语法
      "legacyDecorators": true
    }
  },
  "rules": {
     // "off" or 0 - turn the rule off
     // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
     // "error" or 2 - turn the rule on as an error (exit code will be 1)
    "no-console": [0],
    // 必须使用分号，而不是使用 ASI 机制
    // webstorm 提示根据 ECMAScript 标准提示必须加分号，可在设置中关掉
    // 为什么我不使用分号？ 干净简介
    "semi": [0],
    // 强制数组和对象进行解构？
    "prefer-destructuring": [0],

    // 用于 jsx 元素的静态抽象语法树检测
    // 点击事件必须有键盘事件绑定
    "jsx-a11y/click-events-have-key-events": [0],
    // 静态元素不能进行交互，如给 div 添加 click 事件
    "jsx-a11y/no-static-element-interactions": [0],
    // 当一个元素是非必传时可以不用设置默认值
    "react/require-default-props": [0],
    // 强制 boolean使用简写
    "react/jsx-boolean-value": [0]
  }
};
