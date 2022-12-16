---
title: "阅读axios源码工具函数（上）"
sidebarDepth: 2
---

---
theme: channing-cyan
---
**本文参加了由[公众号@若川视野](https://link.juejin.cn/?target=https%3A%2F%2Flxchuan12.gitee.io "https://lxchuan12.gitee.io") 发起的每周源码共读活动，[点击了解详情一起参与。](https://juejin.cn/post/7079706017579139102 "https://juejin.cn/post/7079706017579139102")**   
**这是源码共读的第19期，链接：[axios 源码中10多个工具函数](https://juejin.cn/post/7083113675879350309 "https://juejin.cn/post/7083113675879350309")**   

>  之前总觉得阅读源码是一件很了不起的事情，是只有大佬才会去做的事。但在工作了一段时间后，使用了很多的优秀的框架和库后，在感叹巧妙的设计之余——有时候也会想作者到底是怎么去实现的。于是就开始尝试阅读一些源码，发现**其实源码也不是想象的那么难，至少有很多看得懂。**     
>  
>  同时，源码有也有很多值得学习和借鉴的东西，不管是应用到日常开发中还是应对面试都是非常有用的，所以还是推荐大家也去尝试阅读的。
 

## 前言

这是我的阅读源码的第二篇文章，逐渐培养每周阅读源码并写文章记录的习惯。      

axios 是我们平时经常用到的网络请求库，可以同时用于 浏览器和node.js 环境中。今天我们来阅读 axios 源码，来了解其中的封装的工具函数。

## 如何阅读 github 上的源码
打开 [axios](https://github1s.com/axios/axios) 即可查看源码

> 在每一个`github`项目中的`url`里直接加上`1s`，就能在网页版`vscode`中查看源码了。（我在上面提供的链接已经添加了 `1s`）

如果这个方法不可行的话，还可以使用下面的方法把源码克隆到本地中进行查看。

### 克隆 axios 项目查看源码
开源项目一般能在根目录下的`README.md`文件或`CONTRIBUTING.md`中找到贡献指南。贡献指南中说明了参与贡献代码的一些注意事项，比如：**代码风格、代码提交注释格式、开发、调试**等。  


## axios 中的工具函数

> axios 的工具函数都在 [utils.js]([url](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Faxios%2Faxios%2Fblob%2Fmaster%2Flib%2Futils.js)) 这个文件中，我们在平时也可以学习开源库的命名习惯，把工具函数放到 `utils.js` 文件中。

axios 源码的`utils.js`文件中有很多的工具函数，为了方便大家阅读，我将文章分为上、下两部分，本文是上半部分，介绍的是 `axios` 实现工具函数依赖的**基本函数**，还有工具函数中**判断数据类型的函数**。[下半部分](https://juejin.cn/post/7147707522076377096/)，介绍的是 `axios` 工具函数中的非常重要且可以**用于日常开发**中的函数。如：`merge`、`extend`、`forEach`等。


## 基础函数
先介绍几个基础函数，这几个函数会在后面的工具函数**频繁**使用。

### `typeOfTest` 使用 `typeOf` 获取当前数据类型
```js
const typeOfTest = type => thing => typeof thing === type;
```

### `kindOf` 获取当前数据类型
这个函数的实现原理是使用`Object.prototype.toString()`可以获取数据类型的特性。

```js
var toString = Object.prototype.toString;

var o = new Object();  o.toString(); // 返回 [object Object]
toString.call(new Date); // [object Date]
toString.call(Math); // [object Math]
```
```js
const {toString} = Object.prototype;

const kindOf = (cache => 
        thing => {
            const str = toString.call(thing);  // [object Object]
            return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
        }
)(Object.create(null));
// 返回值为 object / array ...
```

> 注意：这里使用的是`Object.create(null)`，而不是 `{}`。我开始以为作者是出于性能的考虑，或者只是一个编程的习惯。然后我就试着去搜索了一下，于是发现了这篇文章[详解Object.create(null)](https://juejin.cn/post/6844903589815517192#heading-3)。

我阅读了这篇文章，总结了使用`Object.create(null)`的原因：
* `Object.create(null)`创建的对象是一个**纯净**的对象，不包含`object`原型链上面的属性，可以自定义其中的属性
* 使用`for..in`循环的时候会遍历对象原型链上的属性，使用`Object.create(null)`就不必再对属性进行检查了

### `kindOfTest` 判断当前数据类型是否与期望的类型一致
```js
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
}
```
## 判断数据类型的函数

* 函数命名：返回值是 Boolean 类型的函数，命名都**以 `is` 开头**（我们在平时编码中也可以使用这个命名习惯）
* 主要用到的几个 api：
    * `Object.prototype.toString()` 来获取每个对象的类型
    * `typeof` 运算符用于检测数据类型
    * `Object.getPrototypeOf`返回指定对象的原型
    *  `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上
 
### 判断 **JS基本数据类型** 的函数 
使用 `typeof` 就可以进行判断，但有两个地方需要注意：
1. `typeof` 也可以用来判断 `function` 
2. `typeof null`为`object`
```js
const isString = typeOfTest('string');  // 判断是否为 `string`
const isNumber = typeOfTest('number');  // 判断是否为 `number`
const isUndefined = typeOfTest('undefined');  // 判断是否为 `undefined`
const isBoolean = thing => thing === true || thing === false; // 判断是否为 `boolean`

const isFunction = typeOfTest('function');  // 判断是否为 `function`
```

### 判断**JS引用数据类型**和**其他的数据类型**

```js
// 判断 Date
const isDate = kindOfTest('Date'); 
// 判断正则表达式  
const isRegExp = kindOfTest('RegExp'); 

```
```js
// 判断html表单元素
const isHTMLForm = kindOfTest('HTMLFormElement');
// 判断文件
const isFile = kindOfTest('File');
```


### `isArray` 判断是否为数组
 现在 axios 源码中使用的是 原生的 `Array.isArray` 方法

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6feed36ca02849f9900e5af218b88e64~tplv-k3u1fbpfcp-watermark.image?)
```js
// 当前 axios 源码使用的方法
const {isArray} = Array;


// 以前 axios 源码使用的方法
const {toString} = Object.prototype;
function isArray(val) {
  return toString.call(val) === '[object Array]';
}
```
### `isObject` 判断对象

```js
// 注意 typeof null === 'object' 的情况
const isObject = (thing) => thing !== null && typeof thing === 'object';
```
### `isPlainObject` 判断 纯对象

纯对象： 用`{}`或`new Object()`创建的对象。
```js
const {getPrototypeOf} = Object;

const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}


// 例子1
const o = {name: 'jay'}
isPlainObject(o) // true

// 例子2
const o = new Object()
o.name = 'jay'
isPlainObject(o)   // true

// 例子3
function C() {}
const c = new C()
isPlainObject(c);  // false

// 判断目标对象的原型是不是`null` 或 `Object.prototype`
```
> 注意：`getPrototypeOf` 在 ES5 中如果参数不是对象会报错，而在 ES6 中，参数会被转换为一个 对象类型。请看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getprototypeof)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65d06bd47abd41c5bfc7b4fd976c8c37~tplv-k3u1fbpfcp-watermark.image?)

### `isURLSearchParams` 判断url携带的参数
```js
const isURLSearchParams = kindOfTest('URLSearchParams');
```
### URLSearchParams

`URLSearchParams` 接口定义了一些实用的方法来处理 URL 的查询字符串，详情可看 [MDN](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FURLSearchParams "https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams")：
```js
var paramsString = "q=URLUtils.searchParams&topic=api"
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}

// 输出 
[ 'q', 'URLUtils.searchParams' ]
[ 'topic', 'api' ]

searchParams.has("topic") === true; // true
searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
searchParams.append("topic", "webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"
searchParams.set("topic", "More webdev");
searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"
searchParams.delete("topic");
searchParams.toString(); // "q=URLUtils.searchParams"
```
###  `isFileList`判断 FileList
```js
const isFileList = kindOfTest('FileList');
```
这个函数的实现原理还是调用之前定义的工具函数，就不过多赘述了，主要来了解一下`FileList`。

### `FileList`
`FileList`对象是一个类似数组的对象，代表一组选中的文件，每个成员都是一个 File 实例。它主要出现在两个场合。

-   文件控件节点（`<input type="file">`）的`files`属性，返回一个 FileList 实例。
-   拖拉一组文件时，目标区的`DataTransfer.files`属性，返回一个 FileList 实例。
```html
// HTML 代码如下
 <input id="input" type="file">
```
```js
var files = document.getElementById('input').files;
files instanceof FileList // true
```
FileList 的实例属性主要是`length`，表示包含多少个文件。通常可以使用`FileList[0]`的方式来操作第一个文件，`FileList[1]`的方式来操作第二个文件，以此类推。

FileList 的实例方法主要是`item()`，用来返回指定位置的实例。它接受一个整数作为参数，表示位置的序号（从零开始）。

###  `isBlob` 判断 Blob
```js
const isBlob = kindOfTest('Blob');
```
`Blob` 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取。
### `isStream` 判断是否是流
```js
// 这里`isObject`、`isFunction`为上文提到的方法
const isStream = (val) => isObject(val) && isFunction(val.pipe);
```
判断是否是对象，并且对象是否拥有`pipe`方法
> `stream`是Node.js提供的又一个仅在服务区端可用的模块，目的是支持“流”这种数据结构。

### `isBuffer` 判断 `buffer`
什么是Buffer?

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。


> 在 Node.js 中，**Buffer** 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js **处理二进制数据**，每当需要在 Node.js 中处理 I/O 操作中移动的数据时，就有可能使用 Buffer 库。我们这里需要判断的 `buffer` 指的是 `Buffer` 类生成的实例。




```js
//  以前 axios 源码使用的方法
function isBuffer(val) {
  return val !== null 
          && !isUndefined(val) 
          && val.constructor !== null 
          && !isUndefined(val.constructor)
          && typeof val.constructor.isBuffer === 'function' // 只有这里与下面不同
          && val.constructor.isBuffer(val);
}

// 当前 axios 源码使用的方法
function isBuffer(val) {
  return val !== null 
          && !isUndefined(val)、
          && val.constructor !== null
          && !isUndefined(val.constructor)
          && isFunction(val.constructor.isBuffer)  // 只有这里与上面不同
          && val.constructor.isBuffer(val);
}
```
判断 `buffer` 的思路：
 1. 判断不是 `undefined`和`null`
 2. 判断是否为构造函数生成的实例
 3. 判断构造函数是否为 `Buffer` 类

### `isArrayBuffer` 判断 `ArrayBuffer`
`ArrayBuffer` 对象表示一段**二进制数据**，用来模拟内存里面的数据。通过这个对象，JavaScript 可以**读写二进制数据**。这个对象可以看作内存数据的表达。     
浏览器原生提供`ArrayBuffer()`构造函数，用来生成实例。它接受一个整数作为参数，表示**这段二进制数据占用多少个字节**。
```js
const isArrayBuffer = kindOfTest('ArrayBuffer');
```
> 判断 `ArrayBuffer` 的办法要比判断 `buffer` 简单一些，因为 `ArrayBuffer` 是浏览器中提供的 api，而 `buffer` 则是 node.js 中特有的。
### `isArrayBufferView` 判断`ArrayBufferView`
判断是否是ArrayBuffer上的视图实例
```js
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}
```
> -   [`ArrayBuffer.isView(arg)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView)
 如果参数是 ArrayBuffer 的视图实例则返回 `true`，例如 [类型数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 或 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)对象；否则返回 `false`。
 ```js
 // create an ArrayBuffer with a size in bytes
const buffer = new ArrayBuffer(16);

console.log(ArrayBuffer.isView(new Int32Array()));
// expected output: true
```
### `isFormData` 判断`FormData`

```js
// 以前 axios 源码使用的方法
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

// 当前 axios 源码使用的方法
const isFormData = (thing) => {
  const pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}
```
新的`isFormData`方法比之前的方法代码多了一些，但仔细查看后就会发现，原理相同，依然是：判断**构造函数是否为`FormData`**或者**在原型链上是否有`FormData`**

### `isTypedArray` 判断`TypedArray`
这个函数检查`Uint8Array`是否存在，如果存在，则返回一个函数。

> `TypedArray` 和 `Uint8Array` 的介绍在下面，如果你想有更深入的了解请看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
```js
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));
```
### `TypedArray`
`TypedArray`是一组构造函数，一共包含九种类型，每一种都是一个构造函数。

`TypedArray`的构造函数接受三个参数，第一个ArrayBuffer（也可以是数组、视图）对象，第二个视图开始的字节号（默认0），第三个视图结束的字节号（默认直到本段内存区域结束）。   

> `Uint8Array` 就是`TypedArray`九种类型中的一种，`Uint8Array`就是将 `ArrayBuffer` 中的每个字节视为 0 到 255 之间的单个数字（每个字节是 8 位）。这称为 “8 位无符号整数”。


## 总结
本文主要介绍了`axios`源码`utils.js`中的用于判断数据类型的工具函数，实现原理比较简单，在日常开发中也会经常用到，还是非常实用的，十分适合刚读源码的朋友。
而[下半部分](https://juejin.cn/post/7147707522076377096/)就开始有了一些难度，尤其是进阶函数的部分，我学习起来有些吃力，有兴趣的朋友可以去看看。


## 参考文章
[# File 对象，FileList 对象，FileReader 对象](https://juejin.cn/post/7028102467141402638)







