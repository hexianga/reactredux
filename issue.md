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

## ES6 中子类继承父类的参数

    constructor(props) {
        super(props);
    }
    
    Component 父类函数:
    
    function Component(props, context, updater) 
