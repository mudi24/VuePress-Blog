---
title: "Vue.js运行机制（概览）"
sidebarDepth: 2
---

## Vue.js 内部运行的流程

[](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/19/1606e7eaa2a664e8~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

Vue 运行的整体流程如上图所示，

1. 通过 `new Vue()`进行初始化（根据组件使用方式决定是否挂载组件），使用 `Object.defineProperty` 为声明的变量添加 `getter` 和 `setter`；
2. 然后进行编译，在编译中会依次进行下面这三个操作： 
   * `parse` 
   * `optimize`、
   * `generate`；
3. 在初始化时绑定的 getter 和 setter 会对变量进行监听，变量修改后就可以调用 update 来更新视图。 
4. render function 会借助真实 DOM 来生成一个虚拟 DOM 树，而在渲染时又可以把虚拟 DOM 渲染到视图中。
5. 修改变量的值后，会触发 `setter`，同时生成一个新的 VNode。`patch` 会把新的 VNode 和旧的 VNode 进行比较，从而得到他们的不同，最后把这些不同更新到视图中。
   
接下来我们就逐个对这些模块进行学习

## 初始化，组件挂载

[](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/19/1606e8abbababbe6~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

在 new Vue() 之后。 Vue 会调用 \_init 函数进行初始化，也就是这里的 init 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。其中最重要的是通过 Object.defineProperty 设置 setter 与 getter 函数，用来实现「响应式」以及「依赖收集」，后面会详细讲到，这里只要有一个印象即可。
初始化之后调用 $mount 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行「编译」步骤。

## 编译

compile 编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function。
[](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/19/1606ec3d306ab28f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

### parse

parse 会用正则等方式解析 template 模板中的指令、class、style 等数据，形成 AST。

### optimize

optimize 的主要作用是标记 static 静态节点，这是 Vue 在编译过程中的一处优化，后面当 update 更新界面时，会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。

### generate

generate 是将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串。

在经历过 parse、optimize 与 generate 这三个阶段以后，组件中就会存在渲染 VNode 所需的 render function 了。

## 响应式

接下来也就是 Vue.js 响应式核心部分。
[](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/19/1606edad5ca9e23d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

这里的 getter 跟 setter 已经在之前介绍过了，在 init 的时候通过 Object.defineProperty 进行了绑定，它使得当被设置的对象被读取的时候会执行 getter 函数，而在当被赋值的时候会执行 setter 函数。

当 render function 被渲染的时候，因为会读取所需对象的值，所以会触发 getter 函数进行「依赖收集」，「依赖收集」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中。形成如下所示的这样一个关系。

[](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/21/160770b2a77e084e~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

在修改对象的值的时候，会触发对应的 setter， setter 通知之前「依赖收集」得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher 就会开始调用 update 来更新视图，当然这中间还有一个 patch 的过程以及使用队列来异步更新的策略，这个我们后面再讲。

## 虚拟 DOM (Virtual DOM)

我们知道，render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。
比如说下面这样一个例子：

```js
{
    tag: 'div',                 /*说明这是一个div标签*/
    children: [                 /*存放该标签的子节点*/
        {
            tag: 'a',           /*说明这是一个a标签*/
            text: 'click me'    /*标签的内容*/
        }
    ]
}
```

渲染后可以得到

```html
<div>
  <a>click me</a>
</div>
```

这只是一个简单的例子，实际上的节点有更多的属性来标志节点，比如 isStatic （代表是否为静态节点）、 isComment （代表是否为注释节点）等。

## 更新视图

[](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/12/21/1607715c316d4922~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
前面我们说到，在修改一个对象值的时候，会通过 setter -> Watcher -> update 的流程来修改对应的视图，那么最终是如何更新视图的呢？

当数据变化后，执行 render function 就可以得到一个新的 VNode 节点，我们如果想要得到新的视图，最简单粗暴的方法就是直接解析这个新的 VNode 节点，然后用 innerHTML 直接全部渲染到真实 DOM 中。但是其实我们只对其中的一小块内容进行了修改，这样做似乎有些「浪费」。

那么我们为什么不能只修改那些「改变了的地方」呢？这个时候就要介绍我们的「patch」了。我们会将新的 VNode 与旧的 VNode 一起传入 patch 进行比较，经过 diff 算法得出它们的「差异」。最后我们只需要将这些「差异」的对应 DOM 进行修改即可。
