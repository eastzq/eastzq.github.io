# 操作元素
Javascript的DOM操作可以改变网页的内容，结构和样式，我们可以利用DOM操作元素来改变元素的内容和属性等。
# 改变元素的内容

---
## innerText
`element.innerText`
从起始位置到终止位置的内容，但它去除html标签，**同时空格和换行也会去掉**
> innerText不识别html标签
> 由IE提起，不是标准
---
## innerHTML
`element.innerHTML`
起始位置到终止位置的全部内容，包括html标签，**同时保留空格和换行**
> innerHTML识别HTML标签
> W3C提起，标准。平时用这个就行了
```html
<p>放歌未尽空回棹，落日增波忧思侵。</p>
```

```javascript
// innerHTML还可以用来获取文段内容
// 案例：
let p = document.querySelector('p');
console.log(p.innerHTML);
```
![image-1657290084297](/upload/2022/07/image-1657290084297.png)


---

# 常用元素的属性操作

1. innerText ,innerHTML改变元素内容
2. src,href
3. id,alt,title

## 改变图片路径
```html
<img src="https://static.meowrain.cn/i/2022/07/07/32o9s-3.png" alt="">
<button class="btn">换图</button>
```

```javascript
let img = document.querySelector('img');
let bt = document.querySelector('.btn');
bt.onclick = function() {
    img.src = 'https://static.meowrain.cn/i/2022/07/07/1zbmm.png';
}
```

点击按钮后，图片的链接会被换成js文件中写的链接，图片也就会跟着改变了
![image-1657291166742](/upload/2022/07/image-1657291166742.png)
--->
![image-1657291187775](/upload/2022/07/image-1657291187775.png)


