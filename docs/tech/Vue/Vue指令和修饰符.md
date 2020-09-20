---
title: "Vue指令和修饰符"
sidebarDepth: 2
---

### template(模板)

- 写在 HTMl 中(Vue 完整版)

  ```
    <div id="xxx">
      {{n}}
      <button @click="add">+1</button>
    </div>

    new Vue({
      el: '#app',
      data: {n:0}, // data可以改成函数
      methods: {add(){}}
    })
  ```

* 写在 options 中(Vue 完整版)

  ```
  <div id="app"></div> // div#app会被替换

    new Vue({
      template: `
        <div>
          {{n}}
          <button @click="add">+1</button>
        </div>
      `,
      data: {n:0}, // data可以改成函数
      methods: {add(){}}
    }).$mounted('#app')
  ```

* 配合 xxx.vue 文件(Vue 非完整版)

  ```
  template 使用的是XML，语法严格，体积小，更适合写编译器
    <template>
      <div>
        <button @click="add">
          +1
        </button>
      </div>
    </template>

    <script>
      export default{
        data(){ return { n:0 }}, // data必须为函数
        methods:{add(){}}
      }
    </script>
  ```

  ```
  // 在其他地方引入
  import Xxx from './xxx.vue'
    new Vue({
      render: h => h(Xxx)
    }).$mounted('#app')
  ```

* HTML(语法松散) 和 XML(语法严格)

  ```
    HTML
      <input name="username">
      <input name="username" />
      <div></div>
    XML
      <input name="username" /> // 必须加反斜杠,表示标签结束了
      <div /> // 自闭合标签（不包含内容）
  ```

### 指令

- 表达式 `{{xxx}}`，如果值为 undefined 或 null 就不显示
- Vue 会把代码中的声明式语句(div.innerHTML = x)转化成命令式语句(`<div v-html="x"></div>`)来操作 DOM
- 如果指令的值里没有特殊字符，可以不加引号

#### 展示内容

```
   <div v-text="">展示文本</div>
   <div v-html="">展示html</div> // 谨慎使用
   <div v-pre="">不会编译，写什么展示什么</div>
```

#### 绑定属性或对象(v-bind 或:)

```
  <img v-bind:src="x" />
  <img :src="x" />
  <button :style="{border: '1px solid red, height: 100}">
  // 这里可以直接写成100，Vue兼容了js的这种写法:div.style.height = 100
```

#### 绑定事件(v-on 或@)

```
  <button v-on:click="add">+1</button> // 点击之后，Vue会运行add()
  <button v-on:click="xxx(1)">+1</button> // 点击之后，Vue会运行xxx(1)
  <button v-on:click="n+=1">+1</button> // 点击之后，Vue会运行n+=1
  <button @click="add">+1</button>
```

如果 xxx(1)返回一个函数，我们希望调用这个函数呢？（不推荐使用）
解决方法：把 xxx(1)赋值给一个变量 add

#### 条件判断(v-if)

```
  <div v-if="x === 0"></div>
  <div v-else-if="x > 0"></div>
  <div v-else></div>
```

#### 循环(v-for)

```
  <ul>
      <li v-for="(u, index) in users" :key="index"></li>
  </ul>
  <ul>
      <li v-for="(value, name) in users" :key="name"></li> // key要设置为唯一性的值
  </ul>
```

#### 显示隐藏(v-show)

```
  <div v-show="n%2 === 0"></div>
```

看得见的元素 display 不只有 block，如 table 的 display 为 table，li 的 display 为 list-item

#### v-cloak

```
  [v-cloak] { display: none}
  <div v-cloak>{{message}}</div> // 元素直到编译结束才会显示到页面中
```

### 修饰符

```
  @click.stop="add"表示阻止事件传播/冒泡
  @click.prevent="add"表示阻止默认行为
  @click.stop.prevent="add"表示同时阻止以上两种
```

#### .sync 修饰符

- 组件不能修改 props 外部数据
- \$emit 可以触发事件，并传参
- \$event 可以获取\$emit 的参数
- Vue 中组件间的传值是很常见的，因为 Vue 不允许子组件直接修改父组件传入的数据，所以 Vue 提供了.sync 修饰符(语法糖)来监听子组件对数据的修改

```
父组件
    <div>
      <Child :money="total" v-on:update:money="total = $event" />
      <Child :money.sync="total"> // 这行代码等价于上一行代码
    </div>
```

```
子组件
    <div>
      <button @click="$emit('update:money', money-100)" />
    </div>
```
