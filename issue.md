## 项目拷贝后报错

    module.js:540
        throw err;
        ^
    
    Error: Cannot find module './options'
    
解决方式：

删除 `node_modules`，运行指令 `npm install`。

## redux 相关

1. 订阅了 redux 中 state 的组件在 state 发生变化的时候就可能会重新渲染, 没有订阅 state 的组件一定要不会重新渲染
可能会重新渲染？
 
 新的 state 和之前的 state 会进行比较，这里的值比较仅仅是进行了一次浅比较，比较了值的长度和对应的值，和纯组件中的比较一样。
 如果值一样就不会触发重新渲染。如果不一样就会触发重新渲染。
 
**比如是一个简单的字符串前后值一样就不会触发渲染，但是如果是一个对象，虽然对象前后的值一样，但是地址空间不一样，还是会触发重新渲染。**

## 模块的引入

1. 如果模块引入只写到文件夹这一层，那么文件夹下面一定要有一个 **index.js(x)** 的文件，否则就会找不到
2. 打包的的 js 文件太大？
>Note: The code generator has deoptimised the styling of /Users/hexiang/Project/study/reactredux/node_modules/react-dom/cjs/react-dom.development.js as it exceeds the max of 500KB.
解决：不要打包 node_modules 中的文件。

3. 现在开发环境的 app.js 15M? 打包压缩后 2.3 M。为何差距这么大？

一种原因，开发环境启用了 devtool, 产生了 **source map**。关掉或者换一个合适的选项。

第二没有分离 css 文件，导致 css 很大。webpack4 以上使用 **mini-css-extract-plugin** 来分离 css 文件。

4. 怎么向 process.env 上写变量?

**原理：**process.env 获取的是环境变量上的值，所以只需要在当前的环境变量上面设置即可。

在 linux 中设置：

    export NODE_ENV=production

在 windows 中设置：

    set NODE_ENV=production 

**操作：**

在 package.json 的 scripts 中的指令里面，在**指令的前面**注入变量。 
```
NODE_ENV=development webpack-dev-server --config config/webpack.dev.js
```
1. 怎么把 node_modules 中的文件单独打包？

webpack4 中使用 **optimization.splitChunks** 选项将文件打包。

```
splitChunks: {
    cacheGroups: {
        commons: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // 通过正则表达式决定哪些文件被打包到一起
            name: 'vendors',
            chunks: 'all'
        }
    }
}
```

6. 单独打包后文件仍然很大怎么办？antd 怎么按需加载？

仍然很大是因为打包的时候 icons 占用了 500 多k，只要使用了 **icon** 就会有这个问题，解决方案，用自己的 **icon**。配置自己的 **alias**

7. 在 windows 上脚本运行失败，不能向 process.env 上设置变量？

使用 **cross-env** 这个库。完美解决这个问题。

8. 怎么分析打包后的文件大小？

使用两个插件

- webpack-bundle-analyzer: 得到树状网页进行分析
- webpack-visualizer-plugin：得到 stat.html 文件，是一个饼图对文件进行分析。
 
9. 如何实现 js 混淆？

10. 如何实现代码分离？

- 多入口配置
- webpack 中，使用 **import(/* webpackChunkName: "lodash" */ 'lodash')** 进行异步动态加载。
- 使用 **SplitChunksPlugin** 插件提取公共的块放置重复。

代码分离后怎么实现代码的预加载/预取
```
import(/* webpackPrefetch: true */ 'LoginModal');  // 这会生成 <link rel="prefetch" href="login-modal-chunk.js">
import(/* webpackPreload: true */ 'ChartingLibrary');
```

1. 网页布局文本超出了容器区域？

第一种情况，文本外层容器设置了比较大的定宽。第二种没有设置文本截断。

11. 各类文件打包后的目录配置？

- js文件：配置 output 中的 path。
- css 文件：配置插件 MiniCssExtractPlugin 的 **filename**, 通过文件名来创建文件夹。
- html 文件：配置插件 **HtmlWebpackPlugin** 的 **filename**，通过文件名来创建文件夹。
- 普通的图片和静态资源：通过 **file-loader** 的 **outputPath** 进行配置文件夹。

12. 每次文件打包 hash 都会发生变化吗？

- file-loader 处理的文件的 **hash** 是一个 **md5(128 bit,16 byte,32个16进制数)** 值，只有文件发生变化 hash 才会发生变化。
- 对于 js，css 文件，他们的 hash 值是一样的，只要源码(除开静态资源)没有发生改变，hash 值就不会发生变化。

**备注：**为什么 js，css 文件的 hash 一样?
因为在不使用 **css** 拆分和**代码分块 (code split)**的插件前，webpack 打包后只会生成一个 **js** 文件，然后现在的 **css** 文件和 **js** 文件都是从这上面拆分出去的，拆分出去的文件的 **hash** 当然和原始文件一致。

13. (s|l)css 中怎么引入 node_modules 中的 css?

