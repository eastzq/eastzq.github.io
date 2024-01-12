**这个博客系统基于TinyBlog做的的修改，适合做点笔记。** [TinyBlog的Github主页](https://github.com/YangHanqing/tinyblog)

> 由https://github.com/eastzq/eastzq.github.io 修改而来

## 安装使用

直接fork本仓库，然后git clone到你的本地，再把blog下面其他的文件夹删掉，留一个ABOUT文件夹就行了，其他删掉可以自己重新建。

直接写好markdown就行，什么也不用管，直接windows下执行`./gitsync.bat`,linux下执行`./gitsync.sh`

然后在你fork的仓库的settings里面开启git pages就行（不懂自己去google或者bing搜一下）

## 博客介绍
1. 博客地址：https://meowrain.github.io
2. 基于blog目录生成md文件树，支持搜索文章，非常适合平时做些笔记。特别是githubApi有访问频率限制的时候。
3. 图片默认是放在md文件所在的目录。加载的时候回主动替换图片url，平时编辑器查看也更方便。不依赖文件服务器。 + 支持其他图床(原来只支持用github的图片)
4. 支持锚点定位和文章链接。
5. 使用editormd插件用于把md文档转换成html。并支持目录自动生成。
6. 使用gitalk集成评论功能。+ 新增utteranc.es作为评论系统
7. 使用config.json作为全局配置，使用时只需修改关键参数。
8. 新增pdf阅读器功能，需要把你的pdf文件放在根目录的pdf目录下面。只需要写markdown的时候`<a path="./pdf/pdf文件名" class="pdfLink">pdf文件名</a>`写成这样就行了，然后执行完上传脚本后会进行上传，打开渲染后就能打开了
9. 使用较新的jquery和最新的bootstrap css。调整主题为黑色(护眼)

## 配置说明
1. 配置文件config.json说明，开启评论功能需要配置[clientID][clientSecret][commentRepo]三项属性。详见gitalk文档 https://github.com/gitalk/gitalk/blob/master/readme-cn.md
   
    ```js
    {
        "username": "eastzq",//github用户名
        "homePage": "blog/ABOUT/About Me.md",//主页的md文档路径
        "isCommentOn":false,// 是否开启评论功能
        "clientID":"bd98ae7094366c0c7473", //客户端id
        "clientSecret":"238af78bbd953bd880d286ea5deef43f84c91638",//密钥
        "commentRepo":"blogComment" //评论所在仓库，需要新建。 如果你不用这个gittalk就不用管这个
    }
    ```

    
    
