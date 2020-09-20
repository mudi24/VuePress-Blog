---
title: "MVC"
sidebarDepth: 2
---

1. MVC

   - Model (数据) 负责操作所有数据

     ```
      const m = {
          data:{}
      }
     ```

   - View (视图) 负责所有 UI 界面

     ```
      const v = {
          el: null,
          html:`
            <div>
              <button>点我</button>
            </div>
          `,
          init(container){},
          render(){}
      }
     ```

   - Controller (控制器) 负责其他

     ```
      const c = {
          init(container){},
          events:{},
          autoBindEvents(){}
      }
     ```

2. EventBus(事件总线)

   - 对象间的通信，负责 Model,View,Controller 之间的通信。

   * on 监听事件

   - trigger 触发事件/emit 发送事件

   * once 事件执行一次

   - off 移除事件监听

   - jQuery

     ```
     import $ from 'jQuery'

     const eventBus = $(window) // const eventBus = $({})

     eventBus.on('m:update', () => {
           v.render(m.data.n)
     })

     eventBus.trigger('m:update')

     eventBus.off('m:update')
     ```

   - Vue

     ```
     import Vue from 'vue'
     const EventBus = new Vue()

     EventBus.$on('m:update', ()=>{
          v.render(m.data.n)
     })

     EventBus.$emit('m:update',m.data.n)

     EventBus.$off('m:update', ()=>{})

     EventBus.$once('m:update', ()=>{})
     ```

3. 表驱动编程是做什么的

   - 表驱动编程是指把相同或类似类型的事件或者数据做成哈希表，放到一起进行集中操作或处理，方便自动绑定事件。

4. 理解模块化

   - 模块化就是消除不同文件(模块)之间的耦合，使每个文件(模块)独立起来。这样每个文件(模块)的修改就不会影响到其他文件(模块)，每个模块独立存在，不依赖其他模块，方便更新迭代。

5. view = render(data)

   - 只要 data 改变了，就可以调用 render 函数重新渲染 view(React 使用这种思想)

6. 类什么时候用
   - 相同的代码需要使用多次，就应该使用函数进行封装
   - 相同的属性需要使用多次，就应该做成共用属性(原型或类)
   - 相同的原型需要使用多次，就应该使用继承(EventBus)
