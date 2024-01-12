# InetAddress对象
```java
/*
*
meowrain-redmibookpro15s/127.0.1.1
baidu.com/39.156.66.10
meowrain-redmibookpro15s/127.0.1.1
baidu.com
39.156.66.10
---------------获取一个域名的所有ip----------------
47.103.24.173
119.3.70.188
139.159.241.37
8.134.50.24
-------------获取本地回环地址------------------
localhost
127.0.0.1
----------------------------------
*
* */
package org.example;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class InetTest {
    public static void main(String[] args) throws UnknownHostException {
        //获取本机器InetAddress对象 getLocalhost
        InetAddress localHost = InetAddress.getLocalHost();
        System.out.println(localHost);

        //根据指定主机名，域名获取IP地址对象 getByName
        InetAddress host1 = InetAddress.getByName("baidu.com");
        System.out.println(host1);

        InetAddress host2 = InetAddress.getByName("meowrain-redmibookpro15s");
        System.out.println(host2);

        //获取InetAddress对象的主机名
        String hostName = host1.getHostName();
        //获取InetAddress对象的IP
        String hostAddress = host1.getHostAddress();
        System.out.println(hostName);
        System.out.println(hostAddress);

        System.out.println("---------------获取一个域名的所有ip----------------");
        InetAddress[] addr = InetAddress.getAllByName("bilibili.com");
        for(InetAddress inetAddress : addr){
            System.out.println(inetAddress.getHostAddress());
        }
        System.out.println("-------------获取本地回环地址------------------");
        InetAddress loopbackAddress = InetAddress.getLoopbackAddress();
        System.out.println(loopbackAddress.getHostName());
        System.out.println(loopbackAddress.getHostAddress());
        System.out.println("----------------------------------");
    }
}

```

![](https://static.meowrain.cn/i/2024/01/11/ud9ejb-3.webp)