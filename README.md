**这个博客系统基于TinyBlog做的的修改。这个版本更适合作为平时笔记使用！** [TinyBlog的Github主页](https://github.com/YangHanqing/tinyblog)

### 博客介绍
1. 博客地址：https://eastzq.github.io/
2. 基于blog目录生成md文件树，支持搜索文章，非常适合平时做些笔记。特别是githubApi有访问频率限制的时候。
3. 图片默认是放在md文件所在的目录。加载的时候回主动替换图片url，平时编辑器查看也更方便。不依赖文件服务器。
4. 支持锚点定位和文章链接。
5. 使用editormd插件用于把md文档转换成html。并支持目录自动生成。
6. 使用gitalk集成评论功能。

### 配置说明
1. 配置位于core/core.js里的全局对象，对象名称[gh]。
2. 修改使用用户等，以后会简化配置。
    ```js
    var gh = {
        username: "eastzq", //pages用户名
        baseBlogUrl: "https://api.github.com/repos/eastzq/eastzq.github.io/contents/",//博客内容地址
        readmeTid: "blog/ABOUT/About Me.md",//个人主页标识
        treeUrl: "https://api.github.com/repos/eastzq/eastzq.github.io/git/trees/master?recursive=1",//所有文件地址
        cache: {},//文件缓存
        clientID:"bd98ae7094366c0c7473",//gitalk专用 用户自定义授权app参数
        clientSecret:"238af78bbd953bd880d286ea5deef43f84c91638",//gitalk专用 用户自定义授权app参数
        commentRepo:"blogComment"//评论所在仓库
    };
    ```