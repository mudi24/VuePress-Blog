---
title: mixin 
sidebarDepth: 2
---

## 重读 Vue2 文档前言
Vue 文档相信大家都读过很多次，但我最近发现自己还是遗漏了一些知识点。Vue 文档已经写得足够简洁精炼，我这里主要是进行归纳和总结，里面会引入一些原文。   
如果你已经在阅读 Vue 源码，或者已经在使用 Vue 3 进行开发了，那么这篇文章可能不太适合你。

阅读文章，你讲将学到
```js
1. mixin 如何使用
2. 自定义 mixin 合并规则
3. mixin 与 vuex 的区别，mixin 与公共组件的区别
```

## mixin

在 Vue 官网的文档中，是这样介绍mixin的：

> 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的**可复用**功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“**混合**”进入该组件本身的选项。
> 
由此可以看出：mixin的特点主要是 **可复用** 和 **混合** **（混入）**。

那么 mixin 到底是怎么使用，来实现可复用和混合这两个特点呢？我们来实践体验一下mixin的用法。

## mixin 的两种注册方式
首先自定义一个混入对象

```js
// 定义一个混入对象 
var myMixin = {
  created: function () {
    console.log('mixin 运行了');
    this.helloMixin('mixin.js');
  },
  methods: {
    helloMixin: function (fileName) {
      console.log(`局部注册：我是${fileName}中的mixin!`);
    },
  },
};
```
### 局部注册（在某个组件内部使用）
```js
import { myMixin } from "./my-mixin.js";
export const myComponent = Vue.component("my-component", {
  created() {
    console.log("component 运行了");
    this.helloMixin('component')
  },
   mixins: [myMixin],
});
```
运行结果

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34812060fd5f4148974f793fa7177b62~tplv-k3u1fbpfcp-watermark.image?)

可以看出当前 my-component 组件中并没有 helloMixin 方法，这里使用的是 myMixin 中定义的 helloMixin 方法。   
通过上面的例子我们可以得出以下两条结论：
1. 可以在mixin中定义**可复用**的方法（可以包括**Vue组件的全部选项**，如：data，生命周期函数，methods等等）。
2. mixin的生命周期函数将在组件自身同名生命周期函数执行**之前**调用。mixin 中的 create的先执行，component 中的 create 再执行


### 全局注册
那么，如果我们想在每一个组件中都使用 mixin 中的方法呢？   
每个组件都要单独引入太麻烦了，这个时候我们可以全局注册一个 mixin，这样就每个组件中使用mixin中的全部属性了。
```javascript
Vue.mixin({
  methods: {
    helloVueMixin: function (fileName) {
      console.log(`全局注册：我是${fileName}中的mixin!`);
    },
  },
});
```
但是既然每个组件都要用，直接定义成全局的方法不是更方便一些。  
下面是文档中的原文，Vue文档中也不推荐我们使用全局注册的mixin
> 注意： 请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项，就像上面示例一样。推荐将其作为[插件](https://cn.vuejs.org/v2/guide/plugins.html)发布，以避免重复应用混入。

## 属性合并
那么如果 mixin 和 使用了mixin 的 component中定义了同名的属性，会发生什么情况呢？
```js
var myMixin = {
  data() {
    return {
      text: "我是mixin中的data",
    };
  },
  created: function () {
    console.log("mixin 运行了");
    console.log("data:" + this.text);
    this.helloMixin("mixin.js");
  },
  methods: {
    helloMixin: function (fileName) {
      console.log(`局部注册：我是${fileName}中引入的mixin!`);
    },
  },
};
```
我们在component中定义与 mixin中同名的 text 和 helloMixin
```js
import { myMixin } from "./my-mixin.js";
export const myComponent = Vue.component("my-component", {
  data() {
    return {
      text: "我是component中的data",
    };
  },
  created() {
    console.log("component 运行了");
    console.log("data:" + this.text);
    this.helloMixin("component");
  },
  methods: {
    helloMixin: function (fileName) {
      console.log(`组件内部注册：我是${fileName}中引入的mixin!`);
    },
  },
  mixins: [myMixin],
});
```
运行结果

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02c09129e03047559230927eedea6246~tplv-k3u1fbpfcp-watermark.image?)
通过上面的例子我们可以得知mixin和component的属性合并规则：

* 数据对象（data）在内部会进行递归合并，并在发生冲突时以**组件数据**优先。
* 同名钩子函数将合并为一个数组，因此**都将被调用**。另外，混入对象的钩子将在组件自身钩子**之前**调用。
* 值为对象的选项，例如 `methods`、`components` 、 `directives`、`computed` 和 `filters`，将被合并为同一个对象。两个对象键名冲突时，取**组件对象的键值对**。
* ` watch` 对象合并时，相同的key合成一个对象，且**混入监听在组件监听之前调用**；



### 自定义属性合并规则
Vue 也提供了自定义mixin属性合并规则的方法，让我们来试一下
```js
Vue.config.optionMergeStrategies.methods = function (toVal, fromVal) {
  // 返回合并后的值
  console.log(toVal); // 父实例的 methods
  console.log(fromVal);  // 子实例的 methods
  if(toVal) return toVal;
  if(fromVal) return fromVal
};
```
我们在之前代码的基础上修改了mixin合并的规则，优先使用 mixin 中的methods属性。  
运行结果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9cd669bbd64457eb9e7cdc2a399fbf0~tplv-k3u1fbpfcp-watermark.image?)


## mixin与vuex的区别
**vuex**：用来做**全局状态管理**的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。    
**Mixin**：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是**相互独立**的，值的修改在组件中不会相互影响。

## mixin与公共组件的区别
**公共组件**：在父组件中引入组件，相当于在父组件中给出一片独立的空间供子组件使用，然后根据props来传值，但本质上两者是**相对独立**的。   
**Mixin**：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，mixin和组件已经**混合**到了一起。

文档中的代码链接：https://github.com/MambaNeverOut/read-vue-doc/tree/main/mixin
