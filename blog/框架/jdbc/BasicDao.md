![](https://static.meowrain.cn/i/2024/01/15/12i98pb-3.webp)
# BasicDao
```java
package org.example.dao;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.example.utils.DruidUtil;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class BasicDao<T> {
    private QueryRunner qr = new QueryRunner();

    public int update(String sql, Object... params) {
        Connection connection = null;
        try {
            connection = DruidUtil.getConnection();
            int update = qr.update(connection, sql, params);
            return update;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            DruidUtil.close(null, null, connection);
        }
    }

    //查询的结果是多行
    public List<T> queryMultiply(String sql, Class<T> clazz, Object... params) {
        Connection connection = null;
        try {
            connection = DruidUtil.getConnection();
            List<T> list = qr.query(connection, sql, new BeanListHandler<T>(clazz), params);
            return list;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            DruidUtil.close(null, null, connection);
        }
    }

    //查询结果是单行
    public T querySingle(String sql, Class<T> clazz, Object... params) {
        Connection connection = null;
        try {
            connection = DruidUtil.getConnection();
            T attribute = qr.query(connection, sql, new BeanHandler<>(clazz), params);
            return attribute;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            DruidUtil.close(null, null, connection);
        }
    }

    public Object queryScalary(String sql, Object... params) {
        Connection connection = null;
        try {
            connection = DruidUtil.getConnection();
            Object object = qr.query(connection, sql, new ScalarHandler<>(), params);
            return object;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            DruidUtil.close(null, null, connection);
        }
    }
}

```

---

# ActorDao
```java
package org.example.dao;

import org.example.pojo.Actor;

public class ActorDao extends BasicDao<Actor> {

}

```

# TestFunc
```java
import org.example.dao.ActorDao;
import org.example.pojo.Actor;
import org.junit.jupiter.api.Test;

import java.util.List;

public class ActorDaoTest {
    @Test
    public void testActorDao() {
        ActorDao actorDao = new ActorDao();
        List<Actor> actors = actorDao.queryMultiply("select * from actor",Actor.class);
        System.out.println("查询结果");
        for(Actor actor : actors) {
            System.out.println(actor);
        }
    }
}

```

![](https://static.meowrain.cn/i/2024/01/16/hg8c8y-3.webp)