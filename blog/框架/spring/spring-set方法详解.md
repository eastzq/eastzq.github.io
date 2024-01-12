# maven配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>spring_first</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <repositories>
        <repository>
            <id>spring-snapshots</id>
            <name>Spring Snapshots</name>
            <url>https://repo.spring.io/snapshot</url>
            <releases>
                <enabled>false</enabled>
            </releases>
        </repository>
    </repositories>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>6.1.0-SNAPSHOT</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.10.1</version>
            <scope>test</scope>
        </dependency>
        <!--log4j2的依赖-->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.19.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-slf4j2-impl</artifactId>
            <version>2.19.0</version>
        </dependency>
    </dependencies>
</project>
```

---

# set注入

## 注入外部Bean

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDaoBean" class="com.powernode.spring6.dao.UserDao"/>

    <bean id="userServiceBean" class="com.powernode.spring6.service.UserService">
        <property name="userDao" ref="userDaoBean"/>
    </bean>

</beans>
```

## 注入内部Bean

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userServiceBean" class="com.powernode.spring6.service.UserService">
        <property name="userDao">
            <bean class="com.powernode.spring6.dao.UserDao"/>
        </property>
    </bean>

</beans>
```

> 不使用ref,直接在里面嵌套一个bean

## 注入简单类型

```java
UserDaoService.java

        package com.powercode.spring6.service;

import com.powercode.spring6.dao.UserDao;

public class UserService {
    private UserDao userDao;
    private String userName;
    public int age;

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setAge(int age) {
        this.age = age;
    }
    /*必须提供一个set方法进行set注入*/

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void saveUser() {
        //保存用户信息到数据库
        userDao.insert();

    }

    @Override
    public String toString() {
        return "UserService{" +
                "userDao=" + userDao +
                ", userName='" + userName + '\'' +
                ", age=" + age +
                '}';
    }
}


```

对应的xml

```xml

<bean id="userServiceBean" class="com.powercode.spring6.service.UserService">
    <property name="userDao" ref="userDaoBean"></property>
    <property name="userName">
        <value>meowrain</value>
    </property>
    <property name="age">
        <value>20</value>
    </property>
</bean>
```

我们测试以下

```java
package com.powercode.spring6.test;

import com.powercode.spring6.service.UserService;
import org.junit.jupiter.api.Test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class FirstSpringTest {
    @Test
    public void testFirstSpringCode() {
        //第一步：获取spring容器对象
        // ApplicationContext 翻译为：应用上下文，也就是Spring容器
        // ApplicationContext是一个接口
        // ApplicationContext 接口下有很多实现类
        // 其中有一个实现类叫做：ClassPathXmlApplicationContext
        // 这个实现类是专门从类路径中加载spring配置文件的
        //  ApplicationContext applicationContext = new ClassPathXmlApplicationContext(类路径);
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");

        // 第二步：根据bean的id从Spring容器中获取这个对象
        UserService userService = applicationContext.getBean("userServiceBean", UserService.class);
        logger.info(userService.toString());

    }
}

```

![image](https://static.meowrain.cn/i/2024/01/09/hgsant-3.webp)
> 需要特别注意：如果给简单类型赋值，使用value属性或value标签。而不是ref。

![image](https://static.meowrain.cn/i/2024/01/09/hhcy1c-3.webp)

## 级联属性赋值

要点：
● 在spring配置文件中，如上，注意顺序。
● 在spring配置文件中，clazz属性必须提供getter方法。

```java
Student.java
package com.powercode.spring6.beans;

public class Student {
    private String name;
    private int age;
    private Clazz clazz;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }

    public Clazz getClazz() {
        return clazz;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", clazz=" + clazz +
                '}';
    }
}

```

---

```java
Clazz.java
package com.powercode.spring6.beans;

public class Clazz {
    private String name;

    public void setName(String name) {
        this.name = name;
    }
}

```

---

```xml
spring.xml
        <?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="student" class="com.powercode.spring6.beans.Student">
        <property name="age" value="20"></property>
        <property name="name" value="meowrain"></property>
        <property name="clazz" ref="clazz"></property>
        <!--级联属性赋值-->
        <property name="clazz.name" value="246"></property>
    </bean>

    <bean id="clazz" class="com.powercode.spring6.beans.Clazz"></bean>
</beans>
```

```java
测试函数
@Test

