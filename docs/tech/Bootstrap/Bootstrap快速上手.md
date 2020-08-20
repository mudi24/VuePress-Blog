---
title: "Bootstrap"
sidebarDepth: 2
---

# Bootstrap

- bootstrap 2 支持兼容 IE6
- bootstrap 3 不支持

* bootstrap.min.css 删除回车空格压缩到一行
* bootstrap.min.js 将长变量名（name...）变为短变量名（a,b,c...），并删除空格压缩到一行

## Bootstrap3 强依赖于 jQuery，没有 jQuery 无法使用

- 引入 jQuery
- 引入 Bootstrap
- 适配移动端 `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`
- .container 作为内容的容器，里面的内容会自动居中
- .container 类用于固定宽度并支持响应式布局的容器。
- .container-fluid 类用于 100% 宽度，占据全部视口（viewport）的容器。
- .container 有默认的左右内边距 15px，.row 则有默认的左右内边距-15px
- 默认使用 div 元素，几乎没有默认样式，其他元素都有默认样式
- col-sm-offset-2 间隙
- col-md-4 占的份数
- col-xs < col-sm < col-md < col-lg

## 全局 CSS 样式

- 栅格系统
- 表格
- 表单
- 按钮
