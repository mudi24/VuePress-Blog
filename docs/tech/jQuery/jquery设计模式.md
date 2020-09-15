---
title: jquery设计模式
sidebarDepth: 2
---

# jquery

```js
const elDiv = document.querySelector("#test");
const $div = $("div#test");
```

- 所有\$开头的变量都是 jquery 对象，普通 DOM 元素以 el 开头
- $.fn = $.prototype，然后让 api.*proto*指向\$.fn

## 设计模式

- 不用 new 的构造函数，这个模式没有专门的名字
- \$(支持多种参数)，这个模式叫做重载
- 用闭包隐藏细节，这个模式没有专门的名字
- \$div.text() 即可读也可写，getter/setter
- $.fn是$.prototype 的别名，这叫别名
- jquery 针对不同浏览器使用不同代码，叫适配器
