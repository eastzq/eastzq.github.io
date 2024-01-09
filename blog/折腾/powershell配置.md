# 查看所有环境变量
```powershell
Get-ChildItem Env:
```

> 这里我们还可以把命令结果用>保存为文件

例如
```powershell
Get-ChildItem Env: > env_variables.txt
```

---

# 查看Path 系统变量内容

```powershell
$Env:PATH
```


# 设置会话代理
> https://learn.microsoft.com/en-us/powershell/azure/az-powershell-proxy?view=azps-11.1.0

```powershell
$env:HTTP_PROXY = "http://proxy.example.com:port"
$env:HTTPS_PROXY = "http://proxy.example.com:port"
```

> 这个环境变量会在会话被关闭后失效

其实大家用的最多的就是这个了估计，因为经常要从github或者google上下载东西，还有一些软件也会因为没有代理无法拉取内容

看这个就可以了
[添加配置内容](#添加配置内容)

# 设置别名
```
Set-Alias -Name he -Value helix
```
比如我安装了一个helix编辑器，因为名字太长，所以我想用he打开它，就直接在终端加上这个就可以了


---


# Powershell配置指南
> https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.4
> windows下直接输入`cd`命令会返回家目录，windows的家目录在哪儿呢？
> `C:\Users\UserName`
> 就是这样的

可以看看官方文档，`C:\Users\meowrain\Documents\Powershell`

## 创建配置文件

```powershell
New-Item -Path "C:\Users\UserName\Documents\Powershell\Profile.ps1" -ItemType File
```

然后我们安装过vscode以后。就可以
```powershell
code C:\Users\UserName\Documents\Powershell\Profile.ps1
```
进行编辑了

## 添加配置内容

```powershell
function set_proxy_variable {
	$proxy = 'http://127.0.0.1:2080'

    # temporary
    $env:HTTP_PROXY = $proxy
    $env:HTTPS_PROXY = $proxy

    # forever
    # [System.Environment]::SetEnvironmentVariable("HTTP_PROXY", $proxy, "User")
    # [System.Environment]::SetEnvironmentVariable("HTTPS_PROXY", $proxy, "User")
    
    Write-Host "`n   OPEN powershell proxy channel!`n"
}

function unset_proxy_variable {
    # temporary
    Remove-Item env:HTTP_PROXY
    Remove-Item env:HTTPS_PROXY

    # forever
    # [Environment]::SetEnvironmentVariable('http_proxy', $null, 'User')
    # [Environment]::SetEnvironmentVariable('https_proxy', $null, 'User')

    Write-Host "`n   CLOSE powershell proxy channel!`n"
}

Set-Alias proxy set_proxy_variable
Set-Alias unproxy unset_proxy_variable
```

![微信截图_20231212123640](https://static.meowrain.cn/i/2023/12/12/kgmtb7.webp)