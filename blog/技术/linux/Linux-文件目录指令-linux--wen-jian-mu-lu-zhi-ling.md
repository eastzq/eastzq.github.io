# cd指令
https://www.runoob.com/linux/linux-comm-cd.html
http://www.51gjie.com/linux/1011.html
# pwd指令
查看当前所在目录

# mkdir 指令
**mkdir**用于创建目录
**mkdir -p** 创建多级目录
案例(创建多级目录)： 
```bash
mkdir -p /home/dog/cat
```

# rmdir 指令
rmdir 目录
删除空目录

# rm-rf 指令
删除非空目录

# touch指令
创建文件
案例：创建note.txt
指令： `touch note.txt`

# cp指令
复制文件
cp 文件 目录
cp -r 目录 目录 ---把目录和目录下的文件全部复制到另一个目录里
> 强制覆盖不提示的方法
> \cp -r /home/bbb/opt  
    
# rm指令
移除文件和目录
rm -rf 文件/目录
强制递归删除文件和目录

# mv指令
mv 移动文件与目录或者重命名
基本语法
mv oldNameFile newNameFile (功能描述：重命名)
mv /temp/movefile /targetFolder (功能描述：移动文件 )

案例：移动Public/1.txt文件到/Photos/下
用下面这条命令
```bash
cd /Public
mv 1.txt ../Photos/
```

重命名： 1.txt文件重命名为2.txt
```bash
mv 1.txt 2.txt
```

# cat指令
cat指令可以用于查看文本文件里的内容
cat -n 显示行号
cat -n 文件
例子：
![image-1656596495574](/upload/2022/06/image-1656596495574.png)

日常使用： 
cat -n 文件 |more ---可用于看更多行数的文件内容

# more指令
![image-1656596883627](/upload/2022/06/image-1656596883627.png)

# less指令
![image-1656597306514](/upload/2022/06/image-1656597306514.png)

# echo指令
echo指令用于输出内容到控制台
- 基本语法
  echo [选项] [输出内容]
- 应用案例
 使用echo输出环境变量，比如输出$PATH $HOSTNAME
 使用echo输出helloworld
 > echo "helloworld" > 1.txt
 > 把helloworld这个内容写入1.txt内
 >  `>` 重定向（覆盖） `>>`追加
 ![image-1656810813402](/upload/2022/07/image-1656810813402.png)
 # head指令
 head 文件   查看文件的前十行
 head -n 5 文件 查看文件的前五行
 
 # tail指令
 tail 文件 查看文件尾10行的内容
 tail -n 5 文件 查看文件尾5行的内容
 tail -f 查看文件实时变化 ---可以用来看程序运行日志
 
 # 软连接
 ln -s 源目录 软连接目录
 ![image-1656811733238](/upload/2022/07/image-1656811733238.png)
 
 我们平时经常会到自己的家目录去，我们可以在/目录下创建一个软链接，链接到我们自己的家目录中去
 删除软连接
 rm 软连接目录
 > 注意：最后不要带/，不然会提示是一个目录
 > 这样写就对了

# history
查看历史操作
![image-1656812381367](/upload/2022/07/image-1656812381367.png)

history 10 显示最近执行的10条指令
!10 表示要去执行第10条指令

 > ![image-1656812244892](/upload/2022/07/image-1656812244892.png)