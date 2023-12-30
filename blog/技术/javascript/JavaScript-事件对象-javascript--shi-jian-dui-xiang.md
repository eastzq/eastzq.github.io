# 获取事件对象

目标：能说出什么事事件对象

- 事件对象是什么

  - 也是一个对象，这个对象里有事件触发时的相关信息
  - 例如：鼠标点击事件中，事件对象就存了鼠标点在哪个位置等信息

- 如何获取

  - 在事件绑定的回调函数的第一个参数就是事件对象
  - 一般命名为event,ev,e

  ```javascript
      元素.addEventListener('click',function (e) {
  
      }
  ```

  

   示范：

```html
<button>点击</button>
<script>
    let btn = document.querySelector('button');
    btn.addEventListener('click',function (e) {
        console.log(e); //输出事件对象
    })
</script>
```

![image-20220718210153180](https://static.meowrain.cn/i/2022/07/18/yr707a-3.png)



# 常见鼠标事件

![image-20220718211903856](https://static.meowrain.cn/i/2022/07/18/z1mdi1-3.png)

# 事件对象常用属性

type : 事件种类

clientX,clientY:获取光标相对于浏览器可见窗口左上角的位置

offsetX/offsetY: 获取光标相对于当前DOM元素左上角的位置

key: 用户按线的键盘键的值

​	  现在不提倡使用keyCode





```html
<button>点击</button>
<script>
    let btn = document.querySelector('button');
    btn.addEventListener('mousemove',function (e) {
        console.log(e.clientX,e.clientY);
    })
</script>
```



![image-20220718211403065](https://static.meowrain.cn/i/2022/07/18/yymzf0-3.png)





# 初音未来跟随鼠标案例

> 需求：一张图片一直跟着鼠标移动
>
> 分析：
>
> 1. 鼠标在页面中移动，用到mousemove事件
> 2. 不断把鼠标在页面中的坐标位置给图片left和top值即可



```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 50px;
        }
    </style>
</head>
<body>
<img src="../img/R-C.jpg" alt="" class="img">
<script>
    let img = document.getElementsByClassName('img')[0];
    document.addEventListener('mousemove', function (e) {
        img.style.left = e.pageX + 'px';
        img.style.top = e.pageY + 'px';
    })
</script>
</body>
</html>
```

<img src="https://static.meowrain.cn/i/2022/07/18/zdpbqg-3.jpg" alt="R-C" style="zoom: 33%;" />

