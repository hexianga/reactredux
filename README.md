
## 从头搭建一个项目的流程

创建目录 --> 创建 git 仓库, 编辑 .gitignore  --> package.json --> 搭建目录结构 --> 写 webpack 配置 --> 安装软件包 --> 写业务代码

编写业务代码：

目录结构搭建 --> 编写程序的主入口文件和路由 --> 编写 demo 页面 --> 配置 eslint --> 网络请求的封装(axios)

难点： react 的入口文件怎么写？

    如果不用状态管理，就是一个跟组件，很简单。
    路由文件的编写：
        需要区别 BrowserRouter 和 HashRouter。
        使用 BrowserRouter 需要服务器支持。否则就会存在用户访问的资源不存在的情况(因为访问的是一个真实的文件，而服务器中没有这个文件，所以会报404)。官方推荐使用 BrowserRouter。

服务器端需要进行 nginx 的配置：

    server {
    	server_name react.thinktxt.com;
    	listen 80;

    	root /Users/txBoy/WEB-Project/React-Demo/dist;
    	index index.html; # 处理 request_uri 是 / 的请求
    	location / {
        	try_files $uri /index.html; # 判断 $uri 是否存在，如果不存在就返回 index.html
      	}
    }

通过配置 Nginx，访问任何 URI 都指向index.html，浏览器上的path，会自动被 React-router处理，进行无刷新跳转。

本地开发的配置：

    devServer: {
        historyApiFallback: true
    }
    当使用 HTML5 History API 时，任意的 404 响应都被替代为 index.html。然后后面的 path 会被 react-router 进行处理。

router 文件中组件的导出？

组件只有两种。函数式和 class 组件，所以导出的时候导出的式一个函数或者class，而不能是其它。

    错误写法：导出的是编译后的 React.createElement 方法
    export default <Router>
      <Switch>
        <Route path='/' exact component={Index} />
      </Switch>
    </Router>

难点：写 webpack 配置。

## 安装软件包

使用 react 编写项目。

react 相关：(`--save` 写入项目的依赖)

    react
    react-dom
    react-router-dom
    redux
    react-redux
    axios

    babel-runtime是供编译模块复用工具函数。是锦上添花

下面的都是 `--save-dev`：

babel 相关：

babel 6的写法：

    babel-core // es6 语法
    babel-polyfill // es6 的 api
    babel-preset-env
    babel-preset-react
    babel-plugin-transform-runtime // async await
    babel-plugin-transform-decorators-legacy // 装饰器语法
    @babel/plugin-proposal-class-properties // 类中处理属性，比如写箭头函数

babel 7 中全部使用 `@babel/xx` 的形式。此时 `babel-loader` 使用的版本为 8。

loader 相关：

    style-loader
    css-loader
    scss-loader
    file-loader
    babel-loader  // 仅仅是一个 webpack 插件
    node-sass

webpack 相关：

    webpack
    webpack-cli
    webpack-merge
    webpack-dev-server

其它(--save-dev)：

    rimraf
    react-hot-loader

官方推荐使用 `.babelrc` 写配置文件：

## 难点一：路径？相对路径和绝对路径

两个函数，参数是字符串，返回的也是字符串。

