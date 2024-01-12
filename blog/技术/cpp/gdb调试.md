> https://zhuanlan.zhihu.com/p/162164942
## 常用命令

```
break n （简写b n）:在第n行处设置断点

（可以带上代码路径和代码名称： b OAGUPDATE.cpp:578）

b fn1 if a＞b：条件断点设置

break func（break缩写为b）：在函数func()的入口处设置断点，如：break cb_button

delete 断点号n：删除第n个断点

disable 断点号n：暂停第n个断点

enable 断点号n：开启第n个断点

clear 行号n：清除第n行的断点

info b （info breakpoints） ：显示当前程序的断点设置情况

delete breakpoints：清除所有断点：

run (简写 r) ：开始执行程序

continue（简写 c)： 继续执行程序，直到下一个断点或者结束；

next（简写 n ）：单步执行程序，但是遇到函数时会直接跳过函数，不进入函数；

step(简写 s) ：单步执行程序，但是遇到函数会进入函数；

until：当你厌倦了在一个循环体内单步跟踪时，这个命令可以运行程序直到退出循环体；

until+行号： 运行至某行，不仅仅用来跳出循环；

finish： 运行程序，直到当前函数完成返回，并打印函数返回时的堆栈地址和返回值及参数值等信息；

list ：简记为 l ，其作用就是列出程序的源代码，默认每次显示10行。

list 行号：将显示当前文件以“行号”为中心的前后10行代码，如：list 12

list 函数名：将显示“函数名”所在函数的源代码，如：list main

list ：不带参数，将接着上一次 list 命令的，输出下边的内容。

call 函数(参数)：调用程序中可见的函数，并传递“参数”，如：call gdb_test(55)；

quit：简记为 q ，退出gdb；

layout：用于分割窗口，可以一边查看代码，一边测试：

layout src：显示源代码窗口

layout asm：显示反汇编窗口

layout regs：显示源代码/反汇编和CPU寄存器窗口

layout split：显示源代码和反汇编窗口

Ctrl + L：刷新窗口
```

# cgdb日常使用
二、cgdb使用流程

1、启动cgdb

2、查看源码

3、运行程序

4、设置断点

5、单步执行

6、查看变量

7、退出cgdb

三、cgdb基本使用命令

1、运行命令

2、设置断点

3、查看源码

4、打印表达式

5、查看运行信息

6、分割窗口

7、cgdb强大工具

# 安装cgdb
```bash
sudo apt-get install cgdb
```

# 使用cgdb

## 编写C语言程序
首先我们编写一个C语言程序
```c
  1 #include <stdio.h>
  2 void fun()
  3 {
  4         int b = 3;
  5         for(b = 3;b>0;b--)
  6         {
  7                 printf("i'm fun\n");
  8         }
  9 }
 10
 11 int main()
 12 {
 13         int a = 5;
 14         for(a = 5;a>0;a--)
 15         {
 16                 printf("*********\n");
 17         }
 18         printf("hello world\n");
 19         fun();
 20         return 0;
 21 }
 22
 ```

然后编译程序
`gcc main.c -g -o main`

## 启动cgdb

```bash
cgdb main
```

![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_1584461eb015f.png)


## 使用cgdb

### 查看源代码
回车就能看到源程序
![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_297600dd915e0.png)

gdb中使用`l`查看源代码(当然了，这个也支持)
![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_03f55c8ed55e7.png)

```
list ：简记为 l ，其作用就是列出程序的源代码，默认每次显示10行。

list 行号：将显示当前文件以“行号”为中心的前后10行代码，如：list 12

list 函数名：将显示“函数名”所在函数的源代码，如：list main

list ：不带参数，将接着上一次 list 命令的，输出下边的内容。
```
### 打断点
![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_5d8fa3da08ec9.png)
```
设置断点

break n （简写b n）:在第n行处设置断点

（可以带上代码路径和代码名称： b OAGUPDATE.cpp:578）

b fn1 if a＞b：条件断点设置

break func（break缩写为b）：在函数func()的入口处设置断点，如：break cb_button

delete 断点号n：删除第n个断点

disable 断点号n：暂停第n个断点

enable 断点号n：开启第n个断点

clear 行号n：清除第n行的断点

info b （info breakpoints） ：显示当前程序的断点设置情况

delete breakpoints：清除所有断点：
```

```bash
b 行数
```
![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_4eddac6d14283.png)

### 开始调试(运行程序)

```bash
r
```

![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_a1874fdf73f41.png)

能看到箭头已经指向正在执行的代码行了

### 下一步

```bash
n
```
![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_46e0a62fd5f9e.png)

> 这里注意一点，当你按下n以后，直接继续回车还是相当于输入n回车

### 进入函数
```bash
s
```
![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_595662c1f0e49.png)


### 输出变量值
```bash
p 变量名
```
![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_09265bd77f89e.png)

```bash
display 变量名
```
![image](https://pic.ziyuan.wang/user/meowrain/2023/12/image_73405d089a264.png)

### 查看变量类型
```bash
whatis 变量名
```



---


### 查看运行信息

```

where/bt ：当前运行的堆栈列表；

bt backtrace 显示当前调用堆栈

up/down 改变堆栈显示的深度

set args 参数:指定运行时的参数

show args：查看设置好的参数

info program： 来查看程序的是否在运行，进程号，被暂停的原因。
```