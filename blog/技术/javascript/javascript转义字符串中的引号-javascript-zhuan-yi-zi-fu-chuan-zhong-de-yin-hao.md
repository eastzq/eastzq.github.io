定义一个字符串必须要用单引号或双引号来包裹它。 那么当你的字符串里面包含引号 " 或者 ' 时该怎么办呢?

在 JavaScript 中，可以通过在引号前面使用反斜杠（\）来转义引号。
`const sampleStr = "Alan said, \"Peter is learning JavaScript\".";`
有了转义符号，JavaScript 就知道这个单引号或双引号并不是字符串的结尾，而是字符串内的字符。 所以，上面的字符串打印到控制台的结果为：
`Alan said, "Peter is learning JavaScript".`

\"  双引号之间的内容\”
这样就可以让双引号显示出来了


举例：
```javascript
const myStr = "I am a \"double quoted\" string inside \"double quotes\"."; // 修改这一行
```
使用反斜杠给 myStr 变量赋值一个字符串，这样如果你要打印它到控制台，将会看到：

`I am a "double quoted" string inside "double quotes".`