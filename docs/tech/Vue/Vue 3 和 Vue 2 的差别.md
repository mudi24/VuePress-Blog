---
title: "Vue 3 和 Vue 2 的差别"
sidebarDepth: 2
---

## Vue 2

### Vue 2 的优点

- 响应式数据
- Options API
- SFC

除去这三位大将，不可或缺 Vuex/Vue-Router 这两位功臣，以及丰富的周边插件和活跃的社区。

### 缺点

- Options API 包含多个组件或功能时，每个变量的声明和操作变量的方法会分散在不同的地方，对代码维护的人很不友好

## Vue 3

### 优点

- 更强的性能，更好的 tree shaking
- Composition API + setup
- 更好地支持 TypeScript

### 缺点

* 需要自己对代码进行组织和管理，否则会很难维护

### 合理组织代码，避免以上缺点

Vue 2 中的 Vue 文件
```js
<template>
  <div>
    <p>{{ person.name }}</p>
    <p>{{ car.name }}</p>
  </div>
</template>

<script>
export default {
  name: "Person",

  data() {
    return {
      person: {
        name: "小明",
        sex: "male",
      },
      car: {
        name: "宝马",
        price: "40w",
      }
    };
  },

  watch:{
      'person.name': (value) => {
          console.log(`名字被修改了, 修改为 ${value}`)
      },
      'person.sex': (value) => {
          console.log(`性别被修改了, 修改为 ${value}`)
      }
  },

  methods: {
    changePersonName() {
      this.person.name = "小浪";
    },

    changeCarPrice() {
      this.car.price = "80w";
    }
  },
};
</script>
```
使用 Vue 3 的 Composition API 进行重写
```ts
<template>
  <p>{{ person.name }}</p>
  <p>{{ car.name }}</p>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";

// person的逻辑
const person = reactive<{ name: string; sex: string }>({
  name: "小明",
  sex: "male",
});
watch(
  () => [person.name, person.sex],
  ([nameVal, sexVal]) => {
    console.log(`名字被修改了, 修改为 ${nameVal}`);
    console.log(`名字被修改了, 修改为 ${sexVal}`);
  }
);
function changePersonName() {
  person.name = "小浪";
}

// car的逻辑
const car = reactive<{ name: string; price: string }>({
  name: "宝马",
  price: "40w",
});
function changeCarPrice() {
  car.price = "80w";
}
</script>
```

采用 Vue3 自定义 Hook 的方式，进一步拆分
```js
<template>
  <p>{{ person.name }}</p>
  <p>{{ car.name }}</p>
  <p>{{ animal.name }}</p>
</template>

<script lang="ts" setup>
import { usePerson, useCar, useAnimal } from "./hooks";

const { person, changePersonName } = usePerson();

const { car } = useCar();
</script>
```

```js
// usePerson.ts
import { reactive, watch } from "vue";

export default function usePerson() {
  const person = reactive<{ name: string; sex: string }>({
    name: "小明",
    sex: "male",
  });
  watch(
    () => [person.name, person.sex],
    ([nameVal, sexVal]) => {
      console.log(`名字被修改了, 修改为 ${nameVal}`);
      console.log(`名字被修改了, 修改为 ${sexVal}`);
    }
  );
  function changePersonName() {
    person.name = "小浪";
  }
  return {
    person,
    changePersonName,
  };
}
```
```js
// useCar.ts
import { reactive } from "vue";

export default function useCar() {
  const car = reactive<{ name: string; price: string }>({
    name: "宝马",
    price: "40w",
  });
  function changeCarPrice() {
    car.price = "80w";
  }
  return {
    car,
    changeCarPrice,
  };
}

```
Vue 3 可以帮助我们更好的组织代码，可以把每个变量的声明和修改变量的方法都放到一起

### Vue 3 的其他优点

* `<template>`标签中起始便签可以不用`<div>`标签，因为Vue3提供了片段的能力，使用Vue-detools中查看，可以看到有fragment的标记
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2d30c1c9db648bea38eeecb4c7d75f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
* Watch也不需要罗列多个了，Vue3中支持侦听多个源
* 很自然的使用TypeScript，类型约束更加简单


### 性能方面
Vue3 主要在这几个方面进行了提升

1. 编译阶段。对 diff 算法优化、静态提升等等
2. 响应式系统。Proxy()替代Object.defineProperty()监听对象。监听一个对象，不需要再深度遍历，Proxy()就可以劫持整个对象
3. 体积包减少。Compostion API 的写法，可以更好的进行 tree shaking，减少上下文没有引入的代码，减少打包后的文件体积
4. 新增片段特性。Vue 文件的`<template>`标签内，不再需要强制声明一个的`<div>`标签，节省额外的节点开销
