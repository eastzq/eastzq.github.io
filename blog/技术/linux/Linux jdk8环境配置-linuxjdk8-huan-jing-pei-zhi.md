在 `/etc/profile`文件下编辑
```bash
export JAVA_HOME=/usr/local/jdk1.8.0_181  #jdk安装目录
 
export JRE_HOME=${JAVA_HOME}/jre
 
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH
 
export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
 
export PATH=$PATH:${JAVA_PATH}
```

然后命令输入`java -version`
![](https://static.meowrain.cn/i/2023/01/07/ifkr64-3.png)