public void testSecondSpringCode() {
    Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring2.xml");
    Student student = applicationContext.getBean("student", Student.class);
    logger.info(student.toString());
}
```

---

![image](https://static.meowrain.cn/i/2024/01/09/ih8tf0-3.webp)

## 注入数组

```java
Student.java
```java
package com.powercode.spring6.beans;

public class Student {
    private String name;
    private int age;
    private Clazz clazz;
    private String[] hobbies;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }

    public void setHobbies(String[] hobbies) {
        this.hobbies = hobbies;
    }

    public Clazz getClazz() {
        return clazz;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", clazz=" + clazz +
                ", hobbies=" + Arrays.toString(hobbies) +
                '}';
    }
}

```

---

```xml
spring2.xml
        <?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="student" class="com.powercode.spring6.beans.Student">
        <property name="age" value="20"></property>
        <property name="name" value="meowrain"></property>
        <property name="clazz" ref="clazz"></property>
        <!--级联属性赋值-->
        <property name="clazz.name" value="246"></property>

        <!--数组属性赋值-->
        <property name="hobbies">
            <array>
                <value>play games</value>
                <value>programming</value>
                <value>learn use computer</value>
                <value>play football</value>
                <value>eat apples</value>
            </array>
        </property>
    </bean>

    <bean id="clazz" class="com.powercode.spring6.beans.Clazz"></bean>
</beans>
```

---

```java
测试函数
@Test

public void testSecondSpringCode() {
    Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring2.xml");
    Student student = applicationContext.getBean("student", Student.class);
    logger.info(student.toString());
}
  ```

  
---

  ```
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=36671:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testSecondSpringCode
2024-01-09 11:22:37 694 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@75ed9710
2024-01-09 11:22:37 791 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring2.xml]
2024-01-09 11:22:37 806 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'student'
2024-01-09 11:22:37 827 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'clazz'
2024-01-09 11:22:37 840 [main] INFO com.powercode.spring6.test.FirstSpringTest - Student{name='meowrain', age=20, clazz=com.powercode.spring6.beans.Clazz@3d9fc57a, hobbies=[play games, programming, learn use computer, play football, eat apples]}

进程已结束，退出代码为 0
  ```

  
---

> 当数组中的内容不是简单类型的时候，只需要把里面的`<value>`替换为`<ref>`


要点：
● 如果数组中是简单类型，使用value标签。
● 如果数组中是非简单类型，使用ref标签。

## 注入list集合

```java
package com.powercode.spring6.beans;

import java.util.Arrays;
import java.util.List;

public class Student {
    private String name;
    private int age;
    private Clazz clazz;
    private List hobbies;

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }

    public void setHobbies(List hobbies) {
        this.hobbies = hobbies;
    }

    public Clazz getClazz() {
        return clazz;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", clazz=" + clazz +
                ", hobbies=" + hobbies +
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
    <bean id="student" class="com.powercode.spring6.beans.Student">
        <property name="age" value="20"></property>
        <property name="name" value="meowrain"></property>
        <property name="clazz" ref="clazz"></property>
        <!--级联属性赋值-->
        <property name="clazz.name" value="246"></property>

        <!--数组属性赋值-->
        <property name="hobbies">
            <list>
                <value>play games</value>
                <value>programming</value>
                <value>learn use computer</value>
                <value>play football</value>
                <value>eat apples</value>
            </list>
        </property>
    </bean>

    <bean id="clazz" class="com.powercode.spring6.beans.Clazz"></bean>
</beans>
```

---

```
2024-01-09 11:49:17 697 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@75ed9710
2024-01-09 11:49:17 798 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring2.xml]
2024-01-09 11:49:17 814 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'student'
2024-01-09 11:49:17 837 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'clazz'
2024-01-09 11:49:17 850 [main] INFO com.powercode.spring6.test.FirstSpringTest - Student{name='meowrain', age=20, clazz=com.powercode.spring6.beans.Clazz@1ad777f, hobbies=[play games, programming, learn use computer, play football, eat apples]}

进程已结束，退出代码为 0

```

> 注意：注入List集合的时候使用`list标签`，如果List集合中是简单类型使用value标签，反之使用ref标签。

## 注入set集合

不多说，和上面差不多
要点：
● 使用<set>标签
● set集合中元素是简单类型的使用value标签，反之使用ref标签。

## 注入Properties

> java.util.Properties继承java.util.Hashtable，所以Properties也是一个Map集合。

