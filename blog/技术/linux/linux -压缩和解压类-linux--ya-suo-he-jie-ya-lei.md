# gzip/gunzip指令
gzip用于压缩文件，gunzip用于解压
基本语法
gzip 文件(功能描述：压缩文件，只能把文件压缩为*.gz文件)
gunzip 文件.gz （功能描述：解压缩文件指令）

# zip/unzip指令
zip用于压缩文件夹，unzip用于解压，这个在项目打包发布中很有用

基本语法：
zip [选项]xxx.zip 将要压缩的内容 （功能描述：压缩文件或者文件夹的命令）
unzip [选项]xxxx.zip (功能描述：解压缩文件)

zip常用选项：
-r : 递归压缩，即压缩目录

unzip常用选项 
-d<目录>：指定解压后文件的存放目录

应用案例：
案例1： 将/home下的所闻文件进行压缩成myhome.zip
```shell
zip -r myhome.zip /home/*
```
案例2：将myhome.zip解压到/opt/tmp目录下
```shell
unzip -d /opt/tmp/ myhome.zip
```

# tar指令
tar指令是打包指令，最后打包的文件是`.tar.gz`的文件
基本语法：
tar [选项] xxx.tar.gz 打包的内容（功能描述：打包目录，压缩后的文件格式.tar.gz）
选项说明：
| 选项 | 功能               |
| ---- | ------------------ |
| -c   | 产生.tar打包文件   |
| -v   | 显示详情信息       |
| -f   | 指定压缩后的文件名 |
| -z   | 打包的同时压缩     |
| -x   | 解包.tar文件       |


应用实例： 
案例1： 压缩多个文件，将/home/pig.txt和/home/cat.txt压缩成pc.tar.gz
`tar -zcvf pc.tar.gz  cat.txt pig.txt`
![图片](/upload/2022/07/%E5%9B%BE%E7%89%87.png)
案例2： 将/home的文件夹压缩成myhome.tar.gz
`tar -zcvf myhome.tar.gz /home/`
![图片-1657111417142](/upload/2022/07/%E5%9B%BE%E7%89%87-1657111417142.png)
案例3： 将pc.tar.gz解压到当前目录
`tar -zxvf pc.tar.gz `
![图片-1657111477529](/upload/2022/07/%E5%9B%BE%E7%89%87-1657111477529.png)
案例 4： 把`myhome.tar.gz`解压到`/opt/tmp2`目录下
`tar -zxvf /myhome/myhome.tar.gz -C /opt/tmp2/`
**-C指定解压目录**

![图片-1657111720673](/upload/2022/07/%E5%9B%BE%E7%89%87-1657111720673.png)

