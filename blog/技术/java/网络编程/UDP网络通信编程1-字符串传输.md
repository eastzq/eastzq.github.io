# 接收端
```java
package org.example.udpSocket;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;

public class UDPReciverA {
    public static void main(String[] args) throws SocketException,IOException {
        //创建一个DatagramSocket
        //在9999接收数据
        DatagramSocket socket = new DatagramSocket(9999);
        //创建一个DatagramPacket，接受数据
        byte[] buf = new byte[1024];
        DatagramPacket datagramPacket = new DatagramPacket(buf,buf.length);
        //如果没有数据包发送到这个socket中，就会阻塞
        socket.receive(datagramPacket); 

        int length = datagramPacket.getLength();
        byte[] data = datagramPacket.getData();
        String s = new String(data,0,length);
        System.out.println(s);

        //关闭资源
        socket.close();


    }
}
```

# 发送端

```java
package org.example.net;


import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;

public class UDPReciver {
    public static void main(String[] args) throws SocketException,IOException {
        //创建一个DatagramSocket
        //在9999接收数据
        DatagramSocket socket = new DatagramSocket(9999);
        //创建一个DatagramPacket，接受数据
        byte[] buf = new byte[1024];
        DatagramPacket datagramPacket = new DatagramPacket(buf,buf.length);
        //如果没有数据包发送到这个socket中，就会阻塞
        socket.receive(datagramPacket);

        int length = datagramPacket.getLength();
        byte[] data = datagramPacket.getData();
        String s = new String(data,0,length);
        System.out.println(s);

        //关闭资源
        socket.close();


    }
}

```

![](https://static.meowrain.cn/i/2024/01/16/jyqq18-3.webp)
