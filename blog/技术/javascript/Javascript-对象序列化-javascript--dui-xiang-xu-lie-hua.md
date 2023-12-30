```js
const stu1 = {
  name: "xiaoming",
  age: 18,
  friend: {
    name: "mike",
    age: 17,
  },
};
const stu1_json = JSON.stringify(stu1); //对象转json
console.log(stu1_json);
const stu1_obj = JSON.parse(stu1_json); //json转object
console.log(stu1_obj);

```
![](https://static.meowrain.cn/i/2023/01/02/z32bpe-3.png)