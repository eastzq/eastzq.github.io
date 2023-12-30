```js
let btn = document.querySelector('button');
let input = document.querySelector('input');
btn.onclick = function () {
    input.value = "Nice";
    btn.disabled = true;
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
    <input type="text" name="" id="" value="">
    <button>点击input的value值会发生变化</button>
    <script src="../js/n1.js"></script>
</body>
</html>
```
当我们点击按钮之后，表单里的value值会发生变化，与此同时，按钮会失效
![image-1657353332267](/upload/2022/07/image-1657353332267.png)

> 当然了我们也可以用this.disabled来消除按钮属性
```javascript
let btn = document.querySelector('button');
let input = document.querySelector('input');
btn.onclick = function () {
    input.value = "Nice";
    this.disabled = true;
}
```
也是可以实现相同的效果的，this指向的是当前的操作对象
![image-1657353527332](/upload/2022/07/image-1657353527332.png)

