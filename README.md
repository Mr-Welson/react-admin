# React-Admin

**多标签页后台管理模板**

## 特点

- tab 页签➕右键菜单，提升效率
- Mobx 状态管理➕持久化
- 封装实用 axios 请求
- 动态链式面包屑导航
- 菜单页面路由权限控制
- less➕css module 样式隔离
- 可自定义 webpack 配置➕优化打包



## 功能说明

### 路由

根据 src/routes 生成路由及菜单

**路由规则**

1. 嵌套菜单自动重定向到第一个
2. 未匹配到的菜单会重定向到 404 
3. 父路由有 component 属性时，子路由会共用父路由的页面



### Components



### Route



### Service

`requestInstance`

### Store

`withModel`

`toJS`

### Module Css



## To-Do

1. mobx 中访问 history 的方式需优化，当前方式如下，并不美好

```
// 组件
const history = useHistory();
useEffect(() => {
	userModel.setHistory(history);
}, [])

// store
class Model {
	history = {}
	setHistory = (history) => {
    	this.history = history
	}
}
```

2. Page404 中返回首页需关闭 404 页签
3. ` src/routes ` 中的组件采用懒加载方式
4. ` tabModel  ` 对比 `hooks` 方式和 `mobx` 方式，目前采用的是 `hooks` 方式，有优化空间
5. 寻找更好的 `hooks` 方式的状态管理替代 `mobx`，当前采用的是 `mobx@4.15.7` (因为要考虑兼容 ie10+)
6. 动态设置 ` index` 路由
7.  ` typescript ` 支持



## Bug Fix

### less-loader 报错

错误描述: Module build failed (from ./node_modules/less-loader/dist/cjs.js):TypeError: this.getOptions is not a function。
错误原因: 8.0+ 版本 less-loader 的配置方式发生了变化，导致报错。
解决方案: 最简单的解决办法, 安装低版本 ` yarn add less-loader@5.0.0 -D `。
其他方案: https://segmentfault.com/a/1190000039190699。

### 修饰符 '@' 报错

错误描述: 在 ` config-overrides.js ` 中配置了修饰符支持后，代码编译能通过但 VSCode 仍提示 "Parsing error: Unexpected character '@' eslint "。
错误原因: ESLint 本身不支持实验性 ECMAScript 语言功能 (decorators)
解决方案: 

1. 安装 `  babel-eslint ` 插件 ` yarn add babel-eslint -D`;
2. 在 `  package.json/eslintConfig  ` 或 ` .eslintrc.js `文件中添加 ` "parser": "babel-eslint" `

### @ 路径快捷跳转





## Create React App 文档

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

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
