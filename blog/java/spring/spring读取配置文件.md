# SPRING

### 1. 加载配置文件

参考 <http://www.importnew.com/17673.html>  
参考 <http://blog.csdn.net/zl3450341/article/details/9306983>

#### 1.1. 容器加载

容器上下文配置

```xml
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
</context-param>
```

#### 1.2. 路由规则

>加载路径中的通配符：？（匹配单个字符），\*（匹配除/外任意字符或字符串）、\*\* (匹配任意多个目录)。

**说明：** 无论是 classpath 还是 classpath\*都可以加载整个 classpath 下（包括 jar 包里面）的资源文件。
classpath 只会返回第一个匹配的资源，查找路径是优先在项目中存在资源文件，再查找 jar 包。classpath*是加载所有匹配的资源。

#### 1.3. import 标签

使用 Spring import 标签整合多个配置文件，路由规则和 web 容器加载是一样的。建议使用！

```xml
<!-- 加载相对路径配置文件 -->
<import resource="a.xml"/>
<!--遍历所有的jar包加载所有同名文件 -->
<import resource="classpath*:dubbo-shine-provider.xml"/>
```

#### 1.4. 手动加载
在classPath里（包括jar包），寻找配置文件并加载。通常如果是同一个上下文对象则会把配置文件合并处理。
```java
ApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"a.xml", "b.xml"});
```
