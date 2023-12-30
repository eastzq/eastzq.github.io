# 如何获取页面元素
DOM在我们实际开发中主要用来操作元素。我们如何来获取页面中的元素呢？
获取页面中的元素可以使用以下几种方式：
- 根据ID获取
- 根据标签名获取
- 通过HTML5新增方法获取
- 特殊元素获取

## 根据ID获取
文档参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById

> 注意：因为我们文档页面从上往下加载，所以先得有标签，所以我们script写到标签下面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div id="time">22222</div>
<script src="../js/n1.js"></script>
</body>
</html>
```
```javascript
console.log(document.getElementById('time'))
```
控制台打印
![image-1657263606863](/upload/2022/07/image-1657263606863.png)

## 根据标签名获取
文档参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagName
使用Document.getElementsByTagName()方法可以返回带有指定标签名的对象的集合
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<ul>
    <li>湖上秋风病未禁，兴来真欲到山阴。</li>
    <li> 渔蓑乱结汀洲草，樵径香分橘柚林。</li>
    <li>远谷采薇随鹿迹，閒岩投果见猿心。</li>
    <li>放歌未尽空回棹，落日增波忧思侵。 </li>
</ul>
<script src="../js/n1.js"></script>
</body>
</html>
```
```javascript
let i = document.getElementsByTagName('li');
console.log(i)
```
![image-1657264216652](/upload/2022/07/image-1657264216652.png)

返回的是获取过来元素对象的集合，以**伪数组的形式存储**
我们想要依次打印里面的元素对象，我们可以采取遍历的方式
```javascript
let i = document.getElementsByTagName('li');
for (let j = 0; j < i.length; j++) {
    console.log(i[j]);
}
```
> 如果页面中只有一个li，返回的还是伪数组的形式，如果页面中没有这个 元素，返回的空的伪数组的形式


通过父元素获取子元素
```javascript
let i = document.getElementById('ul');
let j = i.getElementsByTagName('li');
console.log(j);
```

## 根据类名返回元素对象集合
```javascript
let i = document.getElementsByClassName('nice');
console.log(i);
```
```html
<div class="nice">fdfsaf</div>
```
![image-1657268072111](/upload/2022/07/image-1657268072111.png)


## qureySelector选择出元素
```javascript
let i = document.querySelector('.nice');
console.log(i);
```
```html
<div class="nice">fdfsaf</div>
```
除了填.nice还可以填id选择器，或者元素选择器


----

## 获取body元素
```javascript
let body = document.body
```

## 获取html元素
```javascript
let html = document.documentElement;
```

