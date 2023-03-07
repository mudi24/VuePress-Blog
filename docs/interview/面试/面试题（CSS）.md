---
title: "面试题（CSS）"
sidebarDepth: 2
---

# 面试题（CSS）

## 垂直居中的几种方法

1. flex

```css
.parent {
  display: flex;
  flex-direction: row;
  align-items: center;
}
/* 或 */
.parent {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

2. 绝对定位 + margin: auto

```css
.parent {
  height: 600px;
  border: 1px solid red;
  position: relative;
}
.child {
  border: 1px solid green;
  position: absolute;
  width: 300px;
  height: 200px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
```

3. 绝对定位 + 负 margin
   需要知道子元素的宽度和高度

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

4. 绝对定位 + calc

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
```

5. 绝对定位 + transform

```css
.wp {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

6.  table 布局

```js
<table>
  <tr>
    <td></td>
  </tr>
</table>
```

```html
<div class="table">
  <div class="td"></div>
</div>
```

```css
.table {
  display: table;
  border: 1px solid red;
  height: 600px;
}
.tr {
  display: table-row;
  border: 1px solid green;
}

.td {
  display: table-cell;
  border: 1px solid blue;
  vertical-align: middle;
}
```

7. 100% 高度的 after before 加上 inline-block

```html
<div class="parent">
  <span class="before"></span>
  <div class="child"></div>
  <span class="after"></span>
</div>
```

```css
.parent {
  border: 3px solid red;
  height: 600px;
  text-align: center;
}

.child {
  border: 3px solid black;
  display: inline-block;
  width: 300px;
  vertical-align: middle;
}

.parent .before {
  outline: 3px solid red;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.parent .after {
  outline: 3px solid red;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
```

8. grid

```css
.parent {
  display: grid;
}
.child {
  align-self: center;
  justify-self: center;
}
```

9. lineheight

```css
.parent {
  line-height: 300px;
  text-align: center;
  font-size: 0px;
}
.child {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: initial;
  text-align: left; /* 修正文字 */
}
```

10. writing-mode 改变文字的显示方向

这个方法理解起来有些复杂

```html
<div class="wrapper">
  <div class="">
    <div class="box"></div>
  </div>
</div>
```

```css
.wp {
  width: 300px;
  height: 300px;
  border: 1px solid red;
  writing-mode: vertical-lr;
  text-align: center;
}
.wp-inner {
  writing-mode: horizontal-tb;
  display: inline-block;
  text-align: center;
  width: 100%;
}
.box {
  border: 1px solid green;
  display: inline-block;
  margin: auto;
  text-align: left;
}
```

## css 画三角形

1. border 实现

```css
.triangle {
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-bottom: 200px solid #0ff;
}
```

2. 使用 linear-gradient 绘制三角形

```css
.triangle {
  background: linear-gradient(
    45deg,
    deeppink,
    deeppink 50%,
    transparent 50%,
    transparent 1px
  );
  transform: rotate(135deg);
}
```

3. 使用 conic-gradient 绘制三角形

```css
.triangle {
  background: conic-gradient(
    from 90deg at 50% 0,
    deeppink 0,
    deeppink 45deg,
    transparent 45.1deg
  );
}
```

4. transform 配合 overflow 实现

```css
.triangle {
  position: relative;
  background: unset;
  overflow: hidden;
}

.trangle::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: deeppink;
  transform-origin: left bottom;
  transform: rotate(45deg);
  z-index: -1;
}
```

5. clip-path

```css
.trangle {
  background: deeppink;
  clip-path: polygon(0 0, 100% 0, 0 100%, 0 0);
}
```

6. 使用字符

```js
◄ : &#9668;
► : &#9658;
▼ : &#9660;
▲ : &#9650;
⊿ : &#8895;
△ : &#9651;
```

```js
<div class="normal">&#9660; </div>

div {
    font-size: 100px;
    color: deeppink;
}
```

## 清除浮动

把 .clearfix 添加到容器上，里面的子元素就会清除浮动

```
 .clearfix:after {
    content: "";
    display: block; /*或者 table*/
    clear: both;
 }
 .clearfix {
    zoom: 1; /* IE 兼容*/
 }
```
