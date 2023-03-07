---
title: "面试题（JS）"
sidebarDepth: 2
---

# 面试题（JS）

## 防抖和节流

防抖（回城被打断），防止用户频繁拖动页面后的重复操作

```js
function fd(fn, time) {
  let timerId = null;
  return (...args) => {
    if (timerId !== null) {
      window.clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.call(undefined, ...args);
      timerId = null;
    }, time);
  };
}
```

节流（技能冷却中），防止用户频繁点击按钮

```js
function jl(fn, time) {
  let timerId = null;
  return (..args) => {
    if (timerId) {
      return;
    }
    fn.call(undefined, ...args);
    timerId = setTimeout(() => {
      timerId = null;
    }, time);
  };
}
```

## 手写发布订阅

```js
const eventHub = {
  map: {}, // { click: [f1, f2]}
  on: (name, fn) => {
    eventHub.map[name] = eventHub.map[name] || [];
    eventHub.map[name].push(fn);
  },
  emit: (name, data) => {
    const q = eventHub.map[name];
    q.map((t) => {
      t(data);
    });
  },
  off: (name, fn) => {
    const q = eventHub.map[name];
    if (!q) {
      return;
    }
    const index = q.indexOf(fn);
    if (index < 0) {
      return;
    }
    q.splice(index, 1);
  },
};

eventHub.on("click", f1);
eventHub.off("click", f2);
setTimeout(() => {
  eventHub.emit("click", "123");
});
```

## 手写 AJAX

```js
const ajax = (method, url, data, success, fail) => {
  let request = new XMLHttpRequest();
  request.open(method, url);
  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (
        (request.status >= 200 && request.status < 300) ||
        request.status === 304
      ) {
        success(request);
      } else {
        fail(request);
      }
    }
  };
  request.send('{"name":"123"}');
};
```

## 宏任务和微任务

- 常见的宏任务有：setTimeout、setInterval、setImmediate（node 独有）、requestAnimationFrame（浏览器独有）、script、IO、UI render（浏览器独有） 等。
- 常见的微任务有：process.nextTick(node 独有)、Object.observe、new Promise( ).then(回调)、MutationObserver  等。

宏任务和微任务的执行流程，总结起来就是：  
js 在调用时，优先取出微任务，并且在执行过程中如果创建了新的作业，则放在本次执行完后紧接着调用，微任务执行完成后，再取出宏任务执行

## 数组去重

### 使用 Set

```js
const unqi = function (arr) {
  return Array.from(new Set(arr));
};
```

### 使用计数排序

```js
// 1. 只支持字符串
// 2.如果数组内同时有 1 和 '1'，会被合并为 1
const unique = (array) => {
  const hash = [];
  for (let i = 0; i < array.length; i++) {
    hash[array[i]] = true;
  }
  const result = [];
  for (let k in hash) {
    result.push(k);
  }
  return result;
};
```

### 使用 Map

```js
var uniq = function (a) {
  var map = new Map();
  for (let i = 0; i < a.length; i++) {
    let number = a[i]; // 1 ~ 3
    if (number === undefined) {
      continue;
    }
    if (map.has(number)) {
      continue;
    }
    map.set(number, true);
  }
  return [...map.keys()];
};
```

### 双层循环

```js
function unique(arr) {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
        len--;
      }
    }
  }
  return arr;
}
```

### indexOf 或者 includes 去重（原理相同）

```js
function unique(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const index = result.indexOf(arr[i]);
    if (index >= 0) {
      continue;
    }
    result.push(arr[i]);
  }
  return result;
}
```

```js
function unique(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (result.includes(item)) {
      continue;
    }
    result.push(item);
  }
  return result;
}
```

```js
function unique2(arr) {
  return arr.filter((item, index) => arr.indexOf(item, 0) === index);
}
```

## 继承

### 不用 class 继承

```js
function Animal(color) {
  this.color = color;
}
Animal.prototype.move = function () {};
function Dog(color, name) {
  Animal.call(this, color);
  this.name = name;
}
function temp() {}
temp.prototype = Animal.prototype;
Dog.prototype = new temp();

Dog.prototype.constructor = Dog;
Dog.prototype.say = function say() {};
var dog = new Dog();
```

### class 继承

```js
class Animal(){
  constructor(color){
    this.color = color
  }
  move(){}
}
class Dog extends Animal {
  constructor(color, name){
    super(color)
    this.name = name
  }
  say(){}
}
```

## 深拷贝和浅拷贝

- 浅拷贝：只是拷贝了基本类型的数据，而引用类型数据，复制后也是会发生引用，我们把这种拷贝叫做浅拷贝（浅复制）
  浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。

- 深拷贝：在堆中重新分配内存，并且把源对象所有属性都进行新建拷贝，以保证深拷贝的对象的引用图不包含任何原有对象或对象图上的任何对象，拷贝后的对象与原来的对象是完全隔离，互不影响。

### Object.assign

Object.assign 可以进行浅拷贝，该方法的第一个参数是拷贝的目标对象，后面的参数是拷贝的来源对象（也可以是多个来源）。但需要注意一下三点：

