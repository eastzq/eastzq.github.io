# 第一个窗口
![](https://static.meowrain.cn/i/2023/01/12/p2nekp-3.png)
想使用java创建窗口，我们要导入
`import java.awt.*;`
然后创建第一个窗口
```java
package cn.javagui.awt;

import java.awt.*;

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
        frame.setCursor(new Cursor(Cursor.CROSSHAIR_CURSOR));
    }
}
```
