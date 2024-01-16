# AOP切面编程
IoC使软件组件松耦合。AOP让你能够捕捉系统中经常使用的功能，把它转化成组件。
AOP（Aspect Oriented Programming）：面向切面编程，面向方面编程。（AOP是一种编程技术）
AOP是对OOP的补充延伸。
AOP底层使用的就是动态代理来实现的。
Spring的AOP使用的动态代理是：JDK动态代理 + CGLIB动态代理技术。Spring在这两种动态代理中灵活切换，如果是代理接口，会默认使用JDK动态代理，如果要代理某个类，这个类没有实现接口，就会切换使用CGLIB。当然，你也可以强制通过一些配置让Spring只使用CGLIB。


#  AOP介绍

一般一个系统当中都会有一些系统服务，例如：日志、事务管理、安全等。这些系统服务被称为：交叉业务
这些交叉业务几乎是通用的，不管你是做银行账户转账，还是删除用户数据。日志、事务管理、安全，这些都是需要做的。
如果在每一个业务处理过程当中，都掺杂这些交叉业务代码进去的话，存在两方面问题：
● 第一：交叉业务代码在多个业务流程中反复出现，显然这个交叉业务代码没有得到复用。并且修改这些交叉业务代码的话，需要修改多处。
● 第二：程序员无法专注核心业务代码的编写，在编写核心业务代码的同时还需要处理这些交叉业务。
使用AOP可以很轻松的解决以上问题。

