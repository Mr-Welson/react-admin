module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    // 0: 'off'; 1: 'warn'; 2: 'error

    // Common js rules
    // 强制使用骆驼拼写法命名约定
    "camelcase": 1,
    // 强制所有控制语句使用一致的括号风格，if,else等{} 不可省略
    "curly": 2,
    // 要求使用 === 和 !==
    "eqeqeq": 1,
    // 警告出现未使用过的变量
    "no-unused-vars": [
      1, {
        "vars": "all", // 检查所有变量
        "args": "none" // 不检查参数
      }
    ],
    // 要求构造函数首字母大写
    "new-cap": 1,
    "quotes": [
      0//1, "single"
    ],
    // 强制可嵌套的块的最大深度
    "max-depth": [
      1, 4
    ],
    // 强制函数块最多允许的的语句数量
    "max-statements": [
      1, 45
    ],
    // 禁止使用多个空格
    "no-multi-spaces": 0,
    // 要求 IIFE 使用括号括起来
    "wrap-iife": 2,
    // 禁止不必要的分号
    "no-extra-semi": 2,

    // ES6 rules
    // 强制箭头函数的箭头前后使用一致的空格
    "arrow-spacing": [
      2, {
        "before": true,
        "after": true
      }
    ],
    // 禁止修改 const 声明的变量
    "no-const-assign": 2,
    // 要求使用 let 或 const 而不是 var
    "no-var": 1,

    // React
    // 强制在 JSX 属性中一致地使用双引号或单引号
    "jsx-quotes": [
      0//1, "prefer-single"
    ],
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/prop-types": 0,
    "no-case-declarations": 0,
    "no-prototype-builtins": 0,
    "no-inner-declarations": 0,
    "no-unreachable": 1,
    "no-debugger": 1
  }
};
