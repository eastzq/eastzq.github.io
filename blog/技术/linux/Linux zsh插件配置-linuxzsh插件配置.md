

# Linux zsh插件配置
zsh-autosggestions
`git clone --depth=1 https://github.com/zsh-users/zsh-autosuggestions.git ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-autosuggestions`

zsh-syntax-highlighting
`git clone --depth=1 https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`

然后 vim .zshrc
在plugins括号里面添加上面的两个插件名字就行了