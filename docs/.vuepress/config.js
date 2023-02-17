module.exports = {
  title: "知识宝库",
  base: "/blog/",
  head: [
    // 注入到当前页面 <head> 中的标签
    ["link", { rel: "icon", href: "" }], //增加一个自定义的 favicon(网页标签的图标)
  ],
  themeConfig: {
    logo: "", // 左上角logo
    nav: [
      // 导航栏配置
      { text: "技术文档", link: "/tech/" },
      { text: "公众号", link: "/wechat" },
      { text: "个人简介", link: "/intro" },
      {
        text: "掘金主页",
        link: "https://juejin.cn/user/2137106337773645/posts",
      },
    ],
    // sidebar: 'auto',  // 侧边栏配置
    // sidebarDepth: 2
    sidebar: [
      {
        title: "构建",
        children: ["/tech/构建/构建VuePress", "/tech/构建/构建React+TS"],
      },
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
        ],
      },
      {
        title: "JS",
        children: [
          "/tech/JS/JS的诞生",
          "/tech/JS/JS基本语法",
          "/tech/JS/数据类型",
          "/tech/JS/JS继承",
          "/tech/JS/JS中的六种继承方式",
          "/tech/JS/JS原型",
          "/tech/JS/JS对象基本用法",
          "/tech/JS/JS函数的执行时机",
          "/tech/JS/Promise和async、await",
          "/tech/JS/垃圾回收",
        ],
      },
      {
        title: "JS设计模式",
        children: ["/tech/JS设计模式/构造器模式和工厂模式"],
      },
      {
        title: "jQuery",
        children: [
          "/tech/jQuery/jquery的设计思想",
          "/tech/jQuery/jquery设计模式",
        ],
      },
      {
        title: "Vue",
        children: [
          "/tech/Vue/初识Vue",
          "/tech/Vue/Vue数据响应式",
          "/tech/Vue/Vue指令和修饰符",
          "/tech/Vue/Vue进阶属性",
          "/tech/Vue/Vue动画",
          "/tech/Vue/mixin",
          "/tech/Vue/computed和watch",
          "/tech/Vue/TS结合Vue",
          "/tech/Vue/Vue 3 和 Vue 2 的差别",
          "/tech/Vue/Vue.js 运行机制（概览）",
        ],
      },
      {
        title: "React",
        children: [
          "/tech/React/浅尝React",
          "/tech/React/探索React Hooks原理",
          "/tech/React/React Hooks的API",
          "/tech/React/React组件",
          "/tech/React/函数式编程",
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
        title: "Node.js",
        children: [
          "/tech/Node.js/Node.js入门",
          "/tech/Node.js/FileSystem",
          "/tech/Node.js/Jest测试",
          "/tech/Node.js/HTTP模块",
          "/tech/Node.js/commander-translation",
          "/tech/Node.js/数据库",
          "/tech/Node.js/Docker",
          "/tech/Node.js/commonjs规范",
        ],
      },
      {
        title: "正则表达式",
        children: ["/tech/正则表达式/正则表达式"],
      },
      {
        title: "面试",
        children: ["/tech/面试/面试押题", "/tech/面试/前端面试题"],
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
};
