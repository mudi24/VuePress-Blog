---
title: 构建 VuePress
sidebarDepth: 2
---

# 构建 VuePress

## VuePress 优点：

1.  使用全局 vue 组件
2.  vue + webpack
3.  渲染优化（预渲染 有利于 SEO SPA 响应式布局）

## 使用教程

### 1. 全局安装

```sh
npm install -g vuepress
```

### 2. 创建并进入项目

`sh mkdir vuepress-demo && cd vuepress-demo`

### 3. 初始化项目

```sh
npm init
npm init -y // 全部使用默认配置
```

在生成的 package.json 中添加如下两个启动命令

```json
"scripts": {
   "dev": "vuepress dev docs",
   "build": "vuepress build docs",
},
```

#### 4. 创建基本项目结构

官方只有推荐目录结构，也可以自己进行创建

#### 5. 配置 config.js

静态资源 相对路径在 public 目录下，
路由跳转 相对路径为根目录

```js
 module.exports = {
   title: '知识宝库',
   head: [ // 注入到当前页面 <head> 中的标签
     ['link',{rel:'icon',href:''}] //增加一个自定义的 favicon(网页标签的图标)
   ],
   themeConfig: {
     logo: '', // 左上角logo
     nav: [  // 导航栏配置
       {text: '掘金主页', link: ''},
     ],
     sidebar: 'auto',  // 侧边栏配置
   }
 },

```

#### 6. 侧边栏配置（二级导航）

```js
sidebarDepth: 2;
```

#### 7. 配置首页

在 docs 目录下添加 README.md，在文件中添加如下内容

```js
---
 title: Blogging Like a Hacker
 lang: en-US
 home: true
 heroImage: /gear.gif
 heroText: 知识宝库
 tagline: 如果学习不是为了装X的话，那便毫无意义了
 actionText: 开始使用 →
 actionLink: /install/
 features:
   - title: 简洁至上
     details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
   - title: Vue 驱动
     details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
   - title: 高性能
     details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
     footer: MIT Licensed | Copyright © 2018-present Evan You
 ---
```

#### 8. 修改默认主题

想对默认主题做一些修改，以满足需求
执行如下命令，可将默认主题的各功能组件都释放出来
`vuepress eject docs`
你会发现，在根目录下多了一个 theme 文件夹

#### 9. 在 markdown 文件中使用 vue 组件

- 在 .vuepress 文件夹下新建一个 components 目录，其中的 vue 组件会自动注册到全局
- 在 docs 文件夹下新建一个文件夹，并在文件夹下新建一个 README.md 文件，在文件中使用组件

#### 10. 发布到 github

    - 新建两个仓库，一个仓库负责展示网站内容，不需要修改；另一个仓库负责开发和新增博客，并通过 npm run deploy 命令，将代码发布到第一个仓库中
    - 在根目录下新建 deploy.sh

      ```sh
      #!/usr/bin/env sh  // 这行代码使文件变成一个可执行文件

      # 确保脚本抛出遇到的错误
      set -e

      # 生成静态文件
      npm run docs:build

      # 进入生成的文件夹
      cd docs/.vuepress/dist

      # 如果是发布到自定义域名
      # echo 'www.example.com' > CNAME

      git init
      git add -A
      git commit -m 'deploy'

      # 如果发布到 https://<USERNAME>.github.io

      # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

      # 如果发布到 https://<USERNAME>.github.io/<REPO>

      git push -f git@github.com:<USERNAME>/<USERNAME>.git master:gh-pages

      cd -
      ```
