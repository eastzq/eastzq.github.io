# TCP网络通信编程2
![](https://static.meowrain.cn/i/2024/01/11/yv51yg-3.webp)


![](https://static.meowrain.cn/i/2024/01/11/z78lgv-3.webp)

```java
SocketTcp02Server.java
package org.example.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketTcp02Server {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(9999);
        Socket socket = serverSocket.accept();
        System.out.println("Server端运行，监听9999端口");
        // 输出
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello,client".getBytes());
        socket.shutdownOutput();//OutputStream结束标记
        //输入
        InputStream inputStream = socket.getInputStream();
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf))!=-1){
            System.out.print(new String(buf,0,readLen));
        }
        socket.shutdownInput();//InputStream结束标记
        
        outputStream.close();
        inputStream.close();
        socket.close();
        serverSocket.close();
    }
}

```

---


```java
SocketTcp02Client.java
package org.example.socket;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;


public class SocketTcp02Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket(InetAddress.getLocalHost(),9999);

//        输出
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello,server".getBytes());
        socket.shutdownOutput(); //OutputStream结束标记
//        输入
        InputStream inputStream = socket.getInputStream();
        byte[] buf = new byte[1024];
        int readLen = 0;
        while((readLen = inputStream.read(buf))!=-1){
            System.out.println(new String(buf,0,readLen));
        }
        socket.shutdownInput();//InputStream结束标记
//关闭流
        outputStream.close();
        inputStream.close();
        socket.close();
    }
}

```


![](https://static.meowrain.cn/i/2024/01/11/za5d6u-3.webp)


![](https://static.meowrain.cn/i/2024/01/11/za6u99-3.webp)