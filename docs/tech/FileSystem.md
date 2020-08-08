---
title: "File System"
sidebarDepth: 2
---

# File System

使用 node.js 编写一个 todo

```
yarn add commander
```

```
const { program } = require('commander');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);


```

```
 program
  .command('clear')
  .description('clear task')
  .action((...args) => {
    const words = args[args.length-1].join(' ')
    console.log(words);
  });
```

### fs.readFile

```
fs.readFile()
```

### fs.writeFile

```
fs.writeFile()
```

# 发布到 npm

## package.json 中使用 bin 来添加命令

```
"bin":{
  "t": "cli.js"
}
```

## package.json 中使用 file 来添加要提交的文件

```
"files":[ "*.js" ]
```

## google 搜索 node shebang

在 cli.js 首行添加`#!/usr/bin/env node`，作用是指定由哪个解释器来执行脚本

## 添加可执行权限

mac 和 linux 需要执行下面这行命令：

```
chmod +x cli.js
```

## 添加版本号，发布到 npm

```
npm publish
```

## nrm ls 查看，nrm use npm 切换为 npm 源

## 使用命令行 + chrome 进行 node.js 进行调试

```
node --inspect-brk cli.js add task 想peach
```

使用 -brk 来暂停运行，然后等待打好断点后再手动点击运行来进行调试
