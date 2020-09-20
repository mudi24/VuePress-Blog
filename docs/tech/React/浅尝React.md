---
title: "浅尝React"
sidebarDepth: 2
---

### 引入 React

- cjs 和 umd 的区别
  - cjs(CommonJS)，是 Node.js 支持的模块规范
  - umd 是统一模块定义，兼容各种模块规范（含浏览器）
  - 理论上优先使用 umd，同时支持 Node.js 和浏览器
  - 最新的模块的规范是使用 import 和 export 关键字

* CDN 引入（顺序不能改变）

  - 引入 React: https://.../react.x.min.js
  - 引入 ReactDOM: https://.../react-dom.x.min.js

- 通过 webpack 引入 React（rollup, parcel 也可以这样引入）
  ```
  // 约定：大小写要保持一致
  yarn add react react-dom
  import React from 'react'
  import ReactDOM from 'react-dom'
  ```

* create-react-app

  ```
  yarn global add create-react-app
  create-react-app react-demo
  ```

* setTimeout(fn, 1000) 1s 后尽快执行
* 普通代码立即求值，函数则在调用时才会去读取值

### React 虚拟 DOM

- React 元素：React.createElement('div', null, n)

  - createElement 的返回值 element 可以代表一个 DOM 对象

  - 但 element 不是真正的 DOM 对象，一般称为虚拟 DOM

- React 组件：() => React.createElement('div', null, n)

  - 返回 element 的函数多次执行，每次得到最新的虚拟 DOM
  - DOM Diff 算法用来对比 虚拟 DOM ，发现其中的不同，局部更新

  ```
    const App = () => React.createElement("div", null, [
      n,
          React.createElement(
            "button",
            { onClick: () => { n += 1;ReactDOM.render(App(), root);} },
          "+1")
    ]);

    ReactDOM.render(App(), root);
  ```

### JSX（X 表示扩展，JS 扩展版）

- JSX-loader 被 babel-loader 取代了，而 babel-loader 被 webpack 内置了

#### 使用 JSX

1. create-react-app
   - 跟@vue/cli 用法类似
   - yarn global add create-react-app
   - cd react-demo
   - yarn start
   - App.js 默认使用 jsx 语法（webpack 默认把 js 文件作为 jsx 文件）
2. webpack + babel-loader
3. CDN（永远不要在生产环境使用）
   - 引入 babel.min.js
   - 把 `<script>` 改成 `<script type="text/babel">`
   - babel 会自动进行转译
   - 示例：https://codesandbox.io/s/goofy-sky-fmnhd

#### 使用 JSX 的注意事项

- 使用 className，而不是 class
- 标签里面的所有 JS 代码都要用{}包起来
  - 使用变量 n：{n}
  - 使用对象：`{ {name: 'Irelia'} }`

* 在 return 后面加()

#### JSX 的条件判断

```
const Component = () => {
  return (
    <div>
      { n%2 === 0 ? <div>n是偶数</div> : <div>n是奇数</div>}
    </div>
  )
}
```

```
const Component = () => {
  let inner
  if( n%2 === 0 ){
    inner = <div>n是偶数</div>
  }else{
    inner = <div>n是奇数</div> }
  const content = ( <div>{ inner }</div>)
  return content
}
```

#### JSX 的循环

```
const Component = (props) => {
  return ( <div>
    { props.numbers.map((n, index) => {
    return <div>下标{index}值为{n}</div>
  }) }
  </div>)
}
```

```
const Component = (props) => {
  const array = []
  for(let i=0; i<props.numbers.length; i++){
    array.push(<div>下标{i}值为{props.numbers[i]}</div>)
  }
  return  <div>{ array }</div>
}
```
