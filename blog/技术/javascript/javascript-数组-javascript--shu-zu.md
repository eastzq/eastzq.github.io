最新补充时间：2022.9.1

# 数组

使用数组（array），我们可以在一个地方存储多个数据。

以左方括号开始定义一个数组，以右方括号结束，里面每个元素之间用逗号隔开，例如：

`const sandwich = ["peanut butter", "jelly", "bread"];`

## 数组合并
concat()方法：concat方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。
```js
let a = ['meoowrain','yyds'];
let b = ['i','like','apple'];
let c = a.concat(b);
console.log(c);
```
![image-20220901131856830](https://static.meowrain.cn/i/2022/09/01/lszz8l-3.png)

可以用解构的方法进行数组合并
```js
let a = [1,2,3];
let b = ['a','nice',...a];//使用...可将a合并到b数组
console.log(b);//[ 'a', 'nice', 1, 2, 3 ]
```

# 嵌套数组

也可以在其他数组中嵌套数组，如：
`const teams = [["Bulls", 23], ["White Sox", 45]];`
这也叫做多维数组（multi-dimensional array）。

# 通过索引访问数组中的数据

我们可以使用索引（indexes）来访问数组中的数据。

数组索引与字符串一样使用方括号来表示，不同的是，它们不是指定字符，而是指定数组中的一个条目。 数组索引与字符串索引一样是从 0 开始（zero-based）的，所以数组中第一个元素的索引编号是** 0**。

```javascript
const array = [50, 60, 70];
console.log(array[0]);
```

通过上面这串代码，我们可以打印出arry数组的第一个元素：50

# 通过索引修改数组中的数据

与字符串不同，数组的条目是 可变的 并且可以自由更改，即使数组是用 const 声明的。

示例

```javascirpt
const ourArray = [50, 40, 30];
ourArray[0] = 15;
```

`ourArray` 值为 `[15, 40, 30]`。

# 切片数组slice()
slice()方法用于提取目标数组的一部分，返回一个新数组，原数组不变。
```js
let a = ['meoowrain','yyds','i','like','apple'];
c = a.slice(0,2);//['meoowrain','yyds']
console.log(c);
```

# splice() 删除原数组的一部分成员
splice()方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。
```js
let a = ['meoowrain','yyds','i','like','apple'];
a.splice(0,2);
console.log(a);//['i', 'like', 'apple']
```

# map()
map()方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

```js
let num = [1,2,3];
let num_2 = num.map((n)=>{
    return n + 1;
});
console.log(num_2); //[2,3,4]
```
![image-20220901140200970](https://static.meowrain.cn/i/2022/09/01/n6g2iy-3.png)

---

# 使用索引访问多维数组

我们可以把多维数组看作成是数组中的数组。 使用方括号表示法访问数组时，第一个方括号访问的是数组的最外层（第一层），第二个方括号访问的是数组的第二层，以此类推。

例如：

```javascript
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [[10, 11, 12], 13, 14]
];

arr[3];
arr[3][0];
arr[3][0][1];
```

`arr[3] 为 [[10, 11, 12], 13, 14]，arr[3][0] 为 [10, 11, 12]，并且 arr[3][0][1] 为 11`

> 注意： 数组名与方括号之间不应该有任何空格，比如 array [0][0] 甚至是 array [0] [0] 都是不允许的。 尽管 JavaScript 能够正确处理这种情况，但是当其他程序员阅读你写的代码时，这可能让他们感到困惑。

# 使用 push() 操作数组

一个将数据添加到数组末尾的简单方法是` push() 函数`。

`.push() `接受一个或多个**参数**（parameters），并把它压入到**数组的末尾**。

示例：

```javascript
const arr1 = [1, 2, 3];
arr1.push(4);
console.log(arr1);

const arr2 = ["Stimpson", "J", "cat"];
arr2.push(["happy", "joy"]);
console.log(arr2);
```

`arr1 现在值为 [1, 2, 3, 4]，arr2 值为 ["Stimpson", "J", "cat", ["happy", "joy"]]。`

# 使用 pop() 操作数组

改变数组中数据的另一种方法是用` .pop()` 函数。

`.pop() `函数用来弹出一个数组末尾的值。 我们可以把这个弹出的值赋给一个变量存储起来。 换句话说就是 `.pop()` 函数移除数组末尾的元素并返回这个元素。

数组中任何类型的元素（**数值，字符串，甚至是数组**）都可以被弹出来 。

```javascript
const threeArr = [1, 4, 6];
const oneDown = threeArr.pop();
console.log(oneDown);
console.log(threeArr);
```

第一个 console.log 将显示值` 6`，第二个将显示值` [1, 4]`。

> 注意：.pop函数的括号里不需要添加值

# 使用 shift() 操作数组

pop() 函数用来移出数组中最后一个元素。 如果想要移出第一个元素要怎么办呢？

这时候我们就需要` .shift()` 了。 它的工作原理就像` .pop()`，但它移除的是第一个元素，而不是最后一个。
示例：

```javascript
const ourArray = ["Stimpson", "J", ["cat"]];
const removedFromOurArray = ourArray.shift();
```

`removedFromOurArray` 值为 `Stimpson`，`ourArray` 值为` ["J", ["cat"]]`

# 使用 unshift() 操作数组

不仅可以 `shift`（移出）数组中的第一个元素，也可以 `unshift`（移入）一个元素到数组的头部。

`.unshift() `函数用起来就像 `.push() `函数一样，但不是在数组的末尾添加元素，`unshift() `在数组的头部添加元素。

示例：

```javascript
const ourArray = ["Stimpson", "J", "cat"];
ourArray.shift();
ourArray.unshift("Happy");
```

在 shift、ourArray 后值为 ["J", "cat"]。 在 unshift、ourArray 后值为 ["Happy", "J", "cat"]。


# 访问嵌套数组

在之前的挑战中，我们学习了在对象中嵌套对象和数组。 与访问嵌套对象类似，数组的方括号可以用来对嵌套数组进行链式访问。

下面是访问嵌套数组的例子：

```javascript
const ourPets = [
  {
    animalType: "cat",
    names: [
      "Meowzer",
      "Fluffy",
      "Kit-Cat"
    ]
  },
  {
    animalType: "dog",
    names: [
      "Spot",
      "Bowser",
      "Frankie"
    ]
  }
];

ourPets[0].names[1];
ourPets[1].names[0];
```

`ourPets[0].names[1]` 应该是字符串` Fluffy`， 并且` ourPets[1].names[0] `应该是字符串` Spot`。


> 补充：

 ```javascript
let array = ['good','yyds'];
array[2] = 'excellent';//添加数组excellent
array[4] = 'kk'; //会把3的位置设置为空值，只添加kk
console.log(array);
 ```

> ![image-20220803224301030](https://static.meowrain.cn/i/2022/08/03/113fegc-3.png) 




----
2022年9月1号前来补充
## valueOf()，toString() 
valueOf方法是一个所有对象都拥有的方法，表示对该对象求值。不同对象的valueOf方法不尽一致，数组的valueOf方法返回数组本身。
```js
var arr = [1, 2, 3];
arr.valueOf() // [1, 2, 3]
```
toString方法也是对象的通用方法，数组的toString方法返回数组的字符串形式。
```js
var arr = [1, 2, 3];
arr.toString() // "1,2,3"

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // "1,2,3,4,5,6"
```

## join()
join()方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。
```js

let a = [6,7,8,9];
a.join(' '); //6 7 8 9
a.join('-');// 6-7-8-9
a.join('*');//6*7*8*9
a.join();//6,7,8,9
```
