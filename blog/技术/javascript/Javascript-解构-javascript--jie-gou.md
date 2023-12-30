# Javascript-解构

## 解构赋值

> **解构赋值**语法是一种 Javascript 表达式。通过**解构赋值，**可以将属性/值从对象/数组中取出，赋值给其他变量。

以前我们是怎么赋值的呢？

```js
let a = 10, b = 20;
```

而使用解构赋值，我们可以更方便地赋值

```js
let [a,b] = [10,20];
```



## 用解构实现基本的变量值的交换

```js
let [a,b] = [1,2]; 
console.log(a,b); //a=1,b=2
[a,b] = [b,a];
console.log(a,b);//a=2,b=1
```



## 基本的数组解构

我们要从数组中提取数据，那么使用解构分配非常简单。

```js
let intro = ["I", "am", "Meowrain"];
const [, , my_name] = intro;
const [me] = intro;
const [,...oh] = intro;
console.log(oh);//["am","Meowrain"]
console.log(me); // I
console.log(my_name); //Meowrain
```



## 用函数解构赋值

```js
let add1 = (a,b) => {
    return [a,b]
}
let [c,d] = add1(1,2);
console.log(c,d);
```



---



## 对象解构

在ES6前，我们从对象中提取数据并赋值给新变量，是这么做的

```js
let meowrain = {
    name:"meowrain",
    country:"China",
    age: 18,
    job: "student"
}
let name = meowrain.name;
let country = meowrain.country;
let age = meowrain.age;
let job = meowrain.job;
```



现在ES6提供了对象解构，我们可以这样写

```js
let meowrain = {
    who:"meowrain",
    country:"China",
    age: 18,
    job: "student"
}
let {who,country,age,job} = meowrain;
console.log(who,country,age,job);
```

使用新变量名：

```js
let meowrain = {
    who: "meowrain",
    country: "China",
    age: 18,
    job: "student"
}
let { who: guy, country: region, age: years_old, job: work } = meowrain;
console.log(guy, region, years_old, work);
```





---



参考链接：

- [解构赋值 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [JavaScript 数组解构和对象解构 (freecodecamp.org)](https://chinese.freecodecamp.org/news/array-and-object-destructuring-in-javascript/#:~:text=解构是,JavaScript 中将数组中的值或对象中的属性解压缩为不同的变量的方式。)
- [JS之解构（ Destructuring）_Lu'Blog的博客-CSDN博客_js 解构](https://blog.csdn.net/lu1024188315/article/details/73322541)