---
title: "Sass小记"
sidebarDepth: 2
---

### SASS

```
body
  color red
p
  font-size 10px
```

- Sass 十分简洁，语法中几乎不含括号。
- 后来前端工程师表示不含括号看不懂，于是 Sass 的开发者又提供了 Scss，含括号。

### SCSS

- 嵌套选择器

  ```
    .nav{
      border: 1px solid $grey;
      >ul{
        background: white
        >li{
          color: green;
        }
      }
    }
  ```

- 变量

  ```
      $grey: #666;
      $gray: $grey;
      $border-width: 1px;
  ```

- 函数(mixin)

  ```
      @mixin debug($border-color: red){  // 默认为红色
        border: 1px solid $border-color;
      }
      .nav{
        @include debug; // border为red
        >ul{
          background: white
          >li{
            @include debug(green);
          }
        }
      }
  ```

* 占位符选择器 placeholder(把 css 选择器加到样式前面)
  ```
  %box {
    box-shadow: 0 0 3px black;
    margin: 10px;
    background: pink;
  }
  .nav{
    @extend %box;
    >ul{
      background: white
      >li{
        @extend %box;
      }
    }
  }
  ```
