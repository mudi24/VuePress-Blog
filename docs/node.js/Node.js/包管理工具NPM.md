---
title: "包管理工具NPM"
sidebarDepth: 2
---

## NPM

NPM(Node Package Manager)是一个将 Node.js 的模块以包的形式组织和管理的工具。

Node.js 的模块大体上分为内置模块和其他模块，内置模块是 Node.js 默认集成的模块，它们不需要引用 JS 外部文件，而是通过import或require模块名引入。

Node.js 提供了一个叫module的内置模块，该模块包含了 Node.js 模块管理的信息，我们可以通过它获得当前版本的 Node.js 中的所有内置模块。

### 引入 node.js 内置模块
一次引入 node.js 的所有内置模块
```js
const {builtinModules} = require('module');
console.log(builtinModules);
```

也可以单独引入某个模块
```js
const fs = require('fs');
```

### 引入 node.js 其他模块
1. 通过文件路径引入
  ```js
  const bar = require('../a/foo.js');
  ```
2. 通过包的名称引入
   ```js
   import Vue from 'vue';
   ```
所以，Node.js 提供了一个包管理工具，能够让我们以包的形式发布某个或某些模块到网络上的共享仓库中。

## 用 NPM安装包

Node.js 内置了 NPM ，所有我们安装好 Node.js 后就已经可以使用 NPM 了。
查看 NPM 版本
```
npm -v
```

通常我们需要先运行 `npm init -y` 来快速生成一个配置文件 package.json。

然后运行命令下载我们需要的包，这里我们以moment来举例
```js
npm install moment --save
```
> 在执行npm install的时候加了一个--save参数，这个参数会在包安装成功后自动修改pacakge.json文件，在其中的`dependencies`属性中增加安装的包的名字和版本信息。

而在其他人需要对我们的代码进行维护时，只需要运行 `npm install`命令就可以根据dependencies中的内容自动安装依赖的包，同时安装到 `node_modules`目录下。

接下来就可以在项目的任意位置引入刚才下载的模块
```js
const moment = requier('moment');
```

当我们通过包名引入模块时，Node.js会根据规则搜索模块所在的位置，它优先搜索当前目录下的node_modules目录，如果找不到，会递归向上搜索父级目录，直到找到或者到达操作系统的根目录为止。

## 全局安装带命令行的包

有一些模块包提供了在终端执行的指令，可以在终端执行命令脚本。如果想要在命令行终端要能够执行脚本命令，我们就需要将它们安装到系统目录中。可以在 `npm install` 后面添加参数`-g`，就可以达到我们想要的效果。

这里我们用 eslint 来举个栗子
1. 下载 eslint
```js
npm -g install eslint
```
2. 在终端运行`eslint --init` 初始化一个.eslintrc.js配置
3. 运行`eslint index.js`进行代码检查

## NPM Scripts

NPM Scripts 是指在package.json文件中配置scripts属性，在其中指定脚本命令：

```json
// package.json
{
  "scripts": {
    "eslint": "eslint index.js"
  }
}
```
在 `scripts` 中添加命令后，就可以直接运行` npm run  eslint`来执行对应的命令。

NPM Scripts 能够执行对应的 Node 命令，是因为 NPM 在安装模块的时候，不仅将模块自身安装到node_modules目录下，还会在node_modules目录下创建一个.bin的子目录，将模块包中的命令行脚本安装到.bin目录下，并在 NPM Script 执行时设置系统的环境变量 PATH 包含node_modules/.bin目录，这样就能够正常执行脚本了。
当我们执行`npm run eslint`时，就相当于执行了：
```js
node ./node_modules/.bin/eslint index.js
```
## NPM 特殊命令 start、test、publish

大多数 NPM Scripts 命令都需要使用npm run 命令名来执行，但是少部分特殊名字的命令，可以省略run，直接用npm 命令名来执行。常见的是start和test命令。start命令通常用来启动项目，比如我们开发 Web 项目的时候，通常配置start命令来启动开发环境下的 HTTP 服务器。test命令通常用来配置项目的单元测试，启动单元测试框架，运行测试案例（test case）。

另外一些不在NPM Scripts中的命令，可以用来执行 NPM 自身的指令，如npm install命令，这是用来安装模块的指令，还有npm init命令，用来创建默认的package.json配置。其他常用的命令还有npm publish，用来发布或更新我们自己的模块包到 NPM 服务器。

这里我们要注意，这些 NPM 自身的指令不带run，但如果我们在scripts属性中定义同名的指令也可以。比如我们可以定义一个叫做install的NPM Scripts:

{
  ...
  "scripts": {
    "install": "do something"
  }
}
这个时候，我们运行npm run install就是运行这个 scripts 命令而不是默认的npm install命令。



参考文章：[包管理工具：NPM](https://juejin.cn/book/7133100888566005763/section/7133184801913176102)

