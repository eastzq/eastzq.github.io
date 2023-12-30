# shell变量

## shell变量介绍

linux shell中的变量分为：系统变量和用户自定义变量

系统变量：$HOME $PWD $SHELL $USER等等，比如echo $HOME等等

显示当前shell中所有变量：set



## shell变量的定义

基本语法

1. 定义变量：变量名=值
2. 撤销变量：unset 变量
3. 声明静态变量：randonly变量，注意：不能unset

## 快速入门

案例1：定义变量A

案例2：撤销变量A

案例3：声明静态的变量B=2，不能unset

案例4：可把变量提升为全局环境变量，可供其他shell程序