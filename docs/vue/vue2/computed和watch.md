---
title: "computed和watch"
sidebarDepth: 2
---

### computed

- computed 默认只有 getter，需要的时候也可以提供 setter

  ```
      computed:{
        displayName: {
          get(){
            const user = this.user
            return user.nickname || user.phone || user.email
          }
          set(value){
            this.user.nickname = value
          }
        }
      }
  ```

- 计算属性的结果会缓存
  ```
      computed:{
        displayUsers(){
          const hash = {
            male: '男',
            female: '女'
          }
          const { users, gender } = this
          if(gender === ""){
            return users
          } else if(typeof gender === "string"){
            return users.filter(u => u.gender === hash[gender])
          } else {
            throw new Error("意料之外的值")
          }
        }
      },
  ```

### watch

- watch 是异步的，可以在数据变化之后立即使用 Vue.nextTick(callback)/vm.\$nextTick()。这样回调函数将在 DOM 更新完成后被调用。

  ```
    new Vue({
      data:{
        n: 0,
        history: [],
        inUndoMode: false
      },
      watch: {
        n(newValue, oldValue){
          if(!this.inUndoMode){  // 判断是否为撤销模式
            this.history.push({from: oldValue, to: newValue})
          }
        }
      },
      template: `
        <div>
          {{n}}
          <hr />
          <button @click="add1">+1</button>
          <button @click="add2">+2</button>
          <button @click="minus1">-1</button>
          <button @click="minus2">+2</button>
          <hr />
          <button @click="undo">撤销</button>
          <hr />
        </div>
      `,
      methods:{
        add1(){this.n += 1},
        add2(){this.n += 2},
        minus1(){this.n -= 1},
        minus2(){this.n -= 2},
        undo(){   // 撤销
          const last = this.history.pop()
          const old = last.from
          this.inUndoMode = true
          this.n = old
          this.$nextTick(()=>{ // 等到watch异步操作执行完毕后再关闭撤销模式
            this.inUndoMode = false
          })
        }
      },
    }).mounted("#app")
  ```

- watch 默认只会监听数据的变化(数据第一次渲染不监听)

  ```
    watch:{
      'user email':{
        handler(){
          const { user: {nickname, email, phone }} = this;
          // user不可用了,只能用nickname,email,phone
          this.displayName = nickname
        },
        immediate: true  // 加上这句会监听数据第一次渲染
      }
    }
  ```

- 简单类型变化对比值，复杂类型(对象)变化对比地址

  ```
    watch:{
      obj:{
        handler(){
          console.log('obj变化了')
        },
        deep: true // 监听对象内部值的变化(监听数组不需要这么做)
      }
    }
  ```

* watch 语法
  ```
    watch:{
      add1: function(value, oldValue){}
      add2(){}
      add3:[fn1, fn2] // 一次执行fn1, fn2
      add4:'add' // methods中的add函数
      add5:{handler:fn, deep:true, immediate:true}
      'object.a': function(){} // 监听对象属性的变化
    }
    vm.$watch('n', function(){}, {immediate: true})
  ```
* vm.\$watch 返回一个取消观察函数，用来停止触发回调
  ```
  let unwatch =vm.$watch('a', cd)
  unwatch() // 取消观察
  ```

### computed 和 watch 的区别

- computed: 计算属性，watch: 监听
- computed 调用时不需要加括号，会缓存结果，需要依赖其他数据来得到结果时使用 computed
- watch 有 immediate 和 deep 选项，是异步的，需要在数据变化时进行操作使用 watch
