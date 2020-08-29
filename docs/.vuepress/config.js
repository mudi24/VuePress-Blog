module.exports = {
  title: '知识宝库',
  head: [ // 注入到当前页面 <head> 中的标签
    ['link',{rel:'icon',href:''}] //增加一个自定义的 favicon(网页标签的图标)
  ],
  themeConfig: {
    logo: '', // 左上角logo
    nav: [  // 导航栏配置
      {text:'技术文档', link: '/tech/'},
      {text: '掘金主页', link: ''},
    ],
    // sidebar: 'auto',  // 侧边栏配置
    // sidebarDepth: 2
    sidebar: [{
      title: '构建',
      children: [
        '/tech/构建/构建VuePress',
        '/tech/构建/构建React+Ts'
      ]
    },
    {
      title: 'VS Code',
      children: [
        '/tech/VS Code/VS Code常用快捷键'
      ]
    },
    {
      title: 'git',
      children: [
        '/tech/Git/git快速上手',
        '/tech/Git/git常用命令',
      ]
    },
    {
      title: 'Sass',
      children: [
        '/tech/Sass/Sass快速上手',
      ]
    },
    {
      title: 'Bootstrap',
      children: [
        '/tech/Bootstrap/Bootstrap快速上手',
      ]
    },
    {
      title: 'DOM',
      children: [
        '/tech/DOM/常见事件与DOM事件模型',
      ]
    }
    ,{
      title: 'Node.js',
      children: [
        '/tech/Node.js/Node.js入门',
        '/tech/Node.js/FileSystem',
        '/tech/Node.js/Jest测试',
        '/tech/Node.js/HTTP模块',
        '/tech/Node.js/commander-translation'
      ]
    },
    {
      title: '算法',
      children: [
        '/tech/算法/排序算法',
      ]
    },
    {
      title: '开源',
      children: [
        '/tech/开源/开源许可证',
      ]
    }
  ]
  }
}