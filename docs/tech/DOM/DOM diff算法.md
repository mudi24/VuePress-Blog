---
title: "DOM diff算法"
sidebarDepth: 2
---

## DOM 操作比虚拟 DOM 操作慢（错误），减少重复的 DOM 操作（正确）

- DOM 操作慢是相对于 JS 原生 API，如数据操作
- 任何基于 DOM 的库（Vue/React）都不可能在操作 DOM 时比 DOM 快

## 虚拟 DOM

虚拟 DOM 是一个能代表 DOM 树的对象，通常含有标签名、标签上的属性、事件监听和子元素们，以及其他属性

### 优点

- 减少 DOM 操作
  - 虚拟 DOM 可以将多次操作合并为一次操作，比如你添加 1000 个节点，但却是一个接一个操作的（减少频率）
  - 虚拟 DOM 借助 DOM diff 可以把多余的操作省掉，比如你添加 1000 个节点，其实只有 10 个是新增的（减少范围）
- 跨平台
  - 虚拟 DOM 不仅可以变成 DOM，还可以变成小程序、ios 应用、安卓应用、因为虚拟 DOM 本质上只是一个对象

### 缺点

- 需要额外的创建函数，如 createElement 或 h，但可以通过 JSX 或 vue-loader 来简化成 XML 写法
- 使用 JSX 或 Vue-loader 有什么缺点：严重依赖打包工具，添加额外的构建过程和构建时间

### 虚拟 DOM 长什么样子

- React 的虚拟 DOM

```js
const vNode = {
  key: null,
  props: {
    children: [  // 子元素们
      { type: "span" ,...},
      { type: "span" ,...}
    ],
    className: "red", //标签上的属性
    onClick: () => {}  //事件
  },
  ref: null,
  type: 'div', // 标签名 or 组件名
};
```

- Vue 的虚拟 DOM

```js
const vNode = {
  tag: "div", // 标签名 or 组件名
  data: {
    class: "red", //标签上的属性
    on: {
      click:(){} // 事件
    }
  },
  children: [  // 子元素们
    { tag: "span", ...},
    { tag: "span", ...},
  ]
};
```

### 如何创建虚拟 DOM

- React.createElement
  ```js
  createElement("div"{className:'red',onClick:()=>{}},[
    createElement('span',{},'span1'),
    createElement('span',{},'span2'),
  ]
  );
  ```

* Vue（只能在 render 函数中得到 h）
  ```js
  h(
    "div",
    {
      class: "red",
      on: {
        click: () => {},
      },
    },
    [h("span", {}, "span1"), h("span", {}, "span2")]
  );
  ```

### 使用插件创建虚拟 DOM

- React JSX

  ```html
  <div className="red" onClick={()=>{}}>
    <span>span1</span>
    <span>span2</span>
  </div>
  ```

  通过 babel 转为 createElement 形式

* Vue Template
  ```html
  <div class="red" @click="()=>{}">
    <span>span1</span>
    <span>span2</span>
  </div>
  ```
  通过 vue-loader 转为 h 形式

### 模拟测试创建 DOM 节点的结论

- 正常规模或较小规模，元素数量在几千个或者一万左右，虚拟 DOM 会使操作 DOM 的时间变短（适用于大多数情况）
- 规模非常大，元素数量达到十万，使用原生 api 操作 DOM 会非常稳定，Vue 也非常可靠，而 React 时间会明显变长，并且可能会崩
- 那么如何在操作非常多的 DOM 节点的情况下使用 React 呢，使用原生 API 操作 DOM 代替 React 自动渲染 DOM

## DOM diff

- DOM diff 就是一个函数，我们称之为 patch
- 通过逐层对比元素属性和子元素的不同，减少重复的 DOM 操作

### DOM diff 的缺点

- 会出现识别错误的问题，就会出现 bug
- Vue 中的 key，React 中的 key
- 任何情况都不要用数组的 index 来作 key

### DOM diff 可能的大致逻辑

- Tree diff
  - 将新旧两棵树逐层对比，找出哪些节点需要更新
  - 如果节点是组件就看 Component diff
  - 如果节点是标签就看 Element diff

* Component diff
  - 如果节点是组件，就先看组件类型
  - 类型不同直接替换（删除旧的）
  - 类型相同则只更新属性
  - 然后深入组件做 Tree diff（递归）

- Element diff
  - 如果节点是原生标签，则看标签名
  - 标签名不同直接替换，相同则只更新属性
  - 然后进入标签后代做 Tree diff（递归）

## 学习源码心得

- 看懂热门博客基本可以应对面试
- 大多数人对源码的理解都停留在热门博客的水平