**css-loader** 中规定，在链接前面加上前缀 **~** 即可。[css-loader](https://webpack.docschina.org/loaders/css-loader/)

在解析的时候会解析为 **require** 的形式引入文件。

14. 如何阻止从 node_modules 中引入的 css 被模块化处理？

- 通过 @import 的方式引入 index.css 文件中。
- 通过 import 的方式在 js 文件中引入

15. typescript 的文档？

[typescript](https://ts.xcatliu.com/basics/declaration-files)

16. ts 中报元素有隐藏 any 怎么办？

配置编译选项 **--noImplicitAny** 为 **false**。表示允许存在隐式 any。

17. 什么是运行时错误，什么是编译时错误？

在编译时提示在 **iterm** 中的错误叫做编译时错误，将代码放在浏览器运行时在控制台抛出的错误叫做运行时错误。编译时不报错不意味着运行时不报错，编译时正确只能说明语法正确，文件引用都能找到。编译时报错不意味着代码就不能在浏览器运行。

18. jsx 文件替换为 tsx 文件后报错提示找不到文件？

项目重新启动即可。

19. 常见的 npm -i -D 中的 -D 什么意思？

-D：--save-dev
-s：--save

20 postcss-loader 的作用?

PostCSS 的主要功能只有两个：第一个就是前面提到的把CSS解析成 JavaScript 可以操作的 抽象语法树结构（Abstract Syntax Tree，AST），第二个就是调用插件来处理 AST 并得到结果。

21. package.json 中的 browserslist 是什么？

[browserslist](https://github.com/browserslist/browserslist#readme) 用来提供公共的配置。配置满足一定条件的浏览器。

22. export default 为什么不能默认导出变量和常量？

默认导出的一定是一个对象，所以只可以是 **object，function，class**。其它的只能是作为对象的属性导出。

23. 什么是 UMD 模块？

通用模块定义，在模块定义的时候会判断当前环境，如果 define 存在并且 define.amd 存在，说明是 AMD 环境，如果 exports 存在，说明是 commonjs 环境，如果都不存在说明是浏览器环境。

针对不同的环境进行不同的模块定义。
```
((root, factory) => {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    //CommonJS
    var $ = requie('jquery');
    module.exports = factory($);
  } else {
    root.testModule = factory(root.jQuery);
  }
})(this, ($) => {
    //todo
});
```

24. webpack 打包后的文件分析？

[webpack-guide](https://github.com/TooBug/webpack-guide/tree/master/examples/chapter3)

25. 模块化？

**AMD**: 需要引用 **require.js** 文件，然后就有了 **define，require** 这几个关键字。

26. 为什么说 node 中 require, __dirname, __filename 不是全局变量？但是却能够在代码中直接使用？
node 模块是遵循 commonJs 的。代码最后在执行的时候会被一个函数封装器进行封装，这些变量都来自函数的形参。所以其实不是全局变量。

其中 exports === module.exports

```
(function (exports, require, module, __filename, __dirname) {
    var me = {};
    module.exports = me;
});
```

27 require 的模块加载规则？

根据路径名来看，如果是一个非相对路径，在 node 中，优先加载核心模块，再试着在 node_modules 中找，如果配置了 alias，再到 alias 中找。如果是相对路径则直接到对应的目录查找。如果路径中没有后缀，则会尝试带上 **.js/.json/.node**,通过 webpack 还可以配置其它的扩展名。

28. vscode 的默认语法检查如何开启？

进入配置文件(`command + ,`, 然后点击右上角的文本 icon 进入编辑)，做如下配置：
```
"typescript.validate.enable": true,
"javascript.validate.enable": true,
```

29. 怎么开启 eslint 的错误代码标识？

通过配置文件只能开启 vscode 的默认的语法检测，但是不能实现自定义。所以使用第三方插件进行格式配置。

安装 **eslint** 插件并且开启 **enable**，并且对当前项目配置 **eslint**，在检测到不符合规则的代码时就会报错提示。

不受 **vscode** 配置文件的影响。

30. 每次编译的时候怎么输出 eslint 的错误？

在编译的时候执行 **eslint** 检测，配置脚本如下：
```
"start": "cross-env NODE_ENV=development && npm run eslint-check && webpack-dev-server --config config/webpack.dev.js",
"eslint-check": "eslint --ext .js --ext .jsx --ext .ts --ext .tsx src/",
```

31. 怎么在每次提交代码前对代码进行检查？

使用 **husky** 这个库来实现。

这个库利用 **git hooks**，在一些指令前面做一些事情。

32. 怎么对提交的信息进行检测？

使用 **commitlint** 结合 **husky** 对提交信息进行检测。
```
npm install --save-dev @commitlint/{config-conventional,cli}
```

33. 怎么禁止 eslint 对一个文件和一行的检测？
```
/* eslint-disable */   // 置于文件顶部，不会对当前文件进行检测
// eslint-disable-line  // 禁止对当前的行进行检测
```
34. 怎么配置 **vscode 的 eslint** 插件对指定类型的文件进行检测？

查看插件页的文档，配置如下：
```
"eslint.validate": [
  "typescript",
  "typescriptreact",
]
```
35.  webpack 中 resolve.alias 配置的路径使用的时候 eslint 报错？

```
npm i -D eslint-import-resolver-alias
在 .eslintrc.js 中配置:
setting: {
  'import/resolver': {
    alias: {
      extensions: ['.ts', '.js', '.jsx', '.tsx'],
      map: [
        ['net', './net/'],
      ],
    }
  }
}
```

36. eslint 找不到 tsx 结尾的文件？

```
npm i -D eslint-plugin-import
在 .eslintrc.js 中配置:
'settings': {
  "import/extensions": [
    ".js",
    ".jsx",
    ".ts",
    ".tsx"
  ],
}
```

















