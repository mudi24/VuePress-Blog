---
title: Webpack进阶
sidebarDepth: 2
---

# Webpack 进阶

我们在上一篇 webpack()中，整理总结了 webpack 基本配置和常见的 loader 和 plugin。在项目配置不复杂的时候，使用单个 webpack.config.js 即可满足我们的需求。但是在 webpack 配置选项较多的时候，就需要使用多个 webpack.config.js 来针对不同的情况使用不同的配置文件。

### 基础的配置文件：webpack.cofig.base.js

### 开发模式下使用的配置文件：webpack.cofig.dev.js

### 生产模式下使用的配置文件：webpack.cofig.prod.js

### 懒加载

1.用 import() 引入懒加载的文件，然后用 promise 进行操作  
2. 关键字 inport 可以像调用函数一样来动态导入模块，以这种方式调用，将返回一个 promise

```js
const promise = import("./lazy");
promise.then(
  (module) => {
    const fn = module.default;
  },
  () => {}
);
```

### HMR 热模块更换

### 如何自己写一个 loader

### 如何自己写一个 plugin
