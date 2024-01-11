# Bean的实例化模式
Spring为Bean提供了多种实例化方式，通常包括4种方式。（也就是说在Spring中为Bean对象的创建准备了多种方案，目的是：更加灵活）

● 第一种：通过构造方法实例化
● 第二种：通过简单工厂模式实例化
● 第三种：通过factory-bean实例化
● 第四种：通过FactoryBean接口实例化



# 通过构造方法实例化

```java
ConstructorBean.java
package com.powercode.spring6.beans;

public class ConstructorBean {
    public ConstructorBean(){
    
    }
}

```

---

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="constructorBean" class="com.powercode.spring6.beans.ConstructorBean"></bean>
</beans>
```

---

```java
测试程序`
    @Test
    public void testConstrucotrBean(){
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring9.xml");
        ConstructorBean constructorBean = applicationContext.getBean("constructorBean",ConstructorBean.class);
        System.out.println(constructorBean);

    }
```

---

```
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=36789:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testConstrucotrBean
2024-01-11 09:28:44 658 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@556d0826
2024-01-11 09:28:44 843 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 1 bean definitions from class path resource [spring9.xml]
2024-01-11 09:28:44 868 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'constructorBean'
com.powercode.spring6.beans.ConstructorBean@6058e535

```

# 通过简单工厂模式实例化

第一步：定义一个Bean
```java
package com.powercode.spring6.beans;

public class Fruit {
}

```

---

第二步：编写简单工厂模式当中的工厂类

```java
package com.powercode.spring6.beans;

public class FruitFactory {
    public static Fruit get(){
        return new Fruit();
    }
}

```

---

第三步：在Spring配置文件中指定创建该Bean的方法（使用factory-method属性指定）

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="fruitBean" class="com.powercode.spring6.beans.FruitFactory" factory-method="get"></bean>

</beans>
```

---


第四步：编写测试程序

```java

    @Test
    public void testSimpleFactoryMode(){
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring10.xml");
        Fruit fruit = applicationContext.getBean("fruitBean", Fruit.class);
        System.out.println(fruit);
    }
```

---


```txt

/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=44855:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testSimpleFactoryMode
2024-01-11 09:36:05 538 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@66ce957f
2024-01-11 09:36:05 670 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 1 bean definitions from class path resource [spring10.xml]
2024-01-11 09:36:05 698 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'fruitBean'
com.powercode.spring6.beans.Fruit@3301500b

进程已结束，退出代码为 0

```


---



# 通过factory-bean实例化
这种方式本质上是：通过工厂方法模式进行实例化。

第一步：定义一个Bean

```java
package com.powercode.spring6.beans;

public class Fruit {
}

```

---

第二步：定义具体工厂类，工厂类中定义实例方法

```java
package com.powercode.spring6.beans;

public class FruitFactory {
    public static Fruit get(){
        return new Fruit();
    }
}

```


---

第三步，编写spring配置文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
<!--    <bean id="fruitBean" class="com.powercode.spring6.beans.FruitFactory" factory-method="get"></bean>-->
    <bean id="fruitFactory" class="com.powercode.spring6.beans.FruitFactory"></bean>
    <bean id="fruitBean" class="com.powercode.spring6.beans.Fruit" factory-bean="fruitFactory" factory-method="get"></bean>

</beans>
```

> 上面注释掉的用的是简单工厂模式，下面没注释掉的，直接指定一个factory-bean的，就是用的工厂方法模式
>  注意这里必须要在factroy-bean对应的类中实现一个get方法,注意，简单工厂模式下，也就是往上面一点的，就是要把get方法设置为静态的，但是下面我们现在用的是工厂方法模式，不需要加static
> 加上spring反而找不到get方法了！

---
第四步：编写测试程序
```

    @Test
    public void testFactoryMethodMode(){
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring10.xml");
        Fruit fruit = applicationContext.getBean("fruitBean", Fruit.class);
        System.out.println(fruit);
    }
```


---


```
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=35009:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testFactoryMethodMode
2024-01-11 09:54:47 431 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@5bfa8cc5
2024-01-11 09:54:47 571 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring10.xml]
2024-01-11 09:54:47 600 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'fruitFactory'
2024-01-11 09:54:47 612 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'fruitBean'
com.powercode.spring6.beans.Fruit@57a4d5ee

进程已结束，退出代码为 0

```


---


# 通过FactoryBean接口实例化

以上的第三种方式中，factory-bean是我们自定义的，factory-method也是我们自己定义的。

