# javascript 对象

你之前可能听过`object` 这个词。

对象和` arrays `类似，区别在于数组使用索引来访问和修改数据，而对象中的数据是通过 `properties `访问的。

对象非常适合用来存储结构化数据，可以表示真实世界中的物体，比如一只猫。

## 对象的声明：

- ```js
          let obj = {
              name : "meowrain",
              age: 18
          }
  ```

- ```js
          let obj = new Object({ name: "meowrain", age: 18 })
  ```

- ```js
  let obj = Object.create({name:"meowrain",age:18});
  ```

- 

这里是一个猫对象的样本：

```javascript
const cat = {
  "name": "Whiskers",
  "legs": 4,
  "tails": 1,
  "enemies": ["Water", "Dogs"]
};
```

在此示例中，所有属性都存储为字符串，例如 `name、legs 和 tails`。 然而，你也可以使用数字作为属性。 你甚至可以省略单字字符串属性中的引号，如下所示：

```javascript
const anotherObject = {
  make: "Ford",
  5: "five",
  "model": "focus"
};
```

然而，如果你的对象有非字符串属性的话，JavaScript 会自动将它们转为字符串。

# 通过点号表示法访问对象属性

和访问数组类似，访问对象属性有两种方式：点号表示法（.）和方括号表示法（[]）。

如果我们已经提前知道要访问的属性名，使用点号表示法是最方便的。

这里是一个用点符号（.）读取对象属性的示例：

```javascript
const myObj = {
  prop1: "val1",
  prop2: "val2"
};

const prop1val = myObj.prop1;
const prop2val = myObj.prop2;
```

prop1val 的值将为字符串 val1，并且prop2val 的值将为字符串 val2。

# 使用方括号表示法访问对象属性

访问对象属性的第二种方式是方括号表示法（[]）。 如果你想访问的属性名中包含空格，就必须使用方括号表示法来获取它的属性值。

当然，如果属性名不包含空格，也可以使用方括号表示法。

这是一个使用方括号表示法读取对象属性的例子：

```javascript
const myObj = {
  "Space Name": "Kirk",
  "More Space": "Spock",
  "NoSpace": "USS Enterprise"
};

myObj["Space Name"];
myObj['More Space'];
myObj["NoSpace"];
```

`myObj["Space Name"] `将会是字符串` Kirk`，`myObj['More Space'] `将会是字符串` Spock`，并且`myObj["NoSpace"] `将会是字符串` USS Enterprise`。

注意，如果属性名中包含空格，就必须使用引号（单引号或双引号）将它们包裹起来。

# 通过变量访问对象属性

对对象上使用**方括号表示法**，还可以访问对象上作为变量值存储的属性。 当你需要遍历对象的所有属性，或者根据一个变量的值查找对应的属性值时，这种写法尤其适用。

以下是一个使用变量来访问属性的例子：

```javascript
const dogs = {
  Fido: "Mutt",
  Hunter: "Doberman",
  Snoopie: "Beagle"
};

const myDog = "Hunter";
const myBreed = dogs[myDog];
console.log(myBreed);
```

字符串` Doberman` 将会出现在控制台中。

使用这一概念的另一种情况是：属性的名字是在程序运行期间动态收集得到的。如下所示：

```javascript
const someObj = {
  propName: "John"
};

function propPrefix(str) {
  const s = "prop";
  return s + str;
}

const someProp = propPrefix("Name");
console.log(someObj[someProp]);
```

`someProp` 的值将为字符串 `propName`，并且字符串` John` 将会出现在控制台中。

> 注意，当使用变量名访问属性时，我们没有使用引号包裹它，因为我们正在使用的是变量的值，而不是变量的名字。

# 更新对象属性

在你创建了 `JavaScript 对象`后，你可以随时更新它的属性，就像更新任何其他变量那样。 你可以使用点或中括号操作符来更新。

举个例子，让我们看看 ourDog：

```javascript
const ourDog = {
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything!"]
};
```

既然他是一个特别愉快的狗，让我们将他的名字更改为字符串 Happy Camper。 这有两种方式来更新对象的 name 属性：` ourDog.name = "Happy Camper";` 或` ourDog["name"] = "Happy Camper";`。更新后，`ourDog.name` 的值就不再是` Camper`，而是` Happy Camper`。

# 给 JavaScript 对象添加新属性

你也可以像更改属性一样给 **JavaScript 对象**添加属性。

这里展示了如何给 ourDog 添加一个属性 bark：

```javascript
ourDog.bark = "bow-wow";
```

或者

```javascript
ourDog["bark"] = "bow-wow";
```

现在，当我们执行 `ourDog.bark `时，就能得到他的叫声，`bow-wow`。

例如：

```javascript
const ourDog = {
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything!"]
};

ourDog.bark = "bow-wow";
```

# 删除对象的属性

我们同样可以删除对象的属性，例如：

```javascript
delete ourDog.bark;
```

例如：

```javascript
const ourDog = {
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything!"],
  "bark": "bow-wow"
};

delete ourDog.bark;
```

在上面代码的最后一行中，**ourDog **是这样的：

```javascript
{
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything!"]
}
```

# 使用对象进行查找

**对象**和字典一样，可以用来存储键/值对。 如果数据是扁平的，你可以用对象来查找你想要的值，而不是链式使用 `switch` 或` if/else `语句。 当你知道你的输入数据在某个范围时，这种查找方式极为有效。

这是简单的反向字母表：

