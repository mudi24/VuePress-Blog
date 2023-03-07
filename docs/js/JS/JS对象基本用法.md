---
title: "JS对象基本用法"
sidebarDepth: 2
---

1. 对象基本知识

   - 声明对象的两种语法
     ```
     - let obj = { 'name':小明, 'age':18 }
     - let obj = new Object({ 'name':小明, 'age':18 })
     ```

   * 注意：
     - 键名是字符串，引号省略也是字符串（symbol 也可以作为属性名）
     - 引号可以省略，省略之后只能写标识符
   * 变量作为属性名
     ```
     let a = 'mmp'
     let obj = {a: 'emm'} // obj.a
     let obj = {[a]: 'emm'} // obj[a]
     ```
     - 如果使用 [ ] 语法，那么 JS 会先求 [ ] 中表达式的值，注意区分表达式是变量还是常量。
     - 如果使用点语法，那么点后面一定是 string 常量。

   - 对象的原型
     - 每个对象都有一个隐藏属性，保存着原型的地址
     - 共有属性组成的对象叫原型

2. 删除对象的属性
   ```
   - delete obj.XXX/delete obj['xxx']
   - 'xxx' in obj : 检查 obj 是否包含属性名
   - 'xxx' in obj && obj.xxx === undefined : 包含属性名，但是值为 undefined
   ```
3. 查看对象的属性
   ```
   - Object.keys(obj)： 查看 obj 的所有 key
   - Object.entries(obj)： 查看 obj 的键和值
   * console.dir(obj)： 查看自身和共有属性
   * obj.hasOwnProperty( 'toString' )： 检查是否是自身属性
   ```
4. 修改或增加对象的属性
   ```
   - Object.assign(obj, {name: 'jack', age: 18})：批量赋值
   - Object.prototype.toString 修改原型上的属性
   - Object.create() 改原型（推荐使用）
   ```
5. 'name' in obj 和 obj.hasOwnProperty('name') 的区别
   ```
   - 'name' in obj： 检查 name 是否是 obj 的属性
   - obj.hasOwnProperty('name')： 检查那么是否是 obj 自身的属性
   ```
