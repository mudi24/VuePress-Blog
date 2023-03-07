---
title: svg-sprite-loader
sidebarDepth: 2
---

## 如何使用 SVG symbols

### 使用 yarn eject

- 使用`yarn eject`生成 config 目录和 scripts 目录，即可在配置文件中添加 loader

### svg-sprite-loader

- 下载`yarn add --dev svg-sprite-loader`
- 在 webpack.config.js 的 rules 中添加以下配置

```js
{
  test: /\.svg$/,
  use: [
    { loader: 'svg-sprite-loader', options: {  } },
    'svgo-loader' // 优化svg
  ]
}
```

## svgo-loader 优化 svg

## React 的 TreeShaking 不适用于 require，可以使用 require()来引入 svg，来避免 React 的 TreeShaking 自动删除 import 关键引入但未使用的变量

## 引入目录下的所有 icon

- TS 使用`yarn add --dev @types/webpack-env`命令下载声明文件来解决 TS 报错

```js
let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
```
