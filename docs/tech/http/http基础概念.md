---
title: "http基础概念"
sidebarDepth: 2
---

# http 基础概念

## 如何发请求

- 用 Chrome 地址栏
- 用 curl 命令 可以发 http 请求
- 帮你发请求的工具叫做用户代理（User Agent）
- node server.js 8888 node 启动本地服务

### 如何用 curl 命令构造请求

- curl -v http://127.0.0.1:8888
- 设置请求动词： -X POST 大写
- 设置路径和查询参数： 直接在 url 后面加
- 设置请求头： -H 'Name:Value' 或者 --header 'Name:Value'
- 设置请求体： -d '内容'或者 --data '内容'

## 请求

- 请求动词 路径加查询参数 协议名/版本
- Host: 域名或 IP
- Accept: text/html
- Content-Type: 请求体的格式
- 请求体（就是上传内容）

### 细节

- 三部分：请求行，请求头，请求体
- 请求动词：GET/POST/PUT/PATCH/DELETE
- 请求体在 GET 请求中一般为空
- 大小写不敏感

## 响应

- 协议名/版本 状态码 状态字符串
- Content-Type: 响应体的格式
- 回车
- 响应体（就是下载内容）

### 细节

- 三部分：状态行，响应头，响应体
