如果你有一个二维数组，可以使用相同的逻辑，先遍历外面的数组，再遍历里面的子数组。 下面是一个例子：
```javascript
const arr = [
  [1, 2], [3, 4], [5, 6]
];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    console.log(arr[i][j]);
  }
}
```

这里一次输出了 `arr` 中的每个子元素。 提示，对于内部循环，我们可以通过 `arr[i] `的` .length` 来获得**子数组的长度**，因为` arr[i] `本身就是一个数组。

交作业：
```javascript
//修改函数 multiplyAll，获得 arr 内部数组的每个数字相乘的结果 product。
function multiplyAll(arr) {
    let product = 1;
    // 只修改这一行下面的代码
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++){
            product = product * arr[i][j];
        }
            }
    // 只修改这一行上面的代码
    return product;

}

multiplyAll([[1, 2], [3, 4], [5, 6, 7]]);
```
