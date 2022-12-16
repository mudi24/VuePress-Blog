---
title:  阅读Vue2源码工具函数
sidebarDepth: 2
---

**本文参加了由[公众号@若川视野](https://link.juejin.cn/?target=https%3A%2F%2Flxchuan12.gitee.io "https://lxchuan12.gitee.io") 发起的每周源码共读活动，[点击了解详情一起参与。](https://juejin.cn/post/7079706017579139102 "https://juejin.cn/post/7079706017579139102")**   
**这是源码共读的第24 期，链接：[初学者也能看懂的 Vue2 源码中那些实用的基础工具函数]("https://juejin.cn/post/7079765637437849614")**   

>  之前总觉得阅读源码是一件很了不起的事情，是只有大佬才会去做的事。但在工作了一段时间后，使用了很多的优秀的框架和库后，在感叹巧妙的设计之余——有时候也会想作者到底是怎么去实现的。于是就开始尝试阅读一些源码，发现**其实源码也不是想象的那么难，至少有很多看得懂。**     
>  
>  同时，源码有也有很多值得学习和借鉴的东西，不管是应用到日常开发中还是应对面试都是非常有用的，所以还是推荐大家也去尝试阅读的。
 

## 前言

这是我的阅读源码的第四篇文章，逐渐培养每周阅读源码并写文章记录的习惯。 

十月份工作比较忙，没有阅读源码并写文章。十一月份尽量坚持每周阅读源码并写文章。

Vue 相信大家都用过，就算没有用过也一定听说过。现在主要流行的是 Vue2 和 Vue3，Vue2 作为国内使用最多的前端框架之一，其中的开发思路和使用的便捷性是非常值得我们去学习的。今天我们就来学习一下 `Vue2 源码中的工具函数`。

## 如何阅读 github 上的源码

打开 [vue]("https://github1s.com/vuejs/vue/blob/dev/src/shared/util.js") 即可查看源码

> 在每一个`github`项目中的`url`里直接加上`1s`，就能在网页版`vscode`中查看源码了。（我在上面提供的链接已经添加了 `1s`）

如果这个方法不可行的话，还可以使用下面的方法把源码克隆到本地中进行查看。

### 克隆 Vue 项目查看源码

开源项目一般能在根目录下的`README.md`文件或[CONTRIBUTING.md]("https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md")中找到贡献指南。贡献指南中说明了参与贡献代码的一些注意事项，比如：**代码风格、代码提交注释格式、开发、调试**等。

在 `CONTRIBUTING.md` 中有 Vue 源码的项目目录结构，然后我在其中找到了我们今天要看的工具函数的文件 `shared`。文件路径是 `src/shared`。

> **`shared`**: contains utilities shared across the entire codebase.

也可以直接使用源码仓库中的[打包后的 dist/vue.js 14行到379行](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fvue%2Fblob%2Fdev%2Fdist%2Fvue.js%23L14-L379 "https://github.com/vuejs/vue/blob/dev/dist/vue.js#L14-L379")。

## 工具函数
在 Vue2 源码工具函数中有一部分函数是和 axios 源码中的工具函数功能完全相同，本文就不再重复对这些函数进行记录了，感兴趣的朋友可以去看我之前写的[【跟着若川读源码】axios源码中的这些实用的基础工具函数（上）](https://juejin.cn/post/7145110519362355231)。
### `emptyObject`

```js
var emptyObject = Object.freeze({});
```
冻结对象。第一层无法修改。对象中也有判断是否冻结的方法。
```js
Object.isFrozen(emptyObject); // true
```
关于对象的 API ，可以去看一下若川的文章[JavaScript 对象所有API解析]("https://lxchuan12.gitee.io/js-object-api/")    
[阮一峰的 ES6 书籍]("https://es6.ruanyifeng.com/") 

 ### isUndef 是否是未定义
 这个函数也不用多说，只要学过JS的人都知道
 ```js
 function isUndef (v) { return v === undefined || v === null }
 ```
###  isDef 是否是已经定义
JS 中 6个 falsy 值： `false` `null` `undefined` `0` `''` (空字符串) `NaN`，我们在进行判断的时候，falsy 值会被强制转换为 false。
```js
function isDef (v) { return v !== undefined && v !== null }
```
 ### isObject 判断是对象

因为 `typeof null` 是 'object'。数组等用这个函数判断也是 true 

```js
function isObject (obj) { 
    return obj !== null && typeof obj === 'object' 
}
// 例子: isObject([]) // true 
// 如果要区分是否数组就要使用ES6 的 isArray 方法了
```
### isValidArrayIndex 是否是可用的数组索引值
数组的可用索引值通常为：0（'0'），1（'1'），2（'2'）...
```js
function isValidArrayIndex (val) { 
    var n = parseFloat(String(val)); 
    return n >= 0 && Math.floor(n) === n && isFinite(val) 
}
```
这里用到了 [isFinite](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isFinite) 函数，下面是 MDN 对 `isFinite` 的介绍

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/979a72c5afbe41c39d3e48c0ae6d0a88~tplv-k3u1fbpfcp-watermark.image?)
```js
isFinite(Infinity);  // false
isFinite(NaN);       // false
isFinite(-Infinity); // false

isFinite(0);         // true
isFinite(2e64);      // true, 在更强壮的Number.isFinite(null)中将会得到false

isFinite('0');       // true, 在更强壮的Number.isFinite('0')中将会得到false
```
在 ES6 中有一个新的api [Number.isFinite](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)，与 `isFinite` 功能相同，但比 `isFinite` 更加严谨。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bad3d03fcedd4c2da9ae6d8adb16bf1a~tplv-k3u1fbpfcp-watermark.image?)

