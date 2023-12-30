![image-1657247543823](/upload/2022/07/image-1657247543823.png)

# 获得总毫秒数的方法

![image-1657247618819](/upload/2022/07/image-1657247618819.png)

# 倒计时案例
```javascript
function countDown(time) {
    let nowTime = +new Date();
    let inputTime = +new Date(time);
    let cutTime = inputTime - nowTime;
    let cutTimeSeconds = cutTime/1000;
    let remainDays = parseInt(cutTimeSeconds/60/60/24);
    let remainHours = parseInt(cutTimeSeconds/60/60%24);
    let remainMinutes = parseInt(cutTimeSeconds/60%60);
    let remainSeconds = parseInt(cutTimeSeconds%60);
    return remainDays +'天'+remainHours+'时'+remainMinutes+'分'+remainSeconds+'秒';
}
console.log(countDown('2022-9-20 00:00:00')); //传入参数格式 xxxx-x-xx xx:xx:xx'
```