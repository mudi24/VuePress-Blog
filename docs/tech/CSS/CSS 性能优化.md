---
title: "CSS 性能优化"
sidebarDepth: 2
---

# CSS 性能优化

## 1. 内联首屏关键 CSS

大家应该都习惯于通过 link 标签引用外部 CSS 文件。但需要知道的是，将 CSS 直接内联到 HTML 文档中能使 CSS 更快速地下载。而使用外部 CSS 文件时，需要在 HTML 文档下载完成后才知道所要引用的 CSS 文件，然后才下载它们。所以说，内联 CSS 能够使浏览器开始页面渲染的时间提前，因为在 HTML 下载完成之后就能渲染了。

既然内联 CSS 能够使页面渲染的开始时间提前，那么是否可以内联所有的 CSS 呢？答案显然是否定的，这种方式并不适用于内联较大的 CSS 文件。因为初始拥塞窗口 3 存在限制（TCP 相关概念，通常是 14.6kB，压缩后大小），如果内联 CSS 后的文件超出了这一限制，系统就需要在服务器和浏览器之间进行更多次的往返，这样并不能提前页面渲染时间。因此，我们应当只将渲染首屏内容所需的关键 CSS 内联到 HTML 中。

既然已经知道内联首屏关键 CSS 能够优化性能了，那下一步就是如何确定首屏关键 CSS 了。显然，我们不需要手动确定哪些内容是首屏关键 CSS。Github 上有一个项目 Critical CSS4，可以将属于首屏的关键样式提取出来，大家可以看一下该项目，结合自己的构建工具进行使用。当然为了保证正确，大家最好再亲自确认下提取出的内容是否有缺失。
不过内联 CSS 有一个缺点，内联之后的 CSS 不会进行缓存，每次都会重新下载。不过如上所说，如果我们将内联后的文件大小控制在了 14.6kb 以内，这似乎并不是什么大问题。
如上，我们已经介绍了为什么要内联关键 CSS 以及如何内联，那么剩下的 CSS 我们怎么处理好呢？建议使用外部 CSS 引入剩余 CSS，这样能够启用缓存，除此之外还可以异步加载它们。

可以是这个第三方依赖：https://github.com/addyosmani/critical#readme

```js
npm i -D critical
```

https://www.npmjs.com/package/critical

## 2. 异步加载 CSS

CSS 会阻塞渲染，在 CSS 文件请求、下载、解析完成之前，浏览器将不会渲染任何已处理的内容。

- 优先加载关键 CSS 首屏样式
- 其他 CSS 可以进行后续异步进行加载

### 异步加载 CSS 的四种方式

1. 使用 JS 动态创建样式表 link 元素，并插入到 DOM 中

```js
// 创建link标签
const myCSS = document.createElement("link");
myCSS.rel = "stylesheet";
myCSS.href = "mystyles.css";
// 插入到header的最后位置
document.head.insertBefore(
  myCSS,
  document.head.childNodes[document.head.childNodes.length - 1].nextSibling
);
```

2. link 元素的 media 属性设置为用户浏览器不匹配的媒体类型（或媒体查询），如 media="print"，或者设置为不存的类型。

```js
<link rel="stylesheet" href="mystyles.css" media="noexist" onload="this.media='all'">
```

3. 我们还可以通过 rel 属性将 link 元素标记为 alternate 可选样式表，也能实现浏览器异步加载。同样别忘了加载完成之后，将 rel 改回去。

```js
<link rel="alternate stylesheet" href="mystyles.css" onload="this.rel='stylesheet'">
```

