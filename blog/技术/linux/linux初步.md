## systemctl命令

```shell
#查看防火墙状态
systemctl status firewalld.service
#关闭防火墙命令
systemctl stop firewalld.service
#开启防火墙
systemctl start firewalld.service
#关闭开机自启动
systemctl disable firewalld.service
#开启开机启动
systemctl enable firewalld.service
```