---
title: "JS继承"
sidebarDepth: 2
---

## JS 常用常考

- 闭包，原型
- 类，继承
- MVC，Flux
- 高阶函数
- 前端工程化

* 相同的代码使用多次，就应该使用函数进行封装
* 相同的属性需要使用多次，就应该做成共用属性（原型或类）
* 相同的原型需要使用多次，就应该使用继承（Event Bus）

```
class view extends EventBus{
  constructor(){
    super()
  }
}
```

## 基于 class 实现继承

```
class Parent{
  constructor(name1){
    this.name = name1
  }
  pMethod(){
    console.log(this.name1)
  }
}

class Child extends Parent{
  constructor(name2,name1){
    super(name1)  // Parent Constructor
    this.name2 = name2
  }
  cMethod(){
    console.log(this.name2)
  }
}
```

- 构造函数中使用的 super()只能在构造函数中使用，并且必须在使用 this 关键字前调用

## 基于原型实现继承

```js
function Parent(name1) {
  this.name1 = name1;
}
Parent.prototype.pMethod = function () {
  console.log(this.name1);
};
function Child(name2, name1) {
  Parent.call(this.name1); // 核心代码
  this.name2 = name2;
}
Child.prototype._proto_ = Parent.prototype; // 核心代码
Child.prototype.cMethod = function () {
  console.log(this.name2);
};
Child.prototype.constructor = Child; // 核心代码
```

- 老写法

```js
const empty = function () {};
empty.prototype = Parent.prototype;
Child.prototype = new empty();
```

- 使用新 api 的写法

```js
Human.prototype = Object.create(Mammal.prototype);
Human.prototype.constructor = Human;
```

# JS 实现继承有两种通用的方式

1. 构造函数 + 原型

   - 不写 Parent.call(this, name1)
     ![注释Parent.call(this, name1)](/images/nocall.png)
     注释掉 Parent.call(this, name1)之后，执行 pMethod 函数，pMethod 函数被 child 调用，this 指向 child，但在 child 中无法找到 name1，所以输出 undefined。

   - 正确代码
     ![正确代码](/images/normal.jpg)
     正确代码，需要把 this 指向通过 new Child 构造出来的实例对象(child)，并且把参数 name1 传给 Parent。

   * 终极代码

     ```
      function Parent(name1){
          this.name1 = name1
      }
      Parent.prototype.pMethod = function(){
          console.log(this.name1)
      }

      function Child(name2, name1){
          Parent.call(this, name1) // 得分点
          this.name2 = name2
      }
      Child.prototype.__proto__ = Parent.prototype
          //上面这句代码的古板写法应该是下面三句
          //const empty = function(){}
          //empty.prototype = Parent.prototype
          //Child.prototype = new empty()
          //还有一句也很重要，只是被人们忽视了
          //Child.prototype.constructor = Child

      Child.prototype.cMethod = function(){
          console.log(this.name2)
      }
     ```

2. class

   ```
   class Parent{
       constructor(name1){
           this.name1 = name1
       }
       pMethod(){
           console.log(this.name1)
       }
   }
   class Child extends Parent{
       constructor(name2, name1){
           super(name1) // 重点
           this.name2 = name2
       }
       cMethod(){
           console.log(this.name2)
       }
   }
   ```

   - 构造函数中使用的 super() 只能在构造函数中使用，并且必须在使用 this 关键字前调用。不调用的话执行函数会报错。
     ![](/images/class-error.jpg)

3. Mixin(混入)

   - 通过不使用继承的方式让一个类中的方法被其他类复用

     ```
       const mixin = (Base, mixins) => Object.assign(Base.prototype, mixins)
       const Fly = {
          canFly() { console.log('I can fly') }
       }
       class Mammal {
          birthChild() { console.log('I birth a baby') }
       }
       mixin(Mammal, Fly)

       let m = new Mammal()
       m.birthChild()
       m.canFly()
     ```

   - 变异版(使用继承实现，只是感觉更像混入)

     ```
      const FlyMixin = Base => class extends Base {
          canFly() { console.log('I can fly') }
      }
      const SwimMixin = Base => class extends Base {
          canSwim() { console.log('I can swim') }
      }
      class Mammal {
          birthChild() { console.log('I birth a baby') }
      }

      const FlyMammal = FlyMixin(Mammal)
      let m1 = new FlyMammal()
      m1.canFly()

      const FlySwimMammal = SwimMixin(FlyMixin(Mammal))
      let m2 = new FlySwimMammal()
      m2.canFly()
      m2.canSwim()
     ```
