你应该还记得相等运算符这道挑战题。 在那里我们提到，所有比较操作符都会返回 boolean：要么是 true 要么是 false。

有时人们通过 if/else 语句来做比较，像这样。
```javascript
function isEqual(a, b) {
  if (a === b) {
    return true;
  } else {
    return false;
  }
}
```
但有更好的方式来达到相同的效果。 既然 === 返回 true 或 false 我们可以直接返回比较结果：
```javascript
function isEqual(a, b) {
  return a === b;
}
```

