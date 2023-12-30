# 事件委托

事件委托是利用事件流的特征解决一些开发需求的知识技巧

HTML元素含有嵌套关系，且事件流含有冒泡阶段。子元素触发事件会冒泡到父元素的相同事件上

一般情况只需要给子元素注册特定的事件处理程序即可，但子元素过多的时候就不能这么做了。

简单来说，事件委托就是父元素监听子元素的冒泡事件

案例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul>
        <li>我是一个元素</li>
        <li>我是一个元素</li>
        <li>我是一个元素</li>
        <li>我是一个元素</li>
        <li>我是一个元素</li>
    </ul>
    <script>
        // 不要每个小li注册事件了 而是把事件委托给它的爸爸
        //事件委托是给父亲添加事件，而不是给孩子添加事件
        let ul = document.querySelector('ul');
        ul.addEventListener('click',function() {
            alert('我被点击了')
        })
        //先到小li上找有没有点击事件，然后发现没有，开始冒泡，冒泡到父元素ul上，然后发现
        //ul元素有点击事件，所以直接触发ul的点击事件
    </script>
</body>

</html>
```

---



当然了，我们还可以这么用

```html
![动画](C:\Users\meowr\Desktop\动画.gif<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul>
        <li>我是一个元素</li>
        <li>我是一个元素</li>
        <li>我是一个元素</li>
        <li>我是一个元素</li>
        <li>我是一个元素2</li>
    </ul>
    <script>
        // 不要每个小li注册事件了 而是把事件委托给它的爸爸
        //事件委托是给腹肌添加事件，而不是给孩子添加事件
        let ul = document.querySelector('ul');
        ul.addEventListener('click',function(e) {
            e.target.style.color = 'red';

        })
        //先到小li上找有没有点击事件，然后发现没有，开始冒泡，冒泡到父元素ul上，然后发现
        //ul元素有点击事件，所以直接触发ul的点击事件
    </script>
</body>

</html>
```

![动画](https://static.meowrain.cn/i/2022/07/19/nr2om6-3.gif)