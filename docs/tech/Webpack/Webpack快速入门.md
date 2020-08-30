---
title: Webpack快速入门
sidebarDepth: 2
---

# Webpack

静态模块打包器（module bundler）

```sh
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

私有仓库（package.json）
`"private":true`

--save 与 --save-dev 有什么不同

如果是开发过程中用到的包，则使用--save-dev

如果是项目依赖的包，则使用--save

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: 'src/index.html',
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
        ]
      },
      {
        test:/\.(png|svg|gif|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
-       use: [
-         'file-loader'
-       ]
-     }
    ]
  },
  output: {
    filename:'bundle.js';
    path: path.resolve(__dirname, 'dist') //转换为绝对路径
  }
}
```
