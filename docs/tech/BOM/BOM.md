---
title: "BOM"
sidebarDepth: 2
---

### BOM

- BOM(Browser Object Model)浏览器对象模型，提供了独立于内容的、可以与浏览器窗口进行互动的对象结构

* var 声明的全局变量和 function 声明的函数是 window 的属性
* let、const 声明的变量不是

#### navigator 浏览器相关信息

- navigator.userAgent
  ```
  // 判断用户设备
  const isIPhone = /iphone/i.test(navigator.userAgent)
  const isIOS = /iphone|ipad/i.test(navigator.userAgent)
  const isAndroid = /android/i.test(navigator.userAgent)
  ```

#### screen 屏幕信息

- screen.availWidth 可用宽度
- screen.availHeight 可用高度
  ```
  // 判断是横屏还是竖屏
      screen.orientation.onchange = function(){
        console.log(screen.orientation.type)
        // "landscape-primary" 水平宽度大于垂直宽度
        // "portrait-primary" 垂直宽度大于水平宽度
      }
  ```

#### 尺寸

- 页面文档高度: document.documentElement.offset
  Height

* 屏幕高度: screen.height
* 浏览器视窗高度: document.documentElement.clientHeight / window.innerHeight
* 页面滚动的垂直距离: document.documentElement.scrollTop / window.scrollY
* 距离最近的是定位元素的祖先元素: element.offsetParent
* 距离最近的是定位元素的祖先元素的距离: element.offsetTop
* 获取元素在视窗中的位置: element.getBoundingClientRect()
* 元素距离页面顶部的距离: element.getBoundingClientRect().top + document.body.scrollTop
* 判断元素是否出现在窗口视野中:
  ```
  // 元素到页面顶部距离小于浏览器视窗高度（元素不在视窗下方）
  element.getBoundingClientRect().y < window.innerHeight
  // 元素到页面顶部距离加上元素自身高度大于 0 （元素不在视窗上方）
  element.getBoundingClientRect().y + element.getBoundingClientRect().height > 0
  ```

#### 滚动

- window.scrollTop

  ```
  // 平滑滚动到哪里
    window.scrollTop({
      top: 100,
      left: 0,
      behavior: 'smooth' // 变成平滑的过渡
    })
  // 平滑滚动多少
    window.scrollTop({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    })
  ```

#### alert(), prompt(), confirm()

- 弹框提示
- 接收输入
- 确定取消

#### URL 编码解码

- decodeURI

- decodeURIComponent()

- encodeURI() // 不会对: / ? = # 编码，只会转义中文以及其他特殊符号

- encodeURIComponent() // 会对: / ? = # 编码
  ```
  // "https://xiedaimala.com/sign_in/?redirect_to=https%3A%2F%2
      Fhttps%3A%2F%2Fxiedaimala.com%2Fclass%3Fq%3Dfe%26page%3D1"
  let url = `https://xiedaimala.com/sign_in/?redirect_to=
      ${encodeURIComponent('https://xiedaimala.com/class?q=fe&page=1')}`
  ```
  ```
  // "http://blog.jirengu.com/?cat=11&a=%E9%A5%A5%E4%BA%BA%E8%B0%B7"
  let url2 = encodeURI("http://blog.jirengu.com/?cat=11&a=饥人谷")
  ```

#### Cookie

- cookie 是存储在浏览器上的一小段数据，用来记录某些当页面关闭或者刷新后仍然需要记录的信息。在控制台用 document.cookie 查看你当前正在浏览的网站的 cookie。

* 使用 HTTP 协议规定的 set-cookie 来设置 cookie
* 每次网络请求 Request headers 中都会带 cookie。
* 一般浏览器存储 cookie 最大容量为 4k，所以大量数据不要存到 cookie。
* 设置 cookie 的参数：
  - path：表示 cookie 影响到的路径，匹配该路径才发送这个 cookie。
  - expires 和 maxAge：告诉浏览器 cookie 什么时候过期，maxAge 是 cookie 多久后过期的相对时间。不设置这两个选项时会产生 session cookie，当用户关闭浏览器时，就被清除。一般用来保存 session 的 session_id。
  - secure：当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
  - httpOnly：浏览器不允许脚本操作 document.cookie 去更改 cookie。一般情况下都应该设置这个为 true，这样可以避免被 xss 攻击拿到 cookie。

#### Session

- session 用于记录用户的相关信息，验证用户身份

#### localStorage

- 存储用户本地数据，5M~10M

```
// 设置
  let information = {name: 'Irelia',friends:['fang', 'yuan']}
  localStorage.detail = JSON.stringify(information)
  localStorage['age'] = 20
  localStorage.setItem('sex', 'male')
```

```
// 删除
  localStorage.removeItem('sex')
  localStorage.clear()
```
