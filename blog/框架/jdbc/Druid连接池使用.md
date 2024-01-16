# Druid配置
![](https://static.meowrain.cn/i/2024/01/15/w49p0c-3.webp)

```properties
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/meowrain
username=root
password=root
initialSize=10
minIdle=5
maxActive=50
maxWait=5000

```

---
# 封装成工具类
```java
package org.c3p0tets.utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DruidUtils {
    private static Properties properties = new Properties();
    private static DataSource druidDataSource = null;
    static {
        try {
            properties.load(new FileInputStream("src/main/driod.properties"));
           druidDataSource  = DruidDataSourceFactory.createDataSource(properties);
        }catch (Exception e) {
            throw new RuntimeException();
        }
    }
    public static Connection getConnection() throws SQLException {
        return druidDataSource.getConnection();
    }
}

```

---
# 测试方法
```java
import org.example.pojo.Actor;
import org.example.utils.DruidUtil;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DruidTest {
    @Test
    public void druidTest() throws Exception {
        System.out.println("使用druid方式完成");
        Connection connection = null;
        String sql = "select * from actor";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        ArrayList<Actor> actorArrayList = new ArrayList<Actor>();

        try {
            connection = DruidUtil.getConnection();
            System.out.println(connection.getClass());
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String hobby = resultSet.getString("hobby");
                actorArrayList.add(new Actor(id, name, hobby));
            }
            System.out.println("list 集合创建成功");
            for(Actor actor : actorArrayList){
                System.out.println(actor);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DruidUtil.close(resultSet,preparedStatement,connection);
        }
    }
}

```

> 其实下面这种才比较正规
```java
import org.example.pojo.Actor;
import org.example.utils.DruidUtil;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DruidTest {
    @Test
    public void DruidUtiltest() throws Exception{
        ArrayList<Actor> actorArrayList = druidTest();
        for(Actor actor : actorArrayList){
            System.out.println(actor);
        }
    }
    public ArrayList<Actor> druidTest() throws Exception {
        System.out.println("使用druid方式完成");
        Connection connection = null;
        String sql = "select * from actor";
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        ArrayList<Actor> actorArrayList = new ArrayList<Actor>();

        try {
            connection = DruidUtil.getConnection();
            System.out.println(connection.getClass());
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String hobby = resultSet.getString("hobby");
                actorArrayList.add(new Actor(id, name, hobby));
            }
            System.out.println("list 集合创建成功");

        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DruidUtil.close(resultSet,preparedStatement,connection);
        }
        return actorArrayList;
    }
}

```


# maven
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>c3p0Test</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
<dependencies>
    <!-- https://mvnrepository.com/artifact/com.mysql/mysql-connector-j -->
    <dependency>
        <groupId>com.mysql</groupId>
        <artifactId>mysql-connector-j</artifactId>
        <version>8.2.0</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.10.1</version>
        <scope>test</scope>
    </dependency>
    <!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.2.21</version>
    </dependency>

</dependencies>
    <build>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
            </resource>
        </resources>
    </build>
</project>
```