```java
  Student.java
        package com.powercode.spring6.beans;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;

public class Student {
    private String name;
    private int age;
    private Clazz clazz;
    private List hobbies;
    private Properties properties;

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }

    public void setHobbies(List hobbies) {
        this.hobbies = hobbies;
    }

    public Clazz getClazz() {
        return clazz;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", clazz=" + clazz +
                ", hobbies=" + hobbies +
                ", properties=" + properties +
                '}';
    }
}

  ```

  
---

```java
  测试函数
@Test

public void testSecondSpringCode() {
    Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring2.xml");
    Student student = applicationContext.getBean("student", Student.class);
    logger.info(student.toString());
}
  ```

  
---

```
  /usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=44101:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testSecondSpringCode
2024-01-09 12:13:56 046 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@75ed9710
2024-01-09 12:13:56 158 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring2.xml]
2024-01-09 12:13:56 174 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'student'
2024-01-09 12:13:56 197 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'clazz'
2024-01-09 12:13:56 212 [main] INFO com.powercode.spring6.test.FirstSpringTest - Student{name='meowrain', age=20, clazz=com.powercode.spring6.beans.Clazz@4a67318f, hobbies=[play games, programming, learn use computer, play football, eat apples], properties={password=123456, driver=com.mysql.cj.jdbc.Driver, url=jdbc:mysql://localhost:3306/spring, username=root}}

进程已结束，退出代码为 0

  ```

要点：
● 使用<props>标签嵌套<prop>标签完成。

## 注入null和空字符串

注入空字符串使用：`<value/> `或者` value=""`
注入null使用：`<null/> `或者 `不为该属性赋值`

```java
Student.java
        package com.powercode.spring6.beans;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;

public class Student {
    private String name;
    private int age;
    private Clazz clazz;
    private List hobbies;
    private Properties properties;

    private String email;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }

    public void setHobbies(List hobbies) {
        this.hobbies = hobbies;
    }

    public Clazz getClazz() {
        return clazz;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", clazz=" + clazz +
                ", hobbies=" + hobbies +
                ", properties=" + properties +
                ", email='" + email + '\'' +
                '}';
    }
}

```

  
---

```xml
  spring2.xml
        <?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!--
    bean标签的两个重要属性
    id: 是这个bean的身份证号，不能重复，是唯一的标识
    class: 必须填写类的全路径，带包名的类名
    -->

    <!-- 配置其他的bean-->
    <bean id="userDaoBean" class="com.powercode.spring6.dao.UserDao"></bean>

    <!--配置iservice-->

    <bean id="userServiceBean" class="com.powercode.spring6.service.UserService">
        <property name="userDao" ref="userDaoBean"></property>
        <property name="userName">
            <value>meowrain</value>
        </property>
        <property name="age">
            <value>20</value>
        </property>
    </bean>

    <bean id="orderDaoBean" class="com.powercode.spring6.dao.OrderDao"></bean>
    <bean id="orderDaoService" class="com.powercode.spring6.service.OrderDaoService">
        <constructor-arg index="0" ref="orderDaoBean"></constructor-arg>
        <constructor-arg index="1" ref="userDaoBean"></constructor-arg>
    </bean>
</beans>
        ---

        ```java
        测试程序
        @Test
        public void testSecondSpringCode() {
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring2.xml");
        Student student = applicationContext.getBean("student", Student.class);
        logger.info(student.toString());
        }
```

  
---


  
---

```
  /usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=37501:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testSecondSpringCode
