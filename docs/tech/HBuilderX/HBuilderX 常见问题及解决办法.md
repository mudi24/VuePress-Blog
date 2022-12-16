---
title: HBuilderX 常见问题及解决办法
sidebarDepth: 2
---
## 前言
我在使用 HBuilderX 进行开发时会遇到一些问题，本文就会把我遇到的问题记录下来，方便自己下次遇到的时候查看，也给大家分享一下。
##  打包网页失败
### 报错信息
使用HBuilderX多次打包网页时遇到报错：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c97dadc7f8c5470d8b60a7695d7058ec~tplv-k3u1fbpfcp-zoom-1.image)

HBuilderX 使用的是本身自带的node，只能猜测是HBuilder X本身自带的node有问题，需要替换。根据这个报错信息我猜测是32位的不合适，需要手动换成64位。

```
c:\ws\src\util-inl.h:372: Assertion `!(n > 0) || (ret != nullptr)' failed.
```

### 找到HBuilderX中的node并确认版本号

在路径HBuilderX\plugins\node内，查询node.exe的版本，我这里是12.22.1.0。如下图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86024aee945141a397f7493d46c51f60~tplv-k3u1fbpfcp-zoom-1.image)

## 到官网内下载node.exe

我这里需要下载window环境，64位的node.exe。这里选择压缩包形式的文件来下载。如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d90d96aef7b44113b1375822e9582ee8~tplv-k3u1fbpfcp-zoom-1.image)

下载链接为：<https://nodejs.org/download/release/>

### 直接替换node.exe

解压缩安装包，并直接替换node.exe文件。选择的文件如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/217bd4e72e7d4d078a350360b7046f6d~tplv-k3u1fbpfcp-zoom-1.image)

我们仅替换一个node.exe即可。

### 运行项目

终于可以打包了


## 项目模拟到手机运行后编译报错

### 报错信息
```js
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory（内存溢出）
```
### 解决方法
我这用的是 windows 系统，需要添加一个环境变量，修改 node 的运行内存。 `NODE_OPTIONS --max_old_space_size=3072`

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b5b4c59ac6b4389844651c8c5e84943~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd106031a61a479f99920f490e5f1964~tplv-k3u1fbpfcp-zoom-1.image)

### 上面的方法带来的问题
如果使用了 OSS，会出现 OSS 软件打不开的情况

### 解决方法
我查看了OSS 的官网文档，官网文档内容如下，需要把刚才添加的环境变量删除。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be7026ddf38943a38ab322edbcbda26d~tplv-k3u1fbpfcp-zoom-1.image)
> 这里我删除以后暂时不添加环境变量了，只是偶尔会遇到内存溢出的情况，通常重启后就可以解决。如果连续多次碰上内存溢出的情况，可以尝试使用添加环境变量的方式去解决。

## 总结
这篇文章我会持续进行更新，使用 HBuilderX 开发时总会遇到一些意想不到的问题，我会把问题都记录下来，觉得有帮助的朋友可以给本文点个赞。