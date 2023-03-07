---
title: "Vue.js 运行机制（虚拟DOM的VNode节点）"
sidebarDepth: 2
---

## 前言

阅读过前面的文章，我们已经知道 render function 会被转化成 VNode 节点。Virtual DOM（虚拟 DOM） 就是一棵以 JS 对象（VNode 节点）作为基础的树，用对象属性来描述节点，本质上来说它只是把真实 DOM 转换成了 JS 对象的形式。

以 JS 对象为基础，避免了 DOM 依赖浏览器环境的困扰。从而使它拥有了跨平台能力，不仅可以使用到浏览器中，还可以在 Weex 和 Node 环境下使用。

## 实现一个 VNode

VNode 本质就是一个 JS 对象，我们只需要给一个 JS 对象中添加一个 DOM 的基本属性，就可以使这个对象成为一个 VNode。我们来实现一个简单的 VNode 类。

```js
class VNode {
  constructor(tag, data, children, text, elm) {
    /*当前节点的标签名*/
    this.tag = tag;
    /*当前节点的一些数据信息，比如props、attrs等数据*/
    this.data = data;
    /*当前节点的子节点，是一个数组*/
    this.children = children;
    /*当前节点的文本*/
    this.text = text;
    /*当前虚拟节点对应的真实dom节点*/
    this.elm = elm;
  }
}
```

比如一个 Vue 组件

```html
<template>
  <span class="demo" v-show="isShow"> This is a span. </span>
</template>
```

用 JS 代码表示是下面这样的：

```js
function render() {
  return new VNode(
    "span",
    {
      /* 指令集合数组 */
      directives: [
        {
          /* v-show指令 */
          rawName: "v-show",
          expression: "isShow",
          name: "show",
          value: true,
        },
      ],
      /* 静态class */
      staticClass: "demo",
    },
    [new VNode(undefined, undefined, undefined, "This is a span.")]
  );
}
```

那么，VNode 的格式就是下面这样的

```js
{
    tag: 'span',
    data: {
        /* 指令集合数组 */
        directives: [
            {
                /* v-show指令 */
                rawName: 'v-show',
                expression: 'isShow',
                name: 'show',
                value: true
            }
        ],
        /* 静态class */
        staticClass: 'demo'
    },
    text: undefined,
    children: [
        /* 子节点是一个文本VNode节点 */
        {
            tag: undefined,
            data: undefined,
            text: 'This is a span.',
            children: undefined
        }
    ]
}
```

接下来我们封装几个常用的 VNode 的方法

- 创建一个空的节点

```js
function createEmptyVNode() {
  const node = new VNode();
  node.text = "";
  return node;
}
```

- 创建一个文本节点

```js
function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}
```

- 克隆一个 VNode 节点

```js
function cloneVNode(node) {
  const cloneVnode = new VNode(
    node.tag,
    node.data,
    node.children,
    node.text,
    node.elm
  );
  return cloneVnode;
}
```
