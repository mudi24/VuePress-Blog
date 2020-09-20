---
title: "5分钟学习TypeScript"
sidebarDepth: 2
---

### 安装

- 配置 npm 淘宝源：`npm config set registry https://registry.npm.taobao.org/`
- `npm install typescript@版本号 -g`
- `npm install ts-node@版本号 -g` // 使 ts 可以在 node 上运行
  - 把 ts-node 安装后的可执行文件路径记录下来

### 调试

- Windows 用户需要运行命令
  - `npm init -y`
  - `npm i -D ts-node typescript`
- 创建.vscode/launch.json 文件，内容如下

  ```
  {
     "configurations": [
         {
         "name": "ts-node",
         "type": "node",
         "request": "launch",
         "program": "注意看这里，要写成ts-node对应的可执行文件，Windows 用户注意了，你应该写成
         ${workspaceRoot}/node_modules/ts-node/dist/bin.js",
         "args": ["${relativeFile}"],
         "cwd": "${workspaceRoot}",
         "protocol": "inspector"
         }
     ]
  }
  ```

* 找到调试选项，选择 ts-node，然后点击调试，就会在下方控制台输出结果
* ts 文件需要通过 tsc 命令编译为 js 文件才可以在浏览器中运行

### 示例

- 接口
  ```
    interface Person{
      姓: string;
      名: string;
    }
    function greeter(person:Person){
      return "Hello,"+person.姓+" "+person.名;
    }
    let user = {姓:"type",名:"script"}
    console.log(greeter(user))
  ```

* 类

  ```
    class Student {
      fullName: string;
      constructor(public 姓, public 名) {
          // public会把属性变为对象的属性，等价于this.firstName = firstName
          this.fullName = 姓 + 名;
      }
    }
  ```

* 重载
  ```
  // 可以支持多种形式的参数类型
    function add(a:string, b:string):string;
    function add(a:number, b:number):number;
    function add(a:any, b:any):any{
      return a + b
    }
  ```
* 数组
  ```
  let list: number[] = [1,2,3]
  let list: Array<number> = [1,2,3]
  ```
* 元组

  ```
  let x: [string, number]
  ```

* 枚举
  ```
    enum Gender{
      Male,
      Female
    }
  ```
