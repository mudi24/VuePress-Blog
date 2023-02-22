---
title: "面试题（Vue）"
sidebarDepth: 2
---

## Vue 3 和 Vue 2 的 watch 有什么不同

### watch

watch 可以监听一个或多个响应式数据， 一旦数据变化， 就自动执行监听回调， 如果监听 rective 对象中的属性， 必须通过函数来指定， 如果监听多个数据，需要使用数组来指定，默认初始时不执行回调，当可以通过配置 immediate 未 true，来指定初始时立即执行第一次，通过配置 deep 为 true，来指定深度监听。

#### watch（prop, (newValue, oldValue) => {}）监听新旧属性

#### watch 监听对象中的一个属性或多个属性

### watchEffect 用到那个属性就会监听那个属性

watchEffect 可以不用直接指定要监听的数据，回调函数中使用的那些响应式数据就监听那些响应式数据，默认初始时就会执行第一次。

### 如何绑定多个 ref 对象

1. 在setup中定义一个常量xxxrefs用来接受所有for循环设置ref的元素，ref中必须要是空数组 
```js
const uploadRefs = ref([])
```
2. 页面中for循环中必须要用el = > {inputs[index] = el}绑定input元素的ref值（将所有的ref元素放到数组中）
```js
:ref="el=>{uploadRefs[index]=el}"
```
3、JS中，通过索引获取对应的ref元素uploadRefs.value[index]
```js
uploadRefs.value[val].xxxxx()
```