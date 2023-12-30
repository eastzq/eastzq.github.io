# Javascript-类型转换

## 转换为字符串

```javascript
//字符串转换
//.toString方法
console.log(([1,2,3]).toString());//1,2,3 --数组转换为字符串
console.log(typeof((123).toString())); //string -数字转换为字符串
//String方法
console.log(String([1,2,3])); //1,2,3
//使用join连接为字符串
console.log([1,2,3].join("-"));//1-2-3

```

## 转换类数组为数组

使用`Array.from`可将类数组转换为数组，类数组指包含 `length` 属性或可迭代的对象。

```javascript
let str = '我是MeowRain';
console.log(Array.from(str));
/* 
结果如下
    [
  '我', '是', 'M',
  'e',  'o',  'w',
  'R',  'a',  'i',
  'n'
]
 */


```



在对象里加入length还可以通过`Array.from`来把对象转换为数组

```javascript
let obj = {
    0: "meowrain",
    1: 18,
    length: 2
};
console.log(Array.from(obj));//[ 'meowrain', 18 ]

```

