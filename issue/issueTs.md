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

```
/// <reference types="typescript" />
/// <reference path="JQueryStatic.d.ts" />
```
它是一种注释，告诉编译器，当前文件使用了哪些声明文件，以帮助编辑器提示信息，及编译器检查类型。

其中用到了 types 和 path 两种不同的指令。它们的区别是：types 用于声明对另一个库的依赖，而 path 用于声明对另一个文件的依赖。


#### 8. 常见定义
```
declare var/let/const variable; // 定义全局变量
declare function hello(params: () => void): any; // 定义函数
declare class Animal{ // 定义类
  constructor(name: string);
  name: string;
  age: number;
  sayHello(): void;
}
declare namespace jQuery { // 声明一个全局的变量，在别的接口中也可以使用
  function ajax(url: string, settings?: AjaxSettings): void;
  let variable: string;
}
interface Animal { // 声明一个全局的变量, 在别的接口中也可以使用
  name: string;
  age?: number;
  sex: '女' | '男';
}
declare namespace jQuery { // 通过 namespace 来避免 interface 声明的类型对全局的污染
  interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
  }
  function ajax(url: string, settings?: AjaxSettings): void;
}
注意：当使用了 ES6 的模块的时候，上面声明的变量都不再是全局的，而是只在当前文件中有效，别的文件要用需要像普通变量一样进行导出导入使用。
除非使用 declare global：
declare global {
  interface String {
    prependHello(): string;
  }
}


export const name: string; // 导出变量
export function getName(): string; // 导出函数
export class Animal { // 导出类
  constructor(name: string);
  sayHi(): string;
}
export interface Options { // 导出接口
  data: any;
}
export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}
也可以先声明后导出：
declare const name: string;
declare function getName(): string;
export { name, getName }

interface String { // 类型扩展，此时会自动进行声明合并
    prependHello(): string;
}

// 对模块进行扩展
import * as moment from 'moment'; // 导入声明文件依赖
declare module 'moment' {
  export function foo(): moment.CalendarKey;
}

// 引入类型依赖 /// 语法
// 为什么使用？  在全局变量的声明文件中，是不允许出现 import, export 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 /// UMD 库，就不再是全局变量的声明文件了。
/// <reference types="jquery" />
declare function foo(options: JQuery.AjaxSettings): string;

/// <reference types="node" />
export function foo(p: NodeJS.Process): string;


// 拆分声明文件在引入提高可维护性
/// <reference types="sizzle" />
/// <reference path="JQueryStatic.d.ts" />
/// <reference path="JQuery.d.ts" />
/// <reference path="misc.d.ts" />
/// <reference path="legacy.d.ts" />
export = jQuery;
```