### isPromise 判断是否是 promise
promise 会有 `then` 和 `catch` 方法，可以通过这两个方法来判断是否为 promise

```js
function isPromise(val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
}

// 例子：
// 判断是不是Promise对象 
const p1 = new Promise(function (resolve, reject) {
    resolve('成功');
});
isPromise(p1); // true
```
 > 这里可以使用 isObject 代替 isDef ，更严谨一些
### toString 转字符串

转换成字符串。是数组或者对象并且对象的 `toString` 方法是 `Object.prototype.toString`，用 `JSON.stringify`转换。
```js
 function toString(val) {
      return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
          ? JSON.stringify(val, null, 2)
          : String(val)
}
```
这里用到了 `isPlainObject` 函数，下面是 Vue2工具函数中的方法。这里已经够用了，但我觉得 axios 工具函数中对这个函数的实现更为严谨一些。大家也可以自己对比一下
```js
function isPlainObject (obj) { 
    return _toString.call(obj) === '[object Object]' 
}
```
axios 中的 [isPlainObject](https://juejin.cn/post/7145110519362355231#heading-13)
```js
const {getPrototypeOf} = Object;

const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

// 判断目标对象的原型是不是`null` 或 `Object.prototype`
```
### toNumber 转数字
转换成数字。如果转换失败依旧返回原始字符串。 
```js
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

toNumber('a') // 'a'
toNumber('1') // 1
toNumber('1a') // 1
toNumber('a1') // 'a1'
```
### makeMap 生成一个 map （对象）

传入一个以逗号分隔的字符串，生成一个 `map`(键值对)，并且返回一个函数检测 `key` 值在不在这个 `map` 中。第二个参数是小写选项。

```js
function makeMap (str,expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

// Object.create(null) 没有原型链的空对象
```
### isBuiltInTag 是否是内置的 tag
这里主要是用来判断是否为 Vue 中的`slot`和`component`标签
```js
var isBuiltInTag = makeMap('slot,component', true);

// 返回的函数，第二个参数不区分大小写
isBuiltInTag('slot') // true
isBuiltInTag('component') // true
isBuiltInTag('Slot') // true
isBuiltInTag('Component') // true
```
### isReservedAttribute 是否是保留的属性
```js
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

isReservedAttribute('key') // true
isReservedAttribute('ref') // true
isReservedAttribute('slot') // true
isReservedAttribute('slot-scope') // true
isReservedAttribute('is') // true
isReservedAttribute('IS') // undefined
```
### remove 移除数组中的中一项
```js
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```
`splice` 是一个很耗性能的方法。删除数组中的一项，其他元素都要移动位置。这里 `axios` 源码的处理方案更好一些。

[`axios InterceptorManager` 拦截器源码]("https://github.com/axios/axios/blob/master/lib/core/InterceptorManager.js") 中，拦截器用数组存储的。但实际移除拦截器时，只是把拦截器置为 `null`，而不是用`splice`移除，最后执行时为 `null` 的不执行。
```js
// 代码有删减
// 声明
this.handlers = [];

// 移除
if (this.handlers[id]) {
    this.handlers[id] = null;
}

// 执行
if (h !== null) {
    fn(h);
}
```

### hasOwn 检测是否是自己的属性
```js
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

// 例子：

// 特别提醒：__proto__ 是浏览器实现的原型写法，后面还会用到
// 现在已经有提供好几个原型相关的API
// Object.getPrototypeOf
// Object.setPrototypeOf
// Object.isPrototypeOf

// .call 则是函数里 this 显示指定以为第一个参数，并执行函数。

hasOwn({__proto__: { a: 1 }}, 'a') // false
hasOwn({ a: undefined }, 'a') // true
hasOwn({}, 'a') // false
hasOwn({}, 'hasOwnProperty') // false
hasOwn({}, 'toString') // false
// 是自己的本身拥有的属性，不是通过原型链向上查找的。
```

### cached 缓存
 **利用闭包特性，缓存数据**
 ```js
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}
```
### camelize 连字符转小驼峰
例子：on-click => onClick
```js
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});
```
### capitalize 首字母转大写
首字母转大写
```js
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});
```
### hyphenate 小驼峰转连字符

例子：onClick => on-click
```js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});
```
### polyfillBind bind 的垫片
```js
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;
 ```
 这个函数就是使用`call`和`apply`来解决兼容了老版本浏览器不支持原生的 `bind` 函数的问题。

### toArray 把类数组转成真正的数组

把类数组转换成数组，支持从哪个位置开始，默认从 0 开始。
这个函数在`aioxs` 源码工具函数里面也有，实现思路完全相同。
  
 ```js
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

// 例子：
function fn(){
  var arr1 = toArray(arguments);
  console.log(arr1); // [1, 2, 3, 4, 5]
  var arr2 = toArray(arguments, 2);
  console.log(arr2); // [3, 4, 5]
}
fn(1,2,3,4,5);
```
###  extend 合并
把一个对象的属性复制到另一个对象上
```js
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

// 例子：
const data = { name: '溪阳' };
const data2 = extend(data, { mp: '写文章', name: '快点读源码' });
console.log(data); // { name: "快点读源码", mp: "写文章" }
console.log(data2); // { name: "快点读源码", mp: "写文章" }
console.log(data === data2); // true
```
### toObject 数组转为对象
```js
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

// 数组转对象
toObject(['爱读源码', '写文章'])
// {0: '爱', 1: '读', 2: '源', 3: '码', 4: '写', 5: '文', 6: '章'}
```
### noop 空函数
```js
function noop (a, b, c) {}
```
### no 一直返回 false
```js
var no = function (a, b, c) { return false; };
/* eslint-enable no-unused-vars */
```
### identity 返回参数本身
```js
/**
 * Return the same value.
 */
var identity = function (_) { return _; };
```
### genStaticKeys 生成静态属性
```js
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}
```

### looseEqual 宽松相等

引用类型即使是内容完全相同，在严格相等的判断下也是不相等。这个函数就用来判断两个对象的内容是否完全相同。
```js
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
```

### looseIndexOf 宽松的 indexOf

该函数实现的是宽松相等。原生的 `indexOf` 是严格相等。
```js
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}
```
### once 确保函数只执行一次

**利用闭包特性，存储状态**
```js
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}


const fn1 = once(function(){
  console.log('哎嘿，无论你怎么调用，我只执行一次');
});

fn1(); // '哎嘿，无论你怎么调用，我只执行一次'
fn1(); // 不输出
fn1(); // 不输出
fn1(); // 不输出
```
### 生命周期等关键字
```js
var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];
```
## 总结
`Vue2` 工具函数命名很规范，比如：`is` 判断，`to` 转换，`has` 是否有，让开发者一眼就能看出函数语意。

本文主要介绍了`Vue2`源码中非常通用的工具函数，还是比较简单，非常容易看懂，里面也有不少值得学习的小技巧。不论是`变量命名`、`性能优化`，还是`设计思路`，都值得一看。我阅读以后收获很多，大家也可以多多阅读源码，相信对你会有帮助的。

## 扩展知识
[老姚：《JavaScript 正则表达式迷你书》问世了！]("https://juejin.cn/post/6844903501034684430")    
[面试官问：能否模拟实现JS的call和apply方法]("https://juejin.cn/post/6844903728147857415")     
[面试官问：能否模拟实现JS的bind方法]("https://juejin.cn/post/6844903718089916429")
