# 克隆节点

```javascript
        元素.cloneNode(布尔值);
//克隆一个已有的元素节点
```



详细说明

```html
<ul>
    <li>df</li>
</ul>
    <script>
let ul  = document.querySelector("ul");
let newul  = ul.cloneNode(false);
//默认为false，也就是不会克隆子代节点
// 如果为true，就会克隆子代节点
div.appendChild(newul);
//如果我写成div.appendChild(ul);，会把ul和它的子元素全部加在div下
//如果写成上面的这种div.appendChild(newul);就会复制一个ul，放在div下  
    </script>
```

**false**的情况：

<img src="https://static.meowrain.cn/i/2022/07/15/vqo0ar-3.png" alt="image-20220715191923786" style="zoom: 80%;" />

**true**的情况：

![image-20220715192007651](https://static.meowrain.cn/i/2022/07/15/vr63rd-3.png)

---

这里咱们专门放图来看一下，顺便复习一下昨天学习的东西

> 注意：通过指定元素.appendChild(要插入的元素)这个操作，我们可以把某个元素放到指定元素的内部
>
> Tips:要插入的元素，咱们要通过 `let ul  = document.querySelector("ul");`这种类似的操作先获取元素



# 删除节点





如果一个节点在页面中已经不需要的时候，我们可以删除它

在javascript对的原生dom操作中，要删除元素必须通过`父元素删除`

**语法**

```js
父元素.removeChild(要删除的元素);
```



---



> Question1: 删除父元素中的第i个元素

咱们平时用这个只是删除一个元素。

但是要知道的是，假如你在ul标签内有4个li标签，那么通过`ul.children`我们就可以得到一个伪数组，第一个li标签对应0，第二个li标签对应1，以此类推，第四个li标签对应3.得到伪数组以后，我们要删除第一个元素，直接用`ul.removeChild(ul.children[i])`就能删除咱们`第i个`元素啦



---

> Question2: 删除父元素中的所有元素

那么问题来了，假如我要全部把这个父元素下的所有子元素删除掉呢？

**第一种方案**：使用for循环加`.innerHTML`的DOM操作，来把咱们的子元素替换为`''`

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
    <button class="btn">删除</button>
    <ul>
        <li>湖上秋风病未禁，兴来真欲到山阴。</li>
        <li> 渔蓑乱结汀洲草，樵径香分橘柚林。</li>
        <li>远谷采薇随鹿迹，閒岩投果见猿心。</li>
        <li>放歌未尽空回棹，落日增波忧思侵。 </li>
    </ul>
    <script>
        let ul = document.querySelector('ul');//获取元素ul
        let btn = document.querySelector('.btn');//获取元素button
        function del() {
             for (let i = 0; i < ul.children.length; i++) {
                 ul.children[i].innerHTML = ''
             }//利用for循环，把ul的子元素li一个一个都替换成''，实现删除的效果
        }//构建del()函数，方便下面的监听回调此函数
        btn.addEventListener('click', del);//回调del()函数
    </script>
</body>

</html>
```

![image-20220715210635832](https://static.meowrain.cn/i/2022/07/15/yu2skb-3.png)

在上面这个代码中，我们点击按钮，就可以把li全部替换为空



**第二种方案**：通过删除节点的办法来把父元素里面的子元素全部删除

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
    <button class="btn">删除</button>
    <ul>
        <li>湖上秋风病未禁，兴来真欲到山阴。</li>
        <li> 渔蓑乱结汀洲草，樵径香分橘柚林。</li>
        <li>远谷采薇随鹿迹，閒岩投果见猿心。</li>
        <li>放歌未尽空回棹，落日增波忧思侵。 </li>
    </ul>
    <script>
        let ul = document.querySelector('ul');
        let btn = document.querySelector('.btn');
        function del() {
            for (let j = ul.children.length - 1; j >= 0; j--) {
                ul.removeChild(ul.children[j]);
            }
        }
        //这下大概需要慢慢解释一下，因为循环如果写成正的话，就会从第一个元素开始移除，但是你移除掉[0]对应的元素以后，下面的原来是在[1]上的元素会变成在[0]上的元素，所以最后是删不尽的
        //因此我们需要想办法让它倒着删，这样就没有问题了。
        //下面讲解一下上面的循环运行过程：
//第一步,首先拿到了ul伪数组的个数4，那么最后一个元素对应的就是[3]，为了删掉这个元素，
//我们需要让ul.children.length - 1来实现首先删除最后一个元素
//第二步，会判断是不是大于等于0，这个是为了能让函数最后删除的是[0]的这个元素 
        btn.addEventListener('click', del);
    </script>
</body>

</html>
```

