---
title: "Mobx"
sidebarDepth: 2
---

# Mobx

> 注意：今天讲的 Mobx 为 v6 版本，Mobx-React 为 v7 版本。

Mobx 和 Redux 都是独立的，不依赖于 React 本身；为了把 React 和 Mobx 关联起来，在 React 应用中更好的使用 Mobx ，出现了 mobx-react ， mobx-react 提供了 HOC ，可以获取状态管理 Mobx 的数据层，也能接受 mobx 数据改变带来的更新。

### 观察者模式

Mobx 采用了一种'观察者模式'——Observer，整个设计架构都是围绕 Observer 展开：

- 在 mobx 的状态层，每一个需要观察的属性都会添加一个观察者，可以称之为 ObserverValue 。
- 有了观察者，那么就需要向观察者中收集 listener ，mobx 中有一个 Reaction 模块，可以对一些行为做依赖收集，在 React 中，是通过劫持 render 函数执行行为，进行的依赖收集。
- 如何监听改变，用自定义存取器属性中的 get 和 set ，来进行的依赖收集和更新派发，当状态改变，观察者会直接精确通知每个 listener 。

### 状态提升

状态提升

在正常情况下，在 React 应用中使用 Mobx ，本质上 mobx 里面的状态，并不是存在 React 组件里面的，是在外部由一个个 mobx 的模块 model 构成，每一个 model 可以理解成一个对象，状态实质存在 model 中，model 状态通过 props 添加到组件中，可以用 mobx-react 中的 Provder 和 inject 便捷获取它们，虽然 mobx 中响应式处理这些状态，但是不要试图直接修改 props 来促使更新，这样违背了 React Prop 单向数据流的原则。正确的处理方法，还是通过 model 下面的 action 方法，来改变状态，React 实质上调用的是 action 方法。

### 装饰器模式

为了建立观察者模式，便捷地获取状态/监听状态，mobx 很多接口都支持装饰器模式的写法，所以在 mobx 中，装饰器模式是最常用的写法，如果不知道装饰器的同学，建议先了解一下下 ts 中 decorator，由于不是本章节的内容，我这里就不介绍了。比如如下就是 mobx 中装饰器的体现：

```js
class Root {
  @observable name = "alien"; /* 建立观察者name属性 */
  @action setName(name) {
    this.name = name;
  } /* 改变 name 属性 */
}
```

目前 typescript 已经全面支持如上写法，如果在 javascript 中直接使用会报错，所以通常需要在.babelrc 中这么配置一下：

```js
{
    "plugins":[
         [
          "@babel/plugin-proposal-decorators",
          {
            "legacy": true,
            "loose": true
          }
        ],
        "@babel/plugin-proposal-class-properties",
    ]
}
```

如上添加配置后，就可以在 js 中正常使用装饰器模式了。

### 精确颗粒化收集

mobx 还有一个重要特点，就是对于属性的依赖收集是精确的，颗粒化的，为什么这么说呢？比如在 mobx 一个模块如下写道：

```js
class Root {
  @observable object = {
    //C组件使用
    name: "alien", // A组件使用
    mes: "let us learn React!", // B组件使用
  };
  @action setName(name) {
    this.object.name = name;
  }
  @action setMes(mes) {
    this.object.mes = mes;
  }
  @action setObject(object) {
    this.object = object;
  }
}
```

- 对于 observable 处理过的属性，每一个属性都会有 ObserverValue ，比如上面的结构会产生三个 ObserverValue ，分别对应 object ，name ，mes 。
- 当上面通过 setName 改变 name 属性的时候，只有组件 A 会更新。也就是 name ObserverValue 只收集了用到 name 的依赖项 A 组件。
- 调用 setMes 同理，只有组件 B 更新。 mes ObserverValue 只收集了 B 组件的依赖。
- 当上面通过 setObject 改变 object 的时候，即使 object 里面 name ，mes 的值没有变化，也会让组件 A ，组件 B ，组件 C ，全部渲染。object 的 Observer 同样收集了 name 的 ObserverValue 和 mes 的 ObserverValue 。

模型图如下
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1268c78788bd436887d91d9d997b680a~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

### 引用类型处理

observable 对于引用数据类型，比如 Object ，Array ，Set ，Map 等，除了新建一个 observable 之外，还会做如下两点操作。

- 一 Proxy：会把原始对象用 Proxy 代理，Proxy 会精确响应原始对象的变化，比如增加属性——给属性绑定 ObserverValue ，删除属性——给属性解绑 ObserverValue 等。

- 二 ObservableAdministration： 对于子代属性，会创建一个 ObservableAdministration，用于管理子代属性的 ObserverValue。

- 对于外层 Root ，在 constructor 使用 makeObservable ，mobx 会默认给最外层的 Root 添加 ObservableAdministration 。

## 基本用法

### 1 Mobx 基本使用

mobx 常用 api
把上述每一个 class 称之为一个模块，如上述 Root 就是一个模块。mobx 的 api 基本用于构建每一个响应式模块。

① makeObservable

在新版本 mobx 中，想要让整个模块变成可响应式的，那么需要在 constructor 调用 makeObservable。老版本的 mobx 不需要这么做。

## 四 Mobx 流程分析和原理揭秘

接下来开始正式进入 Mobx 流程分析和原理揭秘环节。从本章节的第二部分，就开始介绍了 mobx 内部，可观察属性 ObserverValue 最后会被 mobx 底层处理的样子。于是顺藤摸瓜，剖析 mobx 的整个流程。

可以从三个角度分析 mobx 和 mobx-react 整个流程：

- 初始化：首先就是 mobx 在初始化的时候，是如何处理 observable 可观察属性的。
- 依赖收集：第二点就是通过 mobx-react 中的 observer ，如何收集依赖项，与 observable 建立起关系的。
- 派发更新：最后就是当改变可观察属性的值的时候，如何更新对应组件的。

比如如下在 mobx 中的一个模块这么写道（这里称之为 DEMO1 ）：

## 五 Mobx 与 Redux 区别

- 首先在 Mobx 在上手程度上，要优于 Redux ，比如 Redux 想使用异步，需要配合中间件，流程比较复杂。
- Redux 对于数据流向更规范化，Mobx 中数据更加多样化，允许数据冗余。
- Redux 整体数据流向简单，Mobx 依赖于 Proxy， Object.defineProperty 等，劫持属性 get ，set ，数据变化多样性。
- Redux 可拓展性比较强，可以通过中间件自定义增强 dispatch 。
- 在 Redux 中，基本有一个 store ，统一管理 store 下的状态，在 mobx 中可以有多个模块，可以理解每一个模块都是一个 store ，相互之间是独立的。
