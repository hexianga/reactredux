## 常见的 ts 错误

#### 1. 类名中的变量需要先声明或者初始化再使用。

#### 2. **resolve.alias** 引入的文件没有办法链接到文件？

配置 **tsconfig.json** 的 **paths 和 baseUrl** 可以解决。必须重启 **vscode**。

#### 3. 怎么解决 css 文件 json 文件等非模块文件在解析时候的报错？

通过定义通配符模块来解决。

```
declare module '*.scss'
declare module '*.json'
```

#### 4. 怎么让 webpack 自动解析到 *.ts(x) 文件？

配置 **resolve.extensions** 选项。

#### 5. @types/* 中的类型到底是放到 dependencies 还是 devDependencies？

如果正在编写的是一个库，会让别人去引用(别人在用的时候也是需要声明文件的)的话，那么就应该作为 **dependencies** 存在，否则就以 **devDependencies** 存在。

#### 6. .d.ts 怎么发布？

- 随着 npm 包一起发布，配置类似主入口文件
- 发布到 [@types organization](https://www.npmjs.com/~types)

#### 7. /// <reference types="typescript" /> 这样的句子什么意思

它是一种注释，告诉编译器(不是 ts 独有的)，当前文件使用了哪些声明文件，以帮助编辑器提示信息，及编译器检查类型。


#### 8.  Property 'form' does not exist on type 'Readonly<{}> & Readonly<{ children?: ReactNode; }>'




