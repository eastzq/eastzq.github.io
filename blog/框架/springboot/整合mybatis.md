# 依赖添加
```xml
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>3.0.3</version>
        </dependency>
```

# 配置datasource
```yml
server:
  port: 8080
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/hsp_db02
    username: root
    password: 123456

```
# 目录结构
![](https://static.meowrain.cn/i/2024/01/31/lokufa-3.webp)

# 编写mapper
```java
package cn.meowrain.mapper;

import cn.meowrain.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {
    @Select("select * from user where id = #{id}")
    public User findById(@Param("id") Integer id);
}

```

# 编写pojo
```java
package cn.meowrain.pojo;

import lombok.Data;

@Data
public class User {
    private Integer id;
    private String username;
    private String password;
}

```

# 编写service
```java
package cn.meowrain.service;

import cn.meowrain.pojo.User;

public interface UserService {
    public User findById(Integer id);
}

```

```java
package cn.meowrain.service.impl;

import cn.meowrain.mapper.UserMapper;
import cn.meowrain.pojo.User;
import cn.meowrain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Override
    public User findById(Integer id) {
        return userMapper.findById(id);
    }
}

```

# 编写controller
```java
package cn.meowrain.controller;

import cn.meowrain.pojo.User;
import cn.meowrain.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    @RequestMapping(value = "/findById", produces = "application/json;charset=utf-8")
    public User findById(@Param("id") Integer id) {
        return userService.findById(id);
    }
}

```
# 获得结果
![](https://static.meowrain.cn/i/2024/01/31/lpseiy-3.webp)
