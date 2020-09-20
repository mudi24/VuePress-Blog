---
title: "mockjs"
sidebarDepth: 2
---

- Mockjs 官方文档：http://mockjs.com/examples.html
- RAP2 官方文档：http://rap2.taobao.org/

* 常见用法：@ctitle(3, 10)、@cparagraph、@cword、@cname、@integer(10, 100)、@float(20, 30, 2, 3)、
  @color、@date、@time、@now、@id、@url、@email、@image('200x100')

  ```
  {
      'statusCode|1' : [1, 3, 2, 8],
      'msg': '@cword(4, 10)',
      'data|4': [
          {
            id: '@id',
            title: '@ctitle', author: '@cname', createdAt: '@datetime'
          }
      ]
  }
  ```

* String

  ```
    'name|min-max': string

    Mock.mock({
      "string|1-10": "★" // 重复 1-10 次
    })

    Mock.mock({
      "string|3": "★" // 重复三次
    })
  ```

- Number

  ```
    'name|+1': number

    Mock.mock({
      "number|1-100": 56 // 1-100
    })

    Mock.mock({
      "number|+1": 45 // +1
    })

    Mock.mock({
      "number|1-100.1-10": 45 // 1-100 中的随机数，并且小数点后有 1-10 位
    })
  ```

- Boolean

  ```
    'name|1': boolean

    Mock.mock({
      "boolean|1": true // true 或 false
    })
  ```

* Object

  ```
    'name|count': object

    Mock.mock({
      "object|2": { // 从属性中任选 2 个
        "310000": "上海市",
        "320000": "江苏省",
        "330000": "浙江省",
        "340000": "安徽省"
      }
    })

    Mock.mock({
      "object|2-4": { // 从属性中选 2-4 个
        "110000": "北京市",
        "120000": "天津市",
        "130000": "河北省",
        "140000": "山西省"
      }
    })
  ```

- Array

  ```
    'name|1': array
    Mock.mock({
      "array|1": [
      "AMD",
      "CMD",
      "UMD"
      ]
    })

    Mock.mock({
      "array|+1": [
      "AMD",
      "CMD",
      "UMD"
      ]
    })

    Mock.mock({
      "array|1-10": [
        {
          "name|+1": [ // +1 依次
            "Hello",
            "Mock.js",
            "!"
          ]
        }
      ]
    })
    结果：{
      "array": [
        {
          "name": "Hello"
        },
        {
          "name": "Mock.js"
        },
        {
          "name": "!"
        },
        {
          "name": "Hello"
        }
      ]
    }
  ```

- Function

  ```
    'name': function

    Mock.mock({
      'foo': 'Syntax Demo',
      'name': function() {
        return this.foo
      }
    })
  ```

* RegExp

  ```
      name': regexp

      Mock.mock({
        'regexp': /[a-z][A-Z][0-9]/
      })
  ```

#### 数据占位符

- Basic

  ```
    Mock.mock('@integer(60, 100)')
    Mock.mock({
      age: '@integer(60, 100)岁'
    })
  ```

- Date

  ```
    Mock.mock({
      createdAt: '@data'
    })
    Mock.mock({
      createdAt: '@time'
    })
    Mock.mock({
      createdAt: '@datetime'
    })
    Mock.mock({
      createdAt: '@now'
    })
  ```

- Image

  ```
    Random.image( size?, background?, foreground?, format?, text? )

    Mock.mock({
      imgUrl: @img('200x100', '#894FC4', '#FFF', 'png', '!')
    })
  ```

- Text

  ```
    Mock.mock({
      detail: '@paragraph' // 段落
      title: '@cword(8)' // word 英文 cword 汉字
    })
  ```

#### 接口约定

- 当前接口的路径是什么？ 如 /auth/register
- 当前接口的提交数据的类型是什么？
  - GET 获取数据
  * POST 提交或者创建
  * PATCH 修改数据，部分修改
  * DELETE 删除数据
  * PUT 修改数据，整体替换原有数据

* 参数类型/格式，比如
  - fromdata，或者 application/x-www-form-urlencoded

- 参数字段，及限制条件

* 返回成功的数据格式
* 返回失败的数据格式
* 接口范例：https://www.yuque.com/docs/share/08fd7cfb-6716-4409-9b15-fd9e9d491f34

#### 接口测试

- GET 请求
  curl "http://rap2api.taobao.org/app/mock/244238/getWeather?city=beijing"

* -d 提交的参数，默认是 POST 请求
  curl -d "username=aaaa&password=bbb" "http://rap2api.taobao.org/app/mock/244238/login"

- -i 展示响应头
  curl -d "username=hunger1&password=123456" "http://blog-server.hunger- valley.com/auth/login" -i

* -H 设置请求头
  curl -H "Content-Type:application/json" -X POST -d '{"user": "admin", "passwd":"12345678"}' http://127.0.0.1:8000/login

- -X 设置请求类型
  curl -d "username=aaaa&password=bbb" -X POST
  "http://rap2api.taobao.org/app/mock/244238/login"

* -b 请求带上 cookie
  curl "http://blog-server.hunger-valley.com/auth" -b
  "connect.sid=s%3AmeDbrn03UtTM8fqChaPQ20wmWlnKeHiu.e3uMtu7j1zQ1iNeaajCmxkYYG
  Q%2FyHV1ZsozMvZYWC6s"
