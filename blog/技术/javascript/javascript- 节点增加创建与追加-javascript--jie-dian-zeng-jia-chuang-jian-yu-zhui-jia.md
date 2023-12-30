# 增加节点

很多情况下，我们需要在页面中增加元素

比如，点击发布按钮，可以新增一条信息



---

一般情况下，我们新增节点，按照如下操作

- 创建一个新的节点’
- 把创建的新的节点放入到指定的元素内部



## 创建元素节点

```javascript
document.createElement('标签名');
```

## 追加节点

```javascript
父元素.appendChild(要插入的元素); //插入到父元素的后面
父元素.insertBefore(要插入的元素); //插入到父元素的前面
```



案例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<ul>

</ul>
<script>
let ul = document.querySelector('ul');
let li = document.createElement('li'); //<!-- 创建新的标签-->
ul.appendChild(li); //向ul插入li元素
</script> 
</body>
</html>
```





---

把3插入到1,2,4,之间

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<ul>
    <li>1</li>
    <li>2</li>
    <li>4</li>
</ul>
<script>
<!-- 创建新的标签-->
let ul = document.querySelector('ul');
let li = document.createElement('li'); //创建元素li
li.innerText = '3'; //在li元素中添加3
ul.insertBefore(li,ul.children[2]); //因为ul里面的子元素li是以数组形式存储的，所以这段代码的意思是，把3加在原来数组[2]也就是4的前面 ----》 注意： [0]是1 [1]是2  [2]是4
</script>
</body>
</html>
```

