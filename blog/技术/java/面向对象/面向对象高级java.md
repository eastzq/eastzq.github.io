# Java面向对象(高级)
 [面型对象高级](https://www.acwing.com/blog/content/39201/) 
 [面型对象中级](https://www.acwing.com/blog/content/29022/)
 [面型对象初级](https://www.acwing.com/blog/content/29021/)
## 类变量/类方法
[类变量/类方法-博客园](https://www.cnblogs.com/ffforward/p/15244615.html#:~:text=%E3%80%90%E7%B1%BB%E5%8F%98%E9%87%8F%E3%80%91%201%20%E4%BB%8B%E7%BB%8D%20%E7%B1%BB%E5%8F%98%E9%87%8F%EF%BC%88%E5%8F%88%E5%8F%AB%E9%9D%99%E6%80%81%E5%8F%98%E9%87%8F%EF%BC%89%E6%98%AF%E8%AF%A5%E7%B1%BB%E7%9A%84%E6%89%80%E6%9C%89%E5%AF%B9%E8%B1%A1%E5%85%B1%E4%BA%AB%E7%9A%84%E5%8F%98%E9%87%8F%EF%BC%8C%E4%BB%BB%E4%BD%95%E4%B8%80%E4%B8%AA%E8%AF%A5%E7%B1%BB%E7%9A%84%E5%AF%B9%E8%B1%A1%E5%8E%BB%E8%AE%BF%E9%97%AE%E5%AE%83%E6%97%B6%EF%BC%8C%E5%8F%96%E5%88%B0%E7%9A%84%E9%83%BD%E6%98%AF%E7%9B%B8%E5%90%8C%E7%9A%84%E5%80%BC%EF%BC%8C%E5%90%8C%E6%A0%B7%E4%BB%BB%E4%BD%95%E4%B8%80%E4%B8%AA%E8%AF%A5%E7%B1%BB%E7%9A%84%E5%AF%B9%E8%B1%A1%E5%8E%BB%E4%BF%AE%E6%94%B9%E5%AE%83%E6%97%B6%EF%BC%8C%E4%BF%AE%E6%94%B9%E7%9A%84%E4%B9%9F%E6%98%AF%E5%90%8C%E4%B8%80%E4%B8%AA%E5%8F%98%E9%87%8F%E3%80%82%20%E5%AE%9A%E4%B9%89%E7%B1%BB%E5%8F%98%E9%87%8F%EF%BC%9A%20%E8%AE%BF%E9%97%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6%20static%20%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B,%E7%B1%BB%E5%8F%98%E9%87%8F%E7%9A%84%E8%AE%BF%E9%97%AE%20%E5%8F%AF%E4%BB%A5%E9%80%9A%E8%BF%87%20%E7%B1%BB%E5%90%8D.%E7%B1%BB%E5%8F%98%E9%87%8F%E5%90%8D%20%E6%88%96%E8%80%85%20%E5%AF%B9%E8%B1%A1%E5%90%8D.%E7%B1%BB%E5%8F%98%E9%87%8F%E5%90%8D%20%E6%9D%A5%E8%AE%BF%E9%97%AE%EF%BC%8C%E4%BD%86Java%E8%AE%BE%E8%AE%A1%E8%80%85%E6%8E%A8%E8%8D%90%E6%88%91%E4%BB%AC%E4%BD%BF%E7%94%A8%20%E7%B1%BB%E5%90%8D.%E7%B1%BB%E5%8F%98%E9%87%8F%E5%90%8D%20%E7%9A%84%E6%96%B9%E5%BC%8F%E6%9D%A5%E8%AE%BF%E9%97%AE%E3%80%82)
![](https://static.meowrain.cn/i/2022/12/13/a87en5-3.png)

### 类变量快速入门
#### 介绍
类变量（又叫静态变量）是该类的所有对象共享的变量，任何一个该类的对象去访问它时，取到的都是相同的值，同样任何一个该类的对象去修改它时，修改的也是同一个变量。
> `定义类变量：访问修饰符 static 数据类型 变量名; `
**静态变量是类加载的时候，就创建了,所以我们没有创建对象实例**
定义一个变量 count ,是一个类变量(静态变量) static 静态
该变量最大的特点就是会被Child 类的所有的对象实例共享
```java
package cn.meowrain.classVariable;

public class var01 {
    public static void main(String[] args) {
        Child child01 = new Child("mike");
        Child child02 = new Child("john");
        child01.count++;
        child02.count++;
        System.out.println("共有" + Child.count + "个小朋友参加了游戏");
    }
}
class Child {
    private String name;
    public static int count = 0;
    public Child(String name){
        this.name = name;
    }
    public void join() {
        System.out.println("小朋友" + name + "加入了游戏....");
    }
}
```
> 输出: 共有2个小朋友参加了游戏

#### 访问类变量
> 可以通过 `类名.类变量名` 或者 `对象名.类变量名` 来访问，但Java设计者推荐我们使用 类名.类变量名 的方式来访问。
```java
package cn.meowrain.classVariable;

public class var01 {
    public static void main(String[] args) {
        Child child01 = new Child("mike");
        Child child02 = new Child("john");
        child01.join();
        child02.join();
        System.out.println("共有" + Child.count + "个小朋友参加了游戏"); 
        //通过 对象名.类变量名 来访问
    }
}
class Child {
    private String name;
    public static int count = 0;
    public Child(String name){
        this.name = name;
    }
    public void join() {
        System.out.println("小朋友" + name + "加入了游戏....");
        count++;
    }
}
```

### 类方法
#### 介绍
类变量也叫静态变量。
`定义格式如下：访问修饰符 static 数据返回类型 方法名(){}`
#### 类方法经典使用场景
（1）当方法中不涉及到任何和对象相关的成员，则可以将方法设计成静态方法，提高开发效率。
（2）比如工具类中的方法 utils
Math类、Arrays类、Collections集合类
（3）在实际开发中，往往将一些通用的方法，设计成静态方法，这样我们不需要创建对象就可以使用，比如打印一维数组，冒泡排序等等

#### 类方法和普通方法的区别
1. 类方法中不允许使用和对象有关的关键字，
2. 比如this 和super。普通方法(成员方法)可以。
3. 类方法中，只能访问 静态变量 或 静态方法；而普通方法既可以访问普通变量（方法），也可以访问静态的。

#### 类方法可以重写吗？
1. 可以被继承，但是不能被重写，如果父子类静态方法名相同，则会隐藏derive类方法（调用base类的方法）
2. 静态方法是编译时绑定的，方法重写是运行时绑定的。
https://blog.csdn.net/m0_37974032/article/details/81157433


类方法的使用： 
使用：
如下：
```java
package cn.meowrain.classVariable;

public class var02 {
}

class Caculate {
    public static void main(String[] args) {
        int sum01 = sum(1, 2);
        int sum02 = sum(5, 10, 20);
        System.out.println(sum01 + " " + sum02);//3 35
    }

    public static int sum(int a, int b) {
        return a + b;
    }

    public static int sum(int a, int b, int c) {
        return a + b + c;
    }
}
```

## 理解main方法
直接看下面这个文章就行了，写得很不错
https://www.cnblogs.com/ffforward/p/15253293.html

## Java代码块
#### 基本介绍
代码块又称为初始化块，属于类中的成员，类似于方法，把逻辑语句封装在方法体中，通过{}包围起来
**其在创建对象时隐式调用**
#### 基本语法
<pre style="color: blue">
<code>
[修饰符]{
    代码
}
</code>
</pre>

说明： 
(1) 修饰符可选，要写的话，也只能写static

(2) 代码块分为两类，使用static修饰的叫**静态代码块**，没有static修饰的，叫**普通代码块**

(3) 逻辑语句可以为任何逻辑语句（输入、输出、方法调用、循环、判断等

(4) 分号；可以写上，也可以省略

#### 代码块的好处
（1）相当于另外一种形式的构造器（对构造器的补充机制），可以做初始化的操作。

（2）如果多个构造器中都有重复的语句，可以抽取到初始化块中，提高代码的复用性


**实际使用：**

如下，我们的三个构造器中都含有`System.out.println("Welcome to Code World!");`，这使得代码很冗杂，使用代码块，就能让这个代码更好看一些，代码块会在每次类创建时调用

```java
package cn.meowrain.codeBlock;

public class code01 {
    public static void main(String[] args) {
        code01_child child01 = new code01_child("mike");
        code01_child child02 = new code01_child("meme", 15);
        code01_child child03 = new code01_child("meow", 18, "bear");
    }
}

class code01_child {
    String name;
    int age;
    String love;
    public code01_child(String name) {
        this.name = name;
        System.out.println("Welcome to Code World!");
        System.out.println("hello " + name);
    }
    public code01_child(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Welcome to Code World!");
        System.out.println("hello " + name);
    }
    public code01_child(String name,int age,String love) {
        this.name = name;
        this.love = love;
        this.age = age;
        System.out.println("Welcome to Code World!");
        System.out.println("hello " + name);
    }
    
}
```

·············修改版···················
```java
package cn.meowrain.codeBlock;

public class code01 {
    public static void main(String[] args) {
        code01_child child01 = new code01_child("mike");
        code01_child child02 = new code01_child("meme", 15);
        code01_child child03 = new code01_child("meow", 18, "bear");
    }
}

class code01_child {
    String name;
    int age;
    String love;
    {
        System.out.println("Welcome to Code World!");
    }
    public code01_child(String name) {
        this.name = name;

        System.out.println("hello " + name);
    }
    public code01_child(String name, int age) {
        this.name = name;
        this.age = age;

        System.out.println("hello " + name);
    }
    public code01_child(String name,int age,String love) {
        this.name = name;
        this.love = love;
        this.age = age;

        System.out.println("hello " + name);
    }
    
}
```
输出结果：
```bash
Welcome to Code World!
hello mike
Welcome to Code World!
hello meme
Welcome to Code World!
hello meow
```


#### static 代码块
static代码块也叫静态代码块，作用就是对类进行初始化，而且它随着类的加载而执行，并且只会执行一次。

实际使用： 
```java
package cn.meowrain.codeBlock;

public class code01 {
    public static void main(String[] args) {
        code01_child child01 = new code01_child("mike");
        code01_child child02 = new code01_child("meme", 15);
        code01_child child03 = new code01_child("meow", 18, "bear");
    }
}

class code01_child {
    String name;
    int age;
    String love;
    static{
        System.out.println("Welcome to Code World!");
    }
    public code01_child(String name) {
        this.name = name;

        System.out.println("hello " + name);
    }
    public code01_child(String name, int age) {
        this.name = name;
        this.age = age;

        System.out.println("hello " + name);
    }
    public code01_child(String name,int age,String love) {
        this.name = name;
        this.love = love;
        this.age = age;

        System.out.println("hello " + name);
    }
    
}
```

输出结果：
>因为静态代码块只执行一次，所以只输出一次 `Welcome to Code World!`
```bash
Welcome to Code World!
hello mike
hello meme
hello meow
```

### 代码块使用注意事项
1. static代码块也叫静态代码块，作用就是对类进行初始化，而且它随着**类的加载而执行，只会执行一次**。如果是普通代码块，每创建一个对象，就执行一次。可以看上面的代码和运行结果
2. 类什么时候被加载？
   1. 创建对象实例 new 的时候
   2. 创建子类对象实例，父类也会被加载
   3. 使用类的静态成员时（静态属性，静态方法）
        ```java
        package cn.meowrain.codeBlock;

        public class code02 {
            public static void main(String[] args) {
                int c = A.sum(109, 10);
            }
        }

        class A {
            static{
                System.out.println("hello");
            }
            public static int sum(int a,int b){
                return a+b;
            }
        }
        class B extends A{

        }
        ```
        > 运行结果： hello
        由上可见,静态代码块会在类加载的时候执行
3. 普通的代码块，在创建对象实例（new的时候），会被隐式调用，如果只是单纯使用类中的静态变量，普通代码块不会被执行
    ```java
    package cn.meowrain.codeBlock;

    public class code02 {
        public static void main(String[] args) {
            int c = A.sum(109, 10);
            
        }
    }

    class A {
        {
            System.out.println("hello");
        }
        static int a = 10;
        public static int sum(int a, int b) {
            return a + b;
        }

    }

    class B extends A {

    }
    ```
   输出结果： 无
4. 创建一个对象的时候，在一个类的调用顺序是:
   - 调用静态代码块和静态属性初始化，按照顺序调用
   - 调用普通代码块和普通属性的初始化，按照顺序调用
   - 调用构造方法
    ```java
    package cn.meowrain.codeBlock;

    public class code03 {
        public static void main(String[] args) {
            AB ab = new AB();
            
        }
    }
    class AB {
        static {
            System.out.println("静态代码块初始化");
        }
        static int a = getN1();
        public static int getN1(){
            System.out.println("静态方法getN1初始化");
            return 100;
        }
        int c = getN2();
        public int getN2() {
            System.out.println("普通方法getN2初始化");
            return 200;
        }
        public AB(){
            System.out.println("构造器被调用");
        }
    }
    ```

> 运行结果如下
> 静态代码块初始化
> 静态方法getN1初始化
> 普通方法getN2初始化
> 构造器被调用     

## 单例设计模式
参考https://www.cnblogs.com/ffforward/p/15259948.html
### 介绍：
单例设计模式，就是采取一定的方法保证在整个的软件系统中，对某个类只能存在一个对象实例，并且该类只提供一个取得其对象实例的方法
> 单例模式有两种： 
> 1. 饿汉式
> 2. 懒汉式

### 实现方式
- 构造器私有化
- 类的内部创建对象
- 向外暴露一个静态的公共方法

### 饿汉式
> 类加载的时候实例化，并且创建单例对象
> 1. 构造器私有化
> 2. 在类的内部直接创建对象，该对象为static
> 3. 提供一个公共的static方法，返回这个对象
```java
package cn.meowrain.singlecasemode;
class test {
    public static void main(String[] args) {
        Hungry hungry = Hungry.getInstance();
        System.out.println(hungry.name);

    }
}
public class Hungry {
    public String name;
    private Hungry(String name){
        this.name = name;
    } //构造器私有化
    private static Hungry hungry = new Hungry("hello");
    public static Hungry getInstance(){
        return hungry;
    }
}

```

### 懒汉式
> 懒汉式： 默认不会实例化，什么时候用什么时候new
> 1. 构造器私有化
> 2. 定义一个static静态属性对象
> 3. 提供一个public的static方法，可以返回一个该类对象
> 4. 懒汉式，只有当用户使用getInstance时，才返回对象，后面再次调用时，会返回上次创建的该类对象，从而保证单例
```java
package cn.meowrain.singlecasemode;
class test02 {
    public static void main(String[] args) {
        Lazy lazy = Lazy.getInstanceOf();
        System.out.println(lazy.name);
    }
}
public class Lazy {
    public String name;
    private Lazy(String name){
        this.name = name;
    }
    private static Lazy lazy = null;
    public static Lazy getInstanceOf(){
        if(lazy==null){
            lazy = new Lazy("mmm");
        }
        return lazy;
    }

}
```
### 饿汉式和懒汉式的区别
（1）二者最主要的区别在于创建对象的时机不同：
饿汉式是在类加载时就创建了对象实例，
而懒汉式是在使用时才创建。

（2）饿汉式不存在线程安全问题，懒汉式存在线程安全问题。

（3）饿汉式存在浪费资源的可能（没有使用到这个对象实例），而懒汉式不存在这个问题。

（4）在javaSE标准类中，java.lang.Runtime就是经典的单例模式。

## final关键字
### 基本介绍：
final可以修饰类，属性，方法和局部变量
使用环境：
<pre style="color:red">
<code>
1. 当不希望类被继承时，可以用final修饰
2. 当不希望父类的某个方法被子类覆盖/重写时，可以用final关键字修饰
3. 当不希望类的某个属性的值被修改，可用final修饰
4. 当不希望某个局部变量被修改，可以用final修饰
</code>
</pre>
### final使用注意事项
> 1. final修饰的属性又叫常量
> 2. final修饰的属性在定义的时候，必须赋初值，并且以后不能再修改
> 3. 如果final修饰的属性是静态的，则初始化的位置只能是 1.定义时 2.在静态代码块中可以赋值，不能在构造器中赋值
> 4. final类不能继承，但是可以实例化对象
> 5. 如果类不是final类，但是有final方法，则该方法虽然不能重写，但可以被继承
> 6.final和static往往搭配使用，效率更高，不会导致类加载，底层编译器做了优化处理
> 7. 包装类(**Integer,Double,Float,Boolean等都是final**)，**String**也是final类


# Java内部类

## 1.内部类定义

把一个类定义在另一个类内部称为内部类

### 2.内部类分类

#### 成员内部类

　成员内部类是最普通的内部类，它的定义为位于另一个类的内部，形如下面的形式：

```java
class Circle {
    private double radius = 0;
     
    public Circle(double radius) {
        this.radius = radius;
    }
     
    class Draw {     //内部类
        public void drawSahpe() {
            System.out.println("drawshape");
        }
    }
}
```

类Draw像是类Circle的一个成员，Circle称为外部类。

> ** 成员内部类可以无条件访问外部类的所有成员属性和成员方法（包括private成员和静态成员）。**

```java
class Circle {
    private double radius = 0;
    
    public Circle(double radius) {
        this.radius = radius;
    }

    public void calculateArea() {
        System.out.println(Math.PI * radius * radius);
    }
    class Draw {     //内部类
        public void drawSahpe() {
            System.out.println("drawshape");
            calculateArea();
        }
    }
}
class Test {
    public static void main(String[] args) {
        Circle circle = new Circle(12);
        circle.new Draw().drawSahpe();
    }
}
```

> 当成员内部类拥有和外部类同名的成员变量或者方法时，会发生隐藏现象，即默认情况下访问的是成员内部类的成员。
> 
> 如果要访问外部类的同名成员，需要以下面的形式进行访问：
> 
> ```java
> 外部类.this.成员变量
> 外部类.this.成员方法
> ```

```java
class Shape {
    private String shape;
    public Shape(String shape) {
        this.shape = shape;
    }
    public void getShape() {
        System.out.println("The shape is " + shape + "in OuterClass");
    }
    class Circle {     //内部类
        private String shape;
        private int radius;
        public Circle(int radius,String shape) {
            this.radius = radius;
            this.shape = shape;
        }
        public void getShape() {
            System.out.println("The shape is Circle in InnerClass");
        }
        public void getArea() {
            getShape(); //调用内部类的方法
            Shape.this.getShape(); //调用外部类的方法
            System.out.println(Math.PI*radius*radius);
        }
    }
}
class Test {
    public static void main(String[] args) {
        Shape shape = new Shape("Circle");
        Shape.Circle circle = shape.new Circle(2,"CircleInnerClass");
        circle.getArea();
    }
}
```

像这样，可以看到，内部类和外部类有同名方法和属性，我们使用内部类调用了内部类的getArea方法，然后getShape()先取得是内部类得方法，如果想调用外部类方法，就只能用`外部类.this.xxx方法/属性名来调用外部类得同名方法了。

---

#### 外部类访问内部类

虽然成员内部类可以无条件地访问外部类的成员，而外部类想访问成员内部类的成员却不是这么随心所欲了。在外部类中如果要访问成员内部类的成员，必须先创建一个成员内部类的对象，再通过指向这个对象的引用来访问：

```java
class Circle {
    private double radius = 0;
 
    public Circle(double radius) {
        this.radius = radius;
        new Draw().drawSahpe();   //必须先创建成员内部类的对象，再进行访问
    }
     
    class Draw {     //内部类
        public void drawSahpe() {
            System.out.println(radius);  //外部类的private成员
        }
    }
}
```

　成员内部类是依附外部类而存在的，也就是说，如果要创建成员内部类的对象，前提是必须存在一个外部类的对象。创建成员内部类对象的一般方式如下：

```java
class Outer {
    public Inner getInnerInstance() {
        return new Inner();
    }
    class Inner {

    }
}

public class Test {
    public static void main(String[] args) {
        Outer o = new Outer();
        Outer.Inner in = o.new Inner(); //第一种
        Outer.Inner in2 = o.getInnerInstance(); //第二种
    }
}
```

内部类可以拥有private访问权限、protected访问权限、public访问权限及包访问权限。比如上面的例子，如果成员内部类Inner用private修饰，则只能在外部类的内部访问，如果用public修饰，则任何地方都能访问；如果用protected修饰，则只能在同一个包下或者继承外部类的情况下访问；如果是默认访问权限，则只能在同一个包下访问。

#### 局部内部类

　　局部内部类是定义在一个方法或者一个作用域里面的类，它和成员内部类的区别在于局部内部类的访问仅限于方法内或者该作用域内。

```java
public class Test {
    public static void main(String[] args) {
        People man = new People("meowrain").createMan("meowrain", 20);
        man.outputInfo();
    }
}

class People {
    String name;

    public People(String name) {
        this.name = name;
    }

    public void outputInfo() {
        System.out.println("The man's name is " + name + "\n");
    }

    public People createMan(String name, int age) {
        class Man extends People {
            int age;

            public Man(String name, int age) {
                super(name);
                this.age = age;
            }

            public void outputInfo() {
                System.out.println("The man's name is " + name + "\n" + "age is :" + age);
            }
        }
        return new Man(name, age);

    }

}
```

#### 匿名内部类

　　匿名内部类应该是平时我们编写代码时用得最多的，在编写事件监听的代码时使用匿名内部类不但方便，而且使代码更加容易维护。

> 不使用匿名内部类
> 
> ```java
> interface func {
>     public void sayHello();
> 
>     public void PlayGames();
> }
> 
> class Human implements func {
>     String name;
>     int age;
> 
>     public Human(String name, int age) {
>         this.name = name;
>         this.age = age;
>     }
> 
>     @Override
>     public void sayHello() {
>         System.out.println("Hello World");
>     }
> 
>     @Override
>     public void PlayGames() {
>         System.out.println("Playing Games now");
>     }
> 
>     public void outputInfo() {
>         System.out.println("The human's name is " + name + "\n" + "The human's age is " + age);
>     }
> 
> }
> 
> public class Anoymous {
>     public static void main(String[] args) {
>         Human human = new Human("meowrain", 20);
>         human.PlayGames();
>         human.sayHello();
>         human.outputInfo();
>     }
> }
> ```

》

在上面的代码中，我们没有使用匿名内部类，但是实现了func接口

接下来我们使用匿名内部类

![](https://static.meowrain.cn/i/2023/11/03/yx6e1h-3.webp)

![](https://static.meowrain.cn/i/2023/11/03/yxpncm-3.webp)

> //可以直接访问外部类的所有成员，包含私有的
> 
> //如果外部类和匿名内部类的成员重名时，匿名内部类访问的话，
> 
> //默认遵循就近原则，如果想访问外部类的成员，则可以使用 （外部类名.this.成员）去访问

```java
interface HumanFunc {
    public void sayHello();

    public void PlayGames();
}

class Human implements HumanFunc {
    String name;
    int age;

    public Human(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public void sayHello() {
        System.out.println("Hello World");
    }

    @Override
    public void PlayGames() {
        System.out.println("Playing Games now");
    }

    public void outputInfo() {
        System.out.println("The human's name is " + name + "\n" + "The human's age is " + age);
    }

    public void eat() {
        System.out.println("Human " + name + " Eat\t" + this.getClass().getName());
    }

    public void drink() {
        System.out.println("Human" + name + " Drink\t"+ this.getClass().getName());
    }

}

public class Anoymous {
    public static void main(String[] args) {
        Human human = new Human("meowrain", 20);

        HumanFunc human2 = new HumanFunc() {
            @Override
            public void sayHello() {
                System.out.println("HelloWorld");
            }

            @Override
            public void PlayGames() {
                System.out.println("Games Play");
                System.out.println(this.getClass().getName());
            }
        };
        HumanFunc human3 = new HumanFunc() {
            @Override
            public void sayHello() {
                System.out.println("HelloWorld");
            }

            @Override
            public void PlayGames() {
                System.out.println("Games Play2");
                System.out.println(this.getClass().getName());
            }
        };

        Human human4 = new Human("meow", 33) {
            public void eat() {
                System.out.println("Human " + name + " Eat" + "in inner" + this.getClass());
            }

            public void drink() {
                System.out.println("Human" + name + " Drink" + "in inner" + this.getClass());
            }
        };

        human.PlayGames();
        human.sayHello();
        human.outputInfo();

        human2.PlayGames();
        human3.PlayGames();

        System.out.println("-----------------------------");
        human.eat();
        human.drink();
        System.out.println("-----------------------------");
        human4.eat();
        human4.drink();
        System.out.println("-----------------------------");
    }
}

```

![](https://static.meowrain.cn/i/2023/11/03/z6p9m7-3.webp)

在human4这里，其实是创建了一个子类，继承了父类Human，然后重写了父类中的方法，最后返回

前面的human3,2都是创建一个匿名类，然后implement了接口，实现了接口方法

这些都是多态的体现

比如为什么human4输出的会调用匿名内部类的方法，而不是父类Human的方法，其实这是动态绑定的表现

下面浅浅介绍一下动态绑定：

```java
public class DynamicBinding {
    public static void main(String[] args) {
        Parent son = new Son(); // 创建一个父类引用指向子类对象，体现了多态的特性
        System.out.println(son.name); // 多态不适用于实例变量，输出父类中的name
        Son son2 = (Son) son; // 将父类引用强制转换为子类引用，以便调用子类特有的成员
        System.out.println(son2.name); // 使用子类引用，输出子类中的name
        System.out.println(son.getName()); // 虚方法调用，根据对象的实际类型确定调用子类中的getName方法
    }
}

class Parent {
    String name = "Parent"; // 父类的name实例变量

    public String getName() { // 父类的getName方法
        return this.name;
    }
}

class Son extends Parent {
    String name = "Son"; // 子类的name实例变量

    @Override
    public String getName() { // 子类重写了父类的getName方法
        return this.name;
    }
}
```

上面的代码展示了多态和动态绑定的表现。

在代码中，`Parent`类是一个父类，`Son`类是一个子类，`Son`类继承自`Parent`类。

在`DynamicBinding`类的`main`方法中，通过多态的方式创建了一个`Parent`对象`son`，实际上指向的是一个`Son`对象。

在第一个`System.out.println`语句中，打印了`son.name`，由于`name`是一个实例变量，而不是一个方法，所以多态不适用。因此，输出的是`Parent`，即父类中的`name`。

在第二个`System.out.println`语句中，将`son`强制转换为`Son`类型的对象`son2`，然后打印了`son2.name`。由于`son2`是一个`Son`类型的对象，所以输出的是`Son`，即子类中的`name`。

在第三个`System.out.println`语句中，调用了`son.getName()`方法。由于`getName`方法是一个虚方法，所以会根据对象的实际类型来确定调用哪个类中的实现。因此，输出的是`Son`，即子类中的`name`。

这就是多态和动态绑定的表现。多态使得可以通过父类类型的引用来引用子类对象，而动态绑定使得在运行时能够根据对象的实际类型来确定调用哪个类中的方法。

#### 静态内部类

![](https://static.meowrain.cn/i/2023/11/03/zd2cu9-3.webp)

以下是一个静态内部类的例子，涵盖了静态内部类的关键要点：

```java
public class OuterClass {
    private static int outerData = 10; // 外部类的静态数据

    public static void outerMethod() { // 外部类的静态方法
        System.out.println("Outer method");
    }

    public static class InnerClass { // 静态内部类
        private int innerData = 20; // 内部类的实例数据

        public void innerMethod() { // 内部类的实例方法
            System.out.println("Inner method");
        }

        public static void staticInnerMethod() { // 内部类的静态方法
            System.out.println("Static inner method");
        }
    }
}

public class MainClass {
    public static void main(String[] args) {
        OuterClass.InnerClass innerObj = new OuterClass.InnerClass(); // 创建静态内部类的实例

        System.out.println(innerObj.innerData); // 访问内部类的实例数据
        innerObj.innerMethod(); // 调用内部类的实例方法

        OuterClass.outerMethod(); // 调用外部类的静态方法
        OuterClass.InnerClass.staticInnerMethod(); // 调用内部类的静态方法
    }
}
```

这个例子中，`OuterClass`是外部类，`InnerClass`是静态内部类。

- 外部类有一个静态数据`outerData`和一个静态方法`outerMethod`。
- 静态内部类有一个实例数据`innerData`、一个实例方法`innerMethod`和一个静态方法`staticInnerMethod`。
- 在`MainClass`的`main`方法中，我们创建了一个`OuterClass.InnerClass`的实例`innerObj`。
- 我们可以通过`innerObj.innerData`来访问内部类的实例数据。
- 我们可以通过`innerObj.innerMethod()`来调用内部类的实例方法。
- 我们可以通过`OuterClass.outerMethod()`来调用外部类的静态方法。
- 我们可以通过`OuterClass.InnerClass.staticInnerMethod()`来调用内部类的静态方法。

这个例子涵盖了静态内部类的关键要点：外部类访问内部类的静态数据和静态方法，创建内部类的实例并访问其实例数据和实例方法。