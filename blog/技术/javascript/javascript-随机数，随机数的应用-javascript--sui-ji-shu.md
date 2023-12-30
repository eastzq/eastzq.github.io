```javascript
console.log(Math.random());//输出 0<= x < 1的随机小数
//想要得到两个数之间的随机整数，并且包含这2个整数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}
getRandom(1,10);
```

# 随机数应用
```javascript
let arr = ['张三', '张三风', '李四', 'mick'];
document.write('这次抽中的人是：' + arr[getRandom(0, arr.length - 1)]);
```