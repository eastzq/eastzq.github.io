# Linux 同步时间

> 今天发现我的小服务器时间不准了，想着怎么同步一下标准北京时间

## 一. `ntpdate` 同步网络时间

```bash
# 安装ntpdate
sudo apt-get install ntpdate   //debian系
sudo pacman -S ntpdate   // Arch系

# 执行时间同步
sudo ntpdate -u ntp.api.bz  //同步上海授时服务器

```

## 二.NTP服务器

阿里云NTP服务器

```plain
ntp1.aliyun.com
ntp2.aliyun.com
ntp3.aliyun.com
ntp4.aliyun.com
ntp5.aliyun.com
ntp6.aliyun.com
ntp7.aliyun.com
```

![image-20220805210608011](https://static.meowrain.cn/i/2022/08/05/ytzxgy-3.png)