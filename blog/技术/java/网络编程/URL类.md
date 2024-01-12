# URL类例子
```java
package org.example;
/*
* https://www.runoob.com/java/java-url-processing.html
* */

import java.net.MalformedURLException;
import java.net.URL;


/*
* protocol://host:port/path?query#fragment
* protocol(协议)可以是 HTTP、HTTPS、FTP 和 File，port 为端口号，path为文件路径及文件名。
*
http://www.runoob.com/index.html?language=cn#j2se
URL 解析：
协议为(protocol)：http
主机为(host:port)：www.runoob.com
端口号为(port): 80 ，以上URL实例并未指定端口，因为 HTTP 协议默认的端口号为 80。
文件路径为(path)：/index.html
请求参数(query)：language=cn
定位位置(fragment)：j2se，定位到网页中 id 属性为 j2se 的 HTML 元素位置 。
* */

public class UrlTest {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://meowrain.cn/archives/spring-bi-ji-08-bean-de-xun-huan-yi-lai#singleton%E4%B8%8B%E7%9A%84%E6%9E%84%E9%80%A0%E6%B3%A8%E5%85%A5%E4%BA%A7%E7%94%9F%E7%9A%84%E5%BE%AA%E7%8E%AF%E4%BE%9D%E8%B5%96");
            String path = url.getPath();
            String query = url.getQuery();
            String authority = url.getAuthority();
            int port = url.getDefaultPort();
            String protocal = url.getProtocol();
            String host = url.getHost();
            String ref = url.getRef();
            System.out.println("protocal\t"+ protocal);
            System.out.println("host\t" + host);
            System.out.println("port\t"+port);
            System.out.println("path\t"+path);
            System.out.println("query\t"+query);
            System.out.println("ref\t"+ref);
            System.out.println("authority\t" + authority);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

    }
}

```