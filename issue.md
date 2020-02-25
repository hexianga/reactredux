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










