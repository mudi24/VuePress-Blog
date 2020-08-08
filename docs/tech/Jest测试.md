# 使用 jest 进行测试

## 设计测试用例

## 单元测试、功能测试、集成测试

## 白盒测试

重点：

- 单元测试不应该与外界打交道
- 单元测试的对象是函数
- 功能测试的对象是模块
- 集成测试的对象是系统（会和外界打交道）

```
yarn add --dev jest
```

```
在package.json中添加
"scripts":{
  "test":"jest"
}
```

## 在项目目录下新建一个 test 文件夹，用来放测试文件

## 命名规范，单元测试通常叫做 db.unit.js 或 db.spec.js

describe 描述
it 它（要测试的对象）
expect
toBe

## 测试 fs 的读取功能是否有效，怎么测试呢？当然是在一个文件中写一些东西，然后判断是否可以正确的读取到内容。但是，这样需要依赖外部环境，新建文件以及输入内容，测试结果就会受到外部因素的影响，可能并不准确。

## 那么，我们应该怎么做呢，jest 提供了一种方式，就是使用模拟的文件系统来进行操作

```
// __mock__/fs.js
const fs = jest.genMockFromModule('fs');

fs.x = () => {
  console.log('hello mock');
  return 'xxx'
}

module.exports = fs
```

```
// db.spec.js
const fs = require('fs')
jest.mock('fs')
```

# 将路径放入 mock 中，在执行模拟读写文件操作时，判断路径是否在 mock 中，如果在 mock 中，则在模拟文件上进行读写操作。

# 在测试结束后要清除 mock，防止互相影响
