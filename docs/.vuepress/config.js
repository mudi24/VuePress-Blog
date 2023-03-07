module.exports = {
  title: "一起学前端",
  base: "/",
  head: [
    // 注入到当前页面 <head> 中的标签
    ["link", { rel: "icon", href: "" }], //增加一个自定义的 favicon(网页标签的图标)
  ],
  themeConfig: {
    logo: "", // 左上角logo
    nav: [
      // 导航栏配置
      { text: "面试题", link: "/interview/" },
      // { text: "js", link: "/js/" },
      { text: "vue", link: "/vue/" },
      { text: "react", link: "/react/" },
      // { text: "计算机基础", link: "/tech/" },
      { text: "node.js", link: "/node.js/" },
      {
        text: "掘金主页",
        link: "https://juejin.cn/user/2137106337773645/posts",
      },
    ],
    // sidebar: 'auto',  // 侧边栏配置
    sidebar: {
      "/interview/": [
        {
          title: "前端面试题",
          children: [
            // "/interview/面试/面试押题",
            "/interview/面试/面试题（CSS）",
            "/interview/面试/面试题（JS）",
            "/interview/面试/面试题（Vue）",
            "/interview/面试/面试题（React）",
            "/interview/面试/面试题（TS）",
            "/interview/面试/面试题（浏览器）",
            "/interview/面试/面试题（http和TCP）",
            "/interview/面试/面试题（性能优化）",
          ],
        },
      ],
      "/js/": [
        {
          title: "JS",
          children: [
            "/js/JS/JS的诞生",
            "/js/JS/JS基本语法",
            "/js/JS/数据类型",
            "/js/JS/JS继承",
            "/js/JS/JS中的六种继承方式",
            "/js/JS/JS原型",
            "/js/JS/JS对象基本用法",
            "/js/JS/JS函数的执行时机",
            "/js/JS/Promise和async、await",
            "/js/JS/垃圾回收",
          ],
        },
        {
          title: "JS设计模式",
          children: ["/js/JS设计模式/构造器模式和工厂模式"],
        },
      ],
      "/vue/": [
        {
          title: "Vue2",
          children: [
            // "/vue/vue2/mixin.md",
            // "/vue/vue2/初识Vue",
            // "/vue/vue2/Vue数据响应式",
            // "/vue/vue2/Vue指令和修饰符",
            // "/vue/vue2/Vue进阶属性",
            // "/vue/vue2/Vue动画",
            // "/vue/vue2/computed和watch",
            // "/vue/vue2/TS结合Vue",
            "/vue/vue2/Vue 3 和 Vue 2 的差别",
            "/vue/vue2/前端权限管理",
            "/vue/vue2/Vue.js 运行机制（概览）",
            "/vue/vue2/Vue.js 运行机制（响应式系统的基本原理）",
            "/vue/vue2/Vue.js 运行机制（响应式系统的依赖收集）",
            "/vue/vue2/Vue.js 运行机制（虚拟DOM的VNode节点）",
            "/vue/vue2/Vue.js 运行机制（template模板是如何进行编译的）",
            "/vue/vue2/Vue.js 运行机制（异步更新策略及nextTick原理）",
            "/vue/vue2/Vue.js 运行机制（diff算法与patch机制）",
            "/vue/vue2/Vue.js 运行机制（Vuex状态管理的工作原理）",
            "/vue/vue2/Vue.js 运行机制（总结&常见问题解答）",
          ],
        },
        { title: "Vue3", children: [] },
      ],
      "/react/": [
        {
          title: "React",
          children: [
            // "/react/React/浅尝React",
            "/react/React/探索React Hooks原理",
            "/react/React/React Hooks的API",
            "/react/React/React组件",
            // "/react/React/函数式编程",
          ],
        },
      ],
      "/node.js/": [
        {
          title: "Node.js",
          children: [
            "/node.js/Node.js/Node.js入门",
            // "/node.js/Node.js/FileSystem",
            // "/node.js/Node.js/Jest测试",
            // "/node.js/Node.js/HTTP模块",
            // "/node.js/Node.js/commander-translation",
            // "/node.js/Node.js/数据库",
            "/node.js/Node.js/Docker",
            // "/node.js/Node.js/commonjs规范",
            "/node.js/Node.js/CommonJS和ES Modules",
            "/node.js/Node.js/包管理工具NPM",
          ],
        },
      ],
      "/tech/": [
        {
          title: "VS Code",
          children: ["/tech/VS Code/VS Code常用快捷键"],
        },
        {
          title: "浏览器",
          children: [
            "/tech/浏览器/浏览器渲染原理",
            "/tech/浏览器/chrome快捷键",
            "/tech/浏览器/localForage",
            "/tech/浏览器/浏览器窗口传递数据",
          ],
        },
        {
          title: "前端性能优化",
          children: [
            "/tech/前端性能优化/前言",
            "/tech/前端性能优化/webpack 性能调优与Gzip原理",
            "/tech/前端性能优化/图片优化",
            "/tech/前端性能优化/浏览器缓存机制",
            "/tech/前端性能优化/本地存储",
          ],
        },
        {
          title: "阅读源码",
          children: [
            "/tech/阅读源码/为什么 Vue2 this 能够直接获取到 data 和 methods中的变量和方法？",
            "/tech/阅读源码/阅读axios源码工具函数（上）",
            "/tech/阅读源码/阅读axios源码工具函数（下）",
            "/tech/阅读源码/阅读Vue2源码工具函数",
          ],
        },
        {
          title: "git",
          children: [
            "/tech/Git/git",
            "/tech/Git/git快速上手",
            "/tech/Git/git常用命令",
          ],
        },
        {
          title: "HTML",
          children: ["/tech/HTML/html标签", "/tech/HTML/HTML入门笔记"],
        },
        {
          title: "CSS",
          children: [
            "/tech/CSS/css选择器",
            "/tech/CSS/css基础知识",
            "/tech/CSS/响应式布局",
            "/tech/CSS/css动画",
            "/tech/CSS/定位与层叠上下文",
            "/tech/CSS/flex布局",
            "/tech/CSS/grid布局",
            "/tech/CSS/简易Bootstrap",
            "/tech/CSS/移动端屏幕适配方案",
            "/tech/CSS/CSS 性能优化",
          ],
        },

        {
          title: "jQuery",
          children: [
            "/tech/jQuery/jquery的设计思想",
            "/tech/jQuery/jquery设计模式",
          ],
        },

        {
          title: "Webpack",
          children: [
            "/tech/Webpack/Webpack配置（基础篇）",
            "/tech/Webpack/Webpack进阶",
          ],
        },
        {
          title: "Sass",
          children: ["/tech/Sass/Sass快速上手", "/tech/Sass/Sass小记"],
        },
        {
          title: "TS",
          children: ["/tech/TS/5分钟学习TypeScript", "/tech/TS/TS特性（接口）"],
        },
        {
          title: "Bootstrap",
          children: ["/tech/Bootstrap/Bootstrap快速上手"],
        },
        {
          title: "DOM",
          children: [
            "/tech/DOM/常见事件与DOM事件模型",
            "/tech/DOM/DOM事件",
            "/tech/DOM/DOM diff算法",
          ],
        },
        {
          title: "BOM",
          children: ["/tech/BOM/BOM"],
        },
        {
          title: "http",
          children: [
            "/tech/http/跨域",
            "/tech/http/浅析URL",
            "/tech/http/http基础概念",
          ],
        },

        {
          title: "正则表达式",
          children: ["/tech/正则表达式/正则表达式"],
        },

        {
          title: "Mockjs",
          children: ["/tech/Mockjs/mockjs"],
        },
        {
          title: "数据结构和算法",
          children: [
            "/tech/数据结构和算法/数据结构-数组&栈&队列",
            "/tech/数据结构和算法/数据结构-链表",
            "/tech/数据结构和算法/数据结构-树",
          ],
        },
        {
          title: "算法",
          children: ["/tech/算法/排序算法"],
        },
        {
          title: "设计模式",
          children: ["/tech/设计模式/设计模式", "/tech/设计模式/MVC"],
        },
        {
          title: "开源",
          children: ["/tech/开源/开源许可证"],
        },
        {
          title: "常见英文词汇",
          children: ["/tech/常见英文词汇/前端词汇"],
        },
      ],
    },
  },
};