在Spring中，当你编写的类直接实现FactoryBean接口之后，factory-bean不需要指定了，factory-method也不需要指定了。

factory-bean会自动指向实现FactoryBean接口的类，factory-method会自动指向getObject()方法。


第一步：定义一个bean

```java
package com.powercode.spring6.beans;

public class Person {
}

```

---

第二步：编写一个类实现FactoryBean接口

```java
package com.powercode.spring6.beans;

import org.springframework.beans.factory.FactoryBean;

public class PersonFactory implements FactoryBean<Person> {
    @Override
    public Person getObject() throws Exception {
        return new Person();
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }
    @Override
    public boolean isSingleton(){
        return true;
    }
}

```

---


第三步：编写xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="personBean" class="com.powercode.spring6.beans.PersonFactory"></bean>
</beans>
```

---


第四步：编写测试函数
```java

    @Test
    public void testFactoryMethodMode2(){
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring10.xml");
        Person person = applicationContext.getBean("personBean", Person.class);
        System.out.println(person);
    }
```

---


```
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=32877:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testFactoryMethodMode2
2024-01-11 10:58:33 850 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@5bfa8cc5
2024-01-11 10:58:33 956 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 3 bean definitions from class path resource [spring10.xml]
2024-01-11 10:58:33 979 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'fruitFactory'
2024-01-11 10:58:33 986 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'fruitBean'
2024-01-11 10:58:33 988 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'personBean'
com.powercode.spring6.beans.Person@70f43b45

进程已结束，退出代码为 0
```

> FactoryBean在Spring中是一个接口。被称为“工厂Bean”。“工厂Bean”是一种特殊的Bean。所有的“工厂Bean”都是用来协助Spring框架来创建其他Bean对象的。

---


## BeanFactory和FactoryBean的区别
### BeanFactory

Spring IoC容器的顶级对象，BeanFactory被翻译为“Bean工厂”，在Spring的IoC容器中，“Bean工厂”负责创建Bean对象。
BeanFactory是工厂。

---

### FactoryBean

FactoryBean：它是一个Bean，是一个能够辅助Spring实例化其它Bean对象的一个Bean。

在Spring中，Bean可以分为两类：

● 第一类：普通Bean

● 第二类：工厂Bean（记住：工厂Bean也是一种Bean，只不过这种Bean比较特殊，它可以辅助Spring实例化其它Bean对象。）


# 注入自定义Date

我们前面说过，java.util.Date在Spring中被当做简单类型，简单类型在注入的时候可以直接使用value属性或value标签来完成。但我们之前已经测试过了，对于Date类型来说，采用value属性或value标签赋值的时候，对日期字符串的格式要求非常严格，必须是这种格式的：Mon Oct 10 14:30:26 CST 2022。其他格式是不会被识别的。如以下代码：

```java
package com.powercode.spring6.beans;

import java.util.Date;

public class Human {
    private Date date;

    public Human(Date date) {
        this.date = date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Human{" +
                "date=" + date +
                '}';
    }
}


```

---

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="dateBean" class="com.powercode.spring6.beans.DateFactory">
        <constructor-arg name="date">
            <value>2022-12-10</value>
        </constructor-arg>
    </bean>
    <bean id="humanBean" class="com.powercode.spring6.beans.Human">
        <constructor-arg name="date" ref="dateBean"></constructor-arg>
    </bean>
</beans>
```


> 我们上面构建的birth不是标准格式，会报错


![](https://static.meowrain.cn/i/2024/01/11/ifxtit-3.webp)

---

**我们需要编写一个DateFactoryBean,这个类实现FactoryBean接口！**

```java
package com.powercode.spring6.beans;

import org.springframework.beans.factory.FactoryBean;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFactory implements FactoryBean<Date> {
    private String date;

    public DateFactory(String date) {
        this.date = date;
    }

    @Override
    public Date getObject() throws Exception {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return simpleDateFormat.parse(date);
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }

    @Override
    public boolean isSingleton() {
        return FactoryBean.super.isSingleton();
    }
}

```

---



```
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=46505:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testDate
2024-01-11 11:33:58 857 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@75459c75
2024-01-11 11:33:58 942 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring11.xml]
2024-01-11 11:33:58 960 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'dateBean'
2024-01-11 11:33:58 972 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'humanBean'
Human{date=Sat Dec 10 00:00:00 CST 2022}

进程已结束，退出代码为 0

```


