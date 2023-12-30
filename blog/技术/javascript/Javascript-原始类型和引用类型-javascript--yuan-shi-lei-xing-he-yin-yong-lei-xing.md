```javascript
        //原始类型
        let addr_name = "beijing";
        let addr_name2 = addr_name;
        addr_name = "jinan";
        console.log(addr_name); // jinan
        console.log(addr_name2); // beijing
        //引用类型
        let stu1 = {
            name: 'xiaoming',
            age: 17
        }
        let stu2 = stu1;
        stu2.name = "xiaohong";
        console.log(stu1);//{name: 'xiaohong', age: 17}
        console.log(stu2);//{name: 'xiaohong', age: 17}
        //---------------------------
        //原始类型得比较
        let str1 = "helloworld";
        let str2 = "helloworld";
        console.log(str1 === str2); //true
        //引用类型得比较
        let obj1 = {
            name:"obj1"
        };
        let obj2 = {
            name:"obj1"
        };
        console.log(obj1 === obj2); //false


        //函数传参问题
        let arr = [1,2,3,4];

        function fun(arr){
            arr.push(10);
        }
        fun(arr);
        console.log(arr);
        let n = 10;
        function fun2(n){
            this.n = 20;
        }
        console.log(n);

```
![](https://static.meowrain.cn/i/2022/12/28/x3m7d9-3.png)