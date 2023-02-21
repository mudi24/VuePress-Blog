---
title: "面试题（CSS）"
sidebarDepth: 2
---

### CSS

#### 清除浮动

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
