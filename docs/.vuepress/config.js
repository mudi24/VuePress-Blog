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
        '/components/构建VuePress'
      ]
    },{
      title: 'Node.js',
      children: [
        '/tech/Node.js入门',
        '/tech/FileSystem',
        '/tech/Jest测试',
        '/tech/HTTP模块',
        '/tech/commander-translation'
      ]
    }]
  }
}