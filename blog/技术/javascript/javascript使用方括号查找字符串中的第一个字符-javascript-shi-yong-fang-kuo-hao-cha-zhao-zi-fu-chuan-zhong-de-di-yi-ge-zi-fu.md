方括号表示法（Bracket notation）是一种在字符串中的特定 index（索引）处获取字符的方法。

大多数现代编程语言，如 JavaScript，不同于人类从 1 开始计数。 它们是从 0 开始计数。 这被称为基于零（Zero-based）的索引。

例如，单词 Charles 的索引 0 的字符是 C。 所以如果 `const firstName = "Charles"`，你可以通过 `firstName[0]` 得到字符串第一个字母的值。
```javascript
const firstName = "Charles";
const firstLetter = firstName[0];
console.log(firstLetter);
```
输出结果为`C`