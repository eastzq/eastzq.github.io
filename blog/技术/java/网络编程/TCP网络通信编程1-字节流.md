# TCP网络通信编程1

![](https://static.meowrain.cn/i/2024/01/11/unin6k-3.webp)

![](https://static.meowrain.cn/i/2024/01/11/uqgpyh-3.webp)

```java
SocketTcp01Server.java
package org.example.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketTcp01Server {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务器在9999端口监听中....");
        Socket socket = serverSocket.accept(); //会阻塞程序

        InputStream inputStream = socket.getInputStream();
//        int content = 0;
//        while ((content = inputStream.read()) != -1){
//            System.out.print((char)content);
//        }
        byte[] buf = new byte[1024];
        int readLen = 0;
        while((readLen = inputStream.read(buf)) != -1){
            System.out.print(new String(buf,0,readLen));
        }
        inputStream.close();
        socket.close();
    }
}

```

---

```java
SockeTcp01Client.java
package org.example.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;


public class SocketTcp01Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket(InetAddress.getLocalHost(),9999);
        System.out.println("客户端socket返回" + socket.getClass());
        OutputStream outputStream = socket.getOutputStream();
        byte[] content = "HelloServer,This is a message come from Client".getBytes();
        outputStream.write(content);
        outputStream.close();
        socket.close();
    }
}
```
![](https://static.meowrain.cn/i/2024/01/11/vt6pw8-3.webp)

![](https://static.meowrain.cn/i/2024/01/11/vt8ezb-3.webp)