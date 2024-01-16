# Spring IoC注解式开发

## 回顾注解
![](https://static.meowrain.cn/i/2024/01/12/pdkrdk-3.webp)
![](https://static.meowrain.cn/i/2024/01/12/pekiou-3.webp)


@Retention 的三种值
1) RetentionPolicy.SOURCE: 编译器使用后,直接丢弃这种策略的注释
2) RetentionPolicy.CLASS: 编译器将把注解记录在 class 文件中. 当运行 Java 程序时, JVM 不会保留注解。 这是默认值
3) RetentionPolicy.RUNTIME:编译器将把注解记录在 class 文件中. 当运行 Java 程序时, JVM 会保留注解. 程序可以
通过反射获取该注解

![](https://static.meowrain.cn/i/2024/01/12/pfzwnv-3.webp)

![](https://static.meowrain.cn/i/2024/01/12/pgcsyl-3.webp)



注解的存在主要是为了简化XML的配置。Spring6倡导全注解开发。
我们来回顾一下：
● 第一：注解怎么定义，注解中的属性怎么定义？
● 第二：注解怎么使用？
● 第三：通过反射机制怎么读取注解？

```java
package com.powernode.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.TYPE})
@Retention(value = RetentionPolicy.RUNTIME)
public @interface Component {
    String value();
}
```

以上是自定义了一个注解：Component
该注解上面修饰的注解包括：Target注解和Retention注解，这两个注解被称为元注解。
Target注解用来设置Component注解可以出现的位置，以上代表表示Component注解只能用在类和接口上。
Retention注解用来设置Component注解的保持性策略，以上代表Component注解可以被反射机制读取。
String value(); 是Component注解中的一个属性。该属性类型String，属性名是value。

## 注解怎么使用？

```java
package com.powernode.bean;

import com.powernode.annotation.Component;

@Component(value = "userBean")
public class User {
}

```


用法简单，语法格式：@注解类型名(属性名=属性值, 属性名=属性值, 属性名=属性值......)
userBean为什么使用双引号括起来，因为value属性是String类型，字符串。
另外如果属性名是value，则在使用的时候可以省略属性名，例如：

```java
package com.powernode.bean;

import com.powernode.annotation.Component;

@Component("userBean")
public class User {
}

```

## 通过反射机制怎么读取注解？
接下来，我们来写一段程序，当Bean类上有Component注解时，则实例化Bean对象，如果没有，则不实例化对象。
我们准备两个Bean，一个上面有注解，一个上面没有注解。
```java
package com.powercode.spring6.annotation_test;

@Component(value = "userBean")
public class User {
    
}
```

```java
package com.powercode.spring6.annotation_test;

public class Vip {
}

```



这个包下有多少个Bean我们不知道。哪些Bean上有注解，哪些Bean上没有注解，这些我们都不知道，如何通过程序全自动化判断。

```java
package com.powernode.test;

import com.powernode.annotation.Component;

import java.io.File;
import java.net.URL;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * @author 动力节点
 * @version 1.0
 * @className Test
 * @since 1.0
 **/
public class Test {
    public static void main(String[] args) throws Exception {
        // 存放Bean的Map集合。key存储beanId。value存储Bean。
        Map<String,Object> beanMap = new HashMap<>();

        String packageName = "com.powernode.bean";
        String path = packageName.replaceAll("\\.", "/");
        URL url = ClassLoader.getSystemClassLoader().getResource(path);
        File file = new File(url.getPath());
        File[] files = file.listFiles();
        Arrays.stream(files).forEach(f -> {
            String className = packageName + "." + f.getName().split("\\.")[0];
            try {
                Class<?> clazz = Class.forName(className);
                if (clazz.isAnnotationPresent(Component.class)) {
                    Component component = clazz.getAnnotation(Component.class);
                    String beanId = component.value();
                    Object bean = clazz.newInstance();
                    beanMap.put(beanId, bean);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });

        System.out.println(beanMap);
    }
}
```

![](https://static.meowrain.cn/i/2024/01/12/pmkrpc-3.webp)

#  Spring注解的使用

如何使用以上的注解呢？
● 第一步：加入aop的依赖
● 第二步：在配置文件中添加context命名空间
● 第三步：在配置文件中指定扫描的包
● 第四步：在Bean类上使用注解

第二步：在配置文件中添加context命名空间
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

</beans>
```


第三步：在配置文件中指定要扫描的包

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
   <context:component-scan base-package="com.powercode.spring6.ano"/>
</beans>
```



第四步：在Bean类上使用注解

```java
package com.powercode.spring6.annotation_test.bean.spring.beans;

import org.springframework.stereotype.Component;

@Component(value = "HumanBean")
public class Human {
}

```

```java
package com.powercode.spring6.annotation_test.bean.spring.beans;

import org.springframework.stereotype.Component;

@Component(value = "AnimalBean")
public class Animal {
}

```

![](https://static.meowrain.cn/i/2024/01/12/qmv69c-3.webp)

编写测试程序：

```java
    @Test
    public void testSpringAno01(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring1_ano.xml");
        User user = applicationContext.getBean("userBean", User.class);
        System.out.println(user);
    }
```

```
/usr/lib/jvm/java-17-openjdk/bin/java -ea -Didea.test.cyclic.buffer.size=1048576 -javaagent:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar=39877:/opt/intellij-idea-ultimate-edition/bin -Dfile.encoding=UTF-8 -classpath /home/meowrain/.m2/repository/org/junit/platform/junit-platform-launcher/1.10.1/junit-platform-launcher-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-engine/1.10.1/junit-platform-engine-1.10.1.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-engine/5.10.1/junit-jupiter-engine-5.10.1.jar:/opt/intellij-idea-ultimate-edition/lib/idea_rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit5-rt.jar:/opt/intellij-idea-ultimate-edition/plugins/junit/lib/junit-rt.jar:/home/meowrain/IdeaProjects/spring_first/target/test-classes:/home/meowrain/IdeaProjects/spring_first/target/classes:/home/meowrain/.m2/repository/org/springframework/spring-context/6.1.0-SNAPSHOT/spring-context-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-aop/6.1.0-SNAPSHOT/spring-aop-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-beans/6.1.0-SNAPSHOT/spring-beans-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-core/6.1.0-SNAPSHOT/spring-core-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-jcl/6.1.0-SNAPSHOT/spring-jcl-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/org/springframework/spring-expression/6.1.0-SNAPSHOT/spring-expression-6.1.0-20231116.112758-846.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-observation/1.12.0/micrometer-observation-1.12.0.jar:/home/meowrain/.m2/repository/io/micrometer/micrometer-commons/1.12.0/micrometer-commons-1.12.0.jar:/home/meowrain/.m2/repository/org/junit/jupiter/junit-jupiter-api/5.10.1/junit-jupiter-api-5.10.1.jar:/home/meowrain/.m2/repository/org/opentest4j/opentest4j/1.3.0/opentest4j-1.3.0.jar:/home/meowrain/.m2/repository/org/junit/platform/junit-platform-commons/1.10.1/junit-platform-commons-1.10.1.jar:/home/meowrain/.m2/repository/org/apiguardian/apiguardian-api/1.1.2/apiguardian-api-1.1.2.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-core/2.19.0/log4j-core-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-api/2.19.0/log4j-api-2.19.0.jar:/home/meowrain/.m2/repository/org/apache/logging/log4j/log4j-slf4j2-impl/2.19.0/log4j-slf4j2-impl-2.19.0.jar:/home/meowrain/.m2/repository/org/slf4j/slf4j-api/2.0.0/slf4j-api-2.0.0.jar com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit5 com.powercode.spring6.test.TestAnnotation,testSpringAno01
2024-01-12 16:20:51 540 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@163d04ff
2024-01-12 16:20:51 660 [main] DEBUG org.springframework.context.annotation.ClassPathBeanDefinitionScanner - Identified candidate component class: file [/home/meowrain/IdeaProjects/spring_first/target/classes/com/powercode/spring6/ano/User.class]
2024-01-12 16:20:51 670 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 5 bean definitions from class path resource [spring1_ano.xml]
2024-01-12 16:20:51 681 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'org.springframework.context.annotation.internalConfigurationAnnotationProcessor'
2024-01-12 16:20:51 700 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'org.springframework.context.event.internalEventListenerProcessor'
2024-01-12 16:20:51 701 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'org.springframework.context.event.internalEventListenerFactory'
2024-01-12 16:20:51 702 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'org.springframework.context.annotation.internalAutowiredAnnotationProcessor'
2024-01-12 16:20:51 706 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'userBean'
com.powercode.spring6.ano.User@6974a715

进程已结束，退出代码为 0

```

> **如果把value属性彻底去掉，spring会被Bean自动取名吗？会的。并且默认名字的规律是：Bean类名首字母小写即可。**

---------------------------

> 如果是多个包怎么办？有两种解决方案：
> 
> ● 第一种：在配置文件中指定多个包，用逗号隔开。
> ● 第二种：指定多个包的共同父包。

-------------


# 常用注解
@Component @Controller @Service @Repository 这四个注解是用来声明Bean的，声明后这些Bean将被实例化。接下来我们看一下，如何给Bean的属性赋值。给Bean属性赋值需要用到这些注解：
● @Value
● @Autowired
● @Qualifier
● @Resource

## @Value
当属性的类型是简单类型时，可以使用@Value注解进行注入。
> @Value注解可以出现在属性上、setter方法上、以及构造方法的形参上。
```java
package com.powernode.spring6.bean4;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class User {
    @Value(value = "zhangsan")
    private String name;
    @Value("20")
    private int age;

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

## @Autowired与@Qualifier

@Autowired注解可以用来注入非简单类型。被翻译为：自动连线的，或者自动装配。

单独使用@Autowired注解，默认根据类型装配。【默认是byType】

源码中有两处需要注意：

● 第一处：该注解可以标注在哪里？
  ○ 构造方法上
  ○ 方法上
  ○ 形参上
  ○ 属性上
  ○ 注解上

● 第二处：该注解有一个required属性，默认值是true，表示在注入的时候要求被注入的Bean必须是存在的，如果不存在则报错。如果required属性设置为false，表示注入的Bean存在或者不存在都没关系，存在的话就注入，不存在的话，也不报错。


> 当有参数的构造方法只有一个时，@Autowired注解可以省略。


@Autowired注解和@Qualifier注解联合起来才可以根据名称进行装配，在@Qualifier注解中指定Bean名称。



总结：
● @Autowired注解可以出现在：属性上、构造方法上、构造方法的参数上、setter方法上。
● 当带参数的构造方法只有一个，@Autowired注解可以省略。
● @Autowired注解默认根据类型注入。如果要根据名称注入的话，需要配合@Qualifier注解一起使用。

## @Resource

@Resource注解也可以完成非简单类型注入。那它和@Autowired注解有什么区别？
● @Resource注解是JDK扩展包中的，也就是说属于JDK的一部分。所以该注解是标准注解，更加具有通用性。(JSR-250标准中制定的注解类型。JSR是Java规范提案。)
● @Autowired注解是Spring框架自己的。
● @Resource注解默认根据名称装配byName，未指定name时，使用属性名作为name。通过name找不到的话会自动启动通过类型byType装配。
● @Autowired注解默认根据类型装配byType，如果想根据名称装配，需要配合@Qualifier注解一起用。
● @Resource注解用在属性上、setter方法上。
● @Autowired注解用在属性上、setter方法上、构造方法上、构造方法参数上。

@Resource注解属于JDK扩展包，所以不在JDK当中，需要额外引入以下依赖：【如果是JDK8的话不需要额外引入依赖。高于JDK11或低于JDK8需要引入以下依赖。】

```xml
<dependency>
  <groupId>jakarta.annotation</groupId>
  <artifactId>jakarta.annotation-api</artifactId>
  <version>2.1.1</version>
</dependency>
```

![](https://static.meowrain.cn/i/2024/01/13/nyyfgy-3.webp)


# 全注解式开发

所谓的全注解开发就是不再使用spring配置文件了。写一个配置类来代替配置文件。

```java
package com.powernode.spring6.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"com.powernode.spring6.dao", "com.powernode.spring6.service"})
public class Spring6Configuration {
}

```

```java
@Test
public void testNoXml(){
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(Spring6Configuration.class);
    UserService userService = applicationContext.getBean("userService", UserService.class);
    userService.save();
}
```

