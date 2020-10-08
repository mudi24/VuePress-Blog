---
title: "手写bind"
sidebarDepth: 2
---

## 手写 bind

### bind 特殊性

- bind 位于 Function.prototype 上
- 需要做 polyfill

### API

- fn.bind(asThis)
- fn.bind()

### 如何手写 bind

- 开始我们尝试把 js 原生的 bind 删除掉，不过都失败了

```js
delete Function.prototype.bind;
Function.prototype.bind = "hi";
Object.defineProperty(Function.prototype, "bind", {
  enumerable: true,
  configurable: true,
  writable: true,
  ()=>{}
});
```

- 接下来我们选择换个思路，创建 bind2 来写我们自己的 bind

```js
Function.prototype.bind2 = () => {};
```

- ss

```js
function bind(asThis, p1, p1) {}
if (!Function.prototype.bind) {
  Function.prototype.bind = bind;
}
```
