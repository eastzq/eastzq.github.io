昨天刚装好系统，发现鼠标光标太tm小了， 找都找不到

先执行
```
sudo pacman -Ss dconf
```
![image](https://meowrain.cn/upload/2023/07/image.png)

可以看到`extra/dconf`，要安装这个
```
sudo pacman -Sy dconf
```

最后执行
```
dconf write /org/gnome/desktop/interface/cursor-size 48
```

再晃一下鼠标，就能发现指针变大了



