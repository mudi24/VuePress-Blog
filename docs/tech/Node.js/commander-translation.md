---
title: "Commander Translation"
sidebarDepth: 2
---

# Node.js 命令行翻译

```
yarn global add ts-node-dev
yarn add commander  // 自带ts类型声明
yarn add --dev @types/node  // ts声明
```

- 程序员潜规则：<a>必填，[b]可填可不填

## https.request

## querystring.stringify() 构造查询字符串

- sign MD5 值（node.js 没有提供转换为 MD5 的函数，需要下载 md5，想兼容还需要依赖前端开发者的@types/md5

```
// import md5 from 'md5'; // 这种引入方式不正确
import md5 = require('md5')
```

- 是否完美兼容 ts，有 ts 声明且可以在写代码时进行提示就是完美兼容（xxx.d.ts）

## 根据正则匹配输入的词，判断中译英还是英译中

## 在 package.json 中添加命令，但 cli.ts 中的是 ts 代码，需要先编译为 js，才能进行发布

## 查看是否可以使用 tsc 命令

```
// 如果tsc -V命令无法显示版本号则需要下载typescript
yarn global add typescript
// 下载完成后运行以下命令
tsc --init // 初始化，生成tsconfig.json
```

- 直接运行`tsc`命令不会使用 tsconfig.json

```

```

## require 和 import

- commonJS（）
  - 导出：module.exports.x = {}
  - 引入：const api = require(path) （同步引入）
- AMD（requireJS）
- 标准规范：export 导出，import 导入

## 上传到 npm

- 首先 npm 切换到 npm 官方源（https://registry.npmjs.org/)
  - nrm：切换 npm 地址源的工具`npm i -g nrm`

* 然后登录用户：`npm adduser`
* 最后，发布到 npm `npm publish`

## 在本地使用不上传

- 添加 fy 命令到 bashrc
  `vi ~/.bashrc`打开文件
  `alias fy="ts-node-dev /d/node-translation/src/cli.ts"`
  > warning 此处必须为绝对路径才可以使用
