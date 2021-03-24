

## 问题记录

1. less-loader 报错
    错误描述: Module build failed (from ./node_modules/less-loader/dist/cjs.js):TypeError: this.getOptions is not a function。
    错误原因: 8.0+ 版本 less-loader 的配置方式发生了变化，导致报错。
    解决方案: 最简单的解决办法, 安装低版本 ` yarn add less-loader@5.0.0 -D `。
    其他方案: https://segmentfault.com/a/1190000039190699。


2. 修饰符 '@' 报错
    错误描述: 在 ` config-overrides.js ` 中配置了修饰符支持后，代码编译能通过但 VSCode 仍提示 "Parsing error: Unexpected character '@' eslint "。
    错误原因: ESLint 本身不支持实验性 ECMAScript 语言功能 (decorators)
    解决方案: 
    1. 安装 `  babel-eslint ` 插件 ` yarn add babel-eslint -D`;
    2. 在 `  package.json/eslintConfig  ` 或 ` .eslintrc.js `文件中添加 ` "parser": "babel-eslint" `





## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
