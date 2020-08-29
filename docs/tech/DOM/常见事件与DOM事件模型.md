---
title: "常见事件与DOM事件模型"
sidebarDepth: 2
---

# 常见事件

## 1.鼠标事件

- 点击事件： click（单击），dblclick（双击），oncontentmenu （右键单击）
- 按下抬起事件：mousedown（按下），mouseup（抬起）
- 滚动滚轮事件：mousewheel（滚动）
- 光标经过触发事件：mouseover（滑过），mouseout（滑出）
- 光标移动时触发事件：mousemove（移动）
- 光标进入和光标离开触发事件：mouseenter（进入）， mouseleave（离开）

### 根据实际情况使用 mouseover 或 mouseenter

**问题**：
细心的读者可能已经发现了，mouseover 和 mouseout 这组事件与 mouseenter 和 mouseleave 这组事件看起来很像，功能也很类似，那么为什么会有这两组事件呢，其中一种事件不就可以满足我们的需求了吗？  
**答案**：
因为 mouseover 存在**冒泡机制**，会把自身的事件传递给祖先元素，事件会在当前元素和祖先元素上触发  
而 mouseenter 不存在冒泡机制，**只会在当前元素触发**，祖先元素不会触发。（如果你还不了解什么是冒泡，可以先去看下面的事件冒泡，看完以后再回来看这里。）  
所以，两种事件本质上是不同的，功能上是互补的。  
**总结**：
你只需要判断是否需要在祖先元素上触发事件即可，如果需要则使用 mouseover/mouseout，如果不需要则使用 mouseenter/mouseleave。大多数情况下我们会使用**mouseenter/mouseleave**。

## 2.键盘事件

- keydown **按下**任意按键时触发
- keypress 除 Shift、Fn、CapsLock 外的任意键被**按住**时触发。（连续触发）
- keyup **松开**任意按键时触发

## 3.表单事件

- onfocus 获取焦点
- onblur 失去焦点
- oninput 内容改变时触发
- onchange 内容改变并且输入框失去焦点时触发

## 4.移动端 Touch 事件

- touchstart 接触设备时触发
- touchmove 在设备移动时触发
- touchend 离开设备时触发
- touchcancel 操作取消（非正常状态下操作结束）

## 5.系统事件

- scroll 滚动
- resize 大小改变时触发
- load 加载完毕
- beforeunload 即将被卸载
- unload 正在被卸载

## 自定义事件

原生事件几乎已经可以满足我们的所有需求，但是除了原生事件外，我们还可以通过自定义事件来开发自己的事件系统。

```js
    btn.addEventListener('click', ()=>{
        const event = new CostomEvent('myEvent', {
            detail: {name:'酸菜鱼',age: 24},
            bubbles: true,  // 事件会自动冒泡
            cancelable: false  // 不允许阻止冒泡
        )
        btn.dispatchEvent(event)
    })
```

然后像使用其它事件那样为自定义事件添加监听即可

```js
div1.addEventListener("myEvent", (e) => {
  console.log("我是自定义事件");
});
```

如果你还想了解更多的事件行为，可以阅读 MDN 的[事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events)文档。

# DOM 事件模型

DOM 事件模型通常可以分为两个阶段，冒泡阶段和捕获阶段。

![](https://user-gold-cdn.xitu.io/2020/6/25/172ebcf44cad45d6?w=667&h=702&f=png&s=399693)

## 事件捕获和事件冒泡

事件捕获：从**外部元素向内部元素**逐级查找绑定监听函数的元素

事件冒泡：从**内部元素向外部元素**逐级查找绑定监听函数的元素

## 捕获不能取消，但冒泡可以取消

e.stopPropagation 取消冒泡

阻止默认行为 preventDefault

滚动事件无法通过 e.stopPropagation 取消冒泡

## 滚动事件取消冒泡

阻止滚轮事件

xxx.addEventListener('wheel',(e)=>{ e.preventDefault()})
隐藏滚动条

::webkit-scrollbar{ width: 0 !important }
移动端取消触屏事件

xxx.addEventListener('touchstart', (e) => { e.preventDefault()})

# 事件绑定

默认 DOM 元素的点击事件为 null
addEventListener(IE8 及以下不支持)
onclick
attachEvent

## DOM 0 级事件

```
<div id="btn"></div>
let btn = document.querySelector("btn")
btn.onclick =fcuntion(){}
```

缺点: 在一个事件上**无法同时绑定多个**处理函数（使用这种方式后续绑定的处理函数会覆盖之前的处理函数，所以只支持绑定单个处理函数）

## DOM 2 级事件

DOM 2 级事件修复了一个处理程序无法同时绑定多个处理函数的缺点，可以**控制函数的触发阶段（捕获或冒泡）**，对任何 DOM 元素都是有效的，而不仅仅只对 HTML 元素有效。

```
<div id="btn"></div>
let btn = document.querySelector("btn")
btn.addEventListener = ('click', function(){}, false)
btn.addEventListener = ('click', function(){}, false)
```

e 只存在于事件触发的时候，时间结束后，e 就不存在了

addEventListener(事件名，回调函数，布尔值)，通常我们在使用 addEventListener 的时候只会传递前两个参数，而不会传递第三个参数，**第三个参数就是来决定把事件添加到冒泡阶段还是捕获阶段的**，如果为 true，函数在捕获阶段执行，如果不传或者为 falsy 值，函数则会在冒泡阶段执行。

**removeEventListener 移除事件绑定**

```
// IE8级以下版本只支持冒泡型事件,不支持事件捕获所以没有第三个参数
// 方法中包含2个参数，分别是绑定的事件处理属性名称（不包含on）、事件处理函数
btn.attachEvent('onclick', fn); // 绑定事件
btn.detachEvent('onclick', fn); // 解绑事件
```

## DOM 3 级事件

添加了更多地事件类型

## 事件对象

1. 鼠标事件对象
2. 键盘事件对象
3. Touch 事件对象

如果你想在**事件结束后**使用当时触发事件的 e 对象，请把它保存起来

### e.target vs e.currentTarget

target 用户点击的，currentTarget 开发者监听的

不过有一种特殊情况，只在一个 DOM 元素的捕获和冒泡阶段监听函数，谁先监听谁先执行

#### 事件的特性

- Bubbles 表示是否冒泡
- Cancelable 表示是否支持开发者取消冒泡
- 捕获不能取消，但冒泡可以取消
- e.stopPropagation 取消冒泡

# 事件委托

事件委托又叫事件代理，是指不监听元素本身，而去监听其祖先元素，然后判断触发事件的元素是否为该元素  
应用场景：有多个子元素需要同时绑定监听事件，并且需要在新增兄弟元素后也自动为它绑定同样的监听事件，此时就需要使用事件委托

#### 优点：

    1.减少监听事件的数量
    2.动态添加的元素也可以被监听到

自己封装一个事件委托函数

```js
on("click", "#div2", "button", fn);

function on(eventType, element, selector, fn) {
  if (!(element instanceof Element)) {
    element = document.querySelector(element);
  }
  element.addEventListener(eventType, (e) => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (element === selector) {
        el = null;
        break;
      }
      el = el.parentNode;
    }
    el && el.call(el, e, el);
  });
}
```

最后提出一个拓展问题：既然存在自定义事件的方法，那么我们就有了实现 JS 事件系统的的基础，大家可以思考一下如何手写一个 JS 事件系统（提示：使用队列）
