# javascript-变量提升

## var

```javascript
console.log(web);
var web = "meowrain";
//undefined
```

这串代码相当于

```js
var web;
console.log(web);
```

但是你不写var web的话，会直接报错


> 在js中,var会变量提升，但let不会



```js
console.log(web);
let web = "nce";
// 会报错
```





---



## let&const暂时性死区TDC

> 使用let声明变量，必须在声明之后使用变量，不能再声明之前使用变量
>
> ```js
> console.log(web);
> let web = "nce";
> // 会报错
> ```