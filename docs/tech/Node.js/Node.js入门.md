---
title: "Node.js 入门"
sidebarDepth: 2
---

## Node.js 和浏览器

Node.js 和浏览器不同，浏览器提供了 DOM API，比如 Window 对象、Location 对象、Document 对象、HTMLElement 对象、Cookie 对象等等。
而 Node.js 提供了自己特有的 API，比如全局的 global 对象，也提供了当前进程信息的 Process 对象，操作文件的 fs 模块，以及创建 Web 服务的 http 模块等等。这些 API 能够让我们使用 JavaScript 操作计算机，所以我们可以用 Node.js 平台开发 web 服务器。

还有一些 JS 引擎提供的内置对象，在 Node.js 和浏览器环境下都可以使用。比如下面这些：

- 基本的常量 undefined、null、NaN、Infinity；
- 内置对象 Boolean、Number、String、Object、Symbol、Function、Array、Regexp、Set、Map、Promise、Proxy；
- 全局函数 eval、encodeURIComponent、decodeURIComponent 等等。

还有一部分 API 不属于 JS 引擎内置，但是在 Node.js 和浏览器中都可以使用，比如 setTimeout、setInterval 方法，Console 对象等等。

## Node.js 的基本架构

![](https://p.ssl.qhimg.com/t01bdaf1234dcdbef5c.jpg)

上图是 Node.js 的基本架构，我们可以看到，Node.js 是运行在操作系统之上的，它底层由 V8 JavaScript 引擎，以及一些 C/C++ 写的库构成，包括 libUV 库、c-ares、llhttp/http-parser、open-ssl、zlib 等等。

其中，libUV 负责处理事件循环，c-ares、llhttp/http-parser、open-ssl、zlib 等库提供 DNS 解析、HTTP 协议、HTTPS 和文件压缩等功能。

在这些模块的上一层是中间层，中间层包括 Node.js Bindings、Node.js Standard Library 以及 C/C++ AddOns。Node.js Bindings 层的作用是将底层那些用 C/C++ 写的库接口暴露给 JS 环境，而 Node.js Standard Library 是 Node.js 本身的核心模块。至于 C/C++ AddOns，它可以让用户自己的 C/C++ 模块通过桥接的方式提供给 Node.js。

中间层之上就是 Node.js 的 API 层了，我们使用 Node.js 开发应用，主要是使用 Node.js 的 API 层，所以 Node.js 的应用最终就运行在 Node.js 的 API 层之上。

## Node.js 可以做什么

Node.js 是运行在操作系统中的 JavaScript 运行时环境，提供了一系列操作系统的 API，通过它们我们可以执行操作系统指令、读写文件、建立网络连接、调用操作系统中的其他服务等等。

Node.js 内置的模块比较丰富，常用的主要是以下几个。

- File System 模块：这是操作系统的目录和文件的模块，提供文件和目录的读、写、创建、删除、权限设置等等。
- Net 模块：提供网络套接字 socket，用来创建 TCP 连接，TCP 连接可以用来访问后台数据库和其他持久化服务。
- HTTP 模块：提供创建 HTTP 连接的能力，可以用来创建 Web 服务，也是 Node.js 在前端最常用的核心模块。
- URL 模块：用来处理客户端请求的 URL 信息的辅助模块，可以解析 URL 字符串。
- Path 模块：用来处理文件路径信息的辅助模块，可以解析文件路径的字符串。
- Process 模块：用来获取进程信息。
- Buffer 模块：用来处理二进制数据。
- Console 模块：控制台模块，同浏览器的 Console 模块，用来输出信息到控制台。
- Crypto 加密解密模块：用来处理需要用户授权的服务。
- Events 模块：用来监听和派发用户事件。

有兴趣的朋友可以查看[Node.js 官方文档](https://nodejs.org/dist/latest-v18.x/docs/api/)

## Node.js 的模板管理

所谓模块化，就是指代码具有模块结构，整个应用可以自顶向下划分为若干个模块，每个模块彼此独立，代码不会相互影响。模块化的目的是使代码可以更好地复用，从而支持更大规模的应用开发。
