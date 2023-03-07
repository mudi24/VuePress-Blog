---
title: "探索React Hooks原理"
sidebarDepth: 2
---

#### 今天我们来探究一下 React Hooks 的原理

##### useState

- 先来尝试实现单个数据的 useState

  ```
      let _state;
      function myUseState(initialValue) {
          _state = _state || initialValue;
          function setState(newState) {
            _state = newState;
            render();
          }
          return [_state, setState];
      }
      const render = () => ReactDOM.render(<App />, rootElement);

      function App() {
          const [n, setN] = myUseState(0);
          return (
            <div className="App">
              <p>{n}</p>
              <p>
                <button onClick={() => setN(n + 1)}>+1</button>
              </p>
            </div>
          );
      }
      ReactDOM.render(<App />, rootElement);
  ```

* 那么，如果要对两个或多个数据进行 useState 呢？

  ```
      let _state = [];
      let index = 0;
      const myUseState = initialValue => {
          let currentIndex = index;
          _state[currentIndex] =
            _state[currentIndex] === undefined ? initialValue : _state[currentIndex];
          const setState = newValue => {
            _state[currentIndex] = newValue;
            myRender();
          };
          index += 1;
          return [_state[currentIndex], setState];
      };
      const myRender = () => {
        index = 0
        ReactDOM.render(<App />, rootElement);
      };

      function App() {
          const [n, setN] = myUseState(0);
          const [m, setM] = myUseState(0);
          return (
            <div className="App">
              <p>{n}</p>
              <button onClick={() => setN(n + 1)}>n+1</button>
              <p>{m}</p>
              <button onClick={() => setM(m + 1)}>m+1</button>
            </div>
          );
      }
      ReactDOM.render(<App />, rootElement);
  ```

* 如此就实现了两个数据的 useState，但依然存在缺点：useState 的调用顺序很关键，如果本次渲染与上次渲染调用顺序不同，可能会出现数据混乱的情况

* 所以，每个组件都需要有对应的\_state 和 index，并且命名不能冲突。所以 React 为每个组件都创建了一个\_state 和 index，并把它们放在组件对应的虚拟节点对象上。
* React 节点应该是 FiberNode，\_state 的名称为 memorizedState，index 的实现则是用了链表。如果你想要更深入的了解，可以阅读这篇博客：https://juejin.im/post/5bdfc1c4e51d4539f4178e1f

##### React 对于函数式编程的设计思想的坚持

- React 不支持对一个值进行修改，所以当你使用修改值的方法时，React 不会对 UI 进行更新

* useState 不会改变 state 中的 n，而是会生成一个新的 n

- 实现'一个'n （对这个 n 进行操作即可）的方法：
  - 使用 window.n 代替 n
  - 可以使用 useRef 代替 useState ，来使 n 变为一个贯穿始终的 n
  * useContext 不仅能贯穿始终，还能贯穿不同的组件

##### useRef

- useRef 不仅可以用于 div，还能用于任意数据
- 但由于 React 对于函数式编程的设计思想的坚持，React 不会在 useRef 更新后自动触发 UI 更新

  ```
    function App() {
      const nRef = React.useRef(0); // {current:0}
      const log = () => setTimeout(() => console.log(`n: ${nRef.current}`), 1000);
      const update = React.useState(null)[1]   // 手动强制触发更新（不推荐）
      return (
        <div className="App">
          <p>{nRef.current} 这里并不能实时更新</p>
          <p>
            <button onClick={() => {nRef.current += 1; update(nRef.current)}}>+1</button>
            <button onClick={log}>log</button>
          </p>
        </div>
      );
    }
  ```

##### useContext

- 组件内任意后代组件都可以访问到数据

  ```
    const themeContext = React.createContext(null); // 创建context

    function App() {
      const [theme, setTheme] = React.useState("red");
      return (
        <themeContext.Provider value={{ theme, setTheme }}> // 容器+传递
          <div className={`App ${theme}`}>
            <p>{theme}</p>
            <div>
              <ChildA />
            </div>
            <div>
              <ChildB />
            </div>
          </div>
        </themeContext.Provider>
      );
    }

    function ChildA() {
      const { setTheme } = React.useContext(themeContext); // 接收
      return (
        <div>
          <button onClick={() => setTheme("red")}>red</button>
        </div>
      );
    }

    function ChildB() {
      const { setTheme } = React.useContext(themeContext);
      return (
        <div>
          <button onClick={() => setTheme("blue")}>blue</button>
        </div>
      );
    }

    ReactDOM.render(<App />, rootElement);
  ```
