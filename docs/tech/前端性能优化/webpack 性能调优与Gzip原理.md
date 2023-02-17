---
title: "webpack 性能调优与Gzip原理"
sidebarDepth: 2
---

## webpack 的性能瓶颈

webpack 的优化瓶颈，主要可以从两方面入手：
* webpack 构建花费的时间太长
* webpack 打包的结果体积太大

## webpack 优化方案

### 构建过程提速的方法
#### 不要让 loader 做太多事情-以babel-loader为例

最常见的优化方式是，用 include 或 exclude 来帮我们避免不必要的转译，

#### Happypack————将 loader 由单进程转为多进程
Happypack 会充分释放 CPU 在多核并发方面的优势，帮我们把任务分解给多个子进程去并发执行，大大提升打包效率。

### 压缩构建结果的体积

#### 文件结构可视化，找出导致体积过大的原因

#### 删除冗余代码

一个比较典型的应用，就是 Tree-Shaking。    
从 webpack2 开始，webpack 原生支持了 ES6 的模块系统，并基于此推出了 Tree-Shaking。webpack 官方是这样介绍它的：
> Tree shaking is a term commonly used in the JavaScript context for dead-code elimination, or more precisely, live-code import. It relies on ES2015 module import/export for the static structure of its module system.

意思是基于 import/export 语法，Tree-Shaking 可以在编译的过程中获悉哪些模块并没有真正被使用，这些没用的代码，在最后打包的时候会被去除。

#### 按需加载

* 一次不加载完所有的文件内容，只加载此刻需要用到的那部分（会提前做拆分）
* 当需要更多内容时，再对用到的内容进行即时加载

```js
import BugComponent from '../pages/BugComponent'
...
<Route path="/bug" component={BugComponent}>
```

开启按需加载要添加的 webpack 配置

```js
output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'app.js',
    publicPath: defaultSettings.publicPath,
    // 指定 chunkFilename
    chunkFilename: '[name].[chunkhash:5].chunk.js',
},
```
路由部分的代码也要配合

```js
const getComponent => (location, cb) {
  require.ensure([], (require) => {
    cb(null, require('../pages/BugComponent').default)
  }, 'bug')
},
...
<Route path="/bug" getComponent={getComponent}>
```
核心是这个方法
```js
require.ensure(dependencies, callback, chunkName)
```
这是一个异步的方法，webpack 在打包时，BugComponent 会被单独打成一个文件，只有在我们跳转 bug 这个路由的时候，这个异步方法的回调才会生效，才会真正地去获取 BugComponent 的内容。这就是按需加载。