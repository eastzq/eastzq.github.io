效果图
![image-1657293304229](/upload/2022/07/image-1657293304229.png)
> 直接挂代码了

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        img {
            width: 300px;
        }
    </style>
</head>
<body>
    <img src="https://tse2-mm.cn.bing.net/th/id/OIP-C.5tG321WXo3Mzge2MehLFnwAAAA?pid=ImgDet&rs=1" alt="">
    <div>早上好啊，MeowRain</div>
    <script src="../js/分时问候.js"></script>
</body>
</html>
```

```js
// 根据系统不同时间来判断，所以需要用到日期内置对象
// 利用多分支语句来设置不同的图片
// 需要一个图片，并且根据时间修改图片，就需要用到操作元素src属性
// 需要一个div元素，显示不同问候语，修改元素内容即可
//获取元素
let img = document.querySelector('img');
let div = document.querySelector('div');
//得到小时数
let date = new Date();
let h = date.getHours;
// 判断小时数改变图片的文字和信息
if (h < 12) {
    img.src = 'https://tse2-mm.cn.bing.net/th/id/OIP-C.5tG321WXo3Mzge2MehLFnwAAAA?pid=ImgDet&rs=1';
    div.innerHTML = '<strong>早上好呀，MeowRain</strong>';
} else if (12<h && h<13) {
    img.src = 'https://img95.699pic.com/element/40095/5149.png_300.png';
    div.innerHTML = '<strong>中午好呀，MeowRain,别忘记要午休哦~</strong>';
}  else if (13<h && h<18) {
    img.src = 'https://ts1.cn.mm.bing.net/th/id/R-C.832e8b33a5ef7e2ae1b6027737696a05?rik=d2HweNtwgVdumg&riu=http%3a%2f%2fface.zhaoxi.org%2fupload%2f201358%2f20130121193605.gif&ehk=1mIMalbTaUnKu5AhchtHA8ybQmrJ70%2bYb70ugW678Dw%3d&risl=&pid=ImgRaw&r=0';
    div.innerHTML ='<strong>下午好呀，MeowRain,天气热啦，可以喝杯可乐奥</strong>';

} else {
    img.src = 'https://tse1-mm.cn.bing.net/th/id/OIP-C.eFjfpAX9hBBc7r5pcSiomQAAAA?pid=ImgDet&rs=1';
    div.innerHTML = '<strong>晚上好呀，MeowRain,记住早早睡觉奥</strong>';
}
```