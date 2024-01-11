# JDBC

![](https://static.meowrain.cn/i/2023/12/18/z8bdpm-3.webp)

> JDBC为访问不同的数据库提供了统一的接口

## JDBC的基本原理

![](https://static.meowrain.cn/i/2023/12/18/z9gtxa-3.webp)

## JDBC快速入门

![](https://static.meowrain.cn/i/2023/12/18/zdl24h-3.webp)

![](https://static.meowrain.cn/i/2023/12/18/zdp8ua-3.webp)

![](https://static.meowrain.cn/i/2023/12/18/zhvnum-3.webp)

![](https://static.meowrain.cn/i/2023/12/18/zi0i7b-3.webp)

![](https://static.meowrain.cn/i/2023/12/18/zkcmic-3.webp)

![](https://static.meowrain.cn/i/2023/12/18/10dwyuy-3.webp)

```java
package com.hspedu.jdbc.myjdbc;

import com.mysql.cj.jdbc.Driver;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class Jdbc01 {
    public static void main(String[] args) throws SQLException {

        // 1. 注册驱动
        Driver driver = new Driver();
        String url = "jdbc:mysql://100.113.199.61:3306/hsp_db02";
        //用户名密码放在Properties对象中
        Properties properties = new Properties();
        properties.setProperty("user","root"); //用户
        properties.setProperty("password","123456"); //密码

        // 2.获取连接
        Connection connection = driver.connect(url,properties);

        // 3.执行sql
        String sql = "INSERT INTO actor values (null,'meowrain','男','2004-12-12','119225')";
        Statement statement = connection.createStatement();
        int rows = statement.executeUpdate(sql);
        System.out.println(rows > 0 ? "成功" : "失败");
        statement.close();

        //4.断开链接
        connection.close();


    }
}
```

## 获取数据库连接的方式

![](https://static.meowrain.cn/i/2023/12/18/10emai9-3.webp)

![](https://static.meowrain.cn/i/2023/12/18/10er4dm-3.webp)

```java
package com.hspedu.jdbc.myjdbc;

import com.mysql.cj.jdbc.Driver;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class JdbcConn {

    public void connect01() throws SQLException {
        Driver driver = new Driver();
        String url = "jdbc:mysql://100.113.199.61:3306/hsp_db02";
        //用户名密码放在Properties对象中
        Properties properties = new Properties();
        properties.setProperty("user", "root"); //用户
        properties.setProperty("password", "123456"); //密码
        // 2.获取连接
        Connection connection = driver.connect(url, properties);
        System.out.println(connection);
        connection.close();
    }

    public void connect02() throws SQLException {
        Driver driver = new Driver();
        String url = "jdbc:mysql://100.113.199.61:3306/hsp_db02";
        //用户名密码放在Properties对象中
        Properties properties = new Properties();
        properties.setProperty("user", "root"); //用户
        properties.setProperty("password", "123456"); //密码
        DriverManager.registerDriver(driver);
        Connection connection = DriverManager.getConnection(url,properties);
        System.out.println(connection);
        connection.close();
    }

    public void connect03() throws SQLException {

        String url = "jdbc:mysql://100.113.199.61:3306/hsp_db02";
        //用户名密码放在Properties对象中
        Properties properties = new Properties();
        properties.setProperty("user", "root"); //用户
        properties.setProperty("password", "123456"); //密码
        Connection connection = DriverManager.getConnection(url,properties);
        System.out.println(connection);
        connection.close();
    }

    public void connect04() throws SQLException, IOException {
        Properties properties = new Properties();
        properties.load(new FileInputStream("D:\\datastructure_java\\jdbc_learn\\src\\main\\resources\\db.properties"));
        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        Connection connection = DriverManager.getConnection(url,user,password);
        System.out.println(connection);
        connection.close();
    }

    public static void main(String[] args) throws SQLException, IOException {
        JdbcConn conn = new JdbcConn();
        conn.connect02();
        conn.connect03();
        conn.connect04();
    }


}
```

下面我们来做个例子

```java
package com.hspedu.jdbc.myjdbc;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class Homework01 {
    public static void main(String[] args) throws IOException, SQLException {
        Properties properties = new Properties();
        properties.load(new FileInputStream(new File("D:\\datastructure_java\\jdbc_learn\\src\\main\\resources\\db.properties")));
        String username = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        Connection connection = DriverManager.getConnection(url,username,password);
        Statement statement = connection.createStatement();
        statement.execute("CREATE TABLE IF NOT EXISTS news (id INT PRIMARY KEY AUTO_INCREMENT,content VARCHAR(100))");
        statement.executeUpdate("INSERT INTO news (content) values ('News value 01')");
        statement.executeUpdate("INSERT INTO news (content) values ('News value 02')");
        statement.executeUpdate("INSERT INTO news (content) values ('News value 03')");
        statement.executeUpdate("INSERT INTO news (content) values ('News value 04')");
        statement.executeUpdate("INSERT INTO news (content) values ('News value 05')");

        statement.close();
        connection.close();

    }

}
```

## ResultSet ->结果集

![](https://static.meowrain.cn/i/2023/12/18/114ql1y-3.webp)

```java
package com.hspedu.jdbc.myjdbc;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

public class SelectJdbcTest {
    public static void main(String[] args) throws IOException, SQLException {
        Properties properties = new Properties();
        properties.load(new FileInputStream(new File("D:\\datastructure_java\\jdbc_learn\\src\\main\\resources\\db.properties")));
        String username = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        Connection connection = DriverManager.getConnection(url, username, password);
        Statement statement = connection.createStatement();

        String sql = "SELECT * FROM news";
        ResultSet resultSet = statement.executeQuery(sql);
        while (resultSet.next()) {
            int id = resultSet.getInt(1); //获取第一列数据
            String content = resultSet.getString(2);
            System.out.println(id + " " + content);
        }
        resultSet.close();
        statement.close();
        connection.close();
    }
}
```

## Statement

![](https://static.meowrain.cn/i/2023/12/18/11alwjp-3.webp)



## PreparedStatement

![](https://static.meowrain.cn/i/2023/12/19/ihtuk5-3.webp)

![](https://static.meowrain.cn/i/2023/12/19/iouqb1-3.webp)

```java
package com.hspedu.jdbc.myjdbc;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

public class PreparedStatement_ {
    public static void main(String[] args) throws IOException, SQLException {
        Properties properties = new Properties();
        properties.load(new FileInputStream(new File("D:\\datastructure_java\\jdbc_learn\\src\\main\\resources\\db.properties")));;
        String username = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        Connection connection = DriverManager.getConnection(url, username, password);
        String sql = "SELECT COUNT(*) FROM user WHERE username=? AND password=?";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1,"meowrain");
        preparedStatement.setString(2,"123456");
        ResultSet resultSet = preparedStatement.executeQuery();
        if(resultSet.next()) {
            System.out.println("登录成功");
        }else  {
            System.out.println("登录失败");
        }
        resultSet.close();
        preparedStatement.close();
        connection.close();

    }
}

```

## 预处理DML

```java
package com.hspedu.jdbc.myjdbc;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;

public class DML {
    public static void main(String[] args) throws IOException, SQLException {
        Properties properties = new Properties();
        properties.load(new FileInputStream(new File("D:\\datastructure_java\\jdbc_learn\\src\\main\\resources\\db.properties")));
        String username = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        Connection connection = DriverManager.getConnection(url,username,password);
        String sql = "INSERT INTO user (username,password) values (?,?) ";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1,"joshDes");
        preparedStatement.setString(2,"meowraidfdfgasf");
        int rows = preparedStatement.executeUpdate();
        if(rows > 0) {
            System.out.println("插入成功！");
        }else {
            System.out.println("插入失败！");
        }
        preparedStatement.close();
        connection.close();
    }
}

```

## 封装JDBCUtils
![](https://static.meowrain.cn/i/2023/12/19/iyeqr6-3.webp)

```java
package com.hspedu.jdbc.myjdbc.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

public class JdbcUtil {
    private static String user;
    private static String password;
    private static String url;

    static {
        Properties properties = new Properties();
        try {
            properties.load(new FileInputStream("D:\\datastructure_java\\jdbc_learn\\src\\main\\resources\\db.properties"));
            user = properties.getProperty("user");
            password = properties.getProperty("password");
            url = properties.getProperty("url");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(url,user,password);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    /*
    * 如果需要关闭资源，就传入对象，否则传入null
    * */
    public static void close(ResultSet set, Statement statement,Connection connection){
        if(set != null) {
            try {
                set.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if(statement != null) {
            try {
                statement.close();
            }catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
        if(connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
}

```


使用
```java
package com.hspedu.jdbc.myjdbc;

import com.hspedu.jdbc.myjdbc.util.JdbcUtil;

import java.sql.*;

public class JDBCUtils_use {
    public static void main(String[] args) {
        Connection connection = JdbcUtil.getConnection();
        String sql = "SELECT * FROM user";
        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                ResultSetMetaData metaData = resultSet.getMetaData();
                int columnCount = metaData.getColumnCount();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    Object value = resultSet.getObject(i); // 获取列值
                    System.out.print(columnName + ": " + value + "\t"); // 格式化输出
                }
                System.out.println(); // 换行
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcUtil.close(resultSet, null, preparedStatement, connection);
        }
    }
}

```
![](https://static.meowrain.cn/i/2023/12/19/jwevk0-3.webp)



## 事务
![](https://static.meowrain.cn/i/2023/12/19/jxq1bu-3.webp)