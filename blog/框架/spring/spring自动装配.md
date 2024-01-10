## 基于的XML自动装配
### 根据名称自动装配

```java
UserDao.java
package com.powercode.spring6.dao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/*
* Bean
*
* */
public class UserDao {
    private static final Logger logger = LoggerFactory.getLogger(UserDao.class);

    public void insert() {
        //用log4j2日志框架
        logger.info("数据库正在插入用户信息");
    }
}

```

---


```java
UserService.java
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

    public void setUserDao(UserDao userdao) {
        this.userDao = userdao;
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


---


```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
<bean id="userDao" class="com.powercode.spring6.dao.UserDao"></bean>
    <bean id="userServiceBean" class="com.powercode.spring6.service.UserService" autowire="byName">
        <property name="userName" value="John Doe"/>
        <property name="age" value="30"/>
    </bean>
</beans>
```

---


```java
测试函数
    @Test
    public void testSixthspringCode() {
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring6.xml");
        UserService userService = applicationContext.getBean("userServiceBean", UserService.class);
        userService.saveUser();
        logger.info(userService.toString());
    }

```
> 注意，java中set方法命名规则
> https://blog.csdn.net/hong10086/article/details/78852105
![](https://static.meowrain.cn/i/2024/01/10/f6oaoq-3.webp)


---
```txt
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=36339:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testSixthspringCode
2024-01-10 09:13:55 547 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@79da1ec0
2024-01-10 09:13:55 640 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring6.xml]
2024-01-10 09:13:55 653 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'userDao'
2024-01-10 09:13:55 660 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'userServiceBean'
2024-01-10 09:13:55 687 [main] INFO com.powercode.spring6.dao.UserDao - 数据库正在插入用户信息
2024-01-10 09:13:55 689 [main] INFO com.powercode.spring6.test.FirstSpringTest - UserService{userDao=com.powercode.spring6.dao.UserDao@126be319, userName='John Doe', age=30}

进程已结束，退出代码为 0
```

---

### 根据类型自动装配

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="accountService"
          class="com.powercode.spring6.service.AccountService"
          autowire="byType"/>
    <bean class="com.powercode.spring6.dao.AccountDao"/>
</beans>
```

---

```java
AccountDao.java
package com.powercode.spring6.dao;

public class AccountDao {
    public void insert(){
        System.out.println("正在保存账户信息");
    }
}

```

----

```java
AccountService.java
package com.powercode.spring6.service;

import com.powercode.spring6.dao.AccountDao;

public class AccountService {
    private AccountDao accountDao;

    public void setAccountDao(AccountDao accountDao) {
        this.accountDao = accountDao;
    }
    public void save(){
        accountDao.insert();
    }

    @Override
    public String toString() {
        return "AccountService{" +
                "accountDao=" + accountDao +
                '}';
    }
}

```

---

```java
测试函数
    @Test
    public void testSenventhSpringCode() {
        Logger logger = LoggerFactory.getLogger(FirstSpringTest.class);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring7.xml");
        AccountService accountService = applicationContext.getBean("accountService",AccountService.class);
        accountService.save();
        logger.info(accountService.toString());
    }
```

---


```txt
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=46597:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.FirstSpringTest,testSenventhSpringCode
2024-01-10 09:30:47 892 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@19fb8826
2024-01-10 09:30:47 996 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 2 bean definitions from class path resource [spring7.xml]
2024-01-10 09:30:48 010 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'accountService'
2024-01-10 09:30:48 030 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'com.powercode.spring6.dao.AccountDao#0'
正在保存账户信息
2024-01-10 09:30:48 041 [main] INFO com.powercode.spring6.test.FirstSpringTest - AccountService{accountDao=com.powercode.spring6.dao.AccountDao@1556f2dd}

进程已结束，退出代码为 0
```


> 无论是byName还是byType，在装配的时候都是基于set方法的。所以set方法是必须要提供的。提供构造方法是不行的