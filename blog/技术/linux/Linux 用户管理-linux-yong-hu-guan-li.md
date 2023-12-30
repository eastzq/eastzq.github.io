# 用户管理
## 添加用户
### 基本语法
useradd 用户名
useradd -d 目录 用户名 -可指定用户目录
## 修改用户密码
passwd 用户名

## 删除用户
userdel 用户名  ---》删除用户
userdel -r 用户名 ----》删除用户以及其家目录

## 查询用户信息
id 用户名
![image-1656298922716](/upload/2022/06/image-1656298922716.png)
who am i
![image-1656298948328](/upload/2022/06/image-1656298948328.png)

## 用户组
## 新增组
groupadd 组名
## 删除组
groupdel 组名 
## 增加用户时直接加入用户组
useradd -g 用户组 用户名
## 修改用户的组
usermod -g 用户组 用户名