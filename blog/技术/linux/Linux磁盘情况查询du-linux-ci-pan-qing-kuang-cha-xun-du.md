## Linux磁盘情况查询du

基本语法：

`du -h`

查询指定目录的磁盘占用情况，默认为当前目录

`-s` 指定目录占用大小汇总

`-h`带计量单位

`-a`含文件

`--max-depth=1` 子目录深度

`-c` 列出明细的同时，增加汇总值



案例1：查看我挂载的1T硬盘的占用情况

`du -hs /storage`

![image-20220815221300093](https://static.meowrain.cn/i/2022/08/15/10lban3-3.png)

案例2：查看我挂载的硬盘下文件夹的存储占用情况

`du -h  --max-depth=1 /storage`

![image-20220815221621035](https://static.meowrain.cn/i/2022/08/15/10ngpv1-3.png)