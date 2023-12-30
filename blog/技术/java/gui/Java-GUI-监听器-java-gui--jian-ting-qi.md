# 监听器
我们可以为窗口添加一系列的监听器，监听器会监听窗口中发生的一些事件，比如我们点击关闭窗口，移动鼠标，鼠标点击等，当发生对应的事件时候，就会通知到对应的监听器进行处理，从而我们就能够再发生对应事件时候进行处理
![](https://static.meowrain.cn/i/2023/01/12/p3xjkw-3.png)

> 比如我们现在希望点击关闭按钮关闭当前的窗口,但是我们发现默认情况下实际上是关不掉的,因为我们没有对关闭事件进行处理,默认情况下对于这种点击时没有设定任何动作的,万一我们点了之后并不是要关闭窗口呢,要实现关闭窗口,我们可以使用`addXXXListener`来添加对应的事件监听器,比如窗口相关的操作那么就是`WindowListener`


## 监听器实现点击X号关闭窗口
![](https://static.meowrain.cn/i/2023/01/12/p86fvk-3.png)
```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class Main {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setTitle("第一个窗口程序");
        frame.setVisible(true); //窗口设置为可见
        frame.setBackground(Color.ORANGE); //设置窗口背景颜色
        frame.setSize(700,500); //使用setSize方法设定窗体大小
        frame.setResizable(true);//设置窗口大小是否可以调整
        frame.setAlwaysOnTop(true); //设置窗口是否始终展示在最前面
        Dimension screen_size =  Toolkit.getDefaultToolkit().getScreenSize();//获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth()/2 - frame.getWidth()/2); //中间横坐标
        int middle_y = (int)(screen_size.getHeight() / 2-frame.getHeight() / 2);//中间纵坐标
        frame.setLocation(middle_x,middle_y); //设置窗口显示位置，显示再屏幕正中间

        /*监听器*/

        //添加监听器
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                frame.dispose(); //关闭当前窗口
                //或者使用System.exit(0);
                System.out.println("窗口已经关闭!");
            }
        });
    }
}

```
## 窗口常用事件
![](https://static.meowrain.cn/i/2023/01/12/p9a4j5-3.png)

## 键盘事件
![](https://static.meowrain.cn/i/2023/01/12/pbsyu0-3.png)
![](https://static.meowrain.cn/i/2023/01/12/pbuup3-3.png)
```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class Main {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setTitle("第一个窗口程序");
        frame.setVisible(true); //窗口设置为可见
        frame.setBackground(Color.ORANGE); //设置窗口背景颜色
        frame.setSize(700,500); //使用setSize方法设定窗体大小
        frame.setResizable(true);//设置窗口大小是否可以调整
        frame.setAlwaysOnTop(true); //设置窗口是否始终展示在最前面
        Dimension screen_size =  Toolkit.getDefaultToolkit().getScreenSize();//获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth()/2 - frame.getWidth()/2); //中间横坐标
        int middle_y = (int)(screen_size.getHeight() / 2-frame.getHeight() / 2);//中间纵坐标
        frame.setLocation(middle_x,middle_y); //设置窗口显示位置，显示再屏幕正中间

        /*监听器*/

        //添加监听器
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
                System.out.println("窗口已经关闭!");
            }
        });
        frame.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                System.out.print(e.getKeyChar());
            }
        });
    }
}
```


### 常用事件
![](https://static.meowrain.cn/i/2023/01/12/pbitz6-3.png)

## 鼠标事件

![](https://static.meowrain.cn/i/2023/01/12/pe4z0u-3.png)
![](https://static.meowrain.cn/i/2023/01/12/pe8rma-3.png)

```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.*;

public class Main {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setTitle("第一个窗口程序");
        frame.setVisible(true); //窗口设置为可见
        frame.setBackground(Color.ORANGE); //设置窗口背景颜色
        frame.setSize(700, 500); //使用setSize方法设定窗体大小
        frame.setResizable(true);//设置窗口大小是否可以调整
        frame.setAlwaysOnTop(true); //设置窗口是否始终展示在最前面
        Dimension screen_size = Toolkit.getDefaultToolkit().getScreenSize();//获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth() / 2 - frame.getWidth() / 2); //中间横坐标
        int middle_y = (int) (screen_size.getHeight() / 2 - frame.getHeight() / 2);//中间纵坐标
        frame.setLocation(middle_x, middle_y); //设置窗口显示位置，显示再屏幕正中间

        /*监听器*/

        //添加监听器
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
                System.out.println("窗口已经关闭!");
            }
        });
        frame.addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                System.out.print(e.getKeyChar());
            }
        });
        frame.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                System.out.println("鼠标位置\nx:" + e.getX() + "\t" + "y:" + e.getY());
            }
        });
    }

}
```