![](https://static.meowrain.cn/i/2024/01/13/peicm6-3.webp)


用一句话总结AOP：将与核心业务无关的代码独立的抽取出来，形成一个独立的组件，然后以横向交叉的方式应用到业务流程当中的过程被称为AOP。
AOP的优点：
● 第一：代码复用性增强。
● 第二：代码易维护。
● 第三：使开发者更关注业务逻辑。


# AOP的七大术语
![](https://static.meowrain.cn/i/2024/01/13/pfcmon-3.webp)

● 连接点 Joinpoint
  ○ 在程序的整个执行流程中，可以织入切面的位置。方法的执行前后，异常抛出之后等位置。
● 切点 Pointcut
  ○ 在程序执行流程中，真正织入切面的方法。（一个切点对应多个连接点）
● 通知 Advice
  ○ 通知又叫增强，就是具体你要织入的代码。
  ○ 通知包括：
    ■ 前置通知
    ■ 后置通知
    ■ 环绕通知
    ■ 异常通知
    ■ 最终通知
● 切面 Aspect
  ○ 切点 + 通知就是切面。
● 织入 Weaving
  ○ 把通知应用到目标对象上的过程。
● 代理对象 Proxy
  ○ 一个目标对象被织入通知后产生的新对象。
● 目标对象 Target
  ○ 被织入通知的对象。


# 切点表达式
切点表达式用来定义通知（Advice）往哪些方法上切入。

切入点表达式语法格式：
`execution([访问控制权限修饰符] 返回值类型 [全限定类名]方法名(形式参数列表) [异常])`

访问控制权限修饰符：
● 可选项。
● 没写，就是4个权限都包括。
● 写public就表示只包括公开的方法。
返回值类型：
● 必填项。
● * 表示返回值类型任意。
全限定类名：
● 可选项。
● 两个点“..”代表当前包以及子包下的所有类。
● 省略时表示所有的类。
方法名：
● 必填项。
● *表示所有方法。
● set*表示所有的set方法。
形式参数列表：
● 必填项
● () 表示没有参数的方法
● (..) 参数类型和个数随意的方法
● (*) 只有一个参数的方法
● (*, String) 第一个参数类型随意，第二个参数是String的。
异常：
● 可选项。
● 省略时表示任意异常类型。

理解以下的切点表达式：
service包下所有的类中以delete开始的所有方法
```java
execution(public * com.powernode.mall.service.*.delete*(..))
```

mall包下所有的类的所有的方法

```java
execution(* com.powernode.mall..*(..))
``` 

所有类的所有方法
```java
excution(* *(..))
```

# 使用Spring AOP

Spring对AOP的实现包括以下3种方式：
● 第一种方式：Spring框架结合AspectJ框架实现的AOP，基于注解方式。
● 第二种方式：Spring框架结合AspectJ框架实现的AOP，基于XML方式。
● 第三种方式：Spring框架自己实现的AOP，基于XML配置方式。
实际开发中，都是Spring+AspectJ来实现AOP。所以我们重点学习第一种和第二种方式。
什么是AspectJ？（Eclipse组织的一个支持AOP的框架。AspectJ框架是独立于Spring框架之外的一个框架，Spring框架用了AspectJ） 
AspectJ项目起源于帕洛阿尔托（Palo Alto）研究中心（缩写为PARC）。该中心由Xerox集团资助，Gregor Kiczales领导，从1997年开始致力于AspectJ的开发，1998年第一次发布给外部用户，2001年发布1.0 release。为了推动AspectJ技术和社团的发展，PARC在2003年3月正式将AspectJ项目移交给了Eclipse组织，因为AspectJ的发展和受关注程度大大超出了PARC的预期，他们已经无力继续维持它的发展。

## 准备工作

使用Spring+AspectJ的AOP需要引入的依赖如下：
```xml
<!--spring context依赖-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</artifactId>
  <version>6.0.0-M2</version>
</dependency>
<!--spring aop依赖-->
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
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-aspects -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-aspects</artifactId>
        <version>6.1.0</version>
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
```

Spring配置文件中添加context命名空间和aop命名空间
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

</beans>
```

## 基于AspectJ的AOP注解式开发

第一步：定义目标类以及目标方法

```java
package com.powernode.spring6.service;

// 目标类
public class OrderService {
    // 目标方法
    public void generate(){
        System.out.println("订单已生成！");
    }
}
```

第二步：定义切面类
```java
package com.powernode.spring6.service;

import org.aspectj.lang.annotation.Aspect;

// 切面类
@Aspect
public class MyAspect {
}
```

第三步：目标类和切面类都纳入spring bean管理
在目标类OrderService上添加@Component注解。
在切面类MyAspect类上添加@Component注解。

第四步：在spring配置文件中添加组建扫描
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--开启组件扫描-->
    <context:component-scan base-package="com.powernode.spring6.service"/>
</beans>
```

第五步：在切面类中添加通知

```java
package com.powernode.spring6.service;

import org.springframework.stereotype.Component;
import org.aspectj.lang.annotation.Aspect;

// 切面类
@Aspect
@Component
public class MyAspect {
    // 这就是需要增强的代码（通知）
    public void advice(){
        System.out.println("我是一个通知");
    }
}

```

第六步：在通知上添加切点表达式
```java
package com.powernode.spring6.service;

import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.aspectj.lang.annotation.Aspect;

// 切面类
@Aspect
@Component
public class MyAspect {
    
    // 切点表达式
    @Before("execution(* com.powernode.spring6.service.OrderService.*(..))")
    // 这就是需要增强的代码（通知）
    public void advice(){
        System.out.println("我是一个通知");
    }
}
```
> 注解@Before表示前置通知。

第七步：在spring配置文件中启用自动代理

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <!--开启组件扫描-->
    <context:component-scan base-package="com.powernode.spring6.service"/>
    <!--开启自动代理-->
    <aop:aspectj-autoproxy proxy-target-class="true"/>
</beans>
```


`<aop:aspectj-autoproxy  proxy-target-class="true"/> `开启自动代理之后，凡事带有@Aspect注解的bean都会生成代理对象。
proxy-target-class="true" 表示采用cglib动态代理。
proxy-target-class="false" 表示采用jdk动态代理。默认值是false。即使写成false，当没有接口的时候，也会自动选择cglib生成代理类。

测试程序：
```java
package com.powernode.spring6.test;

import com.powernode.spring6.service.OrderService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AOPTest {
    @Test
    public void testAOP(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-aspectj-aop-annotation.xml");
        OrderService orderService = applicationContext.getBean("orderService", OrderService.class);
        orderService.generate();
    }
}

```

![](https://static.meowrain.cn/i/2024/01/13/vn8wor-3.webp)

## 通知类型

通知类型包括：
● 前置通知：@Before 目标方法执行之前的通知
● 后置通知：@AfterReturning 目标方法执行之后的通知
● 环绕通知：@Around 目标方法之前添加通知，同时目标方法执行之后添加通知。
● 异常通知：@AfterThrowing 发生异常之后执行的通知
● 最终通知：@After 放在finally语句块中的通知

接下来，编写程序来测试这几个通知的执行顺序：
```java
package com.powernode.spring6.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

// 切面类
@Component
@Aspect
public class MyAspect {

    @Around("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕通知开始");
        // 执行目标方法。
        proceedingJoinPoint.proceed();
        System.out.println("环绕通知结束");
    }

    @Before("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void beforeAdvice(){
        System.out.println("前置通知");
    }

    @AfterReturning("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterReturningAdvice(){
        System.out.println("后置通知");
    }

    @AfterThrowing("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterThrowingAdvice(){
        System.out.println("异常通知");
    }

    @After("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterAdvice(){
        System.out.println("最终通知");
    }

}
```

```java
package com.powernode.spring6.service;

import org.springframework.stereotype.Component;

// 目标类
@Component
public class OrderService {
    // 目标方法
    public void generate(){
        System.out.println("订单已生成！");
    }
}

```

```java
package com.powernode.spring6.test;

import com.powernode.spring6.service.OrderService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AOPTest {
    @Test
    public void testAOP(){
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-aspectj-aop-annotation.xml");
        OrderService orderService = applicationContext.getBean("orderService", OrderService.class);
        orderService.generate();
    }
}
```

![](https://static.meowrain.cn/i/2024/01/13/vor0kf-3.webp)

> 出现异常之后，后置通知和环绕通知的结束部分不会执行。

## 切面的先后顺序
我们知道，业务流程当中不一定只有一个切面，可能有的切面控制事务，有的记录日志，有的进行安全控制，如果多个切面的话，顺序如何控制：可以使用@Order注解来标识切面类，为@Order注解的value指定一个整数型的数字，数字越小，优先级越高。

再定义一个切面类，如下：
```java
package com.powernode.spring6.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(1) //设置优先级
public class YourAspect {

    @Around("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("YourAspect环绕通知开始");
        // 执行目标方法。
        proceedingJoinPoint.proceed();
        System.out.println("YourAspect环绕通知结束");
    }

    @Before("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void beforeAdvice(){
        System.out.println("YourAspect前置通知");
    }

    @AfterReturning("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterReturningAdvice(){
        System.out.println("YourAspect后置通知");
    }

    @AfterThrowing("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterThrowingAdvice(){
        System.out.println("YourAspect异常通知");
    }

    @After("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterAdvice(){
        System.out.println("YourAspect最终通知");
    }
}

```

```java
package com.powernode.spring6.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

// 切面类
@Component
@Aspect
@Order(2) //设置优先级
public class MyAspect {

    @Around("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕通知开始");
        // 执行目标方法。
        proceedingJoinPoint.proceed();
        System.out.println("环绕通知结束");
    }

    @Before("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void beforeAdvice(){
        System.out.println("前置通知");
    }

    @AfterReturning("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterReturningAdvice(){
        System.out.println("后置通知");
    }

    @AfterThrowing("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterThrowingAdvice(){
        System.out.println("异常通知");
    }

    @After("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterAdvice(){
        System.out.println("最终通知");
    }

}
```

执行测试程序：

![](https://static.meowrain.cn/i/2024/01/13/vr4u8r-3.webp)


通过修改@Order注解的整数值来切换顺序，执行测试程序：

![](https://static.meowrain.cn/i/2024/01/13/vr6gr9-3.webp)


## 优化使用切点表达式

```java
package com.powernode.spring6.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

