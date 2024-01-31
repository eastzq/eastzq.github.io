![](https://static.meowrain.cn/i/2024/01/31/psbmf0-3.webp)


![](https://static.meowrain.cn/i/2024/01/31/qj866i-3.webp)


---

## 生成
```java
package cn.meowrain;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtTest {
    @Test
    public void testJwt(){
        Map<String,Object> clamis = new HashMap<>();
        clamis.put("id",1);
        clamis.put("username","meowrain");
        //生成jwt的代码
        String token = JWT.create()
                .withClaim("user",clamis)//添加载荷
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000*60*60*1)) //添加过期时间
                .sign(Algorithm.HMAC256("meowrainkey")); //指定密码
        System.out.println(token);
    }
}

```


## 解析
```java

    @Test
    public void testParse() {
        //定义字符串，模拟用户传递的toekn
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im1lb3dyYWluIn0sImV4cCI6MTcwNjY5MTg1Nn0.4oFB_ac_Pq03UJoLWK8WkyZt9SEbOcXTU6wUUXbJd3k";
        String key = "meowrainkey";
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(key)).build();
        DecodedJWT decodedJWT = jwtVerifier.verify(token);//验证token生成一个解析后的jwt对象
        Map<String, Claim> clamis = decodedJWT.getClaims();
        System.out.println(clamis);
        System.out.println(clamis.get("user"));

    }
```

# JwtUtil
```java
package cn.meowrain.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;
import java.util.Map;

public class JwtUtil {

    private static final String KEY = "meowrainkey";
	
	//接收业务数据,生成token并返回
    public static String genToken(Map<String, Object> claims) {
        return JWT.create()
                .withClaim("claims", claims)
                .withExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 1))
                .sign(Algorithm.HMAC256(KEY));
    }

	//接收token,验证token,并返回业务数据
    public static Map<String, Object> parseToken(String token) {
        return JWT.require(Algorithm.HMAC256(KEY))
                .build()
                .verify(token)
                .getClaim("claims")
                .asMap();
    }

}
```


# 拦截器
![](https://static.meowrain.cn/i/2024/01/31/qynwbe-3.webp)



![](https://static.meowrain.cn/i/2024/01/31/qnf4ty-3.webp)