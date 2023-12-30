# Node-判定型方法

## hasChildNodes

>  可以用来判断当前节点是否含有子节点

语法：`Node.hasChildNodes();`

```html
<div id="new1">
    <div></div>
    <div></div>
    <div class="nice"></div>
</div>
<script>
let new1 = document.getElementById('new1');
console.log(new1.hasChildNodes()); // TRUE
let nice = new1.getElementsByClassName('nice')[0];
console.log(nice.hasChildNodes()); //False
</script>
```

![image-20220716182412032](https://static.meowrain.cn/i/2022/07/16/u61e58-3.png)



## isEqualNode

> 可以用来判断两个节点是否相等
>
> 当两个节点的类型相同，定义特征相同（对元素来说，即 id，孩子节点的数量等等）属性一致等，这两个节点就是相等的。一些具体的数据指出：多数时候的比较是根据节点的类型来的。

语法：`Node.isEqualNode(node);`

```html
<ul class="list">
    <li>Hello</li>
    <li>Mike</li>
    <li>meow rain</li>
    <li>Hello</li>
</ul>
<script>
let tag = document.getElementsByClassName('list')[0].children;
console.log(tag[0].isEqualNode(tag[3])); //True
console.log(tag[0].isEqualNode(tag[1])); //False
</script>
```

![image-20220716182412032](https://static.meowrain.cn/i/2022/07/16/u61e58-3.png)





##  