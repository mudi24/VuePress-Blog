---
title: "Sass快速上手"
sidebarDepth: 2
---

# SASS

## 基本用法

### 1. sass 可以使用变量

    ```css
    $blue: #1875e7;
    　 div {
      color: $blue;
    }
    ```
    如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。
    ```scss
    $side: left;
    div {
      border-#{$side}-radius: 5px;
    }
    ```

### 2. sass 可以使用算式

```scss
body {
  margin: (14px/2);
  top: 50px + 100px;
  right: $var * 10%;
}
```

### 3. sass 可以使用选择器嵌套

```scss
div {
  hi {
    color: red;
  }
}
```

属性也可以嵌套

```scss
p {
  border: {
    // 这里属性后面也要加冒号
    color: red;
  }
}
```

可以使用&引用父元素，如：a:hover 伪类可以写成下面这样

```css
a {
  &:hover {
    color: #ffb3ff;
  }
}
```

### 4. sass 注释

• 标准的 CSS 注释 / comment / ，会保留到编译后的文件。
• 单行注释 // comment，只保留在 SASS 源文件中，编译后被省略。
• 在/_后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。
/_!
　重要注释！
\*/

### 5. sass 代码复用

继承，使用@extend 命令来继承另一个选择器的样式

```scss
.class1 {
  border: 1px solid #ddd;
}
.class2 {
  @extend .class1;
  font-size: 120%;
}
```

mixin，可以重复使用的代码块
// 使用 @mixin 命令定义一个代码块

```scss
@mixin left {
  float: left;
  margin-left: 10px;
}
```

// 使用 @include 命令来调用 mixin

```scss
div {
  @include left;
}
```

mixin 可以像函数一样使用，可以指定默认参数，也可以传入

```scss
@mixin left($value: 10px) {
  float: left;
  margin-right: $value;
}
div {
  @include left(20px);
}
```

生成浏览器前缀的实例

```scss
@mixin rounded($vert, $horz, $radius: 10px) {
  border-#{$vert}-#{$horz}-radius: $radius;
  -moz-border-radius-#{$vert}#{$horz}: $radius;
  -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}
#navbar li {
  @include rounded(top, left);
}
#footer {
  @include rounded(top, left, 5px);
}
```

### 6. 颜色函数

```scss
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```

### 7. 插入文件(@import)

```scss
@import "test.scss" @import "test.css";
```

## 高级用法

### 条件语句（if else)

p {
　　　　@if 1 + 1 == 2 { border: 1px solid; }
　　　　@if 5 < 3 { border: 2px dotted; }
　　}
　　@if lightness(\$color) > 30% {
　　　　 background-color: #000;
　　} @else {
　　　　 background-color: #fff;
　　}

### 循环语句（for while each)

for 循环
　　@for $i from 1 to 10 {
   　　　　.border-#{$i} {
　　　　　　 border: #{$i}px solid blue;
   　　　　}
   　　}
   while 循环
   　　$i: 6;
　　@while $i > 0 {
   　　　　.item-#{$i} { width: 2em \* $i; }
   　　　　$i: $i - 2;
   　　}
   each 循环，与 for 循环类似
   　　@each $member in a, b, c, d {
　　　　.#{$member} {
   　　　　　　 background-image: url("/image/#{$member}.jpg");
　　　　}
　　}

### 自定义函数

@function double($n) {
   　　　　@return \$n \* 2;
　　}
　　#sidebar {
　　　　 width: double(5px);
　　}
