---
title: "Node.js 入门"
sidebarDepth: 2
---

## Node.js 双数是稳定版，单数非稳定版，使用 8 及以上的版本

## 安装

- Windows 官网下载安装包（不要绿色版），默认配置就可以，不方便安装子系统
- Mac 安装 homebrew ，`brew install node@10`，需要多版本可以使用 n 或 nvm 两种工具

## 周边工具

- nrm 用于切换下载源
- ts-node 可以运行 ts 的 node
- Windows NotePad++ 临时打开文件，cmder 可以代替 git bash
- Mac iTerm2.app on my zsh

## Node.js 使 JS 可以调用系统接口，开发后端应用

## Node.js 用到的技术

- V8 引擎
- libuv
- C/C++实现的 c-ares（域名解析）、http-parser（http 解析）、OpenSSL（https）、zlib（加密）等库

## Node.js 技术架构

![alt](/Node.js技术架构.jpg)

如果要看源代码，推荐看 0.10 版本（使用时间久，代码相对较少）
了解更多，请查看[node](https://github.com/yjhjstz/deep-into-node)

### bindings

- Node.js 用 C++对 http_parser 进行封装，使它符合某些要求，封装的文件叫做 http_parser_bindings.cpp
- 用 Node.js 提供的编译将其编译为.node 文件
- JS 代码就可以直接 require 这个.node 文件
- 这样 JS 就可以直接调用 C++库，中间的桥梁就是 binding
- Node.js 提供了很多 binding，所以加个 s
  注意：编译成.node 文件不是必须的，可以是其他的任何可行方式

#### libuv

跨平台的异步 I/O 库

输入，输出都属于 I/O 操作，系统与外界的交互行为

> 功能：用于 TCP/UDP/DNS/文件等的异步操作

http 是基于 TCP ，
UDP 聊天常用，不需要三次握手，效率高

### V8

功能：

- 将 JS 源代码变成本地代码
- 维护调用栈，确保 JS 函数的执行顺序
- 内存管理，为所有对象分配内存
- 垃圾回收，重复利用无用的内存
- 实现 JS 的标准库（数组 splice）

注意：

- V8 不提供 DOM API
- V8 执行 JS 是单线程的
- 可以开启两个线程分别执行 JS
- V8 本身包含多个线程
- 自带 event loop， 但 Node.js 基于 libuv 自己做了一个 event loop

#### Event Loop

event 事件
loop 循环，Node.js 按顺序轮询每种事件

事件同时触发，Node 规定了某种顺序

- 操作系统可以触发事件，JS 可以处理事件
- Event Loop 就是对事件处理顺序的管理

方方翻译的 event loop 文档：https://juejin.im/post/5ab7677f6fb9a028d56711d0

![EventLoop顺序](./../.vuepress/public/EventLoop顺序.jpg)

重点阶段

- timers 检查计时器
- poll 轮询，检查系统事件
- check 检查 setImmediate 回调
- 其他阶段用得较少

注意：

- 大部分时间，Node.js 都会停在 poll 轮询阶段
- 大部分事件都在 poll 阶段被处理，如文件，网络请求

### 总结

- 使用 libuv 进行异步 I/O 操作
- 使用 eventLoop 管理时间处理顺序
- 用 C/C++ 库处理 TCP/UDP/DNS/文件
- 使用 bindings 使 JS 可以和 C++互相调用
- 使用 V8 来运行 JS
- 使用 Node.js 标准库简化 JS 代码

## Node.js API

民间版本：https://devdocs.io/

- Buffer 小段缓存
- Child Processes 子进程
- Cluster
- Debugger
- Events
- File System
- Globals 全局变量
- HTTP
- Path
- Process
- Query Strings 对 url 进行处理
- Stream 流格式的数据处理
- Timers
- URL
- Worker Threads（node10 才有）
