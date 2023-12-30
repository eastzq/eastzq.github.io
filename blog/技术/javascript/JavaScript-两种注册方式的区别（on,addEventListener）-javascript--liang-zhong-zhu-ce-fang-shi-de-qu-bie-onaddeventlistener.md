# 两种注册方式的区别

# 传统on注册（L0）

- 同一个对象，后面注册的事件会覆盖前面注册（同一事件）
- 直接使用null覆盖偶就可以实现事件的解绑
- 都是冒泡阶段执行的

```javascript
// 注册body的click事件
document.body.onclick = function (e) {
    alert(1);
};


----------------------------------------------------------
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>点击</button>
    <script>
---------------------------------------------------------
        let btn  = document.querySelector('button');
        btn.onclick = function() {
            alert('第一次');
        }
        btn.onclick = function() {
            alert('第二次');
        }//弹出第二次
        // on注册事件相同元素的事件只会执行后面一次的

---------------------------------------------------------
        //解除绑定
        btn.onclick = null;
    </script>
</body>
</html>
```



# 事件监听注册（L2）

- 语法：`addEventListener`(事件类型，事件处理函数，是否使用捕获)
- 后面注册的事件不会覆盖前面注册的事件（同一事件
- 可以通过第三个参数区确定实在冒泡或者捕获阶段执行
- 必须使用`removeEventListener`(事件类型，事件处理函数，获取捕获或者冒泡阶段)
- 匿名函数无法被解绑

```javascript
document.body.addEventListener('click',function(e){
    
});


----------------------------------
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button>点击</button>
    <script>
        let btn = document.querySelector('button');
        btn.addEventListener('click',function() {
            alert('第一次')
        })
        btn.addEventListener('click',function(){
            alert('第二次')
        })
        //不会有覆盖的情况，都会显示
    </script>
</body>

</html>
--------------------------------------------------------


// 移除的情况
    <script>
        let btn = document.querySelector('button');
        btn.addEventListener('click',add);
        function add() {
            alert('第一次')
        }
        btn.removeEventListener('click',add);
        //不会有覆盖的情况，都会显示
        
    </script>

```