// 切面类
@Component
@Aspect
@Order(2)
public class MyAspect {

    @Around("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕通知开始");
        // 执行目标方法。
        proceedingJoinPoint.proceed();
        System.out.println("环绕通知结束");
    }

    @Before("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void beforeAdvice(){
        System.out.println("前置通知");
    }

    @AfterReturning("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterReturningAdvice(){
        System.out.println("后置通知");
    }

    @AfterThrowing("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterThrowingAdvice(){
        System.out.println("异常通知");
    }

    @After("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void afterAdvice(){
        System.out.println("最终通知");
    }

}

```

缺点是：
● 第一：切点表达式重复写了多次，没有得到复用。
● 第二：如果要修改切点表达式，需要修改多处，难维护。

可以这样做：将切点表达式单独的定义出来，在需要的位置引入即可。如下：

```java
package com.powernode.spring6.service;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

// 切面类
@Component
@Aspect
@Order(2)
public class MyAspect {
    
    @Pointcut("execution(* com.powernode.spring6.service.OrderService.*(..))")
    public void pointcut(){}

    @Around("pointcut()")
    public void aroundAdvice(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("环绕通知开始");
        // 执行目标方法。
        proceedingJoinPoint.proceed();
        System.out.println("环绕通知结束");
    }

    @Before("pointcut()")
    public void beforeAdvice(){
        System.out.println("前置通知");
    }

    @AfterReturning("pointcut()")
    public void afterReturningAdvice(){
        System.out.println("后置通知");
    }

    @AfterThrowing("pointcut()")
    public void afterThrowingAdvice(){
        System.out.println("异常通知");
    }

    @After("pointcut()")
    public void afterAdvice(){
        System.out.println("最终通知");
    }

}

```

使用@Pointcut注解来定义独立的切点表达式。
注意这个@Pointcut注解标注的方法随意，只是起到一个能够让@Pointcut注解编写的位置。

执行测试程序：
![](https://static.meowrain.cn/i/2024/01/13/vs0p9o-3.webp)

---

# 全注解式开发AOP

就是编写一个类，在这个类上面使用大量注解来代替spring的配置文件，spring配置文件消失了，如下：

```java
package com.powernode.spring6.service;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@ComponentScan("com.powernode.spring6.service")
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class Spring6Configuration {
}
```
测试程序也变化了：
```java
@Test
public void testAOPWithAllAnnotation(){
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(Spring6Configuration.class);
    OrderService orderService = applicationContext.getBean("orderService", OrderService.class);
    orderService.generate();
}
```

![](https://static.meowrain.cn/i/2024/01/13/vsjn4x-3.webp)

