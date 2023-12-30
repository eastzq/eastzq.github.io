# 文件目录所有者

一般为文件的创建者，谁创建了该文件，就自然的成为该文件的所有者

# 查看文件的所有者

`ls -ahl`

应用实例：

![image-20220717112746077](https://static.meowrain.cn/i/2022/07/17/in98wu-3.png)



# 修改文件的所有者

指令：`chown` 用户名 文件名

应用实例： 使用root创建一个文件apple，然后把它的所有者改成meowrain

如下图，可以看到已经把文件所有者改为meowrain了

![image-20220717105503672](https://static.meowrain.cn/i/2022/07/17/hg50ps-3.png)



# 组的创建

基本指令： `groupadd 组名`

应用实例：

创建一个组，monster

创建一个用户fox，并放入到monster组中

![image-20220717105948626](https://static.meowrain.cn/i/2022/07/17/hisdfl-3.png)

如上图



# 组的查看

1. `getent group`命令

   ![image-20220717113350886](https://static.meowrain.cn/i/2022/07/17/iqv0fs-3.png)

2. `cat /etc/group`命令![image-20220717113533419](https://static.meowrain.cn/i/2022/07/17/iry3v1-3.png)

---



当某个用户创建了一个文件后，这个文件的所在组就是该用户所在的组

# 修改文件所在的组

基本指令：`chgrp 组名 文件名`

应用实例：

使用root用户创建文件orange.txt，看看这个文件属于那个组，然后把这个文件所在组修改到fruit组

![image-20220717112437540](https://static.meowrain.cn/i/2022/07/17/ilfcab-3.png)





# 其它组

除文件的所有者和所在组的用户外，系统的其它用户都是文件的其它组

# 改变用户所在组

在添加用户时，可以指定将该用户添加到哪个组中，同样的用root的管理权限可以改变某个用户的所在组

改变用户所在组

1. `useradd -g 组名 用户名`

   案例： 把fox用户放到fruit组中

   ![image-20220717113732078](https://static.meowrain.cn/i/2022/07/17/it4m0n-3.png)

   

   

1. `usermod -d 目录名 用户名`改变该用户登录的初始目录

> 修改后的初始目录要是这个用户有操作权限的目录

# 期间踩坑

因为我用的是debian。然后呢我发现一个问题，那就是我切换到新建的用户以后。

终端一直显示的是这个

![image-20220717111329541](https://static.meowrain.cn/i/2022/07/17/ietrd3-3.png)

而不是

![image-20220717111354073](https://static.meowrain.cn/i/2022/07/17/ieyu6i-3.png)

下面来讲一下我的解决办法

1. 切换到root用户，然后`passwd fox`,修改它的密码

2. 然后`sudo vi /etc/passwd`，就可以看到新用户fox了

   ![image-20220717111533897](https://static.meowrain.cn/i/2022/07/17/ig1ghg-3.png)

3. 咱们把sh改成bash

   ![image-20220717111620479](https://static.meowrain.cn/i/2022/07/17/igk6ps-3.png)

   

4. 然后`:wq!`就保存了

5. 最后咱们直接`sudo su fox` ![image-20220717111728584](https://static.meowrain.cn/i/2022/07/17/ih7czb-3.png)

   就成功切换到bash了