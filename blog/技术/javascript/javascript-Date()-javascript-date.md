# 简单调用
```javascript
let date = new Date();
console.log(date);
```
返回结果
`Fri Jul 08 2022 09:31:44 GMT+0800 (中国标准时间)`
> 如果没有跟参数，返回当前系统的当前时间

![image-1657244903923](/upload/2022/07/image-1657244903923.png)

# 获取当前时间年份
```javascript
let date = new Date();
console.log(date.getFullYear());
```
剩下的仿照上面的图就可以了

> 注意个事情：getMonth()得到的月份小一个月，要记住月份+1
> getDay() 周一返回的是1，周六返回的是6.**周日返回的是0**

# 显示当前年月日星期小时分钟
```javascript
function getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dat = date.getDay();
    let arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let h = date.getHours();
    let hour = h < 10 ? '0' + h : h;
    let m = date.getMinutes();
    let minutes = m <10 ? '0' + m : m;
    return "今天是：" + year + '年' + month + '月' + day + '日' + arr[dat] + hour + '时' + minutes + '分';

}
document.write(getTime())
```
![image-1657246354786](/upload/2022/07/image-1657246354786.png)