1. path.resolve(): 把路径片段解析为绝对路径。(如果有跟路径符  `\`, 那么就认定为跟路径，如果没有就会把路径接在当前目录下面)


    path.resolve('foo/bar', 'tmp/file/');
    '/Users/hexiang/Project/reactshop/app/config/foo/bar/tmp/file'
    path.resolve('/foo/bar', 'tmp/file/');
    '/foo/bar/tmp/file'

2. path.join(): 把给定的字符串按照平台的分隔符拼接为字符串。


    path.join('wqwq', 'ewe')
    'wqwq/ewe'

__dirname 和 __firename

    __dirname: 当前文件所在目录的绝对路径

    __firename：__dirname + filename

## 难点 2: 各个 webpack 配置中字段中的内容？

1. entry: 内容可以是字符串，字符串数组，对象，函数。

规则：每个 HTML 页面都有一个入口起点。

单页应用(SPA)：一个入口起点，

多页应用(MPA)：多个入口起点。

打包后生成文件的命名：如果是字符串或者是字符串数组。默认是 `main`，如果是一个对象，则每一个键名会被命名为 `chunk` 的名字


## 难点三 公共模块和开发生产模块的合并？

webpackmerge 和 object.assign 有什么区别呢？

相同属性的不同处理。object.assign 会直接进行覆盖，webpackmerge 会进行组合添加。

## 官方推荐

由于生产和开发环境的构建结果有差异，所以需要单独写配置。

测试环境需要有 source map 和 HMR，生产环境专注更小的 module，对资源进行优化。

webpack 官方推荐为生产环境和开发环境各写一个 webpack 配置，但是保留公用的配置，通过 webpack-merge 对公用的配置进行合并。

## 其它

mode:

- development：启用 webpack 内置的开发环境策略。
- production：启用 webpack 内置的产品优化策略。比如会启用 uglifyJsPlugin 插件压缩 js 代码。

verbose：详细信息。

插件：clean-webpack-plugin

    const CleanWebpackPlugin = require('clean-webpack-plugin');
    // 在编译之前删除指定目录，一般不使用这个插件，而是使用 rimraf 这个工具来删除之前编译生成的包

output.filename: 指定入口文件对应的输出。同时如果 output.chunkFilename 未指定，那么非入口文件的输出文件名会根据 output.filename 推断出来，同时 name 会被 id 替代。

正则表达式：`/.|\n/`: 其中 `.` 表示所有的除了 `\n` 之外的所有字符。

sass-loader：其中 node-sass 是 sass-loader 的 peerDependency，

## `eslint` 的配置

全局安装 `eslint` 后执行 `eslint --init`, 自动生成配置文件。
Eslint 会自动去 `.eslintrc.*` 或者 `package.json` 中去找配置文件。`package.json` 中的属性应该是 `eslintConfig`。

默认情况下，`ESLint` 支持 `ECMAScript 5` 语法。可以覆盖该设置，以启用对 `ECMAScript` 其它版本和 `JSX` 的支持。

一个环境定义了一组预定义的全局变量。

    "env": {
        "browser": true
    },

如果不使用 `"browser": true`，那么在代码中使用 `window` 的时候就会报错。`window` 这个全局变量在开启 `"browser": true` 有效。

需要使用 `babel-eslint` 作为解析器。否则箭头解析报错。

## 版本的升级

webpoack 在刚安装后的一个小时从 4.27 --> 4.28。

react 在安装后的第二天从 16.6.3 --> 16.7.0

react-hot-loader 在安装后一个小时也升级了。

>babel-loader@8.0.4 requires a peer of @babel/core@^7.0.0 but none is installed. You must install peer dependencies yourself.

使用新版本的 `babel-loader` 需要安装 `@babel/core@^7`

在 babel 7，包名做了改动。以前是 `babel-xx`. 现统一迁移到 `babel` 域下 - 域由 `@` 符号来标识，一来便于`区别官方与非官方的包`，二来`避免可能的包命名冲突`

## 网络请求的封装

不使用 `axios.all()` 来触发并发请求，而是使用 `Promise.all` 来进行发起多个请求。

常用的几个配置项：

    headers
    params
    data('PUT', 'POST', and 'PATCH')
    withCredentials: 跨域时是否携带cookie
    responseType: 响应的类型

接收响应：

    axios.get('/user/12345')
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      });
      
## 装饰器语法的配置

使用 `babel-loader8.xx`,对应使用 `babel7.xx`。其中装饰器语法在 `.babelrc` 中的配置如下：

    "plugins": [
        // decorators 和 class-properties 的顺序很重要，不能颠倒, 后面的参数也必须有
       ["@babel/plugin-proposal-decorators", { "legacy": true }],
       ["@babel/plugin-proposal-class-properties", { "loose" : true }],
    ]
   
在 `babel-eslint10.xx` 中为了使用原来的 `装饰器在 export 之前` 的写法，需在配置文件 `.eslintrc.*` 中做如下配置。

    parserOptions": {
        "ecmaFeatures": {
            // 兼容旧的装饰器语法
            "legacyDecorators": true
        }
    }
    
## 使用 redux 中间件

#### redux-logger
为了能够在每一个 `dispatch` 一个 `action` 后观察 `state` 的变化并且观察发布的是哪一个 `action`。

使用 `redux-logger` 中间件，在每一次发布一个 `action` 的时候打印 `state` 和 `action`。

`logger` 中间件一定放在中间件的最后，否则打印出的结果不准确。

#### redux-thunk 

其实使用中间件就是一种方法的功能增强。运用了 `AOP` 面向切面编程的思想。

`redux` 种封装的是核心的代码，但是具有很高的扩展性。使用中间件就是对原来函数功能饿一种增强。

#### saga 

同样是 redux 的一个中间件，用来处理一步 action

