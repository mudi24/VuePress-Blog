---
title: React记账项目
sidebarDepth: 2
---

### activeClassName

- activeClassName 只能在 NavLink 组件中使用
- NavLink 本质是一个 a 标签

```html
<NavLink to="/tags" activeClassName="selected">
  <Icon name="tags"></Icon>
  标签页
</NavLink>
```

### svgo-loader 去掉 svg 图标的 fill 属性
```js
{loader:'svgo-loader', 
  options:{
    plugins:[
      {removeAttrs:{attrs: 'fill'}}
    ]
  }
}
```