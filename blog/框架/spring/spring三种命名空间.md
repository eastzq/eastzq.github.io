## p命名空间注入
目的：简化配置。
使用p命名空间注入的前提条件包括两个：

● 第一：在XML头部信息中添加p命名空间的配置信息：xmlns:p="http://www.springframework.org/schema/p"

● 第二：p命名空间注入是基于setter方法的，所以需要对应的属性提供setter方法。

```java
Customer.java
package com.powercode.spring6.beans;

public class Customer {
    private String name;
    private int age;
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age){
        this.age = age;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

---


```xml
spring3.xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="customerBean" class="com.powercode.spring6.beans.Customer" p:name="meowrain" p:age="20"></bean>
</beans>

```

---


```java
测试函数
@Test
public void testThirdSpringCode() {
    Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring3.xml");
    Customer customer = applicationContext.getBean("customerBean",Customer.class);
    logger.info(customer.toString());
}
```

---

```
函数执行结果

/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=39503:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testThirdSpringCode
2024-01-09 12:52:54 636 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@4fc5e095
2024-01-09 12:52:54 735 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 1 bean definitions from class path resource [spring3.xml]
2024-01-09 12:52:54 757 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'customerBean'
2024-01-09 12:52:54 795 [main] INFO com.powercode.spring6.test.FirstSpringTest - Customer{name='meowrain', age=20}

进程已结束，退出代码为 0

```

> 所以p命名空间实际上是对set注入的简化。

---

## c命名空间注入

c命名空间是简化构造方法注入的。

使用c命名空间的两个前提条件：

第一：需要在xml配置文件头部添加信息：`xmlns:c="http://www.springframework.org/schema/c"`

第二：需要提供构造方法。

```xml
配置文件

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
<bean id="myTimeBean" class="com.powercode.spring6.beans.MyTime" c:day="9" c:month="1" c:year="2024">
</bean>
</beans>
```

---

```java
MyTime.java
package com.powercode.spring6.beans;

public class MyTime {
    private int year;
    private int month;
    private int day;

    public MyTime(int year,int month,int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    @Override
    public String toString() {
        return "MyTime{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }
}


```

---

```java
测试函数
    @Test
    public void testForthSpringCode() {
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring4.xml");
        MyTime myTime = applicationContext.getBean("myTimeBean",MyTime.class);
        logger.info(myTime.toString());
    }

```

---


```
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=41855:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testForthSpringCode
2024-01-09 13:07:18 711 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@435871cb
2024-01-09 13:07:18 813 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 1 bean definitions from class path resource [spring4.xml]
2024-01-09 13:07:18 829 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'myTimeBean'
2024-01-09 13:07:18 861 [main] INFO com.powercode.spring6.test.FirstSpringTest - MyTime{year=9, month=1, day=2024}

进程已结束，退出代码为 0


```


## util命名空间
使用util命名空间可以让配置复用。

使用util命名空间的前提是：在spring配置文件头部添加配置信息。如下：

```xml
配置文件
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd
    ">

</beans>
```


---


```java
MyDataSource1.java
package com.powercode.spring6.beans;

import java.util.Properties;

public class MyDataSource1 {
    private Properties properties;

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "MyDataSource1{" +
                "properties=" + properties +
                '}';
    }
}

```

```java
MyDataSource2.java
package com.powercode.spring6.beans;

import java.util.Properties;

public class MyDataSource2 {
    private Properties properties;

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "MyDataSource2{" +
                "properties=" + properties +
                '}';
    }
}

```


---


```java
测试函数
    @Test
    public void testFifthSpringCode() {
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring5.xml");
        MyDataSource1 myDataSource1 = applicationContext.getBean("dataSource1",MyDataSource1.class);
        MyDataSource2 myDataSource2 = applicationContext.getBean("dataSource2",MyDataSource2.class);
        logger.info(myDataSource1.toString());
        logger.info(myDataSource2.toString());
    }

```


---


```
运行结果

/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=45041:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testFifthSpringCode
2024-01-09 13:28:08 216 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@609640d5
2024-01-09 13:28:08 330 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 3 bean definitions from class path resource [spring5.xml]
2024-01-09 13:28:08 350 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'prop'
2024-01-09 13:28:08 375 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'dataSource1'
2024-01-09 13:28:08 377 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'dataSource2'
2024-01-09 13:28:08 384 [main] INFO com.powercode.spring6.test.FirstSpringTest - MyDataSource1{properties={password=123456, driver=com.mysql.cj.jdbc.Driver, url=jdbc:mysql://localhost:3306/spring, username=root}}
2024-01-09 13:28:08 384 [main] INFO com.powercode.spring6.test.FirstSpringTest - MyDataSource2{properties={password=123456, driver=com.mysql.cj.jdbc.Driver, url=jdbc:mysql://localhost:3306/spring, username=root}}

进程已结束，退出代码为 0
```

