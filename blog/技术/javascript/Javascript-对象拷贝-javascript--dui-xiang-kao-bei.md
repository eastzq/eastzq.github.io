## 两种对象拷贝
```javascript
       let stu = {
            name: "meow",
            age: 17,
            friend: {
                name: "mike",
                age: 16
            }
        }
        function copyObj(obj) {
            let newObj = {};
            //对象拷贝： 浅拷贝
            for (let i in obj) {
                newObj[i] = obj[i];
            }
            return newObj;
        }
        let newStu = copyObj(stu);
        console.log(newStu);



        let stu1 = {
            name: "meow",
            age: 17,
            fridend: {
                name: "mike",
                age: 16
            }
        }
        function copyObj_deeep(obj) {
            //对象拷贝： 深拷贝
            let newObj = {};
            for (let i in obj) {
                if (obj[i] instanceof Object) {
                    newObj[i] = copyObj_deeep(obj[i]);
                } else {
                    newObj[i] = obj[i];
                }
            }
            return newObj;
        }
        let stu2 = copyObj_deeep(stu1);
        stu1.fridend.name = "gggg";
        console.log(stu1);
        console.log(stu2);


```
## 通过JSON方法实现对象深拷贝
```javascript
      //用json方法转换为字符串实现对象的深度拷贝
        let stu1 = {
            name: "meow",
            age: 17,
            fridend: {
                name: "mike",
                age: 16
            }
        }
        let stuStr = JSON.stringify(stu1);
        let stu2 = JSON.parse(stuStr);
        console.log(stu2);
```
