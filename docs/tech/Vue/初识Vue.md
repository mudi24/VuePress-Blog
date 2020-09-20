---
title: "初识Vue"
sidebarDepth: 2
---

1. 创建项目

   ```
   vue create vue-demo // 或者 codesandbox.io 上创建
   ```

   - Vue 选项

     ```
     Babal (*)
     TypeScript
     Progressive Web App (PWA)Support
     Router
     Vuex
     CSS Pre-processors * // css预处理器
     Linter/Formatter (*)
     Unit Testing * // 单元测试
     E2E Testing
     ```

   - Lint 提示
     ```
     Lint on save // 保存时提示
     Lint and fix on commit // 提交时提示
     ```
   - unit testing
     ```
     Jest
     ```
   - preset for future projects : N

2. vue.js 与 vue.runtime.js
   - vue.js(完整版):
     - 我有 complier(编译器)
     - 可以直接写在 html 里或者写在 template 中
     - 体积会大一些
   ```
   new Vue({
        el: '#app',
        template: `<div id="app"></div>`
   })
   ```
   - vue.runtime.js(运行版):
     - 我没有 compiler，但是体积小
     - 写在 render 函数里，用 h 来创建标签
     - 我可以使用 webpack 中的 vue-loader 把 vue 文件里的 html 转换为 h 函数
   ```
   render(h){  //h = createElement
          return h('div', [this.n, h('button', {on:{click: this.add}},'+1')])
   }
   ```
   - 生产环境统一使用 vue.min.js / vue.runtime.min.js
   - webpack 默认使用的是 vue.runtime.js, 如果要使用 vue.js, 需要自行配置 alias(https://cn.vuejs.org/v2/guide/installation.html#webpack)
   - vue cli 默认使用的是 vue.runtime.js,如果需要引入 vue.js 需要额外配置
   * 最佳实践：总是使用非完整版，然后配合 vue-loader 和 vue 文件
3. SEO(搜索引擎优化)
   - 搜索引擎根据 curl 结果猜测页面
   - title, description(meta 标签), keyword(meta 标签), h1, a
   ```
   <meta name="description" content="xxx">
   <meta name="keyword" content="xxx">
   ```
   - 让 curl 得到页面的信息,SEO 就能正常工作
4. 用 codesandbox.io 进行预览: https://codesandbox.io/s/goofy-banzai-vq4jk
