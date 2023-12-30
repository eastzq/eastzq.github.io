今天刷js基础题发现个自己忘掉的重要的知识点
一个普通函数的 this 指向是:
1. 在非严格模式下,this 指向全局对象(浏览器下是 window 对象,Node.js 下是 global 对象)。
2. 在严格模式下,this 指向 undefined。
3. 在函数作为对象的方法被调用时,this 指向那个对象。
4. 在构造函数中,this 指向构造函数创建的实例对象。
5. 使用 call、apply 和 bind 可以绑定 this 指向。

![](https://static.meowrain.cn/i/2023/05/17/twp7i6-3.webp)

```js
function speak(fn, obj) {
    obj.fn = fn;
    return obj.fn();
}
function speak(fn,obj){
    return fn.call(obj);
}
function speak(fn,obj){
    return fn.bind(obj)();
}
```