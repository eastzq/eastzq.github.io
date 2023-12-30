```javascript
 let num = 10;
        console.log(typeof num.toString()); // string
        let str = "hello world";
        console.log(str.split(" ")); // ["hello","world"]
        console.log(str.length);// 11
        //三种包装对象
        //1. new String()
        //2. new Number()
        //3. new Boolean
        // 原始类型调用方法或属性的时候,程序的后台会把他们转换为相应的包装对象,因此可以使用上面的那些
        //对象方法
        str = "helloworld";
        str.name = "xiaoming";
        console.log(str.name); //undefined
        //转换成包装对象,并且成功执行方法后,包装对象会立即销毁,变量又重新回到原始类型的状态


        let num1 = new Number(123);
        let num2 = new Number(123);
        console.log(num1 === num2); //false
        /*上面两个是引用类型,所以地址不同 */

        /* 创建包装对象的构造函数可以用来做类型转换 */
        let num3 = 123;
        console.log(String(num3));
        console.log(Boolean(num3));
        let num4 = 123;
        console.log(num4.toString());
```