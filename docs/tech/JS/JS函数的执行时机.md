---
title: "JS函数的执行时机"
date: 2019-11-15T21:03:05+08:00
draft: false
---

1. 解释为什么如下代码会打印 6 个 6

   ```
   let i = 0
   for(i = 0; i<6; i++){
     setTimeout(()=>{
       console.log(i)
     },0)
   }
   ```

   - for 循环遍历 6 次，会执行 6 次 console.log()
   - 当执行第 6 次循环的时候，i 为 5，console.log(5)之后，执行 i++，i 的值变为 6
   - 只有一个全局变量 i，在 for 循环结束后，i 的值为 6，console.log(i)就会打印出 6

2. 写出让上面代码打印 0、1、2、3、4、5 的方法

   ```
   for(let i = 0; i<6; i++){
      setTimeout(()=>{
        console.log(i)
      },0)
   }
   ```

   ```
   for(var i = 0; i<6; i++){
      let j = i
      setTimeout(()=>{
        console.log(j)
      },0)
   }
   ```

   ```
   for(let i = 0; i<6; i++){
     !function(j){
       setTimeout(()=>{
         console.log(j)
       },0)
     }(i)
   }
   ```

3. 函数的要素
   - 调用时机
   - 作用域
   - 闭包
   - 形参
   - 返回值
   - 调用栈
   - 函数提升
   - arguments
   - this
