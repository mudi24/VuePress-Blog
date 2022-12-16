---
title: "为什么 Vue2 this 能够直接获取到 data 和 methods中的变量和方法？"
sidebarDepth: 2
---

**本文参加了由[公众号@若川视野](https://link.juejin.cn/?target=https%3A%2F%2Flxchuan12.gitee.io "https://lxchuan12.gitee.io") 发起的每周源码共读活动，[点击了解详情一起参与。](https://juejin.cn/post/7079706017579139102 "https://juejin.cn/post/7079706017579139102")**   
**这是源码共读的第23期，链接： [为什么 Vue2 this 能够直接获取到 data 和 methods ? 源码揭秘！](https://juejin.cn/post/7010920884789575711)**。

使用过 **Vue2** 开发都知道，可以在组件内部使用 **this.xxx**去读取我们在data中声明的变量和在methods中声明的方法。同时如果data中的变量和methods中的方法重名的话，Vue还会警告我们。那么今天我们来通过阅读源码探究一下其中的原因。   
我们想要探究的问题：     
```js
1. 为什么 Vue2 this能直接获取到 data 和 methods 中的变量
2. Vue 数据响应式是如何实现的
3. 我们能否实现一个类似的功能
```
接下来让我们带着问题来看 Vue2的源码，新建一个项目，使用http-server运行起来。这些步骤若川已经说得非常详细了，我就不多赘述。重点来看一下调试技巧和源码的解读。

## Vue 构造函数
> 点击 `F12` 打开控制台，在`source`面板找到html文件，在 `new Vue` 位置打上断点，刷新页面按下`F11`进入vue.js 

```js
  function Vue (options) {
    if (!(this instanceof Vue)) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);
```
### 一个值得学习的点（`if(!this instanceof Vue))`）
首先第一行代码 `if (!(this instanceof Vue))` 就对使用者很友好，我们平时通常不会这样去写。
但是这样写会有一个很明显的好处：就是**使用者在忘记写 new 的时候会有很明确的提示**，使用者立刻就知道了问题在哪里，这是一个值得学习的地方。   

## Vue 和 jQuery 的区别
这里可以用 `Vue` 和 `jQuery` 进行比较，虽然 Vue 和 jQuery 都是构造函数，但Vue 和jQuery 还是有很多不同之处：
* Vue 是**数据响应式**的，只需要操作数据的修改，视图就会随之修改；而jQuery 是通过**操作DOM**来更新视图（操作逻辑不同）
* Vue 可以快速与第三方库进行整合，同时可以完美的和[现代化的工具链](https://v2.cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用。jQuery 的工具链和插件也非常多，但是相比于Vue，时间成本和代码量都会有所提高（不同环境下的开发成本不同）    
* 虽然Vue 和jQuery都是构造函数，但Vue 只**需要调用一次** `new Vue` 进行初始化；jQuery 则是**链式调用**，并且**不需要使用** `new操作符`，因为jQuery已经把new操作符封装到源码中了；（使用方式不同）
下面是jQuery 的源码

```js
jQuery = function( selector, context ) { 
    // 返回new之后的对象 
    return new jQuery.fn.init( selector, context ); 
};
```

## _init 初始化函数

接下来，我们在 `this._init(options);` 打上断点，点击`F11`进入函数

可以看出这个函数对Vue中的属性进行了初始化，我们来重点看一下`initState`这个函数，这个函数对data和methods进行了初始化操作。  
至于为什么这个函数名叫 `initState`，我想是因为在Vuex中定义的数据命名也叫 State ，所以我推测这里的命名与Vuex 中的命名是有关联的。   
## initState 
在`initState(vm)`这里打断点，按`F8`直接跳转到这个断点，然后按`F11`接着进入`initState`函数。
在initState函数中，我们看到了`initProps`，`initMethods`，`initData`，`initComputed`，`initWatch`，这次只看函数名就可以猜出每个函数是有什么作用，这里我们先来看一下`initMethods`。    

```js

  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
 }
 ```
## initMethods
在初始化`methods`的函数中，主要做了以下几件事：
* 判断 methods 中的每一项是不是函数，如果不是警告。
* 判断 methods 中的每一项是不是和 props 冲突了，如果是，警告。
* 判断 methods 中的每一项是不是已经在 new Vue实例 vm 上存在，而且是方法名是保留的 _ $ （在JS中一般指内部变量标识）开头，如果是警告。

然后就到了最后一行代码，也是我们今天要探究的问题的关键之一   
遍历`methods`对象，将里面的每一个函数绑定的this指向为`vm`，也就是`new Vue`的实例对象。（Vue这里绑定this使用的是`bind`，但不是原生的`bind`方法）   
这样就可以从this上面直接获取methods内的方法了。
 ```js
  function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      {
        if (typeof methods[key] !== 'function') {
          warn(
            "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
            "Did you reference the function correctly?",
            vm
          );
        }
        if (props && hasOwn(props, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a prop."),
            vm
          );
        }
        if ((key in vm) && isReserved(key)) {
          warn(
            "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
            "Avoid defining component methods that start with _ or $."
          );
        }
      }
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
  }
 ```
 ### 自定义的 bind
Vue内部对`bind` 方法进行了兼容处理，作用就是为兼容了老版本。
简单来说就是：有原生的`bind` 方法则使用，没有的话则使用`call`和`apply` 替代，据说还有性能方面的考虑，这个就有待大家深入探索了。
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
## initData
在 initData 函数中，主要做了一下这几件事：
* 先给 _data 赋值，以备后用。
* 最终获取到的 data 不是对象给出警告。
* 遍历 data的每一项，如果和 methods、props中的命名冲突了，报警告。
* 不是内部私有的保留属性，做一层代理，代理到 _data 上。
* 最后监测 data，使之成为响应式的数据。
```js
 function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      {
        if (methods && hasOwn(methods, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a data property."),
            vm
          );
        }
      }
      if (props && hasOwn(props, key)) {
        warn(
          "The data property \"" + key + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */);
  }
  ```
### getData
在`App.vue` 中，data通常是个对象，而在其他地方，data 通常是个函数返回一个对象。getData 就是在data 是函数的情况下调用的，用来获取其中的data对象。
```js
function getData (data, vm) {
    // #7573 disable dep collection when invoking data getters
    pushTarget();
    try {
      return data.call(vm, vm)
    } catch (e) {
      handleError(e, vm, "data()");
      return {}
    } finally {
      popTarget();
    }
}
```
## 数据响应式
我们在上面的源码中看到了为data添加代理，这里就是Vue实现数据响应式的核心原理。通过监听每个属性的变化，更新使用到属性的视图层。
而实现代理的核心api就是`Object.defineProperty`，IE8以下的浏览器不支持这个api，所以也就无法使用Vue。

```js
/**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
function noop (a, b, c) {}
var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};

function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
```
### Object.defineProperty
`Object.defineProperty` 有以下几个属性：
* value：当试图获取属性时所返回的值。
* writable：该属性是否可写。
* enumerable：该属性在for in循环中是否会被枚举。
* configurable：该属性是否可被删除。
* set()：该属性的更新操作所调用的函数。
* get()：获取属性值时所调用的函数。
还有一个可以同时定义多个属性的api，我之前几乎没有见过，`Object.defineProperties(obj, props) (ES5)`

## 在这段源码中看到的其他函数
### hasOwn 
判断属性是否为自己的本身拥有的属性，而不是通过原型链向上查找的属性。
```js
/**
* Check whether an object has the property.
*/
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
hasOwn({ a: undefined }, 'a') // 
true hasOwn({}, 'a') // false
hasOwn({}, 'hasOwnProperty') // false
hasOwn({}, 'toString') // false
```
### isReserved 
判断属性是否是内部私有保留的字符串$ 和 _ 开头
```js
/**
   * Check if a string starts with $ or _
   */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}
isReserved('_data'); // true
isReserved('$options'); // true
isReserved('data'); // false
isReserved('options'); // false
```
## 简化版的代码
```js
function noop (a, b, c) {}
// 定义 Object.defineProperty 的属性
var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};
// 添加代理
function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}
// 初始化 data，并给每个属性添加代理
function initData(vm){
  const data = vm._data = vm.$options.data;
  const keys = Object.keys(data);
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    proxy(vm, '_data', key);
  }
}
// 初始化 methods，并使用原生bind方法为每个函数绑定this，this指向vm实例
function initMethods(vm, methods){
  for (var key in methods) {
    vm[key] = typeof methods[key] !== 'function' ? noop : methods[key].bind(vm);
  } 
}
// 这里则相当于 简化版 initState
function Person(options){
  let vm = this;
  vm.$options = options;
  var opts = vm.$options;
  if(opts.data){
    initData(vm);
  }
  if(opts.methods){
    initMethods(vm, opts.methods)
  }
}

const p = new Person({
    data: {
        name: '溪阳'
    },
    methods: {
        sayName(){
            console.log(this.name);
        }
    }
});
```
## 揭晓答案
#### 为什么可以使用this直接访问到 methods 中的函数？   
因为 Vue 源码中的 `initMethods` 方法中，**把 methods 中的每个方法的 this 都指向了 new Vue 的实例（vm）** 
#### 为什么可以使用 this 直接访问到 data 中的变量？
因为 Vue 源码中的 `initData` 方法中，**data 中的每个属性都会放到 new Vue 的实例（vm）中的_data 对象中，我们在访问 this.xxx 的时候，其实访问的是 this._data.xxx**
#### Vue 数据响应式是如何实现的？
Vue 源码中使用 `Object.defineProperty` 为 data 中的每一个属性添加代理，监听每个属性的变化，并自动更新 UI   

还有一个值得学习的点，在模板语法中，可以省略`this`关键词写法，其实是因为内部模板编译时用了`with`。

## 收获
跟着若川读过 Vue 源码后，感觉阅读源码也没有那么困难，以后有机会尝试一下自己独立阅读源码。
今天我读过源码以后，我的感悟就是以下几点：
* 严谨，每个方法的第一步通常都是验证参数的数据类型是否符合函数需求，然后对不符合需求的参数进行警告（对使用者很友好）
* 设计思想，虽然大家都是使用的相同的原生 api，但有的时候我们想不到可以有这么巧妙的设计（竟然还可以这样写，妙啊）
* 逻辑清晰，简洁易读，大佬用简洁的代码实现复杂的功能，我用复杂的代码实现简单的功能（菜得嘛，就不提了）    

经过这次阅读源码后，我更加认识到了阅读源码的重要性，重点是学习源码作者的思路和设计，框架和 api 会不断的更新，但思路和设计永远都是值得学习和借鉴的。


## 扩展知识

本文中用到的扩展知识：
* [面试官问：能否模拟实现JS的new操作符](https://juejin.cn/post/6844903704663949325 "https://juejin.cn/post/6844903704663949325")
* [面试官问：能否模拟实现JS的call和apply方法](https://juejin.cn/post/6844903728147857415 "https://juejin.cn/post/6844903728147857415")
* [面试官问：能否模拟实现JS的bind方法](https://juejin.cn/post/6844903718089916429 "https://juejin.cn/post/6844903718089916429")  
* [初学者也能看懂的 Vue3 源码中那些实用的基础工具函数](https://juejin.cn/post/6994976281053888519#heading-2)



