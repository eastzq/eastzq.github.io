# function
在 JavaScript 中，我们可以把代码的重复部分抽取出来，放到一个函数 （functions）中。

举个例子：
```javascript
function functionName() {
  console.log("Hello World");
}
```
你可以通过函数名加上后面的小括号来调用（invoke）这个函数，就像这样： functionName(); 每次调用函数时，它都会在控制台上打印消息 Hello World。 每次调用函数时，大括号之间的所有代码都将被执行。

案例：先创建一个名为 reusableFunction 的函数，这个函数打印 Hi World 到控制台上。
然后调用这个函数。
```javascript
function reusableFunction() {
  console.log("Hi World");
}
reusableFunction();
```

# 将值传递给带有参数的函数
函数的参数 （parameters）在函数调用中充当传入函数的输入占位符（也叫形参）。 函数调用时，参数可以为一个或多个。 调用函数时输入（或传递 "passed"）的实际值被称为参数（arguments）。
这是带有两个参数的函数，param1 和 param2：
```javascript
function testFun(param1, param2) {
  console.log(param1, param2);
}
```
然后我们可以调用 `testFun`，就像这样： `testFun("Hello", "World");`。 我们传入了两个字符串参数， `Hello `和 `World`。 在函数中，`param1 `等于字符串` Hello `以及 `param2` 等于字符串 `World`。 请注意，`testFun 函数`可以多次调用，每次调用时传递的参数会决定参数的实际值。

案例：
创建一个名为 functionWithArgs 的函数，它可以接收两个参数，计算参数的和，将结果输出到控制台。
用两个数字作为参数调用函数。
要求：
functionWithArgs 应该是一个函数。
Waiting:functionWithArgs(1,2) 应该输出 3。
Waiting:functionWithArgs(7,9) 应该输出 16。
Waiting:在定义 functionWithArgs 之后记得传入两个数字调用它。
代码：
```javascript
function functionWithArgs(param1,param2) {
  console.log(param1+param2);
}
functionWithArgs(1,2);
functionWithArgs(7,9);
```

# 使用 return 给函数返回值
我们可以通过函数的参数（arguments）把值传入函数， 也可以使用` return 语句`把数据从一个函数中传出来。

示例
```javascript
function plusThree(num) {
  return num + 3;
}

const answer = plusThree(5);
```
`answer` 的值为** 8**。

`plusThree` 带有一个参数`（argument）num`，并返回`（return）`一个等于` num + 3 `的值。

# 全局作用域和函数
在 **JavaScript** 中，作用域涉及到变量的作用范围。 在**函数外定义的变量具有 全局 作用域**。 这意味着，具有**全局作用域的变量**可以在代码的**任何地方被调用**。

未使用 `let `或` const `关键字声明的变量会在 `global` 范围内自动创建。 当在代码其他地方无意间定义了一个变量，刚好变量名与全局变量相同，这时会产生意想不到的后果。 你应该总是用` let` 或` const` 声明你的变量。

案例：
使用 let 或 const，在任何函数之外声明一个名为 myGlobal 的全局变量。 并给它一个初始值 10。

在函数 fun1 中，不要 使用 let 或 const 关键字，将 5 分配给 oopsGlobal 。

Waiting:应定义 myGlobal。
Waiting:myGlobal 的值应为 10。
Waiting:myGlobal 应该使用 let 或 const 关键字声明
Waiting:oopsGlobal 应为全局变量，值为 5。

```javascript
// 在这行下面声明 myGlobal 变量
let myGlobal = 10;

function fun1() {
  // 给 oopsGlobal 赋值 5
  oopsGlobal = 5;
}

// 只修改这一行上面的代码

function fun2() {
  var output = "";
  if (typeof myGlobal != "undefined") {
    output += "myGlobal: " + myGlobal;
  }
  if (typeof oopsGlobal != "undefined") {
    output += " oopsGlobal: " + oopsGlobal;
  }
  console.log(output);
}
```

# 局部作用域和函数
在一个函数内声明的变量，以及该函数的参数都具有`局部（local）作用域`。 这意味着它们只在该函数内可见。

这是在函数 `myTest` 内声明局部变量 loc 的例子：
```javascript
function myTest() {
  const loc = "foo";
  console.log(loc);
}

myTest();
console.log(loc);
```
`myTest()` 函数调用将在控制台中显示字符串 `foo`。 `console.log(loc) `行（在 myTest 函数之外）将抛出错误，因为 `loc `未在函数之外定义。

# 函数中的全局作用域和局部作用域
一个程序中有可能具有相同名称的局部变量 和全局变量。 在这种情况下，局部变量将会优先于全局变量。

下面为例：
```javascript
const someVar = "Hat";

function myFun() {
  const someVar = "Head";
  return someVar;
}
```
函数 myFun 将会返回字符串 Head，因为局部变量的优先级更高。

# 函数也可以返回 undefined
函数一般用 return 语句来返回值，但这不是必须的。 在函数没有 return 语句的情况下，当你调用它时，该函数会执行内部代码，返回的值是 undefined。

示例
```javascript
let sum = 0;

function addSum(num) {
  sum = sum + num;
}

addSum(3);
```
addSum 是一个没有 return 语句的函数。 该函数将更改全局变量 sum，函数的返回值为 undefined。

# 使用返回值赋值
如果你还记得我们在使用赋值运算符存储值中的讨论的话，等号右侧的所有操作都会在赋值之前完成。 这意味着我们可以获取函数的返回值，并将其赋值给一个变量。

假设我们有一个预先定义的函数 sum ，它将两个数相加，然后：
```javascript
ourSum = sum(5, 12);
```
将调用 sum 函数，该函数返回 17 的值并将其分配给 ourSum 变量。

# 排队
在计算机科学中队列（queue）是一个抽象的数据结构（Data Structure），队列中的条目都是有秩序的。 新的条目会被加到队列的末尾，旧的条目会从队列的头部被移出。