- 它不会拷贝对象的继承属性；
- 它不会拷贝对象的不可枚举的属性；
- 可以拷贝 Symbol 类型的属性。

### 深拷贝

#### 方法一，用 JSON：

```js
const b = JSON.parse(JSON.stringify(a));
```

答题要点是指出这个方法有如下缺点：

1. 不支持 Date、正则、undefined、函数等数据
2. 不支持引用（即环状结构）
3. 必须说自己还会方法二

#### 方法二，用递归：

要点：

1. 递归
2. 判断类型
3. 检查环
4. 不拷贝原型上的属性

```js
const deepClone = (a, cache) => {
  if (!cache) {
    cache = new Map(); // 缓存不能全局，最好临时创建并递归传递
  }
  if (a instanceof Object) {
    // 不考虑跨 iframe
    if (cache.get(a)) {
      return cache.get(a);
    }
    let result;
    if (a instanceof Function) {
      if (a.prototype) {
        // 有 prototype 就是普通函数
        result = function () {
          return a.apply(this, arguments);
        };
      } else {
        result = (...args) => {
          return a.call(undefined, ...args);
        };
      }
    } else if (a instanceof Array) {
      result = [];
    } else if (a instanceof Date) {
      result = new Date(a - 0);
      // new Date() - 0 会得到一个时间戳 1677758273395
    } else if (a instanceof RegExp) {
      result = new RegExp(a.source, a.flags);
    } else {
      result = {};
    }
    cache.set(a, result);
    for (let key in a) {
      if (a.hasOwnProperty(key)) {
        result[key] = deepClone(a[key], cache);
      }
    }
    return result;
  } else {
    return a;
  }
};
const a = {
  number: 1,
  bool: false,
  str: "hi",
  empty1: undefined,
  empty2: null,
  array: [
    {
      name: "frank",
      age: 18,
    },
    {
      name: "jacky",
      age: 19,
    },
  ],
  date: new Date(2000, 0, 1, 20, 30, 0),
  regex: /\.(j|t)sx/i,
  obj: {
    name: "frank",
    age: 18,
  },
  f1: (a, b) => a + b,
  f2: function (a, b) {
    return a + b;
  },
};
a.self = a;
const b = deepClone(a);
b.self === b; // true
b.self = "hi";
a.self !== "hi"; //true
```

```js
const deepClone = (a, cache) => {
  if (!cache) {
    cache = new Map();
  }
  // 这里不考虑 iframe 或者传入的是DOM对象的情况
  // object
  if (a instanceof Object) {
    if (cache.get(a)) {
      return cache.get(a);
    }
    let result = undefined;
    if (a instanceof Function) {
      if (a.prototype) {
        // 普通函数
        result = function () {
          return a.apply(this, arguments);
        };
      } else {
        // 箭头函数
        result = (...args) => a.call(undefined, ...args);
      }
    } else if (a instanceof Array) {
      result = [];
    } else if (a instanceof Date) {
      result = new Date(a - 0);
    } else if (a instanceof RegExp) {
      result = new RegExp(a.source, a.flags);
    } else {
      result = {};
    }
    cache.set(a, result);
    for (let k in a) {
      if (a.hasOwnProperty(k)) {
        result[k] = deepClone(a[k], cachex);
      }
    }
  } else {
    result = a;
  }
  return result;
};
```

## 手写 promise

```js
new Promise((resolve, reject) => {});
```

```js
class Promise2 {
  queue1 = [];
  queue2 = [];
  constructor(fn) {
    const resolve = (data) => {
      setTimeout(() => {
        for (let i = 0; i < this.queue1.length; i++) {
          this.queue1[i](data);
        }
      });
    };
    const reject = (reason) => {
      setTimeout(() => {
        for (let i = 0; i < this.queue2.length; i++) {
          this.queue2[i](reason);
        }
      });
    };
    fn(resolve, reject);
  }
  then(success, fail) {
    this.queue1.push(success);
    this.queue2.push(fail);
    return this;
  }
}
```

## 轮播图的实现原理

纯 CSS 实现轮播图：[](https://juejin.cn/post/6937893309234823175)

## 判断数组嵌套了几层

> 有一种情况是同一层有两个或多个数组的情况，如`[1,[2,3],[4,5,[6]]]`，这种情况还需要加更复杂的逻辑判断

```js
function getArrDepth(arr) {
  let count = 0;
  let res = [];

  const help = function (arr, dep) {
    for (let val of arr) {
      if (val instanceof Array) {
        help(val, dep + 1);
      } else {
        res.push(val);
        count = Math.max(count, dep);
      }
    }
  };

  help(arr, 1);
  return count;
}

var abc = [1, 3, 3, [4, 6, 7, [5, 6, 7, 43, [23, 4]]]];
console.log(getArrDepth(abc));
```

下面这种方法也可以

```js
function recursiveMax(input) {
  var flag = false;
  var num = [];
  for (var i = 0; i < input.length; i++) {
    if (input[i] instanceof Array) {
      flag = true;
      num.push(recursiveMax(input[i]));
    }
  }
  if (flag) {
    return Math.max.apply(null, num) + 1;
  } else {
    return 1;
  }
}
```
