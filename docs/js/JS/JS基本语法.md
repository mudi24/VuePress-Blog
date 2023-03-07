---
title: "JS基本语法"
sidebarDepth: 2
---

1. 表达式和语句
   - 表达式
     - 1 + 2 表达式的**值**为 3
     - add(1,2) 表达式的值为函数的**返回值**
     - console.log 表达式的值为函数本身
     - console.log(3) 表达式的值为 undefined
   - 语句
     - var a = 1 是一个语句
   - 区别
     - 表达式**一般都有值**，语句可以有也可以没有
     - 语句一般是用来改变环境的（**声明，赋值**）
   - 注意：**return 后面**不能加回车
2. 标识符的规则
   - 第一个字符可以是 Unicode 字母 或者 \$ 或者 \_ 或者 中文
   - 后面的字符包括上面的说有，还可以有数字
   - 变量名是标识符，还有其他标识符
3. if else 语句 / switch 语句
   - if else 语句
     - 推荐写法：
       ```
       if (表达式) {
         语句
       } else if (表达式) {
         语句
       } else {
         语句
       }
       ```
     - 可以省略{}，但是省略后 if else 语句只会默认把后面的第一句放入{}内
   * switch 语句
     - 语法：
       ```
       switch (fruit) {
        case "apple":
          // ...
          break;
        case "orange":
          // ...
          break;
        default:
          // ...
       }
       ```
4. && 与 ||
   - && : A && B && C && D 取第一个假的值或者 D
   - || : A || B || C || D 取第一个真的值或者 D
5. while 语句 / for 语句
   - while 语句
     - 语法：while (表达式) { 语句 }
   - for 语句
     - 语法：for (语句 1;表达式 2;语句 3) { 循环体 }
6. break 与 continue
   - break: 跳出所有循环
   - continue: 跳出当前一次循环
7. label

   - 语法：

   ```
    foo: {
      console.log(1);
        break foo;
        console.log("不执行")
    }
    console.log(2);
   ```
