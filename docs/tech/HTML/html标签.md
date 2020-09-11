---
title: html标签
sidebarDepth: 2
---

html 和 css 无法区分大小写，js 可以区分字母大小写（驼峰命名法）

## 如何在 html 中插入 JS

- 在 html 中嵌入 js
- 使用 script 标签
- 严格模式（use strict），文件首行，函数首行

---

title: "HTML 常用标签"
date: 2019-10-23T15:57:32+08:00
draft: false

---

1. a 标签

   - href：超链接，网址

     - 网址: //google.com (使用这种方式即可，自动选择使用 http 或者 https)

     - 路径: 以开启 http 服务的文件夹为根目录查找文件
     - 伪协议: javascript: 代码
       如果需要点击 a 标签后什么都不会发生，则需要下面的代码。
       ```
       <a href="javascript:;"></a>
       ```
       - mailto: 邮箱
       - tel: 手机号
     - id
       href=#xxx 跳转到 id 为 xxx 的元素的位置

   - target：打开方式
     - \_blank（新窗口打开）
     - \_top（在祖先元素中加载。如果没有祖先元素，则在当前页面加载）
     - \_parent（在父元素中加载。同\_top)
     - \_self（当前页面加载）
     - 任意字符串（在同一个窗口中打开不同的页面）
   - download：下载（没什么用）
   - rel=noopener

2. iframe 标签
   内联框架元素，它能够将另一个 HTML 页面嵌入到当前页面中。

   - Chrome 浏览器不允许任何 iframe 标签指向 TA。

3. table 标签

   - thead
   - tbody
   - tfoot
   - tr: 行
   - th: 表头
   - td: 表格单元格
   - table-layout: auto （内容决定宽度）/fixed （宽度平均）
   - border-collapse: collapse; border 合并
   - border-spacing: 0; border 之前的距离

4. img 标签（永远不要让图片变形）

   - 发出 get 请求，展示一张图片
   - 属性: alt/height/width/src
   - 事件: onload/onerror
   - 响应式: max-width:100%（移动端页面）

5. form 标签

   - 发 get 或 post 请求，然后刷新页面
   - action（请求地址）/method（请求方法）/autocomplete（给出建议）/target（同 a 标签）
   - 一个 form 表单必须要有一个 input 或者 button 按钮，并且要包含 type="submit"
   - input 里面不能放除文本外的其他内容，button 里面可以放

6. input 标签

   - type: name 单选/checkbox 多选/file 文件/hidden 隐藏

### script 标签

- async
- src
- type
- defer

7. 其他标签

   - textarea 标签 resize: none;（无法修改大小）
   - select 标签（选择框）
   - option 标签（选项）

8. 其他

   - http-server
     输入网址直接打开网页，**不要使用双击打开 html**

     ```
     http-server . -c-1 (-c-1 表示没有缓存）
     ```

   - parcel

     ```
     parcel html 文件名
     ```
