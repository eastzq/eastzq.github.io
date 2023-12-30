https://www.cnblogs.com/EasonJim/p/9826681.html

说明：为什么说是http代理，其实这个还不能说是全称走代理，罪名写的区别就是ICMP协议这个设置就无效，只能说是90%的应用都可以使用这个设置来实现代理访问，只有个别不行，比如一些软件根本不走http协议的，那么此种方法绝对不行；下面是讲解http的代理配置，以后会讲解全局级别的代理实现，其实也就是网关，配置网关绝对能100%，这里不做讲解。全局代理配置主要在于环境变量的设置。

还有网上很多都说http配置代理不支持socks协议，其实是不对的。我测试的结果已经支持了。

个人理解：我谈一下这个http_proxy的设置，首先，设置了这个变量不是说只会走http协议，上面我说的应该是普通认为会这样说的说法，我后面觉得上面已经是错误了，比如curl，git这些软件默认使用http_proxy这个环境变量来设置代理服务器，所以在linux下只要设置了这个环境变量就能被这些软件识别，而对于代理服务器用什么协议都行，比如使用http协议或者socks协议等。

那么对于一些比如chrome和yum这些针对http_proxy可能不会生效，比如chrome用的是server_proxy这个变量，而且是在启动时设置才生效。

![](https://static.meowrain.cn/i/2023/02/14/zmlz9p-3.png)

针对上面变量的设置方法：
```bash
1、在/etc/profile文件

2、在~/.bashrc

3、在~/.zshrc

4、在/etc/profile.d/文件夹下新建一个文件xxx.sh
```
写入如下配置：
```bash
export proxy="http://192.168.5.14:8118"
export http_proxy=$proxy
export https_proxy=$proxy
export ftp_proxy=$proxy
export no_proxy="localhost, 127.0.0.1, ::1"
```
而对于要取消设置可以使用如下命令，其实也就是取消环境变量的设置：
```bash
unset http_proxy
unset https_proxy
unset ftp_proxy
unset no_proxy
```