# for循环
for循环主要用于把某些代码重复若干次，通常和计数有关系。
语法结构如下：
![image-1657084318661](/upload/2022/07/image-1657084318661.png)
初始化变量：用var声明的一个普通变量，通常作为计数器使用
条件表达式：用来决定每次循环是否继续执行，就是终止的条件
操作表达式：就是每次循环最后执行的代码，经常用于我们计数器变量进行更新（递增或者递减）
for循环执行次序
![image-1657085105974](/upload/2022/07/image-1657085105974.png)

作业：
1. 印100次你好
交作业
```javascript
for (var i = 1;i <= 100;i++) {
    console.log("你好")
}
```

2. for 循环把从 1 到 5 添加进 myArray 中。
交作业
```javascript
const myArray = [];
for (let i = 1;i<=5;i++) {
  myArray.push(i);
}
```

## for 循环断点调试
Firefox
![image-1657085357418](/upload/2022/07/image-1657085357418.png)

---

edge
![image-1657085390481](/upload/2022/07/image-1657085390481.png)

---

chrome 

![image-1657085410779](/upload/2022/07/image-1657085410779.png)


---

道理一样，我就不多说了


# 使用 For 循环遍历数组的奇数
对于循环，一次不必递增一个。 通过更改我们的 final-expression，我们可以用偶数来计数。

初始化 i = 0，当 i < 10 的时候继续循环。 i += 2 让 i 每次循环之后增加 2。
```javascript
const ourArray = [];

for (let i = 0; i < 10; i += 2) {
  ourArray.push(i);
}
```
ourArray 现在将包含`[0, 2, 4, 6, 8]` 改变计数器（initialization） ，这样我们可以用奇数来递增。
```javascript
const myArray = [];
for (let i = 1;i < 10;i+=2) {
    myArray.push(i);
}
console.log(myArray)
```

# 使用 For 循环反向遍历数组
只要我们定义好合适的条件，for 循环也可以反向遍历。

为了让每次递减 2，我们需要改变 initialization、condition 和 final-expression。

设置 i = 10，并且当 i > 0 的时候才继续循环。 我们使用 i -= 2 来让 i 每次循环递减 2。
```javascript
const ourArray = [];

for (let i = 10; i > 0; i -= 2) {
  ourArray.push(i);
}
```
ourArray 现在将包含`[10, 8, 6, 4, 2]` 让我们改变初始值和最后的表达式，这样我们就可以按照奇数从后往前两两倒着数。


# 使用 For 循环遍历数组
JavaScript 中的一个常见任务是遍历数组的内容。 一种方法是使用 for 循环。 下面的代码将输出数组 arr 的每个元素到控制台：
```javascript
const arr = [10, 9, 8, 7, 6];

for (let i = 0; i < arr.length; i++) {
   console.log(arr[i]);
}
```

记住数组的索引从零开始的，这意味着数组的最后一个元素的下标是：length - 1（数组的长度 -1）。 我们这个循环的条件是 i < arr.length，当 i 的值为 length 的时候循环就停止了。 在这个例子中，最后一个循环是 i === 4，也就是说，当 i 的值等于 arr.length - 1 时，结果输出 6。 然后 i 增加到 5，循环会终止，因为 i < arr.length 是 false。

如果是我的话，我会像下面这样写
```javascript
const arr = [10, 9, 8, 7, 6];

for (let i = 0; i <= arr.length - 1; i++) {
    console.log(arr[i]);
}

```
作业：
声明并初始化一个变量 total 值为 0。 使用 for 循环，使得 total 的值为 myArr 的数组中的每个元素的值的总和。
交作业：
```javascript
// 设置
const myArr = [2, 3, 4, 5, 6];
let total = 0;
for (i = 0; i <= myArr.length - 1; i++) {
    total = myArr[i] + total
}
console.log(total)
// 只修改这一行下面的代码
```
