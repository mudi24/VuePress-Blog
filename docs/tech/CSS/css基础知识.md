---
title: "css基础知识"
sidebarDepth: 2
---

### 文档流

- inline 元素 从左到右，宽度为内部 inline 元素的和，高度由 line-height 决定
- block 元素 独占一行，宽度和高度可以指定（有内部文档流元素决定）
- inline-block 从左到右，高度可以指定

> div 宽度为 width:auto，不要把宽度设为 100%

### 脱离滚动条

- float
- position：absolute/fixed

### overflow 是否展示滚动条

- auto 灵活设置/scroll 永远显示/visible 直接展示
- 可以分为 overflow-x 和 overflow-y
- 如果有滚动条，inline 元素只会填充首屏页面，后面是空白

### 语法 at 语法

- @charset "UTF-8"; 必须在第一行
- @import url(2.css); 前两个 at 语法必须以分号;结尾
- @media (min-width:100px) and (max-width:200px) {}
- charset 字符集 UTF-8 字符集 历史遗留问题

### 盒模型

- content-box
- border-box 更好用

### margin 合并（垂直方向会合并，水平方向不会）

- 父子 margin 合并
- 兄弟 margin 合并
- 如何取消父子 margin 合并
  - 子元素添加 padding 或 border
  - overflow: hidden
  - display: flex

* 如何取消兄弟 margin 合并
  - inline-block

### 基本单位

#### 长度

- px
- em 相对于自身 font-size 的倍数（如果自身未设置 font-size，则往上找）
- 百分数
- 整数
- rem 根元素（html 或者:root）字体的倍数（rem 在 oppo 手机会报错，就特么离谱）
- vw 和 vh

#### 颜色

- 十六进制 #FF6600 或#F60
- RGBA 颜色 rgb(0,0,0)或 rgba(0,0,0,1)
- hsl 颜色 hsl（360,100%,100%)或 hsla(360,100%,100%,1) 色相，饱和度，明度
