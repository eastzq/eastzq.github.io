**这个博客系统基于TinyBlog做的的修改，适合做点笔记。** [TinyBlog的Github主页](https://github.com/YangHanqing/tinyblog)

### 博客介绍
1. 博客地址：https://eastzq.github.io/
2. 基于blog目录生成md文件树，支持搜索文章，非常适合平时做些笔记。特别是githubApi有访问频率限制的时候。
3. 图片默认是放在md文件所在的目录。加载的时候回主动替换图片url，平时编辑器查看也更方便。不依赖文件服务器。
4. 支持锚点定位和文章链接。
5. 使用editormd插件用于把md文档转换成html。并支持目录自动生成。
6. 使用gitalk集成评论功能。
7. 使用config.json作为全局配置，使用时只需修改关键参数。

### 配置说明
1. 配置文件config.json说明，开启评论功能需要配置[clientID][clientSecret][commentRepo]三项属性。详见gitalk文档 https://github.com/gitalk/gitalk/blob/master/readme-cn.md
   
    ```js
    {
        "username": "eastzq",//github用户名
        "homePage": "blog/ABOUT/About Me.md",//主页的md文档路径
        "isCommentOn":true,// 是否开启评论功能
        "clientID":"bd98ae7094366c0c7473", //客户端id
        "clientSecret":"238af78bbd953bd880d286ea5deef43f84c91638",//密钥
        "commentRepo":"blogComment" //评论所在仓库，需要新建。
    }
    ```

    
    
