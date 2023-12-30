# Java-GUI-常用组件
> 组件实际上是AWT为我们预设好的一些可以直接使用的界面元素，比如按钮，文字框，标签等等，我们可以使用这些已经帮我们写好的组件来快速拼凑出一个好看且功能强大的程序

在学习组件之前，我们先将布局设定为null,因为默认情况下会采用BorderLayout作为布局,有关布局会在下一部分中进行介绍

## 标签
![](https://static.meowrain.cn/i/2023/01/12/ql4bf7-3.png)
```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class Component {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setTitle("组件");
        frame.setLayout(null);
        frame.setSize(700, 500);
        frame.setVisible(true);
        frame.setBackground(Color.ORANGE);
        Dimension screen_size = Toolkit.getDefaultToolkit().getScreenSize();// 获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth() / 2 - frame.getWidth() / 2); // 中间横坐标
        int middle_y = (int) (screen_size.getHeight() / 2 - frame.getHeight() / 2);// 中间纵坐标
        frame.setLocation(middle_x, middle_y); // 设置窗口显示位置，显示再屏幕正中间
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("程序退出成功!");
                System.exit(0);
            }
        });
        Label label = new Label();// 添加标签只需要创建要个Label对象即可
        label.setLocation(20, 50);
        label.setSize(350, 20);
        label.setFont(new Font("SimSong", Font.BOLD, 20)); // 设置标签字体
        label.setText("I am a label");
        frame.add(label);// 使用add方法添加组件到窗口中
    }
}

```

## 按钮
![](https://static.meowrain.cn/i/2023/01/12/qs2cbw-3.gif)
```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class Component {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setTitle("组件");
        frame.setLayout(null);
        frame.setSize(700, 500);
        frame.setVisible(true);
        frame.setBackground(Color.ORANGE);
        Dimension screen_size = Toolkit.getDefaultToolkit().getScreenSize();// 获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth() / 2 - frame.getWidth() / 2); // 中间横坐标
        int middle_y = (int) (screen_size.getHeight() / 2 - frame.getHeight() / 2);// 中间纵坐标
        frame.setLocation(middle_x, middle_y); // 设置窗口显示位置，显示再屏幕正中间
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("程序退出成功!");
                System.exit(0);
            }
        });

        Label label = new Label("标签添加成功!");
        label.setFont(new Font("SimSong", Font.BOLD, 20));
        label.setBounds(20, 100, 200, 50);
        label.setBackground(Color.YELLOW);

        /* 按钮 */
        Button button = new Button("我是按钮");
        button.setBounds(20, 50, 100, 50);
        button.setFont(new Font("SimSong", Font.BOLD, 20));
        button.setBackground(Color.yellow);
        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                frame.add(label);
                System.out.println("标签添加成功");
            }
        });
        frame.add(button);

    }
}
```

## 文本域
![](https://static.meowrain.cn/i/2023/01/12/r10fa7-3.gif)
![](https://static.meowrain.cn/i/2023/01/12/r2mrlh-3.png)
```java
package cn.javagui.awt;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

public class Component {
    public static void main(String[] args) {
        Frame frame = new Frame();
        frame.setTitle("组件");
        frame.setLayout(null);
        frame.setSize(700, 500);
        frame.setVisible(true);
        frame.setBackground(Color.ORANGE);
        Dimension screen_size = Toolkit.getDefaultToolkit().getScreenSize();// 获取屏幕粉白嫩绿
        int middle_x = (int) (screen_size.getWidth() / 2 - frame.getWidth() / 2); // 中间横坐标
        int middle_y = (int) (screen_size.getHeight() / 2 - frame.getHeight() / 2);// 中间纵坐标
        frame.setLocation(middle_x, middle_y); // 设置窗口显示位置，显示再屏幕正中间
        frame.addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                System.out.println("程序退出成功!");
                System.exit(0);
            }
        });

        Label label = new Label();
        label.setFont(new Font("SimSong", Font.BOLD, 20));
        label.setBounds(20, 100, 200, 50);
        label.setBackground(Color.YELLOW);

        // 文本框
        TextField field = new TextField();
        field.setBounds(20, 150, 200, 50);
        field.setFont(new Font("SimSong", Font.BOLD, 20));
        frame.add(field);

        /* 按钮 */
        Button button = new Button("Click");
        button.setBounds(20, 50, 100, 50);
        button.setFont(new Font("SimSong", Font.BOLD, 20));
        button.setBackground(Color.yellow);
        button.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String text = field.getText(); // 获取文本框中的内容
                label.setText(text);// 把文本框中的内容放在label标签中
                frame.add(label);// 把label标签加入到整个页面中
                System.out.println("Info:  Label and text add successfully");
            }
        });
        frame.add(button);
    }
}

```