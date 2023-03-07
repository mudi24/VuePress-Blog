---
title: "面试题（http和TCP）"
sidebarDepth: 2
---

# http

## http 状态码

状态码的类别：

1xx Informational(信息性状态码) 接受的请求正在处理
2xx Success(成功状态码) 请求正常处理完毕
3xx Redirection(重定向状态码) 需要进行附加操作一完成请求
4xx Client Error (客户端错误状态码) 服务器无法处理请求
5xx Server Error(服务器错误状态码) 服务器处理请求出错

## Http 和 Https 区别

- HTTP 的 URL 以 http:// 开头，而 HTTPS 的 URL 以 https:// 开头
- HTTP 是不安全的，而 HTTPS 是安全的
- HTTP 标准端口是 80 ，而 HTTPS 的标准端口是 443
- 在 OSI 网络模型中，HTTP 工作于应用层，而 HTTPS 的安全传输机制工作在传输层
- HTTP 无法加密，而 HTTPS 对传输的数据进行加密
- HTTP 无需证书，而 HTTPS 需要 CA 机构 wosign 的颁发的 SSL 证书

## GET 和 POST 的区别

从 http 协议的角度来说，GET 和 POST 它们都只是请求行中的第一个单词，除了语义不同，其实没有本质的区别。  
之所以在实际开发中会产生各种区别，主要是因为浏览器的默认行为造成的。  
受浏览器的影响，在实际开发中，GET 和 POST 有以下区别：

- 浏览器在发送 GET 请求时，不会附带请求体
- GET 请求的传递信息量有限，适合传递少量数据；POST 请求的传递信息量是没有限制的，适合传输大量数据。
- GET 请求只能传递 ASCII 数据，遇到非 ASCII 数据需要进行编码；POST 请求没有限制
- 大部分 GET 请求传递的数据都附带在 path 参数中，能够通过分享地址完整的重现页面，但同时也暴露了数据，若有敏感数据传递，不应该使用 GET 请求，至少不应该放到 path 中
- 刷新页面时，若当前的页面是通过 POST 请求得到的，则浏览器会提示用户是否重新提交。若是 GET 请求得到的页面则没有提示。
- GET 请求的地址可以被保存为浏览器书签，POST 不可以

## TCP 三次握手和四次挥手

- TCP 协议通过三次握手建立可靠的点对点连接
  首先服务器进入监听状态，然后即可处理连接
  1. 第一次握手：建立连接时，客户端发送 syn 包到服务器，并进入 SYN_SENT 状态，等待服务器确认。在发送的包中还会包含一个初始序列号 seq。此次握手的含义是客户端希望与服务器建立连接。
  2. 第二次握手：服务器收到 syn 包，然后回应给客户端一个 SYN+ACK 包，此时服务器进入 SYN_RCVD 状态。此次握手的含义是服务端回应客户端，表示已收到并同意客户端的连接请求。
  3. 第三次握手：客户端收到服务器的 SYN 包后，向服务器再次发送 ACK 包，并进入 ESTAB_LISHED 状态。

最后，服务端收到客户端的 ACK 包，于是也进入 ESTAB_LISHED 状态，至此，连接建立完成

- 关闭连接时，需要进行四次握手
  1. Client 向 Server 发送 FIN 包，表示 Client 主动要关闭连接，然后进入 FIN_WAIT_1 状态，等待 Server 返回 ACK 包。此后 Client 不能再向 Server 发送数据，但能读取数据。
  2. Server 收到 FIN 包后向 Client 发送 ACK 包，然后进入 CLOSE_WAIT 状态，此后 Server 不能再读取数据，但可以继续向 Client 发送数据。
  3. Client 收到 Server 返回的 ACK 包后进入 FIN_WAIT_2 状态，等待 Server 发送 FIN 包。
  4. Server 完成数据的发送后，将 FIN 包发送给 Client，然后进入 LAST_ACK 状态，等待 Client 返回 ACK 包，此后 Server 既不能读取数据，也不能发送数据。
  5. Client 收到 FIN 包后向 Server 发送 ACK 包，然后进入 TIME_WAIT 状态，接着等待足够长的时间（2MSL）以确保 Server 接收到 ACK 包，最后回到 CLOSED 状态，释放网络资源。
  6. Server 收到 Client 返回的 ACK 包后便回到 CLOSED 状态，释放网络资源。
