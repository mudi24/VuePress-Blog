---
title: "Promise和async、await"
sidebarDepth: 2
---

#### Promise

- Promise 是一个类

1. Promise.all()

   - 返回一个 **Promise 实例**， 所有 promise 都成功才会成功，有一个 promise 失败则为失败。
     ```
       Promise.all([promise1, promise2,promise3).then(function(values) {
           console.log(values);
       });
     ```

2. Promise.race()

   - 返回一个 **promise**，一旦 Promise 中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。

   ```
     const promise1 = new Promise(function(resolve, reject) {
           setTimeout(resolve, 500, 'one');
     });

     const promise2 = new Promise(function(resolve, reject) {
           setTimeout(resolve, 100, 'two');
     });

     Promise.race([promise1, promise2]).then(function(value) {
           console.log(value);
     });
   ```

3. Promise.reject

   - 返回一个带有拒绝原因的 **Promise 对象**

   ```
     function resolved(result) {
           console.log('Resolved');
     }

     function rejected(result) {
           console.error(result);
     }

     Promise.reject(new Error('fail')).then(resolved, rejected);
   ```

4. Promise.resolve

   - 返回一个以给定值解析后的 **Promise 对象**

   ```
     Promise.resolve("Success").then(function(value) {
           console.log(value); // "Success"
     }, function(value) {
           // 不会被调用
     });
   ```

- Promise.prototype.then

  - 返回一个 **Promise**

  ```
    const promise1 = new Promise(function(resolve, reject) {
          resolve('Success!');
    });

    promise1.then(function(value) {
          console.log(value);
          // expected output: "Success!"
    });
  ```

- Promise.prototype.finally

  - 返回一个 **Promise**。在 promise 结束时，无论成功还是失败都会执行指定的回调函数。避免了同样的语句需要在 then()和 catch()中各写一次的情况。

- Promise.prototype.catch
  - 返回一个 **Promise**。用来捕获错误

#### async、await

- 看起来更像同步，是否需要优先渲染

  ```
    function start() {
     getWeather('北京').then(weather1 => {
        console.log('北京:' + weather1.weather)
     })
     .then(() => getWeather('杭州'))
     .then(weather2 => {
        console.log('杭州:' + weather2.weather)
     })
    }.catch(err=>console.log(err))

    async function start() {
      let weather1 = await getWeather('北京')
      console.log('北京:' + weather1.weather)
      let weather2 = await getWeather('杭州')
      console.log('杭州:' + weather2.weather)
    }
    start().catch(err=>console.log(err))
  ```

#### 手写简易 Promise

```
class Promise2 = {
  state = 'pending'
  succeed = null
  fail = null

  resolve(result){
    setTimeout(()=>{
      this.state = 'fulfilled'
      this.succeed(result)
    })
  }
  reject(err){
    setTimeout(()=>{
      this.state = 'rejected'
      this.fail(err)
    })
  }
  constructor(fn){
    fn(this.resolve.bind(this), this.reject.bind(this))
  }
  then(succeed, fail){
    this.succeed = succeed
    this.fail = fail
  }
}
```

#### 封装 JSONP

```
function jsonp(url,data={}){
  return new Promise((resolve,reject) => {
    window._fn_ = data => resolve(data)
    let script = document,createElement('script')
    let query = Object.entries(data).map(a => `${a[0]} = ${a[1]}`).join('&')
    script.src = url + '?callback = _fn_&' + query
    script.onerror = () =>reject('加载失败')
    document.head.appendChild(script)
    document.head.removeChild(script)
  })
}
jsonp('').then(data=>{},err=>{})
```

#### 服务器中转实现跨域

- 中转服务器

  ```js
    const http = require('http')
    const url = require('url')
    http.createServer((req, res) => {
      let urlObj = url.parse(req.url, true)
      if(urlObj.pathname === '/bridge') {
        http.get(urlObj.query.url, req => {
            let text = '' req.on('data', data => text += data)
            req.on('end',() => {
            res.setHeader('Access-Control-Allow-Origin','*')
            res.end(text)
          })
        })
      } else {
        res.writeHead(404, 'Not Found')
        res.end('not found')
      }
    }).listen(8888)
  ```

- 浏览器端
  ```js
  //当前代码在 http://js.jirengu.com 下运行
  fetch(
    "http://localhost:8888/bridge?url=" + encodeURIComponent("http://baidu.com")
  )
    .then((res) => res.text())
    .then((data) => console.log(data));
  ```
