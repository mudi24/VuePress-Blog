---
title: "阅读axios源码工具函数（下）"
sidebarDepth: 2
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

axios 源码的`utils.js`文件中有很多的工具函数，为了方便大家阅读，我将文章分为上、下两部分，本文是下半部分，介绍的是 `axios` 工具函数中的非常重要且可以**用于日常开发**中的函数。如：`merge`、`extend`、`forEach`等。[上半部分](https://juejin.cn/post/7145110519362355231)，介绍的是 `axios` 实现工具函数依赖的**基本函数**，还有工具函数中**判断数据类型的函数**。

## 需要掌握的工具函数
### `trim` 去除首尾空格
优先使用 `string` 的原型链上的  `trim` 方法，如果没有则使用自定义的方法
```js
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
```
>  `\s`：空格   
>  `\uFEFF`：字节次序标记字符（Byte Order Mark），也就是BOM,它是es5新增的空白符  
>  `\xA0`：禁止自动换行空白符，相当于html中的&nbsp;

### `forEach` 遍历对象或数组
这里的 `forEach` 不同于原生提供的 `forEach` 方法，原生的 `forEach` 只能迭代`数组`和`类数组对象`；而自定义 `forEach` 可以迭代`数组`和`对象`。
> `类数组对象`:格式与数组结构类似，拥有length属性，可以通过索引来访问或设置里面的元素，但是不能使用数组的方法，就叫类数组对象。 如：函数体内的`arguments`对象。  
```js
// obj 要操作的对象 / 数组
// fn 要执行的回调函数
// allOwnKeys 为 true 的时候会对对象内部不可枚举的属性也提取出来，而为 false 的时候只会提取出对象内部可枚举的属性

function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  // 如果值不存在，无需处理
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  // 如果不是对象类型，强制转成数组类型
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    // 是数组，for循环执行回调fn
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    // 是对象，for循环执行回调fn
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    // Object.getOwnPropertyNames 可以获取对象中可枚举的属性和不可枚举的属性
    // Object.keys 只可以获取对象中可枚举的属性
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
```
这个函数中遍历数组时使用的是`for`循环，而遍历对象时使用的是`for...in`，
* **`for`** 循环无法用于遍历对象，性能也比直接使用原生的 **`forEach`** 要好
*  **`for...in`** **语句**以任意顺序迭代一个对象的除[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)以外的[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)属性，包括继承的可枚举属性。
> 推荐大家去看一下这篇文章[有了for循环 为什么还要forEach？](https://juejin.cn/post/7018097650687803422)
   
那么，为什么不统一使用`for...in`来处理呢？   

我搜索了得出以下结果，**`for...in`** 就是为遍历对象属性而构建的，而 **`for` 循环**则是为遍历数组而构建的。请看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)  
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/257aeb8f7cc9430f928bf388683850df~tplv-k3u1fbpfcp-watermark.image?)

### `merge` 合并
`merege` 函数是用于合并对象的场景中，如果对象中有相同的 key ，则优先使用参数列表中位置靠后的对象的值。
```js
// 这里的 isPlainObject 是上一篇文章的函数，isArray 是原生的 Array.isArray 函数
function merge(/* obj1, obj2, obj3, ... */) {
  const result = {};
  const assignValue = (val, key) => {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      // 如果result中的 key和当前的 key是相同的，则当前的val会覆盖掉result的 val 
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      // 如果值是纯对象，则进行合并
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      // 如果值是数组，则对数组进行浅拷贝操作
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    // 这里使用的 forEach 是上面自定义的 forEach 方法  
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

```
下面我们来运行一下
```js
// 例子 1
var result = merge({foo: 123}, {foo: 456});
console.log(result.foo); // outputs 456

// 例子2
var a = { foo: 123, bar: { abc: { def: 890 }, jkl: 678 } };
var b = { foo: 456 };
var result = merge(a, b);

console.log(result); // { foo: 456, bar: { abc: {def:890 }, jkl:678}}
result.bar.abc.def = 567;
console.error(result); // { foo: 456, bar: { abc: {def:567 }, jkl:678}}
```

### `extend`用于扩展当前对象的属性
```js
 // a 要扩展属性的对象
 // b 要被复制属性的对象
 // thisArg 绑定函数中的 this 指向
 // {allOwnKeys} 是 forEach 中的参数，请到 forEach 函数部分去查看
 
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      // isFunction 是上一篇文章中的方法
      // 如果是函数，则复制函数内容并绑定this
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}
```
这里使用的 `bind` 方法是内部自定义的 `bind.js` 文件，内容如下：
```js
'use strict';

export default function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
```

### `inherits`是将原型方法从一个构造函数继承到另一个构造函数
 

```js
 // constructor 子级构造函数
 // superConstructor 父级构造函数
 // props  需要添加到构造函数中的属性
 // descriptors 如果不为 undefined`，则传入对象自身定义的可枚举属性（不包括原型链上的枚举属性），可以不传这个参数。

