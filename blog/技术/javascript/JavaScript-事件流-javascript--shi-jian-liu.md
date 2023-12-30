# 事件流

事件流指的是事件完整执行过程中的流动路径

捕获：父到子

冒泡：子到父

![image-20220719132235804](https://static.meowrain.cn/i/2022/07/19/lval9u-3.png)

事件冒泡概念：当一个元素的事件被处罚时，同样的事情将会在该元素的所有祖先元素中依次被触发。这一过程被称为事件冒泡

## 冒泡阶段

案例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .father {
            margin: 100px auto;
            width: 500px;
            height: 500px;
            background-color: pink;
        }
        .son {
            width: 200px;
            height: 200px;
            background-color: blueviolet;
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        let fa = document.querySelector('.father');
        let son = document.querySelector('.son');
        fa.addEventListener('click',function(){
            alert('hello i am father');
        })
        son.addEventListener('click',function() {
            alert('hello i am son')
        })
    </script>
</body>
</html>
```

> 上述案例中，儿子和父亲元素已经全部被创建了点击事件，但是我们在点击儿子元素后，不仅儿子的点击事件会被触发，父亲的点击事件也会被触发
>
> 如下动图：
>
> <img src="https://static.meowrain.cn/i/2022/07/19/ll5xho-3.gif" alt="动画" style="zoom:50%;" />



## 捕获阶段

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .father {
            margin: 100px auto;
            width: 500px;
            height: 500px;
            background-color: pink;
        }

        .son {
            width: 200px;
            height: 200px;
            background-color: blueviolet;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        let fa = document.querySelector('.father');
        let son = document.querySelector('.son');
        fa.addEventListener('click', function () {
            alert('hello i am father');
        }, true)
        son.addEventListener('click', function () {
            alert('hello i am son')
        }, true)
        document.addEventListener('click', function () {
            alert('grandfather')
        }, true)
    </script>
</body>

</html>
```

> 我们点击儿子元素后，会依次触发爷爷，父亲，儿子
>
> 如下图
>
> <img src="https://static.meowrain.cn/i/2022/07/19/lqf1l1-3.gif" alt="动画" style="zoom:50%;" />

 

# 阻止事件流动

目标：能够写出阻止事件流动的代码

因为默认就有冒泡模式的存在，所以容易导致事件影响到父级元素

若想把事件就限制在当前元素内，就需要阻止事件流动

阻止事件流动需要拿到事件对象

语法：

```javascript
        事件对象.stopPropagation()
```

---



案例：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .father {
            margin: 100px auto;
            width: 500px;
            height: 500px;
            background-color: pink;
        }

        .son {
            width: 200px;
            height: 200px;
            background-color: blueviolet;
        }
    </style>
</head>

<body>
    <div class="father">
        <div class="son"></div>
    </div>
    <script>
        let fa = document.querySelector('.father');
        let son = document.querySelector('.son');
        document.addEventListener('click', function (e) {
            alert('grandfather');
            e.stopPropagation();//阻止流动
        })
        fa.addEventListener('click', function (e) {
            alert('hello i am father');
            e.stopPropagation();//阻止流动
        })
        son.addEventListener('click', function (e) {
            alert('hello i am son');
            e.stopPropagation(); //阻止流动
        })


    </script>
</body>

</html>
```

效果如下：

<img src="https://static.meowrain.cn/i/2022/07/19/m0ki1x-3.gif" alt="动画" style="zoom:50%;" />