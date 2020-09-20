---
title: "TS结合Vue"
sidebarDepth: 2
---

- Vue 文档：https://cn.vuejs.org/v2/guide/typescript.html#ad

* 创建 Vue 项目
  ```
  npm install --global @vue/cli
  vue create my-project
  ```
* 基于类的 Vue 组件

  ```
  import Vue from 'vue'
  import Component from 'vue-class-component'

  // @Component 修饰符注明了此类为一个 Vue 组件
  @Component({
      // 所有的组件选项都可以放在这里(props, components, watch)
      template: '<button @click="onClick">Click!</button>'
  })
  export default class MyComponent extends Vue {
      // 初始数据可以直接声明为实例的属性(data)
      message: string = 'Hello!'

      // 组件方法也可以直接声明为实例的方法(methods)
      onClick (): void {
        window.alert(this.message)
      }
  }
  ```

* `@Component()` 里面包含的是共用的属性
* `export default class MyComponent extends Vue{}` 里面包含的是组件自己特有的属性

* 示例

  ```
  import Vue from 'vue'
  import Component from 'vue-class-component'

  interface Todo{
      name: String;
      status: 'done' | 'todo' | 'deleted''
  }

  @Component({
      components: {
        NewTodo,
        TodoList,
      },
      watch: {
        list(newValue: Array<Todo>){
          let string = JSON.stringify(newValue)
          localStorage.setItem('data',string)
        }
      }
  })
  export default class App extends Vue {
      list: Array<Todo> = localStorage.getItem('data')
        ? JSON.parse(<string>localStorage.getItem('data')) : []; // 断言
      addTodo(name:String){
        let todo: Todo = {name: name, status: 'todo'}
        this.list.push(todo)
      }
      updateTodo(todo: Todo,part: Partial<Todo>){
        // Partial<Todo>表示类型为Todo中的一部分
        let index = this.list.indexOf(todo)
        let newTodo = Object.assign({}, todo, part)
        this.list.splice(index, 1, newTodo)
      }
  }
  ```
