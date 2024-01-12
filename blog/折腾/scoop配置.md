# 安装scoop
```powershell
> Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
> irm get.scoop.sh | iex
```

# 更新软件库
```powershell
scoop bucket add extras
scoop bucket add versions

scoop update
```

# 配置scoop代理

> 国内网络环境原因，这样是最佳解决办法
```powershell
scoop config proxy 127.0.0.1:2080
```


# 安装常用环境/工具

java
`https://scoop.sh/#/apps?q=openjdk`

mingw-64(c/c++环境)
```powershell
scoop install main/mingw
```

go
```powershell
scoop install main/go
```

rust
```powershell
scoop install main/rustup-gnu
```

python
`https://scoop.sh/#/apps?q=python`
```powershell
scoop install main/python
```

git
```powershell
scoop install main/git
```

adb-tools(安卓开发必备)
```powershell
scoop install main/adb
```

nvm（推荐)
```powershell
scoop install main/nvm
```

nodejs
```powershell
scoop install main/nodejs-lts
```

maven
```powershell
scoop install main/maven
```


mysql
`https://scoop.sh/#/apps?q=mysql`

```powershell
scoop install extras/heidisql
scoop install main/mysql-lts
```

vscode
```powershell
scoop install extras/vscode
```

sublime
```powershell
scoop install extras/sublime-text
```

idea
```powershell
scoop install extras/idea-ultimate
```

pycharm
```powershell
scoop install extras/pycharm-professional
```

webstorm
```powershell
scoop install extras/webstorm
```


steam
```powershell
scoop install games/steam
```


chrome
```powershell
scoop install extras/googlechrome
```

firefox
```powershell
scoop install extras/firefox
```