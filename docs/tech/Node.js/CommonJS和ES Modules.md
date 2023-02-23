---
title: "CommonJS和ES Modules"
sidebarDepth: 2
---

## CommonJS 规范和ESM

Node.js 诞生之初，JavaScript 还没有标准的模块机制，因此 Node.js 一开始采用了CommonJS 规范。随后，JavaScript 标准的模块机制ES Modules诞生，浏览器开始逐步支持ES Modules。Node.js 从v13.2.0之后也引入了规范的ES Modules机制，同时兼容早期的CommonJS。

## ES Modules

ES Modules 的基本用法

导出对象：
```js
export { 模块的公共API }
```
或者
```js
export const foo = 'bar'
```

从模块中引入导出的API：
```js
import { API名字 } from 模块名
```

如果需要在export 的时候重命名可以这样写：
```js
const foo = 'bar'
export { foo as xxx } // 把 foo 重命名为 xxx
```
还可以使用 export default 导出一个默认模块，默认模块可以在import时用任意名字引入。
```js
// index.js
const foo = 'bar'
export default foo
```
```js
import abc from './index.js' // 可以叫abc或其他名字
```

> 注意：一个模块的 export default 只能导出一个默认 API。如果这个模块还有其他的 API 需要导出，那么只能使用 export了。

```js
// index.js
const foo = 'bar';
const f = '23';
const d = '学习node';

export default foo;
export { f, d}
```
```js
import foo from './index.js';
import { f, d } from './index.js';
```

也可以在引入的时候重命名 API
```js
import { f as c, d as b} from './index.js';
```

如果使用 export default 导出的 foo API，可以这样重命名：
```js
import xxx from './index.js';
```
也可以在导入的时候，把这些导出的 API 声明成一个任意名字的对象的属性：
```js
import * as all from './index.js';

console.log(all.default); // 默认导出的 foo
console.log(all.f);
console.log(all.d);
```

> 注意：我们命名 js 模块文件不是用 .js 扩展名，而是用 .mjs 扩展名。这是因为 Node.js 目前默认用CommonJS规范定义 .js 文件的模块，用ES Modules定义 .mjs 文件的模块。


如果要用ES Modules定义 .js 文件的模块，可以在 Node.js 的配置文件package.json中设置参数type: module。

```js
{
  "type": "module"
}
```

## CommonJS 规范

CommonJS 规范下的基本用法

导出对象：
```js
module.exports = 模块的公共API 
```
或者
```js
const 任意名字 = require(模块的路径)
```


从模块中引入导出的API：
```js
import { API名字 } from 模块名
```

与 ES Modules 不同的是，module.exports导出的是真正的对象，所以我们可以这样给 API 别名：

```js
const foo = 'bar';
const f = '23';
const d = '学习node';

module.exports = {
  xxx: foo,
  a: f,
  b: d
}
```
```js
const {xxx, a, b} = require('./index.js')
```
在 CommonJS 规范中，还可以使用exports变量导出模块的 API：
```js
export.f = '23';
export.d = '学习node';
```
但是，exportx 和 module.exports 不能一起用。

exports.属性名 = ...的用法属于 CommonJS规范早期的用法，module.exports用法属于CommonJS规范晚期用法，我们应该尽量用module.exports，避免用exports.属性名 = 的写法。

### ES Modules 的向下兼容 

Common.js 规范引入
```js
// abc.js 这是一个 CommonJS 规范的模块
const foo = 'bar';
const f = '23';
const d = '学习node';

module.exports = {foo, f, d}; 
// 上面这行代码等同于
//  const abc = {foo, f, d}; export default abc;
```

ES Modules 引入
```js
import abc from './index.js';
// 注意：不能用 import {foo, f, d} from './index.js'
```

## ES Modules与CommonJS的主要区别

### 1.导出时使用别名的语法不同
ES Modules
```js
export {
  a as d,
  b as e,
  c as f,
}
```
CommonJS
```js
module.exports = {
  d: a,
  e: b,
  f: c,
}
```
### 2.引入时是否需要加扩展名
* CommonJS 在 require 文件时采用文件路径，不需要加文件扩展名
* ES Modules 在 import 文件时，必须是完整的文件名，需要加文件扩展名
  
### 3.ES Modules的import和export都只能写在最外层，不能放在块级作用域或函数作用域中。
ES Modules 中不能这样使用：
```js
if(condition) {
  import {a} from './foo';
} else {
  import {a} from './bar';
}
```
但CommonJS 中可以这样写：
```js
let api;
if(condition) {
  api = require('./foo');
} else {
  api = require('./bar');
}
```
> CommonJS 的 require 可以写在任何语句块中
### 4.require 是一个函数调用，路径是参数字符串，它可以动态拼接
```js
const libPath = ENV.supportES6 ? './es6/' : './';
const myLib = require(`${libPath}mylib.js`);
```
但 ES Modules 的 import 语句不能使用动态路径

### import() 动态加载

使用 import 来实现动态加载：
```js
(async function() {
  const {ziyue} = await import('./ziyue.mjs');
  
  const argv = process.argv;
  console.log(ziyue(argv[2] || '巧言令色，鮮矣仁！'));
}());
```

在写 Node.js 模块的时候，我们更多采用静态的方式引入模块。但是动态加载模块在跨平台开发中非常有用，我们可能需要针对不同平台的环境加载不同的模块，这个时候就要用到动态加载了。


参考文章：[从前端到全栈
](https://juejin.cn/book/7133100888566005763/section/7133184480528826371)