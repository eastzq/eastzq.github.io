# 在 Switch 语句添加多个相同选项
如果你忘了给 switch 的每一条 case 添加 break，那么后续的 case 会一直执行，直到遇见 break 为止。 如果你想为 switch 中的多个不同的输入设置相同的结果，可以这样写：
```javascript
let result = "";
switch (val) {
  case 1:
  case 2:
  case 3:
    result = "1, 2, or 3";
    break;
  case 4:
    result = "4 alone";
}
```
# 用一个 Switch 语句来替代多个 if else 语句
如果你有多个选项需要选择，switch 语句写起来会比多个串联的 if/else if 语句容易些。 譬如:
```javascript
if (val === 1) {
  answer = "a";
} else if (val === 2) {
  answer = "b";
} else {
  answer = "c";
}
```
可以被下面替代：
```javascript
switch (val) {
  case 1:
    answer = "a";
    break;
  case 2:
    answer = "b";
    break;
  default:
    answer = "c";
}
```
这样，1、2、3 都会有相同的结果。