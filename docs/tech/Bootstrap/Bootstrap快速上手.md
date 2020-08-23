---
title: "Bootstrap"
sidebarDepth: 2
---

# Bootstrap

> warning 前言：Bootstrap 适用于快速搭建响应式页面的场景下，依赖于 jQuery。

## Bootstrap 响应式核心原理

- 媒体查询
  ```css
  @media (min-width: 768px) {
  } // 适配小屏幕（手机）
  @media (min-width: 992px) {
  } // 适配中等屏幕（ipad）
  @media (min-width: 768px) {
  } // 适配大屏幕（电脑）
  @media (min-width: 768px) {
  } // 适配更大屏幕（宽屏幕）
  ```

* Bootstrap 定义了多个可以直接使用（支持响应式）的 class，如：靠左对齐，居中，固定在顶部...

## Bootstrap 版本

- bootstrap 2 支持兼容 IE6
- bootstrap 3 不支持
- bootstrap 4 已发布（未使用过）

## Bootstrap 使用注意事项

- 添加 div 包裹 bootstrap 的组件，再添加 class，来进行样式添加，直接在组件上添加样式可能会影响 bootstrap 的原样式
- bootstrap.min.css 删除回车空格压缩到一行
- bootstrap.min.js 将长变量名（name...）变为短变量名（a,b,c...），并删除空格压缩到一行

## Bootstrap3 强依赖于 jQuery，没有 jQuery 无法使用

- 引入 jQuery
- 引入 Bootstrap
- 适配移动端 `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`

* aria-label 属性是给毒品软件用的，通常不需要

## Bootstrap 默认将每一行分为 12 格

- .container 作为内容的容器，里面的内容会自动居中
- .container 类用于固定宽度并支持响应式布局的容器。
- .container-fluid 类用于 100% 宽度，占据全部视口（viewport）的容器。
- .container 有默认的左右内边距 15px，.row 则有默认的左右内边距-15px
- 默认使用 div 元素，几乎没有默认样式，其他元素都有默认样式
- col-sm-offset-2 间隙
- col-md-4 占的份数
- col-xs < col-sm < col-md < col-lg

## Bootstrap 支持修改主题

- 在引入 Bootstrap 默认样式后，再引入对应的主题文件即可

  ```css
   <link rel="stylesheet" href="./css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/bootstrap-theme.min.css">
  ```

## Bootstrap 支持 js 组件

## Bootstrap 支持自定义默认样式
