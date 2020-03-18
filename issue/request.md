## Response 对象

Fetch API 的一部分，Fetch API 包括 `Response, Request, Body, Headers`

Response 上面实现 `Body` 接口获得的一些方法, 都是类型转换的方法，返回值都是 Promise。

- response.arrayBuffer()
- response.json()
- response.text()
- response.blob()

几个属性：

- type: "cors" // basic：表示同源响应 cors：表示是跨域请求  error：网络错误
- url: "https://www.jd.com/" // 原来的地址是 http，这是重定向后的地址
- redirected: true // 响应是否来自重定向地址的响应
- ok: true // 响应是否成功 200 - 299
- statusText: "OK" // 状态消息
- status: 200 // 状态码

## Blob

blob 的一些方法：

- blob.arrayBuffer() // 转为 ArrayBuffer，返回值是一个 Promise
- blob.text() // 转为 text，返回值是一个 Promise

## fetch 方法的参数

```
const fetchResponsePromise = fetch(resource [, init])
```
- resource

`USVString` 或者是 `Request object`

- init

  method, headers, body

  - credentials: The request credentials you want to use for the request: omit, same-origin, or include. The default is same-origin.   // 如果要带 cookie，就设置为 include
  - body: 如果是 json 要进行序列化为 USVString，或者是 FormData。























