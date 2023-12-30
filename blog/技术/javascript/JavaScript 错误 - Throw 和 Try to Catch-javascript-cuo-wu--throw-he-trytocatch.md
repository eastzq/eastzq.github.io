# JavaScript 错误 - Throw 和 Try to Catch

---

以下来自W3CSCHOOL

`try` 语句使您能够测试代码块中的错误。

`catch` 语句允许您处理错误。

`throw` 语句允许您创建自定义错误。

`finally` 使您能够执行代码，在 try 和 catch 之后，无论结果如何。





---



## try和catch配合使用案例：

```js
try {
     供测试的代码块
}
 catch(err) {
     处理错误的代码块
} 
```



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
    <p id="demo">fdsfadf</p>
    <script>
        try {
            alertfff('helloworld');
        }
        catch (err) {
            document.getElementById('demo').innerHTML = err;
        }
    </script>
</body>

</html>
```

<img src="https://static.meowrain.cn/i/2022/08/31/r9dsyi-3.png" alt="image-20220831164840426" style="zoom:50%;" />

> 如上，我们知道alertfff这个是不存在的，所有如果不用try的话，会在控制台直接爆红，用了try和catch配合，就能输出咱们的错误内容
>
> 就是如果错误存在，就会执行catch里面的代码





---



## JavaScript 抛出错误

JavaScript 实际上会创建带有两个属性的 *Error 对象*：`name` 和 `message`。

### throw 语句

`throw` 语句允许您创建自定义错误。

异常可以是 JavaScript 字符串、数字、布尔或对象：

如果把 `throw` 与 `try` 和 `catch` 一同使用，就可以控制程序流并生成自定义错误消息。

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
    <p id="demo">fdsfadf</p>
    <script>
        try {
            alertfff('helloworld');
        }
        catch (err) {
            throw '代码报错拉：报错如下\n'+ err;
        }
    </script>
</body>

</html>
```

控制台输出如下

![image-20220831171631734](https://static.meowrain.cn/i/2022/08/31/sdtalx-3.png)







## finally 语句

`finally` 语句允许您在 try 和 catch 之后执行代码，无论结果：

```js
try {
     // 供测试的代码块
}
 catch(err) {
     // 处理错误的代码块
} 
finally {
     // 无论结果如何都执行的代码块
}
```