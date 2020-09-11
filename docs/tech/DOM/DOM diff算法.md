---
title: "DOM diff算法"
sidebarDepth: 2
---

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
