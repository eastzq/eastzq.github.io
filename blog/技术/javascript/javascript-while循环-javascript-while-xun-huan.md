# while 循环
我们将学习的第一种类型的循环称为 **while 循环**，当 while 指定的条件为真，循环才会执行，反之不执行。
```javascript
const ourArray = [];
let i = 0;

while (i < 5) {
  ourArray.push(i);
  i++;
}
```
在上面的代码里，`while` 循环执行 5 次把 0 到 4 的数字添加到` ourArray 数组`里。

--- 

作业：把1-5的数字添加到`ourArray数组`中
交作业：
```javascript
const ourArray = [];
let i = 0;
while (i < 5) {
    i++;
    ourArray.push(i);
}
console.log(ourArray)
```

---

> 注意一下: while右边的条件如果是要满足两个条件。要用逻辑运算符连接起来
> 比如我要条件满足 i>5而且i<10，就要写成  ` 5<i&&i<10`,你要是像python那样写成`5<i<10`，不管你i是不是真的大于5小于十，返回的值始终为真，那么就进入死循环了。你的浏览器会直接卡死