const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
}
```
> 这个函数的 descriptors 参数并没有在axios源码中用到，我全局搜索后没有找到例子。这个参数其实就是 [Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 的第二个参数。
### `hasOwnProperty`用于检查对象自身属性中是否具有指定的属性。
```js
const hasOwnProperty = (
    ({hasOwnProperty}) => 
        (obj, prop) => hasOwnProperty.call(obj, prop)
    )(Object.prototype);
```
这个函数我刚开始没有看懂，但我们拆分来看就很简单了，可以写成下面的形式：
```js
// 下面一行代码是 axios 中新定义的 hasOwnProperty 方法
const newHasOwnProperty = () => {
    // 下面一行代码是原生的  hasOwnProperty 方法
    const { hasOwnProperty } = Object.prototype;
    return (obj, prop) => hasOwnProperty.call(obj, prop)
}
```


### `endsWith` 是用来确定字符串是否以指定字符串的字符结尾。
```js
// str 目标字符串
// searchString 要查找的字符串
// position 开始查找的位置 

const endsWith = (str, searchString, position) => {
  // 把参数转换为字符串类型
  str = String(str);  // 这里的 String 等同于 new String
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}

```
### `toArray` 用来将类数组对象转换为数组，如果失败则返回 `null`
```js
// thing 类数组对象

const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}
```
### `stripBOM` 删除`UTF-8`编码中`BOM`
```js
// content BOM字符串
 
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}
```
所谓 `BOM`，全称是`Byte Order Mark`，它是一个`Unicode`字符，通常出现在文本的开头，用来标识字节序。`UTF-8`主要的优点是可以兼容`ASCII`，但如果使用`BOM`的话，这个好处就荡然无存了。

### `matchAll` 接受正则表达式和字符串，并返回所有匹配项的数组
```js
 // regExp 要匹配的正则表达式
 // str 要查找的字符串
 
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
}
```
### `toCamelCase` 转换为驼峰命名
```js
const toCamelCase = str => {
  return str.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
```
### `noop` 函数体为空的函数
```js
const noop = () => {}
```
### `toFiniteNumber`
`toFiniteNumber` 用于把无穷数转换成有穷数，如果是无穷数则设定为默认数，如果是有穷数则直接返回  
```js
const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
}
```
## 进阶函数
这部分的函数有一定的难度，可以根据自己的情况酌情学习。

### `forEachEntry` 迭代对象中的每一项，并调用函数（只适用于可迭代对象）
> 要搞清楚这个函数，需要先了解一下[迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)和[迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)。
> 
```js
 // obj 要迭代的对象
 // fn 要执行的回调函数
 
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
}
```
可以看出这个函数和`forEach`的功能有点相似，那么，`forEachEntry` 和 `forEach` 有什么区别呢？
* `forEachEntry` 是对可迭代对象的每一项执行fn，只能作用于可迭代对象
，`forEach` 可以处理任何数据类型 
* `forEachEntry` 可以通过定义迭代器的方式来控制循环的终止，`forEach` 对每一项都执行了回调

### `reduceDescriptors` 确定值是否为正则对象
我特地去axios源码全局搜索了这个函数，没有发现在其他地方有使用到，只是用来实现下面的`freezeMethods`方法的辅助函数。
```js
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
}
```

### `freezeMethods` 将函数设为不可修改（冻结函数）
```js
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not read-only method \'' + name + '\'');
      };
    }
  });
}
```

### `toObjectSet` 将数组或字符串转换为对象
```js
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}
```

### `toFlatObject`将具有原型链的对象解析为平面对象（拍平对象）
```js
 // sourceObj 源对象
 // destObj 目标对象
 // filter 过滤器
 // propFilter 传入参数的过滤器
 
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}
```

### 遍历、迭代、可迭代对象

**遍历**：指的对数据结构的每一个成员进行有规律的且为一次访问的行为。   
**迭代**：迭代是递归的一种特殊形式，是迭代器提供的一种方法，默认情况下是按照一定顺序**逐个**访问数据结构成员。迭代也是一种遍历行为。   
**可迭代对象**：ES6中引入了 `iterable` 类型，`Array` `Set` `Map` `String` `arguments` `NodeList` 都属于 `iterable`，他们特点就是都拥有 `[Symbol.iterator]` 方法，包含他的对象被认为是可迭代的 `iterable`。


## 总结
本文主要介绍了`axios`源码`utils.js`中的非常重要且可以**用于日常开发**中的函数，如：`merge`、`extend`、`forEach`等。本文后半部分的进阶函数的难度就提升了不少，我也是花费了一些时间查阅了很多资料才理解了函数的含义。终于把这个坑填上了，学到了不少东西，也耗费了很多时间和精力，加油！！！