4. `rel="preload"这一 Web 标准指出了如何异步加载资源，包括 CSS 类资源。

```js
<link rel="preload" href="mystyles.css" as="style" onload="this.rel='stylesheet'">
```

注意，as 是必须的。忽略 as 属性，或者错误的 as 属性会使 preload 等同于 XHR 请求，浏览器不知道加载的是什么内容，因此此类资源加载优先级会非常低。as 的可选值可以参考上述标准文档。
看起来，rel="preload" 的用法和上面两种没什么区别，都是通过更改某些属性，使得浏览器异步加载 CSS 文件但不解析，直到加载完成并将修改还原，然后开始解析。
但是它们之间其实有一个很重要的不同点，那就是使用 preload，比使用不匹配的 media 方法能够更早地开始加载 CSS。所以尽管这一标准的支持度还不完善，仍建议优先使用该方法。

这一方法在现在的浏览器中支持度不算乐观，不过我们可以通过 loadCSS6 进行 polyfill，所以支持不支持，这都不是事儿。

## 3. 文件压缩

压缩 CSS 文件，大大降低浏览器的加载时间

## 4. 去除无用 CSS

- 提取公共的 CSS 代码，减少重复
- 借助第三方库来移除无用的 CSS，如 https://github.com/uncss/uncss

## 1. 有选择的使用选择器

CSS 选择器的匹配是从右向左进行的

1. 保持简单，不要使用嵌套过多过于复杂的选择器。
2. 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用。
3. 不要使用类选择器和 ID 选择器修饰元素标签，如 h3#markdown-content，这样多此一举，还会降低效率。
4. 不要为了追求速度而放弃可读性与可维护性。

> Tips：为什么 CSS 选择器是从右向左匹配的？
> CSS 中更多的选择器是不会匹配的，所以在考虑性能问题时，需要考虑的是如何在选择器不匹配时提升效率。从右向左匹配就是为了达成这一目的的，通过这一策略能够使得 CSS 选择器在不匹配的时候效率更高。这样想来，在匹配时多耗费一些性能也能够想的通了。

## 2. 减少使用昂贵的属性

在浏览器绘制屏幕时，**所有需要浏览器进行操作或计算的属性相对而言都需要花费更大的代价**。当页面发生重绘时，它们会降低浏览器的渲染性能。所以在编写 CSS 时，我们应该尽量减少使用昂贵属性，如 box-shadow/border-radius/filter/透明度/:nth-child 等。

优先使用性能开销更低的方案

## 3. 优化重排和重绘

### 1.减少重排

重排会导致浏览器重新计算整个文档，重新构建渲染树，这一过程会降低浏览器的渲染速度。如下所示，有很多操作会触发重排，我们应该避免频繁触发这些操作。

1. 改变 font-size 和 font-family
2. 改变元素的内外边距
3. 通过 JS 改变 CSS 类
4. 通过 JS 获取 DOM 元素的位置相关属性（如 width/height/left 等）
5. CSS 伪类激活
6. 滚动滚动条或者改变窗口大小
   通过[CSS Trigger](https://csstriggers.com/)查询哪些属性会触发重绘和重排

值得一提的是，某些 CSS 属性具有更好的重排性能。如使用 Flex 时，比使用 inline-block 和 float 时重排更快，所以在布局时可以优先考虑 Flex。

### 2.避免不必要的重绘

当元素的外观（如 color，background，visibility 等属性）发生改变时，会触发重绘。在网站的使用过程中，重绘是无法避免的。不过，浏览器对此做了优化，它会将多次的重排、重绘操作合并为一次执行。不过我们仍需要避免不必要的重绘，如页面滚动时触发的 hover 事件，可以在滚动的时候禁用 hover 事件，这样页面在滚动时会更加流畅。

此外，我们编写的 CSS 中动画相关的代码越来越多，我们已经习惯于使用动画来提升用户体验。我们在编写动画时，也应当参考上述内容，减少重绘重排的触发。除此之外我们还可以通过[硬件加速](https://www.sitepoint.com/introduction-to-hardware-acceleration-css-animations/)和[will-change](https://drafts.csswg.org/css-will-change/)来提升动画性能，本文不对此展开详细介绍，感兴趣的小伙伴可以点击链接进行查看。
最后需要注意的是，用户的设备可能并没有想象中的那么好，至少不会有我们的开发机器那么好。我们可以借助 Chrome 的开发者工具进行 CPU 降速，然后再进行相关的测试，降速方法如下图所示。
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/8/1/164f3b1b11c7828b~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)
如果需要在移动端访问的，最好将速度限制更低，因为移动端的性能往往更差。

## 4.不要使用@import

不建议使用@import 主要有以下两点原因。
首先，使用@import 引入 CSS 会影响浏览器的并行下载。使用@import 引用的 CSS 文件只有在引用它的那个 css 文件被下载、解析之后，浏览器才会知道还有另外一个 css 需要下载，这时才去下载，然后下载后开始解析、构建 render tree 等一系列操作。这就导致浏览器无法并行下载所需的样式文件。
其次，多个@import 会导致下载顺序紊乱。在 IE 中，@import 会引发资源文件的下载顺序被打乱，即排列在@import 后面的 js 文件先于@import 下载，并且打乱甚至破坏@import 自身的并行下载。
所以不要使用这一方法，使用 link 标签就行了。

参考文章：https://www.zhangxinxu.com/php/myRecommBackup?id=css-performance
