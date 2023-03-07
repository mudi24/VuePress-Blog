---
title: "Vue进阶属性"
sidebarDepth: 2
---

### directives(指令)

- 全局指令
  ```
    Vue.directives('my-directive',{
      inserted: function(el){
        el.addEventListener('click', ()=>{console.log('directive')})}
    })
  ```
- 局部指令
  ```
    directives:{
      on2:{ // 模仿简单版v-on
        inserted(el, info){
          el.addEventListener(info.arg, info.value)
        }
      },
      unbind(el, info){ // 移除事件监听
        el.removeEventListener(info.arg, info.value)
      }
    }
  ```

* directive 函数属性
  - bind(el, info, vnode, oldVnode) 与 created 类似
  - inserted(el, info, vnode, oldVnode) 与 mounted 类似
  - update(el, info, vnode, oldVnode) 与 updated 类似
  - componentUpdated(el, info, vnode, oldVnode)
  - unbind(el, info, vnode, oldVnode) 与 destoryed 类似

- 指令的作用
  - 减少重复的 DOM 操作（数据绑定，事件监听，DOM 更新）

### mixins(混入)

- mixins 的作用: 减少 data、methods、钩子的重复

```
    // log.js
      const log = {}
      export default log
    // 其他组件引入并使用
      import log from 'log.js'
      export default{
        mixins:[log]
      }
```

- 选项智能合并
  - 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。
  - 数据对象在内部会进行合并，并在发生冲突时以组件数据优先。
  - 同名钩子函数将合并为一个数组，都将被调用。混入对象的钩子将在组件自身钩子之前调用。
  - 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
- 不推荐全局混入（会造成意外的效果）
- 自定义选项合并策略：https://cn.vuejs.org/v2/guide/mixins.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5

### extends(继承)

- extends 也使用与 mixins 同样的策略进行合并。

```
    // 全局
      const MyVue = Vue.extend()
      export default MyVue
    // 局部
      import MyVue from 'MyVue.js'
      export default{
        extends: MyVue
      }
```

### provide(提供) 和 inject(注入)

- 作用：大范围的 data 和 method 共用

```
  // 祖先提供
    export default{
      provide:{
        'themeName' = this.themeName,
        // 定义修改数据的函数，然后暴露出去
        'changeTheme'= this.changeTheme
      }
      methods:{
        changeTheme(){}
      }
    }
```

```
  // 后代注入
    export default{
      // 接收并调用函数，修改祖先数据
      inject:['themeName', 'changeTheme']
      methods:{
        change(){
          changeTheme()
        }
      }
    }
```
