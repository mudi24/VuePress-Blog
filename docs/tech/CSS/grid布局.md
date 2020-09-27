---
title: "grid布局"
sidebarDepth: 2
---

## grid 布局（待完善）

### grid 布局是一种二维布局模型，先在页面上画好“虚拟格子”，再设置元素在格子上的位置和跨度

#### 容器属性

1. 声明使用 grid 布局
   - display: grid; / inline-grid
2. 画好虚拟表格
   - grid: 30px auto 30px / 10% 1fr 10% (3 行 3 列)
   - grid-gap: 10px 20px; (行与列之间的间隙)
3. 告诉内容如何放置
   - align-items: start | end | center | stretch;
   - justify-items: start | end | center | stretch;
   - align-content: start;
   - justify-content: space-evenly;
4. 子项属性
   - grid-column： 3 / span 2; (从第三条线开始，跨越两个格子 => 3 / 5)
     - grid-column-start （可以设为负值，可以设为比 start 小的值）
     - grid-column-end
   - grid-row: 3 / 4;
     - grid-row-start
     - grid-row-end
   - justify-self: start;
   - align-self: center;

#### 掘金首页

```
<body>
  <header>header</header>
  <div class="subnav">subnav</div>
  <main>main</main>
  <aside>aside</aside>
</body>
```

```
body{
  display: grid;
  grid: auto auto auto / 1fr 800px 180px 1fr;
}
header{
  grid-area:1/2/2/4;
}
.subnav{
  grid-area:2/2/3/4;
}
main{
  grid-area: 3/2/4/3;
}
aside{
  grid-area: 3/3/4/4;
}
```

grid 属性文档: https://blog.jirengu.com/?p=990

### 居中方式

1.  ```
    .box{
      display: grid;
      align-items: center;
      justify-items: center;
    }
    ```
2.  ```
    .box{
      display: grid;
      align-items: center;
      justify-content: center;
    }
    ```
3.  ```
    .box{
      display: grid;
    }
    .box>p{
      margin: auto;
    }
    ```
4.  ```
    .box{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ```
5.  ```
    .box{
      display: flex;
    }
    .box>p{
      margin: auto;
    }
    ```
6.  ```
    .box的父元素{
      display: table;
    }
    .box {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
    p {
      display: inline-block;
    }
    ```
7.  ```
    .box{
      display: relative;
    }
    .box>p{
      display: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
    }
    ```
8.  ```
    .box{
      text-align: center;
    }
    .box::after{
      content: '';
      line-height: 200px;
    }
    .box>p{
      display: inline-block;
    }
    ```
