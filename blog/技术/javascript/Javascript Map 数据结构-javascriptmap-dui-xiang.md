# Javascript Map 对象

## Map构建方式

```js
let fruits = new Map(); //创建空map
fruits.set('meowrain',30);
fruits.set('banana',20);
console.log(fruits.has("meowrain")); //是否存在关键字'meowrain'
console.log(fruits.get("meowrain")); // 获取meowrain对应的值
fruits.delete('banana');//删除key banana
```



初始化map需要一个二维数组

>```js
>let fruits = new Map([
>['meowrain',95],
>['banana',20]
>]);
>```
>
>