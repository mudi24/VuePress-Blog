---
title: "TS特性（接口）"
sidebarDepth: 2
---

### 基础类型

- 七种数据类型（symbol）

  ```
  let a:null = null
  let b:undefined = undefined
  let c:boolean = true
  let d:string = 'xxx'
  let e:number = 1.223
  let obj:Object = { name:'Irelia'}
  let n:any = 1; //可以是任意数据类型
  ```

* 枚举
  - 值默认为 0,1,2...
  - 如果当前枚举成员没有初始化的值且它之前的枚举成员是一个数字常量。当前枚举成员的值为它上一个枚举成员的值加 1。
  ```
    enum Gender{
          Man = 'man';  // 默认为Man = 0
          A = 1, B, C;  // 1,2,3
    }
  ```
* void(空)
  ```
    function print(x:any):void { // 没有返回值
      console.log(x)
    }
  ```
* undefined
  - 默认情况下，null 和 undefined 是所有类型的子类型。就是说可以把 null 和 undefined 赋值给任意类型的变量。
  ```
  let a:number = undefined
  let a:string = null
  ```

### 类型断言

- 断言
  - 在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。

```
let n:any = '122';
console.log((<string>n).split('')) // 写法1
console.log((n as string).split('')) // 写法2
```

- 解构赋值
  ```
    function({name,age}:any){
      console.log(`Hi，${name}，${age}`)
    }
  ```

* 展开运算符

  ```
  let a1 = [1,2,3]
  let a2 = [4,5,6]
  let a3 = [...a1, ...a2]
  ```

### 类型转换

```
let a:number = 123;
let b:string = a.toString(); //数字变字符串

let c:string = '123';
let d:number = parseFloat(c) // 字符串变数字

let s1:number = 1;
let b1:boolean = Boolean(s1); // 数字变布尔

let obj = { name: 'Irelia'};
let string = JSON.stringify(obj) // 字符串变对象

let string2 = `{ "name": "Irelia"}`;
let obj2 = JSON.parse(string) // 对象变字符串
```

### 接口

- 接口就是规定一个对象必须有这些属性。

- readonly 只读属性
- ? 可选属性

```
    interface Shape{
        head:string;
        body:string;
    }
    interface Human{
        readonly name:string; // 只读属性，不可修改
        age:number;
        shape:Shape;
        likeGame?: Array<string> // 可选属性，可有可无
        say(word:string):void;
    }
    let frank:Human = {
        name:'Irelia',
        age:18,
        shape: {head:'脑袋', body:'躯干'},
        say(word:string){
          console.log(word);
        }
    }
    frank.say('I am Irelia')
```

- 额外的属性来限制输入

```
  interface SquareConfig{
      height?: number;
      width?: number;
      [propsName:string]: number;
      // 属性名为string时，对应的值必须为number
  }
  function createSquare(config: SquareConfig):void {}
  let config ={
      height: 666
  }
  let mySquare = createSquare(config)
```

- 如果这个对象是函数

```
  interface SearchFunc {
      (source: string, substring: string):boolean;
      // 参数类型为string，返回值类型为boolean
  }
```

- 如果这个对象是函数，而且这个对象的属性也是函数

```
  interface 二则运算{
      (a:number, b:number):number;
      逆运算(a:number, b:number):number;
  }
  let fn = ():二则运算 => {
      let x:any = function(a:number, b:number):number{
        return a+b;
      };
      x.逆运算 = function(a:number, b:number){
        return a-b;
      };
      return x
  }
  let add: 二则运算 = fn()
  console.log(add(1,2));
```

```
  let add: 二则运算 = ((): 二则运算 => {
      let x: any = function(a:number, b:number):number{
        return a+b;
      }
      x.逆运算 = function(a: number, b: number):number{
        return a - b
      }
      return x
  })();
  console.log(add(1,2));
```

- 接口继承
  - 接口继承两个接口
  - 接口可以继承继承过的接口

```
    interface 有机物{
          c:boolean,
          h:boolean,
          o:boolean,
    }
    interface Animal extends 有机物{
          move():void
    }
    // interface Human extends Animal, 有机物{}
    interface Human extends Animal{
          name: string;
          age: number;
    }
    let frank:Human = {
          c:true,
          h:true,
          o:true,
          age:18,
          name:'frank',
          move(){}
    }
```