```javascript
const alpha = {
  1:"Z",
  2:"Y",
  3:"X",
  4:"W",
  ...
  24:"C",
  25:"B",
  26:"A"
};

alpha[2];
alpha[24];

const value = 2;
alpha[value];
```

alpha[2] 是字符串 Y，alpha[24] 是字符串 C，alpha[value] 是字符串 Y。

案例：
**把 switch 语句转化为对象 lookup 调用。 使用它来查找 val 属性的值，并赋值给 result 变量。**
作业：

```javascript
// Setup
function phoneticLookup(val) {
  var result = "";

  // Only change code below this line
  switch(val) {
    case "alpha": 
      result = "Adams";
      break;
    case "bravo": 
      result = "Boston";
      break;
    case "charlie": 
      result = "Chicago";
      break;
    case "delta": 
      result = "Denver";
      break;
    case "echo": 
      result = "Easy";
      break;
    case "foxtrot": 
      result = "Frank";
  }

  // Only change code above this line
  return result;
}

// Change this value to test
phoneticLookup("charlie");
```

交作业：

```javascript
// 设置
function phoneticLookup(val) {
    let result = "";
    // 只修改这一行下面的代码
    let lookup = {
        "alpha": "Adams",
        "bravo": "Boston",
        "charlie": "Chicago",
        "delta": "Denver",
        "echo": "Easy",
        "foxtrot": "Frank"
    }
    result = lookup[val];
    // 只修改这一行上面的代码
    return result;
}

console.log(phoneticLookup("charlie"));

```

# 测试对象的属性-.hasOwnProperty(propname)

有时检查一个对象属性是否存在是非常有用的。 我们可以用对象的 **.hasOwnProperty(propname)** 方法来检查对象是否有指定的属性。 **.hasOwnProperty()** 找到该属性时返回 **true**，找不到该属性时返回 **false**。

示例

```javascript
const myObj = {
    top: "hat",
    bottom: "pants"
}

console.log(myObj.hasOwnProperty("top"));
console.log(myObj.hasOwnProperty("middle"));
```

第一个 **hasOwnProperty** 返回 **true**，第二个返回 **false**。
![image-1657030112861](upload/2022/07/image-1657030112861.png)

作业：修改函数` checkObj `检查 `obj `是否有` checkProp `属性。 如果属性存在，返回属性对应的值。 **如果不存在**，返回`"Not Found"`。

![image-1657032003404](upload/2022/07/image-1657032003404.png)

交作业：

```javascript
function checkObj(obj, checkProp) {
    // 只修改这一行下面的代码
    if (obj.hasOwnProperty(checkProp)) {
        return obj[checkProp];
    } else {
        return 'Not Found';
    }
    // 只修改这一行上面的代码
}
```

或者

```javascript
function checkObj(obj, checkProp) {
    // 只修改这一行下面的代码
    return obj[checkProp] || 'Not Found';
    // 只修改这一行上面的代码
}
```

上面这种解法来自中北大学软院某大佬

# 操作复杂对象

https://chinese.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/manipulating-complex-objects
有时你可能希望将数据存储在一个灵活的`数据结构（Data Structure）`中。 JavaScript 对象是一种灵活的数据结构。 它可以储存`字符串（strings）`、`数字（numbers）`、`布尔值（booleans）`、`数组（arrays）`、`函数（functions）`和`对象（objects）`以及这些值的任意组合。

这是一个复杂数据结构的示例：

```javascript
const ourMusic = [
  {
    "artist": "Daft Punk",
    "title": "Homework",
    "release_year": 1997,
    "formats": [ 
      "CD", 
      "Cassette", 
      "LP"
    ],
    "gold": true
  }
];
```

这是一个包含一个对象的数组。 该对象有关于专辑的各种元数据（metadata）。 它也有一个嵌套的 formats 数组。 可以将专辑添加到顶级数组来增加更多的专辑记录。 对象将数据以一种键 - 值对的形式保存。 在上面的示例中，"artist": "Daft Punk" 有一个键为 artist 值为 Daft Punk 的属性。

**提示：**数组中有多个 JSON 对象的时候，对象与对象之间要用逗号隔开。

作业：添加一个新专辑到 myMusic 数组。 添加 artist 和 title 字符串，release_year 数字和 formats 字符串数组。

交作业：

```javascript
const myMusic = [
  {
    "artist": "Billy Joel",
    "title": "Piano Man",
    "release_year": 1973,
    "formats": [
      "CD",
      "8T",
      "LP"
    ],
    "gold": true
  },
    {
    "artist": "Beau Carnes",
    "title": "Cereal Man",
    "release_year": 2003,
    "formats": [
      "YouTube video",
      "Bilibili video"
    ]
  }
];
```

# 访问嵌套对象

我们可以通过连续使用点号表示法和方括号表示法来访问对象的嵌套属性。

这是一个嵌套对象：

```javascript
const ourStorage = {
  "desk": {
    "drawer": "stapler"
  },
  "cabinet": {
    "top drawer": { 
      "folder1": "a file",
      "folder2": "secrets"
    },
    "bottom drawer": "soda"
  }
};

ourStorage.cabinet["top drawer"].folder2;
ourStorage.desk.drawer;
```

`ourStorage.cabinet["top drawer"].folder2 `将会是字符串 `secrets`，并且 `ourStorage.desk.drawer `将会是字符串 stapler。

> 这里说明一下，如果字符串之间有空格就不用.，而是使用[]