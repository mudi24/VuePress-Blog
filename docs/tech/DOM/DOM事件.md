---
title: "DOM事件"
sidebarDepth: 2
---

### 事件捕获与事件冒泡

- DOM 事件流三个阶段：事件捕获阶段，处于目标阶段，事件冒泡阶段

### 事件绑定

#### addEventListener

- target.addEventListener(type, listener, options)
  - type: 事件类型
  - listener: 事件处理函数
  - options: 可选，默认都为 false。
    {capture:是否捕获阶段监听，once:是否只监听一次，passive:是否忽略 preventDefault}

* target.addEventListener(type, listener, useCapture)
  - useCapture:可选，true 表示在捕获阶段调用 listener，false 表示在冒泡阶段调用 listener
* target.removeEventListener

  - target.removeEventListener('click', handler)
  - target.removeEventListener('click', handler, true)

  ```
      $btn.onclick = function(e) {
          console.log('点了')
      }
      $btn.addEventListener('click', function(e){
          console.log('点')
      }, true)
  ```

### 阻止事件传播

- e.stopPropagation()

### 阻止默认行为

- e.preventDefault()
  ```
    $form.addEventListener('submit', function(e) {
      e.preventDefault()
      if(validUsername($username.value)) { // 表单提交前校验
        this.submit()
      } else {
        $error.innerText = '密码不符合规则'
      }
    })
  ```

### 事件代理

- 事件绑定代理给父元素，由父元素根据事件来源统一处理

- 适用于可能会新增子元素的场景
- 事件代理实际上是事件冒泡的应用
  ```
    $container.onclick = function(e){
      console.log(e)  // e.target不准确
      let $box = e.path.find(el => el.classList && el.classList.contains('box'))
      if($box) {
        $log.innerText = $box.innerText
      }
    }
  ```

### 常见事件

- mouseenter 指针移到有事件监听的元素内（不冒泡）
- mouseleave 指针移出元素范围外（不冒泡）
- mouseover 指针移到有事件监听的元素或者它的子元素内
- mouseout 指针移出元素，或者移到它的子元素上。
- focus 获取焦点
- blur 失去焦点
- keydown 按下
- keyup 松开
- change 内容改变
- submit
- scroll
- resize 调整页面大小
- DOMContentLoader DOM 结构解析完成

MDN 事件：https://developer.mozilla.org/zh-CN/docs/Web/Events
