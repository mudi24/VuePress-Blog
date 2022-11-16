---
title: 构建 React+TS
sidebarDepth: 2
---

## 设置淘宝源

```
yarn config set registry https://registry.npm.taobao.org/

```

## 搭建 react-typescript 项目

```
yarn global add create-react-app
create-react-app react-demo --template typescript
```

## 关闭自动打开浏览器的选项

- 在项目目录下添加.env 文件，文件内容为`BROWSER=none`

## .gitignore

```
/.idea  // webstorm
/.vscode // vscode
```

## 删除 git 仓库中的.idea 文件

```
git rm -r --cached .idea
```

## 目录说明

![React目录结构](../../.vuepress/public/React-list.jpg)

## 与 Vue 目录对比

- 更简洁
  - create-react-app 生成的几乎只有一个 src 和一个 public
- 内置功能更少
  - 没有自带 Router
  - 没有自带 Redux
  - 没有自带 SCSS

## css normalize

- 在 index.css 添加 @import-normalize，保证页面在不同浏览器上默认样式相近

## css reset

- css reset 把浏览器的默认样式全部重置

## 遇到的最难的技术问题

1. 我想让 React 应用支持 sass
2. 需要 node-sass，他有两个缺点：下载速度慢，本地编译慢
3. 于是我想改用 dart-sass 代替 node-sass
4. 但是 React 只支持 node-sass，不支持 dart-sass
5. 经过我的努力搜索和研究
6. 我发现 npm6.9 支持一个新功能，叫做 package alias
7. yarn add node-sass@npm:dart-sass 即可偷梁换柱，瞒天过海
8. 成功在 React 中使用了 sass

## 让 CSS @import 引用更方便

- Vue 项目中用 @ 表示 src/目录
- React 不需要用 @ ，直接使用@import 'xxx/yyy' 来引入 src 目录下的 xxx/yyy.scss 文件

## JS 也不需要 @

- 在 tsconfig.json 中添加一行`"baseUrl":"src"`（如果使用的是 js，也是一样的配置）
- 配置完成以后就可以直接用 import 'xxx/yyy.tsx' 来引入 src/xxx/yyy.tsx

## 添加 helper.scss

- 创建 src/helper.scss，用来放置变量、函数等公用的东西
- 然后再 index.scss 或者 App.scss 使用`@import "helper;"即可引用它

## styled-components

- 一种 CSS-in-JS 方案
- 使用`yarn add styled-components`下载 JS 源码
- 如果使用的是 TS 的话，还要使用`yarn add --dev @types/styled-components`下载类型声明文件

```js
import styled from "styled-components";
const Button = styled.button`
  color: green;
  background: red;
`;
<div>
  <Button></Button>
</div>;
```
