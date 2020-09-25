---
title: "CSS选择器"
sidebarDepth: 2
---

- 通用选择器
  ```
  * {
      box-sizing: border-box;
  }
  .box *{
      font-size: 24px;
  }
  ```

* 属性选择器

  ```
  [disabled]{
      border:1px solid #ccc;
  }
  [type="text"]{
      border:1px solid #ccc;
  }
  [id="title"]{
     border:1px solid #ccc;
  }
  [data-color="gray"]{
      color: #666;
  }
  ```

* 不常用的选择器
  - [attr~=val] 仅选择 attr 属性的值（以空格间隔出多个值）中有包含 val 值的所有元素，比如位于被空格分隔的多个类（class）中的一个类。
    ```
    [class~="aa"]{}
    ```
  * [attr*=val] 选择 attr 属性的值中包含字符串 val 的元素。
    ```
    [href*="baidu.com"]{}
    ```
  * [attr^=val] 选择 attr 属性的值以 val 开头（包括 val）的元素。
    ```
    [data-name^="frank"]{}
    ```
  * [attr$=val] 选择 attr 属性的值以 val 结尾（包括 val）的元素。
    ```
    [data-name$="1"]{}
    ```
  * [attr|=val] 选择 attr 属性的值是 val 或以 val-开头的元素（-用来处理语言编码）。
    ```
    [data|="写代码"]{}
    ```
* 组合选择器

  - A, B :同时选中 A 和 B

    ```
    .author, .detail{}
    ```

  - A B :选中 A 的后代 B 元素(有空格)
    ```
    .detail li{}
    ```

  * AB :选中既是 A 又是 B 的元素(无空格)

    ```
    .item.active{}
    ```

  * A>B :选中 A 的直接子元素 B
  * A+B :选中 A 的下一个相邻元素
  * A~B :选中 A 的后面全部相邻元素 B

* 伪类
  - :nth-child(2n){}
  - :first-of-type{}
  - :last-of-type{}
  - :nth-of-type(2) 作为自己父亲当前标签类型的第 x 个孩子

- 伪类
  - :link 选中未访问的链接
  - :hover 选中鼠标放置上的链接
  - :active 选中鼠标按下未松开时的链接
  - :visited 选中访问过的链接
  - :link - :visited - :hover - :active 顺序

* 更多伪类
  - :checked 选中被勾选的表单元素
  - :disabled 选中被禁用的表单元素
  - :focus 选中被激活的表单元素
  - :root 选中根节点`<html></html>`

- 伪类

  - :target 选中页面上 id 为当前 hash 的元素
    - 不使用 JS 实现一个 Tab 切换 http://js.jirengu.com/fikan
    * 不使用 JS 实现弹框 http://js.jirengu.com/neyul

  * :not(xx) 选中不为 xx 的元素

* 伪元素

  - ::before
  - ::after

  ```
  .box::before{
          content: '前端'
  }
  ```

  - ::first-line 选中段落的第一行
  - ::first-letter 选中段落的第一个字符
  - ::selection 匹配被鼠标选中的文字内容

* 伪类表示一个元素的某种状态，伪元素则更像是一个元素。

### 多出来的文本显示为省略号

```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```
