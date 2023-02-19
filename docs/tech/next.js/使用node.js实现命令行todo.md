---
title: "使用node.js实现命令行todo"
sidebarDepth: 2
---

下载依赖 commander
https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md

```
yarn add commander
```

或

```js
npm install commader
```

```js
const { program } = require("commander");

program.option("--first").option("-s, --separator <char>");

program.parse();
```

```
node index.js -h
```

运行结果如下图
![](http://rq9s5lc0q.hb-bkt.clouddn.com/blog/node.js/node_todo_result.png?e=1676732999&token=T2pLxEmUwd9-tHhgpCQLKzpsG4xUBY7QSVH24GdD:Or_UePTjOaHkQwltIqF2Z-QQk7A=)

然后我们就可以得出一个结论，可以使用 `program.option()` 来配置选项。

接下来，我们为 program 添加一个命令，从官网文档复制一份并简单修改

```js
// 通过绑定处理函数实现命令（这里的指令描述为放在`.command`中）
// 返回新生成的命令（即该子命令）以供继续配置
program
  .command("add")
  .description("add a task")
  .action((...args) => {
    // console.error(args);
    const words = args.slice(0, -1).join(' ')
    console.log(words);
  });

program.parse(process.argv);
```
> 注意：这里我使用的是 3.0.2 版本，后期commander版本更新后，语法可能会有所不同，大家自行对代码进行修改

使用 `node index add`命令进行调用

fallen-node-todo
