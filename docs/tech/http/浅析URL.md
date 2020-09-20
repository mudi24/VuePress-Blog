---
title: "浅析URL"
sidebarDepth: 2
---

1. URL

   - URL 的内容：协议 + 域名或 IP + 端口号 + 路径 + 查询参数字符串 + 锚点
   - https + www.baidu.com + /s + ?wd=hello&rsv_spt=1 + #5
     - 协议：使用 http 还是 https
     - 域名：baidu.com
     - 端口号：默认不写（http 为 80，https 为 443)
     - 路径：请求不同的页面
     - 查询参数字符串：查询的内容
     - 锚点：访问不同位置的内容（不支持中文，不会传给服务器）

2. DNS ，nslookup 命令

   - 域名系统（Domain Name System）是将域名和 IP 地址相互映射的一个分布式数据库。

   * DNS 的作用是让域名和 IP 对应起来

   - nslookup baidu.com

3. IP ，ping 命令

   - Internet Protocal
     - 如何让定位一台设备
     - 如何封装数据报文，以跟其他设备交流
   - 内网 IP(路由器)
   - 外网 IP(ipconfig)
   - 特殊的 IP
     - 127.0.0.1 表示自己
     - localhost 通过 hosts 指定为自己
     - 0.0.0.0 不表示任何设备
   - ping baidu.com

4. 端口 port

   - 每个服务一个号码，这个号码就叫端口号
   - 要提供 HTTP 服务最好使用 80 端口
   - 要提供 HTTPS 服务最好使用 443 端口
   - 要提供 FTP 服务最好使用 21 端口
   - 一共有 65535 个端口（基本够用）
   - IP 和端口缺一不可
   - 规则
     - 0 到 1023（2 的 10 次方减 1）号端口是留给系统用的
     - 只有拥有了管理员权限后，才能使用 1024 个端口
     - 其他端口可以给普通用户使用
     - 比如 http-server 默认使用 8080 端口
     - 一个端口如果被占用，你就只能换一个端口

5. 域名是什么，分别哪几类域名

   - 域名就是对 IP 的别称，一个域名可以对应不同的 IP，一个 IP 可以对应不同域名
   - 域名分类
     - com 是顶级域名
     - baidu.com 二级域名（俗称一级域名）
     - www.baidu.com 三级域名（俗称二级域名）
