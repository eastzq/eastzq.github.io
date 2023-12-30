当代码执行到 return 语句时，函数返回一个结果就结束运行了，return 后面的语句不会执行。

**示例**
```javascript
function myFun() {
  console.log("Hello");
  return "World";
  console.log("byebye")
}
myFun();
```
以上将在控制台中显示字符串 Hello 并返回字符串 World。 字符串 byebye 将永远不会在控制台中显示，因为函数在 return 语句处就退出了。

例子：
```javascript
const a = 0,b = 2;
function word() {
    if (a < 1 || b < 1) {
        return "great";
        console.log("hello");
    }
}

word();

```