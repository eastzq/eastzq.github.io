# crond任务调度

crontab 进行定时任务的设置

概述

任务调度：指系统在某个时间执行的特定的命令或者程序

任务调度分类：1.系统工作：某些重要的工作必须周而复始地执行，如病毒扫描

个别用户工作：个别用户可能希望执行某些程序，比如对mysql数据库的备份



## 基本语法：

> ```bash
> crontab [选项]
> ```
>
> 常用选项：
>
> |  -e  | **编辑crontab定时任务**           |
> | :--: | --------------------------------- |
> |  -r  | **删除当前用户所有的crontab任务** |
> |  -l  | **查询crontab任务**               |
>
> <img src="https://static.meowrain.cn/i/2022/07/20/nkofwo-3.png" alt="image-20220720142544546" style="zoom:50%;" />

快速入门：

设置任务调度文件：/etc/crontab

设置个人任务调度。执行crontab -e命令

接着输入任务到调度文件





![img](https://static.meowrain.cn/i/2022/07/20/nu49fa-3.png)

参数细节说明

![image-20220720143102211](https://static.meowrain.cn/i/2022/07/20/no00yp-3.png)

![image-20220720143656285](https://static.meowrain.cn/i/2022/07/20/nrarne-3.png)









![img](https://static.meowrain.cn/i/2022/07/20/p3hhq3-3.png)

![img](https://static.meowrain.cn/i/2022/07/20/p3iglp-3.png)