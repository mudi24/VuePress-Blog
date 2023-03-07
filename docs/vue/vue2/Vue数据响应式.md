---
title: "Vue数据响应式"
sidebarDepth: 2
---

#### “Vue 是一套用于构建用户界面的渐进式框架，Vue 的核心库只关注视图层。” Vue 文档已经把 Vue 的特点说的很清楚了，Vue 是专注于 UI 界面的框架，数据的修改会实时的反馈到界面中。这就是数据响应式了，通过数据来驱动视图。

在 Vue 文档深入响应式原理中，Vue 是这样说的：“
**当你把一个对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。**
”那么 Vue 具体是怎么做的呢？

Vue 响应式原理: https://cn.vuejs.org/v2/guide/reactivity.html

#### 1.先来了解一下 getter, setter 和 Object.defineProperty

- getter: 不要括号就可以调用的函数

```
    let obj2 = {
      姓: "高",
      名: "圆圆",
      get name() {
        return this.姓 + this.名;
      },
    };
    console.log("需求二：" + obj2.name);
```

- setter: 传入一个值并把这个值赋值给其他变量

```
    let obj3 = {
      姓: "高",
      名: "圆圆",
      get name() {
        return this.姓 + this.名;
      },
      set name(xxx){
        this.姓 = xxx[0]
        this.名 = xxx.slice(1)
      },
    };
    obj3.name = '高媛媛'
    console.log(`需求三：姓 ${obj3.姓}，名 ${obj3.名}`)
```

- Object.defineProperty: 可以给对象添加属性 value，可以给对象的属性添加 getter 和 setter，对属性的读写进行监控

```
  let _name = '王尼玛'
  Object.defineProperty(obj3, 'myName', {
      get(){
        return _name
      },
      set(value){
        _name = value
      }
  })
```

#### 2.代理(设计模式)

- n 不能设置为小于 0 的数字(可以通过直接对 data.\_n 进行赋值，绕过了 Object.defineProperty)
  ```
  let data = {}
  data._n = 0  // data._n = -1
  Object.defineProperty(data, 'n', {
        get(){
          return this._n
        },
        set(value){
          if(value < 0) return
          this._n = value
        }
  })
  ```

* 设置为匿名对象，让你无法访问，也就无法修改(
  为匿名对象添加名字，修改匿名对象，又绕开了)
  ```
  // let myData = {data:{n:0}}
  // let data = proxy(data:myData)
  let data = proxy({ data:{n:0} }) // 括号里是匿名对象，无法访问
  function proxy({data}){
        const obj = {}
        Object.defineProperty(obj, 'n', {
          get(){
            return data.n
          },
          set(value){
            if(value<0)return
            data.n = value
          }
        })
        return obj // obj 就是代理
  }
  ```
* 把 myData 监听起来，myData.n 也无法设置为小于 0 的数值(最终方案)

  ```
  let myData = {n:0}
  let data = proxy({ data:myData })
  function proxy({data}){
        let value = data.n  // 监听 data
         // delete data.n   可以不写，下面的代码会把data.n覆盖掉
        Object.defineProperty(data, 'n', {
            get(){
              return value
            },
            set(newValue){
              if(newValue<0)return
              value = newValue
            }
        })
        const obj = {}
        Object.defineProperty(obj, 'n', {
            get(){
              return data.n
            },
            set(value){
                data.n = value
            }
        })
        return obj // obj 就是代理
  }
  ```

* Vue 其实就是让 vm 成为 myData 的代理
  (proxy)，然后对 myData 的所有属性进行监控，如果属性有所改变，就会调用 render 函数重新渲染页面。

#### 3.数据响应式失效的例子：

- data 存在一个 bug(数据没有提前声明导致不会在页面中显示)
  - obj.b 并没有声明，所以不会被监听(Vue 只会检查第一层属性)
  * Vue.set / this.\$set 自动创建代理和监听，触发 UI 更新
  ```
  new Vue({
          data:{
            obj: {
              a:0
            }
          },
          template: `
            <div>
              {{obj.b}}
              <button @click="setB">set B</button>
            </div>
          `,
          methods:{
            setB(){
              this.obj.b = 1  // Vue没有监听，所以不会显示
              Vue.set(this.obj, 'b', 1)
              this.$set(this.obj, 'b', 1)
            }
          }
  }).$mount('#app')
  ```

#### 4.Vue 内部对 array 的方法的加工

- array 无法提前声明，可以使用 Vue.set 但没必要。Vue 篡改了数组的部分 API，使我们可以直接使用(https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95-mutation-method)

```
 new Vue({
        data:{
          array: ['a', 'b', 'c']
        },
        template: `
          <div>
            {{obj.b}}
            <button @click="setD">set D</button>
          </div>
        `,
        methods:{
          setD(){
            this.array[3] = 'd'
            this.array.push('d') // 被修改过的push方法
          }
        }
}).$mount('#app')
```

- Vue 内部把数组的每一项都进行了监听，并在我们 push 的时候，直接调用了数组原生 API
  ```
  class VueArray extends Array{
        push(...args){
          const oldLength = this.length
          super.push(...args)
          for(let i = oldLength; i < this.length; i++){
            Vue.set(this, i, this[i])
          }
        }
  }
  ```