2024-01-09 12:20:28 206 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@75ed9710
2024-01-09 12:20:28 308 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring2.xml]
2024-01-09 12:20:28 323 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'student'
2024-01-09 12:20:28 349 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'clazz'
2024-01-09 12:20:28 359 [main] INFO com.powercode.spring6.test.FirstSpringTest - Student{name='meowrain', age=20, clazz=null, hobbies=[play games, programming, learn use computer, play football, eat apples], properties={password=123456, driver=com.mysql.cj.jdbc.Driver, url=jdbc:mysql://localhost:3306/spring, username=root}, email=''}

进程已结束，退出代码为 0

  ```

## 注入的值中含有特殊符号

XML中有5个特殊字符，分别是：`<、>、'、"、&`
以上5个特殊符号在XML中会被特殊对待，会被当做XML语法的一部分进行解析，如果这些特殊符号直接出现在注入的字符串当中，会报错。

解决方案包括两种：
● 第一种：特殊符号使用转义字符代替。
● 第二种：将含有特殊符号的字符串放到：<![CDATA[]]> 当中。因为放在CDATA区中的数据不会被XML文件解析器解析。
| 特殊字符 | 转义字符 |
| -------- | -------- |
| >        | `&gt;`   |
| <        | `&lt;`   |
| "        | `&quot;` |
| & | `&amp;`  |
| '        | `&apos;` |



---

```java
Student.java
        package com.powercode.spring6.beans;

import java.util.Arrays;
import java.util.List;
import java.util.Properties;

public class Student {
    private String name;
    private int age;
    private Clazz clazz;
    private List hobbies;
    private Properties properties;

    private String email;

    private String result;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setClazz(Clazz clazz) {
        this.clazz = clazz;
    }

    public void setHobbies(List hobbies) {
        this.hobbies = hobbies;
    }

    public Clazz getClazz() {
        return clazz;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", clazz=" + clazz +
                ", hobbies=" + hobbies +
                ", properties=" + properties +
                ", email='" + email + '\'' +
                ", result='" + result + '\'' +
                '}';
    }
}

```

![image](https://static.meowrain.cn/i/2024/01/09/khdzea-3.webp)
    
---

![image](https://static.meowrain.cn/i/2024/01/09/kiga5i-3.webp)

```xml
    <?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="student" class="com.powercode.spring6.beans.Student">
        <!--简单属性赋值-->
        <property name="age" value="20"></property>
        <property name="name" value="meowrain"></property>
        <property name="result" value="2 &lt; 3"/>
        <property name="email">
            <value/> <!--注入空字符串-->
        </property>
        <!--复合属性赋值-->
        <property name="clazz">
            <null/> <!--注入null-->
        </property>


        <!--数组属性赋值-->
        <property name="hobbies">
            <list>
                <value>play games</value>
                <value>programming</value>
                <value>learn use computer</value>
                <value>play football</value>
                <value>eat apples</value>
            </list>
        </property>
        <!--propertiess属性赋值-->
        <property name="properties">
            <props>
                <prop key="driver">com.mysql.cj.jdbc.Driver</prop>
                <prop key="url">jdbc:mysql://localhost:3306/spring</prop>
                <prop key="username">root</prop>
                <prop key="password">123456</prop>
            </props>
        </property>
    </bean>
    <bean id="clazz" class="com.powercode.spring6.beans.Clazz"></bean>
</beans>
 ```

    
---

```xml
    <?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="student" class="com.powercode.spring6.beans.Student">
        <!--简单属性赋值-->
        <property name="age" value="20"></property>
        <property name="name" value="meowrain"></property>
        <property name="result">
            <value><![CDATA[2<3]]></value>
        </property>
        <property name="email">
            <value/> <!--注入空字符串-->
        </property>
        <!--复合属性赋值-->
        <property name="clazz">
            <null/> <!--注入null-->
        </property>


        <!--数组属性赋值-->
        <property name="hobbies">
            <list>
                <value>play games</value>
                <value>programming</value>
                <value>learn use computer</value>
                <value>play football</value>
                <value>eat apples</value>
            </list>
        </property>
        <!--propertiess属性赋值-->
        <property name="properties">
            <props>
                <prop key="driver">com.mysql.cj.jdbc.Driver</prop>
                <prop key="url">jdbc:mysql://localhost:3306/spring</prop>
                <prop key="username">root</prop>
                <prop key="password">123456</prop>
            </props>
        </property>
    </bean>

    <bean id="clazz" class="com.powercode.spring6.beans.Clazz"></bean>
</beans>
```

```
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=43345:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testSecondSpringCode
2024-01-09 12:44:56 885 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@75ed9710
2024-01-09 12:44:56 993 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring2.xml]
2024-01-09 12:44:57 010 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'student'
2024-01-09 12:44:57 037 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'clazz'
2024-01-09 12:44:57 049 [main] INFO com.powercode.spring6.test.FirstSpringTest - Student{name='meowrain', age=20, clazz=null, hobbies=[play games, programming, learn use computer, play football, eat apples], properties={password=123456, driver=com.mysql.cj.jdbc.Driver, url=jdbc:mysql://localhost:3306/spring, username=root}, email='', result='2<3'}

进程已结束，退出代码为 0
```
