---
title: "commonjs规范"
sidebarDepth: 2
---

#### Node.js

- 计算密集型
  - ⼤量的计算，消耗 CPU 资源，⽐如计算圆周
    率、对视频进⾏⾼清解码
  - C 语⾔
- IO 密集型
  - ⽹络、磁盘读写
  - Node.js

* 使用内置模块 fs
  ```
    const fs = require("fs");
    fs.readFile("./test.txt", "utf-8", function(err, str) {
      console.log(str);
      str = str.toUpperCase();
      fs.writeFile("./test-after.txt", str, function(err) {
        console.log("操作完成");
      });
    });
  ```

- http.createServer
  ```
    const http = require("http");
    http.createServer((req, res) => {
        res.end("hello world");
      }).listen(8080);
  ```
- 使用本地模块
  ```
    const util = require("./util");
    let result = util.fact(5);
    console.log(result);
  ```
  ```
    function fact(n) {
      if (n === 1) return 1;
      return n * fact(n - 1);
    }
    module.exports.fact = fact;
  ```
- 使用第三方模块

  ```
    const fs = require("fs");
    const marked = require("marked");
    fs.readFile("./demo1.md", "utf-8", (err, str) => {
      if (err) return console.log(err);
      let html = marked(str);
      fs.writeFile("./demo.html", html, err => {
        if (err) return console.log(err);
        console.log("转换完成");
      });
    });
  ```

#### CommonJS 规范

- ⼀个⽂件是⼀个模块，变量、函数、类都是私有的
- 每个模块内部，module 代表当前模块
  - module.exports 是对外的接⼝。加载某个模块，
    其实是加载该模块的 module.exports

* require ⽅法⽤于加载模块

* exports 与 module.exports 的区别

  ```
    //exports = module.exports  默认添加
    function sum() {
      return [...arguments].reduce((v1, v2) => v1 + v2);
    }
    //exports = sum 错误
    //exports.sum = sum ok
    module.exports = sum;
  ```

#### NPM

- ⼀个远程包仓库，拥有成百上千万优质（以及劣质包）
- ⼀个本地命令⾏⼯具，可以在本地下载、上传、运⾏远程包

* npm init
* npm install
  - npm install -g http-server
  * npm install --save axios
  * npm install -S axios 同上
  * npm install --save-dev webpack
  * npm install -D webpack 同上

- npm uninstall <package_name> 删除模块
- npm start
- `npm run <command>`
- npm config --help
- npm login
- npm publish

#### Yarn

- 命令
  ```sh
   yarn init          >>> npm init
   yarn install           >>> npm install
   yarn add <package>         >>> npm install --save <package>
   yarn add <package> -dev          >>> npm install --save-dev <package>
   yarn global add <package>          >>> npm install -g <package>
   yarn remove <package>          >>> npm uninstall <package>
   yarn run <command> >>> yarn <command>         >>> npm run <command> >>> npx <command>
  ```

#### 项目结构

![项目结构](../../.vuepress/public/project-directory.png)
