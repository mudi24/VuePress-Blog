---
title: "Vue动画"
sidebarDepth: 2
---

#### transition

- 需要初始值
- fade-enter 进入过渡的开始状态\*
- fade-enter-active 进入过渡时生效的状态\*
- fade-enter-to 进入过渡的结束状态
- fade-leave 离开过渡的开始状态
- fade-leave-active 离开过渡时生效的状态\*
- fade-leave-to 离开过渡的结束状态\*

#### animation

- bounce-enter-active
- bounce-leave-active
- 第三方动画库 Animate.css
  ```
      <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
      >
      </transition>
  ```

#### JS 操作动画

- 注意：当只用 JS 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。

* 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

  ```
      <transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
      ></transition>
  ```

  ```
      methods: {
        beforeEnter: function (el) {},
        // 当与 CSS 结合使用时
        // 回调函数 done 是可选的
        enter: function (el, done) {
          // ...
          done()
        },
        afterEnter: function (el) {},
        enterCancelled: function (el) {},

        beforeLeave: function (el) {},
        // 当与 CSS 结合使用时
        // 回调函数 done 是可选的
        leave: function (el, done) {
          // ...
          done()
        },
        afterLeave: function (el) {},
        // leaveCancelled 只用于 v-show 中
        leaveCancelled: function (el) {}
      }
  ```

* 使用 Velocity.js
  ```
      <script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>
      <div id="example-4">
        <button @click="show = !show">
          Toggle
        </button>
        <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
          v-bind:css="false"
        >
          <p v-if="show">
            Demo
          </p>
        </transition>
      </div>
  ```
  ```
    new Vue({
      el: '#example-4',
      data: {
        show: false
      },
      methods: {
        beforeEnter: function (el) {
          el.style.opacity = 0
          el.style.transformOrigin = 'left'
        },
        enter: function (el, done) {
          Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
          Velocity(el, { fontSize: '1em' }, { complete: done })
        },
        leave: function (el, done) {
          Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
          Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
          Velocity(el, {
            rotateZ: '45deg',
            translateY: '30px',
            translateX: '30px',
            opacity: 0
          }, { complete: done })
        }
      }
    })
  ```

#### 多元素过渡

- v-if/v-else

  ```
    <div id="demo">
      <transition name="fade" mode="out-in">
        <button key="on" v-if="status === 'off'" @click="status = 'on'">
          on
        </button>
        <button key="off" v-else @click="status = 'off'">
          off
        </button>
      </transition>
    </div>
  ```

  ```
      new Vue({
        el: 'demo'
        data:{ status:'on'}
      })
      .fade-enter-active,.fade-leave-active{
        transition: all 1s;
      }
      .fade-enter,.fade-leave-to{
        opacity: 0
      }
  ```

#### 多组件过渡

- 不需要使用 key，只需要使用动态组件

  ```js
    <div id="transition-component-demo">
      <button @click="view="v-a">
          on
        </button>
        <button @click="view="v-b">
          off
        </button>
      <transition name="fade" mode="out-in">
        <component :is="view"></component>
      </transition>
    </div>
  ```

  ```
      new Vue({
        el: 'transition-component-demo',
        data:{ view:'v-a'},
        components:{
          'v-a':{
            template:'<div>Component A</div>
          },
          'v-b':{
            template:'<div>Component B</div>
          }
        }
      })
      .component-fade-enter-active,.component-fade-leave-active{
        transition: all 1s;
      }
      .component-fade-enter,.component-fade-leave-to{
        opacity: 0
      }
  ```

#### 列表过渡

- 不同于 <transition>，它会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag 属性更换为其他元素。

* 过渡模式 mode 不可用。
* 内部元素 总是需要 提供唯一的 key 属性值。
* CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

  ```
      <div id="list-demo" class="demo">
        <button v-on:click="add">Add</button>
        <button v-on:click="remove">Remove</button>
        <transition-group name="list" tag="p">
          <span v-for="item in items" :key="item" class="list-item">
            {{ item }}
          </span>
        </transition-group>
      </div>
  ```

  ```
      new Vue({
        el: '#list-demo',
        data: {
          items: [1,2,3,4,5,6,7,8,9],
          nextNum: 10
        },
        methods: {
          randomIndex: function () {
            return Math.floor(Math.random() * this.items.length)
          },
          add: function () {
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
          },
          remove: function () {
            this.items.splice(this.randomIndex(), 1)
          },
        }
      })
  ```

  ```
      .list-item {
        display: inline-block;
        margin-right: 10px;
      }
      .list-enter-active, .list-leave-active {
        transition: all 1s;
      }
      .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
      }
  ```
