# Javascript-展开语法

## 展开数组

```js
const num = [1,2,3];
console.log(...num); //打印数组元素1,2.3
```



## 数组合并

```javascript
let a = [1,2,3];
let b = ['a','nice',...a];//使用...可将a合并到b数组
console.log(b);//[ 'a', 'nice', 1, 2, 3 ]
```



## 展开对象

```js
const career = {career:"Student"};
const hobby = {hobby: "game,music,programing"};
const who = {name:"meowrain",...career,...hobby};
console.log(who);//{ name: 'meowrain', career: 'Student', hobby: 'game,music,programing' }

```



## 函数传参

使用`...name`来接收任意数量的参数

```javascript
function change(...args) {
    console.log(args);
}
change(1,2,3,4,5,'ww');//[ 1, 2, 3, 4, 5, 'ww' ]

```



案例：

```js
let sum = (x, y, z) => {
    return x + y + z;
} //创建名为sum的函数
const num = [1,2,3];
console.log(...num); //1,2.3
console.log(sum(...num));//传参1,2,3
```



