---
title: "jquery设计思想"
sidebarDepth: 2
---

1.  jQuery 获取元素

    - 将一个表达式，放进构造函数 jQuery()（简写为\$），然后得到被选中的元素。

    - 表达式可以是 CSS 选择器：

    ```
       $(document) // 选择整个文档

       $('#myId') // 选择ID为myId的网页元素

       $('div.myClass) // 选择class为myClass的div元素

       $('input[name=first]') // 选择name属性等于first的input元素
    ```

    - 也可以是 jQuery 特有的表达式

    ```
       $('a:first') //选择网页中第一个a元素

       $('tr:odd') //选择表格的奇数行

       $('#myForm :input') // 选择表单中的input元素

       $('div:visible') //选择可见的div元素

       $('div:gt(2)') // 选择所有的div元素，除了前三个

       $('div:animated') // 选择当前处于动画状态的div元素
    ```

    - jQuery 还支持对选中的元素进行过滤，对找到的元素再次进行筛选

    ```
    　$('div').has('p'); // 选择包含p元素的div元素

    　$('div').not('.myClass'); //选择class不等于myClass的div元素

    　$('div').filter('.myClass'); //选择class等于myClass的div元素

    　$('div').first(); //选择第1个div元素

    　$('div').eq(5); //选择第6个div元素
    ```

    - 也可以获取附近的相关元素(父子元素，兄弟元素)

    ```
    　　$('div').next('p'); //选择div元素后面的第一个p元素

    　　$('div').parent(); //选择div元素的父元素

    　　$('div').closest('form'); //选择离div最近的那个form父元素

    　　$('div').children(); //选择div的所有子元素

    　　$('div').siblings(); //选择div的同级元素
    ```

2.  jQuery 的链式操作

    - 每次调用 jQuery 函数或者 对 jQuery 进行操作时，返回的都是一个 jQuery 对象。这样就可以直接在后面对返回对象进行操作，而不用再次去获取。
    - jQuery 还提供了.end()方法，使我们可以拿到上一步的 jQuery 对象。

3.  jQuery 中的取值和赋值

    - jQuery 使用同一个函数来完成取值（getter）和赋值（setter），由函数的参数决定是取值还是赋值。

    ```
    　$('h1').html(); //html()没有参数，表示取出h1的值
      $('h1').html('Hello'); //html()有参数Hello，表示对h1进行赋值
    ```

    - 常见的赋值和取值函数如下

    ```
     .html() 取出或设置html内容

     .text() 取出或设置 text 内容

     .attr() 取出或设置某个属性的值

     .width() 取出或设置某个元素的宽度

     .height() 取出或设置某个元素的高度

     .val() 取出某个表单元素的值
    ```

    - 如果结果包含多个元素，那么赋值的时候，将对其中所有的元素赋值。而取值的时候，则是只取出第一个元素的值（.text()例外，它取出所有元素的 text 内容）。

4.  jQuery 操作元素（元素的增删改查）

    - 创建元素，把新的元素作为参数传入 jQuery 的构造函数中即可

    ```
     $('<p>Hello</p>');

     $('<li class="new">new list item</li>');

     $('ul').append('<li>list item</li>');
    ```

    - 复制元素使用.clone()。

    - 删除元素
      - .remove() 删除元素本身，所有绑定的事件和与元素相关联的 jQuery 数据都将被删除。
      - .detach() 删除元素本身，但保留所有与删除的元素关联的 jQuery 数据。可以将删除的元素重新插入文档。

    * 清空元素内容（但是不删除该元素）使用.empty()。

5.  jQuery 移动元素

    - 移动元素有通常有两种方案来实现
      - 移动自身
      - 移动周围其他元素
    - 举个栗子：把一个 div 元素移动到 p 元素后面。
      - 第一种方法是使用.insertAfter()，把 div 元素移动 p 元素后面：
        ```
        $('div').insertAfter($('p'));
        ```
      - 第二种方法是使用.after()，把 p 元素加到 div 元素前面：
        ```
        $('p').after($('div'));`
        ```

    * 看起来实现的效果是相同的，但是返回值不同，可以根据实际情况来决定使用对应的方法

    * 四种操作方法：

    ```
     .insertAfter()和.after()：在当前元素的外部，从后面插入元素

     .insertBefore()和.before()：在当前元素的外部，从前面插入元素

     .appendTo()和.append()：在当前元素的内部，从后面插入元素

     .prependTo()和.prepend()：在当前元素的内部，从前面插入元素
    ```

6.  jQuery 方法

    - jQuery 还提供了一些与元素无关的方法。不必选中元素，就可以直接使用这些方法。（定义在 jQuery 构造函数上的方法）

      ```
        $.trim() 去除字符串两端的空格。

        $.each() 遍历一个数组或对象。

        $.inArray() 返回一个值在数组中的索引位置。如果该值不在数组中，则返回-1。

        $.makeArray() 将对象转化为数组。

        $.type() 判断对象的类别（函数对象、日期对象、数组对象、正则对象等等）。

        $.isArray() 判断某个参数是否为数组。

        $.isEmptyObject() 判断某个对象是否为空（不含有任何属性）。

        $.isFunction() 判断某个参数是否为函数。

        $.isPlainObject() 判断某个参数是否为用"{}"或"new Object"建立的对象。
      ```

7.  jQuery 事件操作

    - 主要事件：

      ```
        .blur() 表单元素失去焦点。

        .click() 鼠标单击

        .focus() 表单元素获得焦点

        .keydown() 按下键盘（长时间按键，只返回一个事件）

        .keypress() 按下键盘（长时间按键，将返回多个事件）

        .submit() 用户递交表单
      ```

    - 使用.bind()可以更灵活地控制事件，比如为多个事件绑定同一个函数：

      ```
      $('input').bind(
      　　'click change', //同时绑定click和change事件
      　　function() {
      　　　　alert('Hello');
      　　}
      );
      ```

    - 有时，你只想让事件运行一次，这时可以使用.one()方法。

      ```
      $("p").one("click", function() {
            alert("Hello"); //只运行一次，以后的点击不会运行
        });
      ```

    * .unbind()用来解除事件绑定。
      ```
      　$('p').unbind('click');
      ```

8.  jQuery 特殊效果

    - 常用效果

    ```
    .fadeIn() 淡入

    .fadeOut() 淡出

    .fadeTo() 调整透明度

    .hide() 隐藏元素

    .show() 显示元素

    .slideDown() 向下展开

    .slideUp() 向上卷起

    .slideToggle() 依次展开或卷起某个元素

    .toggle() 依次展示或隐藏某个元素
    ```

    - 还可以用.animate()自定义复杂的特殊效果
      ```
      　　$('div').animate(
      　　{
      　　　　left : "+=50", //不断右移
      　　　　opacity : 0.25 //指定透明度
      　　},
      　　300, // 持续时间
      　　function() { alert('done!'); } //回调函数
        );
      ```
