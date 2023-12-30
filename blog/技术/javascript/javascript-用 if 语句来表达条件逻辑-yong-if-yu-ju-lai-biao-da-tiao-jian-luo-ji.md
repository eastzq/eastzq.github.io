# if语句
if 语句用于在代码中做出决定。 关键字 if 告诉 JavaScript 在小括号中的条件为真的情况下去执行定义在大括号里面的代码。 这种条件被称为 Boolean 条件，因为他们只可能是 true（真）或 false（假）。

当条件的计算结果为 true，程序执行大括号内的语句。 当布尔条件的计算结果为 false，大括号内的代码将不会执行。

> 伪代码
> if（条件为真）{
> 语句被执行
> }
> 
**示例**
```javascript
function test (myCondition) {
  if (myCondition) {
    return "It was true";
  }
  return "It was false";
}

test(true);
test(false);
```
test(true) 返回字符串 It was true，test(false) 返回字符串 It was false。

当 test 被调用，并且传递进来的参数值为 true 时，if 语句会计算 myCondition 的结果，看它是否为 true。 如果条件为 true，函数会返回 It was true。 当 test 被调用，并且传递进来的参数值为 false 时，myCondition 不 为 true，并且不执行大括号后面的语句，函数返回 It was false。

# 介绍 else 语句
当 if 语句的条件为真，会执行大括号里的代码。 那如果条件为假呢？ 正常情况下什么也不会发生。 使用 else 语句，可以执行当条件为假时相应的代码。
```javascript
if (num > 10) {
  return "Bigger than 10";
} else {
  return "10 or Less";
}
```

# 介绍 else if 语句
如果你有多个条件语句，你可以通过 else if 语句把 if 语句链起来。
```javascript
if (num > 15) {
  return "Bigger than 15";
} else if (num < 5) {
  return "Smaller than 5";
} else {
  return "Between 5 and 15";
}
```

# if else 语句中的逻辑顺序
if、else if 语句中的代码顺序是很重要的。

在条件判断语句中，代码的执行顺序是从上到下，所以你需要考虑清楚先执行哪一句，后执行哪一句。

这有两个例子。

第一个例子：
```javascript
function foo(x) {
  if (x < 1) {
    return "Less than one";
  } else if (x < 2) {
    return "Less than two";
  } else {
    return "Greater than or equal to two";
  }
}
```
第二个例子更改了代码的执行顺序：
```javascript
function bar(x) {
  if (x < 2) {
    return "Less than two";
  } else if (x < 1) {
    return "Less than one";
  } else {
    return "Greater than or equal to two";
  }
}
```
这两个函数看起来几乎一模一样，我们传一个值进去看看它们有什么区别。
```javascript
foo(0)
bar(0)
```
foo(0) 将返回字符串 `Less than one`，bar(0) 将返回字符串` Less than two`。

# 多个 if else 语句
if/else 语句串联在一起可以实现复杂的逻辑。 这是多个 if / else if 语句串联在一起的伪代码：
```javascript
if (condition1) {
  statement1
} else if (condition2) {
  statement2
} else if (condition3) {
  statement3
. . .
} else {
  statementN
}
```
案例：
请将 if/else if 语句串联起来，实现下面的逻辑：

num < 5 - 返回 Tiny
num < 10 - 返回 Small
num < 15 - 返回 Medium
num < 20 - 返回 Large
num >= 20 - 返回 Huge

```javascript
function testSize(num) {
  // 只修改这一行下面的代码


  return "Change Me";
  // 只修改这一行上面的代码
}

testSize(7);
```
完成代码：
```javascript
function testSize(num) {
  // 只修改这一行下面的代码
if (num < 5) {
  return "Tiny";
} else if (num < 10) {
  return "Small";
} else if (num < 15) {
  return "Medium";
} else if (num < 20) {
  return "Large";
} else if (num >= 20) {
  return "Huge";
}

  return "Change Me";
  // 只修改这一行上面的代码
}

testSize(7);
```

# 高尔夫代码
在高尔夫游戏中，每个洞都有自己的标准杆数 par，代表着把球打进洞所挥杆的平均次数 strokes。 根据你把球打进洞所挥杆的次数 strokes 高于或低于 par 多少，有一个不同的昵称（代表打高尔夫球的水平）。

函数将会传送两个参数，par 和 strokes。 根据下表返回正确的字符串。下表列出不同挥杆次数（从高到低）对应的字符串。

| 挥杆次数   | 返回字符串     |
| ---------- | -------------- |
| 1          | "Hole-in-one!" |
| <= par - 2 | "Eagle"        |
| par - 1    | "Birdie"       |
| par        | "Par"          |
| par + 1    | "Bogey"        |
| par + 2    | "Double Bogey" |
|     >= par + 3       |     "Go Home!"           |


```javascript
const names = ["Hole-in-one!", "Eagle", "Birdie", "Par", "Bogey", "Double Bogey", "Go Home!"];

function golfScore(par, strokes) {
  // 只修改这一行下面的代码
  if (strokes == 1) {
    return names[0]
  } else if (strokes <= par - 2) {
    return names[1]
  } else if (strokes == par - 1) {
    return names[2]
  } else if (strokes == par) {
    return names[3]
  } else if (strokes == par + 1) {
    return names[4];
  } else if (strokes == par + 2) {
      return names[5]
  } else if (strokes >= par + 3) {
    return names[6]
  }

  return "Change Me";



  // 只修改这一行上面的代码
}
golfScore(5, 4);

````


	