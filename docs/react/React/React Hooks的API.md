---
title: "React Hooks的API"
sidebarDepth: 2
---

#### useState

- 使用方法：

```
const [n,setN] = React.useState(0)
const [user,setUser] = React.useState({name:'F})
const [state,setState] = React.useState(()=>({name:'F}))
    // 可以接收函数，该函数返回初始state，且只执行一次
```

- 注意：
  - 不可以局部更新（需要自己合并属性，useReducer 也需要自己合并）
  - 不能写到 if 中
  - 对象的地址不变，内部改变，React 认为没有变化（要使用 setUser({})）
  - setState(i => i + 1)，需要对 state 进行多次 setState 的操作时，使用函数

#### useReducer

- 复杂版的 useState(用来践行 Flux/Redux 的思想)

  ```
      const initial = { n: 0 };

      const reducer = (state, action) => {
        if (action.type === "add") {
          return { n: state.n + action.number };
        } else if (action.type === "multi") {
          return { n: state.n * 2 };
        } else {
          throw new Error("unknown type");
        }
      };

      function App() {
        const [state, dispatch] = useReducer(reducer, initial);
        const { n } = state;
        const onClick = () => {
          dispatch({ type: "add", number: 1 });
        };
        const onClick2 = () => {
          dispatch({ type: "add", number: 2 });
        };
        return (
          <div className="App">
            <h1>n: {n}</h1>
            <button onClick={onClick}>+1</button>
            <button onClick={onClick2}>+2</button>
          </div>
        );
      }
  ```

#### 使用 useReducer 和 useContext 代替 redux

- 步骤：
  - 将数据集中到一个 store 对象
  - 将所有操作都集中到 reducer
  - 创建一个 Context
  - 创建对数据的读写 API
  - 将 API 放入 Context
  - 用 Content.Provider 将 Context 提供给所有组件
  - 各个组件用 useContext 获取读写 API

* 实例：https://codesandbox.io/s/sparkling-sound-pj4yd

#### useContext

- 注意：使用 useContext 时，在后代组件使用 set 操作改变了值之后，后代组件会通知祖先，祖先进行对比找到要修改的后代组件，然后对修改的组件进行更新

#### useEffect 副作用

- 对环境的改变即为副作用，可以理解为 afterRender
- 作为 componentDidMount 使用，[]作为第二个参数
- 作为 componentDidUpdate 使用，[]内写要监听的 state
- 作为 componentWillUnmount 使用，使用 return 一个函数
- 如果同时存在多个 useEffect，会按出现顺序执行

#### useLayoutEffect 布局副作用

- useEffect 在浏览器渲染完成后执行
- useLayoutEffect 在浏览器渲染前执行
- 如果 useLayoutEffect 中的操作不影响布局，使用 useEffect 代替它

#### useMemo

- memo

  - React.memo()，使用 memo 可以让组件只在自身的 props 变化后执行，避免多余的 render，节省性能
  - 如果祖先组件为该后代组件添加了监听函数，因为祖先组件更新后会重新执行，就会得到新的监听函数，地址变化导致后代组件 render

  ```
      const Child = React.memo(props => {
        console.log("child 执行了");
        console.log("假设这里有大量代码");
        return <div>child: {props.data}</div>;
      });
  ```

- useMemo --> (Vue2 computed)???
  - 第一个参数是()=>value
  - 第二个参数是依赖[m,n]
  - 只有当依赖变化时，才会计算新的 value
  - 如果依赖不变就重用之前的 value
  * 那么如果 value 是个函数，就要写成
    `useMemo(()=>(x)=>console.log(x),[m])`

* useCallback 语法糖
  - 可以使用`useCallback(x => console.log(x),[m])`代替 `useMemo(()=>(x)=>console.log(x), [m])`

#### useRef

- 需要一个值，在组件不断 render 时保持不变
- 初始化：const count = useRef(0)
- 读取：count.current
- 为什么需要 current？ 保证两次 useRef 是同一个值

#### Vue3 ref

- 初始化： const count = ref(0)
- 读取：count.value
- 不同点：count.value 变化时，会自动 render 更新 UI

#### forwardRef

- props 不包含 ref 属性，无法传递 ref 属性

* 函数组件无法直接接收传入的 ref 属性

  ```
      function App(){
        const buttonRef = useRef(null)
        return (
          <div className="App">
            <Button ref={buttonRef}>按钮</Button>
          </div>
        )
      }
      const Button = React.forwardRef((props, ref)=>{
        return <button ref={ref} {...props}/>
      })
  ```

#### useImperativeHandle

- 可以理解为 setRef，自定义 ref 的属性

  ```
      const Button2 = React.forwardRef((props, ref) => {
        const realButton = createRef(null);
        const setRef = useImperativeHandle;
        setRef(ref, () => {
          return {
            x: () => {
              realButton.current.remove();
            },
            realButton: realButton
          };
        });
        return <button ref={realButton} {...props} />;
      });
  ```

#### 自定义 Hook

- 自定义 Hook 里使用 Context
- 可以代替 redux
  ```
      const useList = () => {
        const [list, setList] = useState(null);
        useEffect(() => {
          ajax("/list").then(list => {
            setList(list);
          });
        }, []); // [] 确保只在第一次运行
        return {
          list: list,
          addItem: name => {
            setList([...list, { id: Math.random(), name: name }]);
          },
          deleteIndex: index => {
            setList(list.slice(0, index).concat(list.slice(index + 1)));
          }
        };
      };
      export default useList;
  ```

#### Stale Closure 过时闭包

- 函数引用的变量是之前的变量
