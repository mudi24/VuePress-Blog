---
title: Webpack配置（基础篇）
sidebarDepth: 2
---

# webpack4 配置（基础篇）

webpack 是静态模块打包器（module bundler）

### 功能

- 转译代码
- 构建 build
- 代码压缩
- 代码分析

## 安装

```sh
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

注意：这里我们使用的是后缀是 --save--dev，而不是 --save

如果是开发过程中用到的包，则使用--save-dev

如果是项目依赖的包，则使用--save

运行
`npx webpack`
或
`./node_modules/.bin/webpack` // 直接找到文件路径运行 webpack
配置应用在开发模式还是生产模式

```
module.export = { 两个模式二选一
mode: 'development', // 开发模式
mode: 'production' // 生产模式
// 如果在配置文件中不写此选项则默认为生产模式
}
```

## 基础的 webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: 'src/index.html', // 入口文件
  output: { // 出口文件，配置打包后文件名及路径
    filename:'bundle.js';
    path: path.resolve(\_\_dirname, 'dist') //转换为绝对路径
  }
}
```

## 常见的 loader

style-loader 作用：为 css 代码添加 style 标签，并且放到 header 标签中
css-loader 作用：会把 css 加载到 js 中

```js
module.exports = {
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

### file-loader

作用：使用 import/require()导入文件的时候，会把文件转换为文件路径

```js
module.exports = {
  modules: {
    rules: [
      {
        test: /\.(png|svg|gif|jpg)$/,
        use: ["file-loader"],
      },
    ],
  },
};
```

### sass-loader（优先使用 dart-sass 而不是 node-sass）

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("dart-sass"),
            },
          },
        ],
      },
    ],
  },
};
```

### less-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
};
```

### stylus-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl\$/,
        loader: ["style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
};
```

babel-loader 作用：新版本 JS 语法转换为旧版本 JS 语法(默认内置)
ts-loader 作用：把 TypeScript 转为 JavaScript
注意：在使用 sass-loader、less-loader、stylus-loader 时，需要与 css-loader、style-loader 一起使用。

## 常见的 plugin

### html-webpack-plugin

作用：dist 目录中生成 index.html，并自动引入需要使用的资源

```js
const HtmlWebpackplugin = require('html-webpack-plugin')

module.exports = {
  plugins:[
    new HtmlWebpackPlugin({
      title: 'webpack 学习'，
      template: 'src/index.html' //使用自定义模板
    })
  ]
}
```

### mini-css-extract-plugin

作用：把 css 抽离成独立的 css 文件

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
      ignoreOrder: false,
    }),
  ],
  module: {
    rules: [
      {
        test: "/.css$/",
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: "../",
        },
      },
      "css-loader",
    ],
  },
};
```

### clean-webpack-plugin

作用：清空 dist 目录

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

## loader VS plugin

loader（加载器） 作用：在引入或加载文件时，对文件进行处理
plugin （插件） 作用：拓展功能，处理 loader 无法实现的功能（官网原文：They also serve the purpose of doing anything else that a loader cannot do.）
使用 webpack-dev-server 开启热更新本地服务
使用 source-map 配置将编译后的代码映射到原始的源代码，来使我们更容易的追踪错误和警告，便于调试。

webpack.config.js 文件

```js
module.exports = {
  devtool: 'inline-source-map',
  dev-Server: {
    contentBase: './dist'
  }
}
```

```js
// package.json
"private":true // 私有仓库
"scripts":{ //启动本地服务并自动打开浏览器
  "start": "webpack-dev-server --open"
}
```

## 自动在文件名中添加 hash

```js
module.export = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
  },
};
```

## http 缓存与 webpack 的配合

通常我们会通过浏览器缓存文件来提升加载页面的速度，此时就需要通过文件名的 hash 来判断浏览器与服务器的资源内容是否一致，如果一致则直接使用缓存的文件，如果不一致则对文件进行更新。
