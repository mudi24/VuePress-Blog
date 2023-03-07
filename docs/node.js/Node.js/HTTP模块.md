---
title: "Http"
sidebarDepth: 2
---

# HTTP 模块

- node-dev 文件修改自动重启 node
- ts-node 可以在 node 环境下直接运行 ts
- ts-node-dev 结合了以上两种工具

### curl

- GET 请求：curl -v url
- POST 请求：curl -v -d "name=Irelia" url
- 设置请求头：-H 'Content-Type:application/json'
- 设置动词：-X PUT
- JSON 请求：curl -d '{"name":"bob"}' -H 'Content-Type:application/json' url
- -v 查看请求的内容

## 使用 ts-node-dev

```
ts-node-dev index.ts
```

## 添加声明依赖

```
yarn add --dev @types/node
```

## server 是 http.Server 类的实例

- http.createServer 的返回值
- request 事件和 listen()方法比较常用

## http.Server 继承了 net.Server

- 可以使用 net.Server 的 error 事件和 address()方法

### request 是 http.IncomingMessage 的实例

- 拥有 headers/method/url 等属性
- 继承了 stream.Readable 的 data/end/error 事件
- 因为 TCP 协议，无法直接拿到请求的消息体

## 用 Node.js 获取请求内容

```
server.on('request', (request, response)=>{
  const array = []
  // 上传数据时触发，每次内容较小，多次触发
  request.on('data', (chunk)=>{
    array.push(chunk)
  })
  // 数据上传结束时触发
  request.on('end', ()=>{
    const body = Buffer.concat(array).toString()
    // 每次获取的都是 Buffer，使用Buffer类连接在一起组成整块buffer，再把buffer转换为字符串
    response.end('hi') // 请求处理结束之后进行响应
  })
})
```

### response 是 http.ServerResponse 的实例

- 拥有 getHeader/setHeader/end/write 等方法
- 拥有 statusCode 属性，可读可写
- 继承了 stream

## 完成几个基本操作

- 根据 url 返回不同的文件
- 处理查询参数
- 匹配任意文件
- 处理不存在的页面（404）
- 处理非 GET 请求
- 添加缓存选项
- 响应内容启用 gzip
- 对比业界优秀案例 http-server/node-static，制作一个静态服务器

## 用 Node.js 读取请求

- 读取请求动词 request.method
- 读取路径：
  - request.url 路径，带查询参数
  - path 纯路径，不带查询参数
  - query 只有查询参数
- 读取请求头：request.headers['Accept']

## 用 Node.js 设置响应

- 设置响应状态码：response.statusCode = 200
- 设置响应头：response.setHeader('Content-Type','text/html')
- 设置响应体：response.write('内容)，可以用 response.write 追加内容
