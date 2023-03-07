---
title: "React组件"
sidebarDepth: 2
---

### React 组件

- 元素与组件
  ```
  React 元素（d小写）
  const div = React.createElement('div',...)
  React 组件（D大写)
  const Div = () => React.createElement('div',...)
  ```

#### 函数组件

```
  function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
  }
  使用方法: <Welcome name="frank"/>
```

#### 类组件

```
  class Welcome extends React.Component{
    constructor(){
      super()
      this.state = {n:0}
    }
    render(){
      return <h1>Hello, {this.props.name}</h1>
    }
  }
  使用方法: <Welcome name="frank"/>
```

#### state(内部数据)

- 类组件首先要在 constructor 中初始化，然后可以用 this.state 读，this.setState 写(setState 最好使用函数)
- 函数组件用 useState 返回数组，第一项读，第二项写
- 类组件的 setState 会异步改变 n，函数组件的 setN 不会改变 n，而是会生成一个新的 n

```
  function App() {
      return (
        <div>
          爸爸<Son />
        </div>
      )}

  class Son extends React.Component {
      constructor() {
        super();
        this.state = {n: 0};
      }
      add() {
        this.setState({ n: this.state.n + 1 });
        // setState异步更新UI
        this.setState(state=>{
          const n = this.state.n + 1
          console.log(n)
          return {n}
        })
      }
      render() {
        return (
          <div>
            儿子 n: {this.state.n}
            <button onClick={() => {this.add();}}>+1</button>
            <Grandson />
          </div>
        )}
  }

  const Grandson = () => {
      const [n, setN] = React.useState(0);
      return (
        <div>
          孙子 n: {n}
          <button onClick={() => setN(n + 1)}>+1</button>
        </div>
      )};
```

#### props(外部数据)

- 类组件直接读取属性 this.props.xxx
- 函数组件直接读取参数 props.xxx

#### 复杂 state

- 类组件的 setState 会自动合并第一层属性

  ```
  class Son extends React.Component{
    constructor(){
      super()
      this.state = {
        n: 0,
        m: 0,
      }
    }
    addN() {
      this.setState({n: this.state.n + 1})
    }
    addM() {
      this.setState({m: this.state.m + 1})
    }
    render() {
      return (
        <div>
          n: {this.state.n}
          <button onClick={()=>this.addN()}>n+1</button>
          m: {this.state.m}
          <button onClick={()=>this.addM()}>m+1</button>
        </div>
      )
    }
  }
  ```

* 函数组件不会自动合并，需要...运算符

  ```
  // 写法1
    const Grandson = () => {
      const {n, setN} = React.useState(0)
      const {m, setM} = React.useState(0)
      return (
        <div>
          n: {n}
          <button onCLick={() => setN(n+1)}>n+1</button>
          m: {m}
          <button onClick={() => setM(m+1)}>m+1</button>
        </div>
      )
    }
  ```

  ```
  // 写法2（不推荐）
    const Grandson = () => {
      const [state, setState] = React.useState({
        n: 0, m: 0
      })
      return (
        <div>
          n: {state.n}
          <button onClick={() => setState({...state, n:state.n+1})}>n+1</button>
          m: {m}
          <button onClick={() => setState({ ...state, m:state.m+1})}>m+1</button>
        </div>
      )
    }
  ```

* 合并第二层属性
  ```
  class father extends React.Component{
      constructor(){
        super()
        this.state = {
          m:0,
          n:0,
          user:{
            name: 'Irelia',
            age: 18
          }
        }
      }
      changeUser(){
        // const user = Object.assign({}, this.state.use)
        // const user = {...this.state.user}
        this.setState({
          user:{...this.state.user,name:"frank"}
        })
      }
  }
  ```

### 事件绑定

```
// 标准写法
<button onClick={()=>this.addN()}>n+1</button>
// addN 函数内部的 this 变成了 window
<button onClick={this.addN}>n+1</button>

// 最终写法
class Son extends React.Component{
  /* constructor(){
    this.addN = () => this.setState({n: this.state.n + 1})
  } */
  addN = () => this.setState({n: this.state.n+1}) // 等价于上面的三行代码
  render(){
    return <button onClick={this.addN}>n+1</button>
  }
}
```

- 语法
  ```
    class Person{
      sayHi(){}
      sayHi会放到原型身上
    }
    class Person2{
      sayHi2 = () => {} // 等价于constructor(){this.sayHi2 = () => {}}
      sayHi2会作为对象的属性
    }
  ```

### this 面试题

```
var length = 10;
function fn(){
  console.log(this.length)
}

var obj ={
  length: 5,
  method: function(fn){
    fn();
    arguments[0]();
  }
}

obj.methods(fn, 1); // 输出什么
```

- 答案

```
fn.call(undefined) // 10
arguments[0].call(arguments) // 2
```

### React vs Vue

- 相同：
  - 都是对视图的封装，React 是用类和函数表示一个组件，而 Vue 是通过构造选项构造一个组件
  - 都提供了 createElement 的 XML 简写，React 提供的是 JSX 语法，而 Vue 提供的是模板写法
- 不同：
  - React 是把 HTMl 放在 JS 里面写，而 Vue 是把 JS 放在 HTML 里面写
