![](https://static.meowrain.cn/i/2024/01/15/10vvqri-3.webp)

# maven
https://mvnrepository.com/artifact/commons-dbutils/commons-dbutils

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
    <!-- https://mvnrepository.com/artifact/commons-dbutils/commons-dbutils -->
    <dependency>
        <groupId>commons-dbutils</groupId>
        <artifactId>commons-dbutils</artifactId>
        <version>1.8.1</version>
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


# 各种Handler

![](https://static.meowrain.cn/i/2024/01/15/10x0wfk-3.webp)



![](https://static.meowrain.cn/i/2024/01/15/10yc0b2-3.webp)
## BeanListHandler

```java
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.example.pojo.Actor;
import org.example.utils.DruidUtil;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBUtilsUse
{
    @Test
    public void testManyQuery() throws SQLException {
        Connection connection = DruidUtil.getConnection();
        String sql ="select * from actor where id >= ?";
        QueryRunner queryRunner = new QueryRunner();
        queryRunner.query(connection,sql,new BeanListHandler<>(Actor.class),1);


    }
}
```


![](https://static.meowrain.cn/i/2024/01/15/11366fp-3.webp)

最后一个参数是传给sql语句中的`?`的。可以传多个参数，因为这个参数是一个可变参数

```java
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.example.pojo.Actor;
import org.example.utils.DruidUtil;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DBUtilsUse
{
    @Test
    public void testManyQuery() throws SQLException {
        Connection connection = DruidUtil.getConnection();
        String sql ="select * from actor where id >= ?";
        QueryRunner queryRunner = new QueryRunner();
        List<Actor> list = queryRunner.query(connection,sql,new BeanListHandler<>(Actor.class),1);
        for(Actor actor:list) {
            System.out.println(actor);
        }
        DruidUtil.close(null,null,connection);
    }
}

```

![](https://static.meowrain.cn/i/2024/01/15/114ti1k-3.webp)

---
## BeanHandler


```java
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.example.pojo.Actor;
import org.example.utils.DruidUtil;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DBUtilsUse
{
    @Test
    public void testManyQuery() throws SQLException {
        Connection connection = DruidUtil.getConnection();
        String sql ="select * from actor where id = 1";
        QueryRunner queryRunner = new QueryRunner();
        Actor actor = queryRunner.query(connection,sql, new BeanHandler<>(Actor.class));
        System.out.println(actor);
        DruidUtil.close(null,null,connection);
    }
}

```

![](https://static.meowrain.cn/i/2024/01/15/116guhy-3.webp)

## ScalarHandler
```java
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.example.pojo.Actor;
import org.example.utils.DruidUtil;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DBUtilsUse
{
    @Test
    public void testQuerySingleActor() throws SQLException {
        Connection connection = null;
        try {
            connection = DruidUtil.getConnection();
            /*
            * 单行单列 ScalarHandler
            * */
            String sql = "SELECT name FROM actor WHERE id = ?";
            QueryRunner queryRunner = new QueryRunner();
            Object result = queryRunner.query(connection, sql, new ScalarHandler<>(),1);
            System.out.println(result);
        } finally {
            DruidUtil.close(null, null, connection);
        }
    }
}

```

![](https://static.meowrain.cn/i/2024/01/15/11c473p-3.webp)

---

## ArrayHandler

```java
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.example.pojo.Actor;
import org.example.utils.DruidUtil;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DBUtilsUse
{
    @Test
    public void testQuerySingleActor() throws SQLException {
        Connection connection = null;
        try {
            connection = DruidUtil.getConnection();
            String sql = "SELECT * FROM actor WHERE id = 1";
            QueryRunner queryRunner = new QueryRunner();
            ArrayHandler arrayHandler = new ArrayHandler();
            Object[] result = queryRunner.query(connection, sql, arrayHandler);
            if (result != null && result.length > 0) {
                int id = (Integer) result[0];
                String name = (String) result[1];
                String hobby = (String) result[2];
                Actor actor = new Actor(id, name, hobby);
                System.out.println(actor);
            }
        } finally {
            DruidUtil.close(null, null, connection);
        }
    }
}

```
![](https://static.meowrain.cn/i/2024/01/15/11bgbme-3.webp)

---


# DML操作

![](https://static.meowrain.cn/i/2024/01/15/11d1peo-3.webp)

```java
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.example.pojo.Actor;
import org.example.utils.DruidUtil;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class DBUtilsUse {
    @Test
    public void testDMLAdd() throws SQLException {
        /*增*/
        Connection connection = DruidUtil.getConnection();
        QueryRunner queryRunner = new QueryRunner();
        String sql = "insert into actor (name,hobby) values (?,?)";
        Object[][] params = {
                {"John Dae", "reading"},
                {"Jane Skate", "painting"},
                {"Bob Mikey", "gaming"}
        };
        int[] resSet = queryRunner.batch(connection, sql, params);
        for (int res : resSet) {
            System.out.println(res == 0 ? "插入失败" : "插入成功");
        }
        DruidUtil.close(null, null, connection);
    }

    @Test
    public void testDMLDelete() throws SQLException {
        /*删除*/
        Connection connection = DruidUtil.getConnection();
        QueryRunner queryRunner = new QueryRunner();
        String sql = "delete from actor where id = ?";
        int res = queryRunner.execute(connection, sql, 6);
        System.out.println(res == 0 ? "删除失败" : "删除成功");
        DruidUtil.close(null, null, connection);
    }

    @Test
    public void testDMLUpdate() throws SQLException {
        /*改*/
        Connection connection = DruidUtil.getConnection();
        QueryRunner queryRunner = new QueryRunner();
        String sql = "update actor set name = ? where id = ?";
        Object[] params = {"meow", 1};
        int res = queryRunner.update(connection, sql, params);
        System.out.println(res == 0 ? "修改失败" : "修改成功");
        DruidUtil.close(null, null, connection);
    }

    @Test
    public void testDMLSelect() throws SQLException {
        /*查*/
        Connection connection = DruidUtil.getConnection();
        QueryRunner queryRunner = new QueryRunner();
        String sql = "select * from actor where id = ?";
        Actor actor = queryRunner.query(connection, sql, new BeanHandler<>(Actor.class), 2);
        System.out.println(actor == null ? "查询失败，没有此人" : actor);

    }

}


```


