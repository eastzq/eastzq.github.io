## BorderLayout
![](https://static.meowrain.cn/i/2023/01/14/nl37if-3.png)
```java
package cn.javagui.awt;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class BorderLayout_ {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setBounds(500,500,500,300);
        frame.setAlwaysOnTop(true);;
        frame.setVisible(true);
        Dimension screen_size = Toolkit.getDefaultToolkit().getScreenSize();// 获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth() / 2 - frame.getWidth() / 2); // 中间横坐标
        int middle_y = (int) (screen_size.getHeight() / 2 - frame.getHeight() / 2);// 中间纵坐标
        frame.setLocation(middle_x, middle_y); // 设置窗口显示位置，显示再屏幕正中间
        frame.setFont(new Font("SimSong", Font.BOLD, 20));
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("程序退出成功!");
                System.exit(0);
            }
        });
        BorderLayout layout = new BorderLayout();
        frame.setLayout(layout);;
        layout.setHgap(50); //横向边距
        layout.setVgap(50); //纵向边距

        frame.add(new Button("number1"),BorderLayout.WEST);
        frame.add(new Button("number2"),BorderLayout.EAST);
        frame.add(new Button("number3"),BorderLayout.NORTH);
        frame.add(new Button("number4"),BorderLayout.SOUTH);
        frame.add(new Button("number5"),BorderLayout.CENTER);

    }
}
```


## FlowLayout
![](https://static.meowrain.cn/i/2023/01/14/nl9ejq-3.png)
```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class FlowLayout_ {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setSize(500,500);
        frame.setAlwaysOnTop(true);;
        frame.setVisible(true);
        Dimension screen_size = Toolkit.getDefaultToolkit().getScreenSize();// 获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth() / 2 - frame.getWidth() / 2); // 中间横坐标
        int middle_y = (int) (screen_size.getHeight() / 2 - frame.getHeight() / 2);// 中间纵坐标
        frame.setLocation(middle_x, middle_y); // 设置窗口显示位置，显示再屏幕正中间
        frame.setFont(new Font("SimSong", Font.BOLD, 20));
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("程序退出成功!");
                System.exit(0);
            }
        });
        FlowLayout flowLayout = new FlowLayout();
        flowLayout.setAlignment(FlowLayout.LEFT);
        flowLayout.setHgap(50);
        frame.setLayout(flowLayout);
        frame.add(new Button("number1"));
        frame.add(new Button("number2"));
        frame.add(new Button("number3"));
        frame.add(new Button("number4"));
        frame.add(new Button("number5"));
    }
}
```
## GridLayout
![](https://static.meowrain.cn/i/2023/01/14/nlsd3t-3.png)

```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class GridLayout_ {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setVisible(true);
        frame.setAlwaysOnTop(true);
        frame.setSize(900, 600);
        Dimension screen_size = Toolkit.getDefaultToolkit().getScreenSize();
        int middle_x = (int) (screen_size.getWidth() / 2);
        int middle_y = (int) (screen_size.getHeight() / 2);
        frame.setLocation(middle_x, middle_y);
        frame.setFont(new Font("SimSong", Font.BOLD, 20));
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.exit(0);
                System.out.println("程序退出成功");
            }
        });
        GridLayout layout = new GridLayout();
        layout.setRows(3);
        layout.setColumns(3);
        frame.setLayout(layout);
        for (int i = 1; i <= 6; i++) {
            frame.add(new Button(i + "button"));
        }

    }
}
```


## CardLayout
![](https://static.meowrain.cn/i/2023/01/14/nlxdry-3.png)
```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class CardLayout_ {
    public static void main(String[] args) throws InterruptedException {
        Frame frame = new Frame();
        frame.setSize(500,500);
        frame.setAlwaysOnTop(true);;
        frame.setVisible(true);
        Dimension screen_size = Toolkit.getDefaultToolkit().getScreenSize();// 获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth() / 2 - frame.getWidth() / 2); // 中间横坐标
        int middle_y = (int) (screen_size.getHeight() / 2 - frame.getHeight() / 2);// 中间纵坐标
        frame.setLocation(middle_x, middle_y); // 设置窗口显示位置，显示再屏幕正中间
        frame.setFont(new Font("SimSong", Font.BOLD, 20));
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("程序退出成功!");
                System.exit(0);
            }
        });
        CardLayout layout = new CardLayout();
        frame.setLayout(layout);
        frame.add(new Label("num 1"));
        frame.add(new Label("num 2"));
        frame.add(new Label("num 3"));
        while(true){
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            layout.next(frame); //我们需要使用CardLayout对象来进行切换

        }
    }
}
```