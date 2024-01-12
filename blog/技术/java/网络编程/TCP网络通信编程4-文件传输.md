# TCP网络通信编程-文件传输

![](https://static.meowrain.cn/i/2024/01/12/faqokx-3.webp)

```java
package org.example.socket;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class TcpServerCopy {
    public static void main(String[] args)  throws IOException {
        ServerSocket serverSocket = new ServerSocket(8888);
        System.out.println("等待客户端连接...");
        Socket socket = serverSocket.accept();
        System.out.println("客户端连接成功");

        /* 读入文件 */
        File file = new File("src/org/example/111658775_p0.png");
        FileInputStream fileInputStream = new FileInputStream(file);
        BufferedInputStream bufferedInputStream = new BufferedInputStream(fileInputStream);

        /*输出流，向客户端发送文件*/
        OutputStream outputStream = socket.getOutputStream();

        byte[] buf = new byte[1024];
        int bytesRead;
        while((bytesRead = bufferedInputStream.read(buf))!=-1){
            outputStream.write(buf,0,bytesRead);
        }
        socket.shutdownOutput();
        System.out.println("文件发送完成");

        bufferedInputStream.close();
        outputStream.close();
        socket.close();
        serverSocket.close();


    }
}

```

---

```java
package org.example.socket;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

public class TcpClientCopy {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket(InetAddress.getLocalHost(),8888);
        System.out.println("服务器连接成功");

        //接受文件内容
        InputStream inputStream = socket.getInputStream();
        File file = new File("src/client/client.png");
        FileOutputStream fileOutputStream = new FileOutputStream(file);
        BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);

        byte[] buf = new byte[1024];
        int bytesRead;
        while((bytesRead = inputStream.read(buf))!=-1){
            bufferedOutputStream.write(buf,0,bytesRead);
        }
        System.out.println("文件接受成功！");
        socket.shutdownInput();

        /*关闭资源*/
        inputStream.close();
        bufferedOutputStream.close();
        socket.close();

    }
}

```

![](https://static.meowrain.cn/i/2024/01/12/fnv9ba-3.webp)

![](https://static.meowrain.cn/i/2024/01/12/fnwo0s-3.webp)

![](https://static.meowrain.cn/i/2024/01/12/fofx86-3.webp)