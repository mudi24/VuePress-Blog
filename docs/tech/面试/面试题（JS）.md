---
title: "面试题（JS）"
sidebarDepth: 2
---

### JS

#### 防抖和节流

- 函数防抖(debounce)，指的是短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行

```js
function debounce() {
  let timerId = null;
  return function () {
    const context = this;
    if (timerId) {
      window.clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(context, arguments);
      timerId = null;
    }, delay);
  };
}
```

- 函数节流(throttle)，指连续触发事件但是在 n 秒中只执行一次函数

```js
function throttle(fn, delay) {
  let canUse = true;
  return function () {
    if (canUse) {
      fn.apply(this, arguments);
      canUse = false;
      setTimeout(() => (canUse = true), delay);
    }
  };
}
```

#### 深拷贝和浅拷贝

- 浅拷贝：只是拷贝了基本类型的数据，而引用类型数据，复制后也是会发生引用，我们把这种拷贝叫做浅拷贝（浅复制）
  浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。

- 深拷贝：在堆中重新分配内存，并且把源对象所有属性都进行新建拷贝，以保证深拷贝的对象的引用图不包含任何原有对象或对象图上的任何对象，拷贝后的对象与原来的对象是完全隔离，互不影响。

#### 宏任务和微任务

- 常见的宏任务有：setTimeout、setInterval、requestAnimationFrame、script 等。
- 常见的微任务有：new Promise( ).then(回调)、MutationObserver  等。

宏任务和微任务的执行流程，总结起来就是：  
js 在调用时，优先取出微任务，并且在执行过程中如果创建了新的作业，则放在本次执行完后紧接着调用，微任务执行完成后，再取出宏任务执行

### 数组去重

#### 使用 Set

```js
const unqi = function (arr) {
  return Array.from(new Set(arr));
};
```

#### 使用计数排序

```js
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

#### 使用 Map

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

1. 使用计数排序的思路，缺点是只支持字符串
2. 使用 Set（面试已经禁止这种了，因为太简单）
3. 使用 Map，缺点是兼容性差了一点

### 继承

#### 不用 class 继承

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

#### class 继承

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
