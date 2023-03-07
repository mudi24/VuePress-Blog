---
title: ReactRouter
sidebarDepth: 2
---

## ReactRouter

- 官方文档：https://reactrouter.com/web/guides/quick-start

### 下载

```
yarn add react-router
yarn add --dev @types/react-router-dom
```

### 重定向

```js
<Redirect exact from="/" to="/money" />
```

### 404 页面

```js
<Route path="*">
  <NoMatch />
</Route>
```

### hash 模式与 history 模式
