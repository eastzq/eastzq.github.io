var issuesList;
var issuesHTML;
var gh = {
    username: "eastzq",
    issuesList: "https://api.github.com/repos/eastzq/eastzq.github.io/issues",
    issuesHTML: "https://github.com/eastzq/eastzq.github.io/issues",
    readmeURL: "https://api.github.com/repos/eastzq/eastzq.github.io/contents/blog/ABOUT/About Me.md",
    baseBlogUrl: "https://api.github.com/repos/eastzq/eastzq.github.io/contents/",
    treeUrl: "https://api.github.com/repos/eastzq/eastzq.github.io/git/trees/master?recursive=1",
    cache: {}
};

var Api = (function() {
    var M = function() {};
    M.init = function() {
        $("#header").text(gh.username + "'s blog");
        $("#commentsList").removeAttr("data_comments_url");
        $("#tips").html(
            '我们不会获取您的用户名和密码,评论直接通过 HTTPS 与 Github API交互,<br>如果您开启了两步验证,请在博客的<a  target="_blank" href="' +
            issuesHTML +
            '">Github issues</a>下添加 Comment'
        );
        Api.genBlogTree2(gh.treeUrl);
        var tid = Api.getUrlParams("tid");
        Api.renderAboutMe(tid);
        Api.bindEvent();
        $("#article").css("min-height", window.innerHeight - 150 + "px");
        if (location.hash) { M.anchorHandle(location.hash) }
    };

    /* 解决锚点定位不准确的问题 */
    M.anchorHandle = function(hash) {
        var target = decodeURIComponent(hash);
        var temp = target.substring(1);
        var $t = $("a[name='" + temp + "']");
        if ($t.length === 0) return;
        var targetOffset = $t.offset().top - 60;
        $('html,body').animate({ scrollTop: targetOffset }, 200);
    }

    M.bindEvent = function() {
        $('#md_toc_container').on('click', 'a', function() {
            M.anchorHandle(this.hash)
        });
        $('#btnNav2').on('click', function() {
            $(".sidebar").toggle(200);
        });
        $('#btnNav1').on('click', function() {
            $(".md-toc-container").toggle(200);
        });
        //绑定搜索事件
        $("#clearKeyword").on("click", function() {
            $("#key-word").val("");
            $("#key-word").trigger("input");
        })
        $(document).on("keydown", function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                e.preventDefault();
                $("#key-word").focus();
            }
        });

    }
    M.getUrlParams = function(variable) {
        var search = window.location.search;
        var query;
        if (search.indexOf("#") === -1) {
            query = search.substring(1);
        } else {
            query = search.substring(1, search.lastIndexOf("#"));
        }
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return false;
    }

    //递归生成博客树 效率低，但是目前文件较少，以后可以改成懒加载。
    // github api有限制访问频率，所以递归容易产生太多请求，不合适。
    M.genBlogTree = function(contentUrl) {
        var blogTree = [];
        $.ajax({
            dataType: "json",
            url: contentUrl,
            async: false,
            success: function(json) {
                for (var i = 0; i < json.length; i++) {
                    var node = {
                        name: ""
                    };
                    var obj = json[i];
                    console.log(obj);
                    var fileName = obj.name;
                    var fileType = obj.type;
                    if (fileType === "file" && Api.isMarkdown(fileName)) {
                        node.origin = obj;
                        node.name = obj.name;
                        node.type = fileType;
                        node.blogPath =
                            "/" +
                            obj.path.substring(
                                0,
                                obj.path.lastIndexOf("/") + 1
                            );
                        node.blogUrl = gh.baseBlogUrl + path;
                        blogTree.push(node);
                    } else if (fileType === "dir") {
                        node.origin = obj;
                        node.name = obj.name;
                        node.type = fileType;
                        node.children = M.genBlogTree(obj.url);
                        blogTree.push(node);
                    }
                }
            }
        });
        return blogTree;
    };

    //使用另外一个api来生成文件树。
    M.genBlogTree2 = function(treeUrl) {
        var blogTree = [];
        $.ajax({
            dataType: "json",
            url: treeUrl,
            async: true,
            success: function(json) {
                for (var i = 0; i < json.tree.length; i++) {
                    var node = {
                        name: ""
                    };
                    var obj = json.tree[i];
                    var path = obj.path;
                    var arr = path.split("/");
                    if (arr[0] !== "blog") {
                        continue;
                    }
                    var fileName = arr[arr.length - 1];
                    var fileType;
                    if (obj.type === "blob") {
                        fileType = "file";
                    } else {
                        fileType = "dir";
                    }
                    if (fileType === "file" && Api.isMarkdown(fileName)) {
                        node.origin = obj;
                        node.name = fileName;
                        node.fileName = fileName;
                        node.type = fileType;
                        node.tid = path;
                        node.blogPath =
                            "/" + path.substring(0, path.lastIndexOf("/") + 1);
                        node.blogUrl = gh.baseBlogUrl + path;
                        var pArr = blogTree;
                        for (var j = 0; j < arr.length - 1; j++) {
                            var temp = arr[j];
                            var target = M.findObjInArrayByName(pArr, temp);
                            if (target) {
                                pArr = target.children;
                            } else {
                                var pnode = {
                                    name: temp,
                                    type: "dir",
                                    children: []
                                };
                                pArr.push(pnode);
                                pArr = pnode.children;
                            }
                        }
                        pArr.push(node);
                    }
                }
                gh.blogTree = blogTree;
                // api.blogTree = ghJson.blogTree;
                M.renderBlogTree("#blogTree", gh.blogTree);

            }
        });
    };

    M.isMarkdown = function(fileName) {
        var index = fileName.lastIndexOf(".");
        //获取后缀
        var ext = fileName.substr(index + 1).toLowerCase();
        //输出结果
        return ext === "md" || ext === "markdown";
    };

    M.renderBlogTree = function(blogTreeSelector, data) {
        var onClick = function(event, treeId, treeNode) {
            M.renderBlogTxt(treeNode);
        };
        var setting = {
            callback: {
                onClick: onClick
            }
        };
        var  treeObj = $.fn.zTree.init($(blogTreeSelector), setting, data);
        var nodes = treeObj.getNodes();
        for (var i = 0; i < nodes.length; i++) { //设置节点展开
            treeObj.expandNode(nodes[i], true, false, true);
        }
        M.fuzzySearch('blogTree', '#key-word', null, false);
    };
    M.findObjInArrayByName = function(arr, name) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === name) {
                return arr[i];
            }
        }
        return false;
    };
    M.renderBlogTxt = function(node, sync) {
        // 隐藏Button，响应式布局用。
        if (!$("#btnNav").is(":hidden")) {
            $("#btnNav").click();
        }
        if (node.type !== "file") {
            return;
        }
        var blogUrl = node.blogUrl;
        var blogPath = node.blogPath;
        var blogName = node.fileName;
        var tid = node.tid;
        $("#title").text(blogName);
        $("#article").html("loading . . .");

        var renderMd = function(md) {
            $("#article").html("");
            editormd.markdownToHTML("article", {
                markdown: md, //+ "\r\n" + $("#append-test").text(),
                // htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
                htmlDecode: "style,script,iframe", // you can filter tags decode
                tocContainer: "#md_toc_container", // 自定义 ToC 容器层
                emoji: true,
                taskList: true,
                tex: true, // 默认不解析
                flowChart: true, // 默认不解析
                sequenceDiagram: true // 默认不解析
            });
            $("title").html(tid);
            renderBlogCommnet();
        }
        var renderBlogCommnet = function(){
            var hash = md5(tid);
            var gitalk = new Gitalk({
                clientID: 'bd98ae7094366c0c7473',
                clientSecret: '238af78bbd953bd880d286ea5deef43f84c91638',
                repo: 'blogComment',
                owner: 'eastzq',
                admin: ['eastzq'],
                labels:[],
                id:hash,      // Ensure uniqueness and length less than 50
                distractionFreeMode: false  // Facebook-like distraction free mode
              })
              gitalk.render('comments');
        }


        if (gh.cache[blogUrl]) {
            renderMd(gh.cache[blogUrl]);
        } else {
            // set blog content
            $.ajax({
                dataType: "text",
                url: blogUrl,
                async: sync ? false : true,
                headers: {
                    'Accept': 'application/vnd.github.VERSION.raw'
                },
                success: function(result) {
                    //替换markdown里的图片的路径
                    var patten = /\(([^\)])*?\.(jpg|gif|png)\)/gi;
                    var md = result.replace(patten, function(match) {
                        var picPath = match.substring(1, match.lastIndexOf(")"));
                        if (picPath.startsWith("http") || picPath.startsWith("/")) {
                            return false;
                        }
                        var r = "(" + blogPath + picPath + ")";
                        return r;
                    });
                    renderMd(md);
                    if (tid) {
                        var stateObject = {};
                        history.pushState(stateObject, '', '?tid=' + encodeURIComponent(tid));
                    }
                    gh.cache[blogUrl] = md;
                }
            });
        }

        //get comments_url
        // setCommentURL(issuesList, blogName);
    };
    M.renderAboutMe = function(tid) {
        var node = {
            blogUrl: gh.readmeURL,
            blogPath: "/blog/aboutme/",
            type: "file",
            fileName: "个人介绍"
        };
        if (tid) {
            var arr = tid.split("/");
            var fileName = arr[arr.length - 1];
            node.name = fileName;
            node.fileName = fileName;
            node.type = 'file';
            node.blogPath =
                "/" + tid.substring(0, tid.lastIndexOf("/") + 1);
            node.blogUrl = gh.baseBlogUrl + tid;
            M.renderBlogTxt(node, true);
        } else {
            M.renderBlogTxt(node);
        }
    };


    /**
     * ztree 模糊搜索
     * @param zTreeId ztree对象的id,不需要#
     * @param searchField 输入框选择器
     * @param isHighLight 是否高亮,默认高亮,传入false禁用
     * @param isExpand 是否展开,默认合拢,传入true展开
     * @returns
     */
    M.fuzzySearch = function(zTreeId, searchField, isHighLight, isExpand) {
        var zTreeObj = $.fn.zTree.getZTreeObj(zTreeId); //获取树对象
        if (!zTreeObj) {
            alter("获取树对象失败");
        }
        var nameKey = zTreeObj.setting.data.key.name; //获取name属性的key
        isHighLight = isHighLight === false ? false : true; //除直接输入false的情况外,都默认为高亮
        isExpand = isExpand ? true : false;
        zTreeObj.setting.view.nameIsHTML = isHighLight; //允许在节点名称中使用html,用于处理高亮

        var metaChar = '[\\[\\]\\\\\^\\$\\.\\|\\?\\*\\+\\(\\)]'; //js正则表达式元字符集
        var rexMeta = new RegExp(metaChar, 'gi'); //匹配元字符的正则表达式

        // 过滤ztree显示数据
        function ztreeFilter(zTreeObj, _keywords, callBackFunc) {
            if (!_keywords) {
                _keywords = ''; //如果为空，赋值空字符串
            }
            // 查找符合条件的叶子节点
            function filterFunc(node) {
                if (node && node.oldname && node.oldname.length > 0) {
                    node[nameKey] = node.oldname; //如果存在原始名称则恢复原始名称
                }
                zTreeObj.updateNode(node); //更新节点让之前对节点所做的修改生效
                if (_keywords.length == 0) {
                    //如果关键字为空,返回true,表示每个节点都显示
                    zTreeObj.showNode(node);
                    return true;
                }
                //节点名称和关键字都用toLowerCase()做小写处理
                if (node[nameKey] && node[nameKey].toLowerCase().indexOf(_keywords.toLowerCase()) != -1) {
                    if (isHighLight) { //如果高亮，对文字进行高亮处理
                        //创建一个新变量newKeywords,不影响_keywords在下一个节点使用
                        //对_keywords中的元字符进行处理,否则无法在replace中使用RegExp
                        var newKeywords = _keywords.replace(rexMeta, function(matchStr) {
                            //对元字符做转义处理
                            return '\\' + matchStr;
                        });
                        node.oldname = node[nameKey]; //缓存原有名称用于恢复
                        //为处理过元字符的_keywords创建正则表达式,全局且不分大小写
                        var rexGlobal = new RegExp(newKeywords, 'gi'); //'g'代表全局匹配,'i'代表不区分大小写
                        //无法直接使用replace(/substr/g,replacement)方法,所以使用RegExp
                        node[nameKey] = node.oldname.replace(rexGlobal, function(originalText) {
                            //将所有匹配的子串加上高亮效果
                            var highLightText =
                                '<span style="color: whitesmoke;background-color: #3399ea;">' +
                                originalText +
                                '</span>';
                            return highLightText;
                        });
                        //================================================//
                        //node.highlight用于高亮整个节点
                        //配合setHighlight方法和setting中view属性的fontCss
                        //因为有了关键字高亮处理,所以不再进行相关设置
                        //node.highlight = true; 
                        //================================================//
                        zTreeObj.updateNode(node); //update让更名和高亮生效
                    }
                    zTreeObj.showNode(node); //显示符合条件的节点
                    return true; //带有关键字的节点不隐藏
                }

                zTreeObj.hideNode(node); // 隐藏不符合要求的节点
                return false; //不符合返回false
            }
            var nodesShow = zTreeObj.getNodesByFilter(filterFunc); //获取匹配关键字的节点
            processShowNodes(nodesShow, _keywords); //对获取的节点进行二次处理
        }


        var showChildrenRecursive = function(zTreeObj, node) {
            for (var i = 0; i < node.children.length; i++) {
                var child = node.children[i];
                zTreeObj.showNode(child);
                if (child.type == "dir") {
                    showChildrenRecursive(zTreeObj, child);
                }
            }
        };
        /**
         * 对符合条件的节点做二次处理
         */
        function processShowNodes(nodesShow, _keywords) {
            if (nodesShow && nodesShow.length > 0) {
                //关键字不为空时对关键字节点的祖先节点进行二次处理
                if (_keywords.length > 0) {
                    $.each(nodesShow, function(n, obj) {
                        var pathOfOne = obj.getPath(); //向上追溯,获取节点的所有祖先节点(包括自己)
                        if (pathOfOne && pathOfOne.length > 0) { //对path中的每个节点进行操作
                            // i < pathOfOne.length-1, 对节点本身不再操作
                            for (var i = 0; i < pathOfOne.length - 1; i++) {
                                zTreeObj.showNode(pathOfOne[i]); //显示节点
                                zTreeObj.expandNode(pathOfOne[i], true); //展开节点
                            }
                        }
                        if (obj.type == "dir") {
                            showChildrenRecursive(zTreeObj, obj);
                            zTreeObj.expandNode(obj, true, false, true);
                        }
                    });
                } else { //关键字为空则显示所有节点, 此时展开根节点
                    var nodes = zTreeObj.getNodes();
                    for (var i = 0; i < nodes.length; i++) { //设置节点展开
                        zTreeObj.expandNode(nodes[i], true, false, true);
                    }
                }
            }
        }

        //监听关键字input输入框文字变化事件
        $(searchField).on('input propertychange', function() {
            var _keywords = $(this).val().trim();
            searchNodeLazy(_keywords); //调用延时处理
        });

        var timeoutId = null;
        // 有输入后定时执行一次，如果上次的输入还没有被执行，那么就取消上一次的执行
        function searchNodeLazy(_keywords) {
            if (timeoutId) { //如果不为空,结束任务
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(function() {
                ztreeFilter(zTreeObj, _keywords); //延时执行筛选方法
                $(searchField).focus(); //输入框重新获取焦点
            }, 500);
        }
    }
    return M;
})();


$(document).ready(function() {
    var main = Api.init();
});

function setCommentURL(issuesList, blogName) {
    $("#comments").show();
    console.log("获取并设置评论区");

    $.ajax({
        type: "GET",
        url: issuesList,
        dataType: "json",
        async: false,
        success: function(json) {
            for (var i = 0; i < json.length; i++) {
                var title = json[i].title; // Blog title
                var comments_url = json[i].comments_url;
                if (title == blogName) {
                    console.log("该文章存在评论");
                    $("#commentsList").attr("data_comments_url", comments_url);
                    setComment(comments_url);
                    break;
                }
                $("#commentsList")
                    .children()
                    .remove();
                $("#commentsList").removeAttr("data_comments_url");
            }
        }
    });
}

function setComment(commentURL) {
    $("#commentsList")
        .children()
        .remove();

    $.getJSON(commentURL, function(json) {
        for (var i = 0; i < json.length; i++) {
            var avatar_url = json[i].user.avatar_url; // avatar_url
            var user = json[i].user.login;
            //var updated_at = json[i].updated_at;
            var updated_at = new Date(json[i].updated_at).toLocaleString();
            var body = json[i].body;

            // add blog list elements
            var commentHtml =
                '<li class="comment">' +
                '<a class="pull-left" href="#"><img class="avatar" src="' +
                avatar_url +
                '" alt="avatar"></a><div class="comment-body"><div class="comment-heading"><h4 class="user">' +
                user +
                '</h4><h5 class="time">' +
                updated_at +
                "</h5></div><p>" +
                body +
                "</p></div></li>";

            var new_obj = $(commentHtml);
            $("#commentsList").append(new_obj);
        }
    });
}

function login() {
    $("#myModal").modal();
}

function subComment() {
    var USERNAME = $("#txt_username").val();
    var PASSWORD = document.getElementById("txt_password").value; //
    var title = null;
    title = $("#title").text();
    // 未开启评论
    if (typeof $("#commentsList").attr("data_comments_url") == "undefined") {
        if (title == undefined || title == null || title == "") {
            return;
        }

        var createIssueJson = '{"title": "' + title + '"}';
        console.log(createIssueJson);
        $.ajax({
            type: "POST",
            url: issuesList,
            dataType: "json",
            async: false,
            headers: {
                Authorization: "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
            data: createIssueJson,
            success: function() {
                console.log("开启评论成功:" + title);
                //重新遍历issue list
                setCommentURL(issuesList, title);
                console.log("重新遍历 issuesList 完成");
            }
        });
    }
    console.log("准备提交评论");
    // 已开启评论
    if (typeof $("#commentsList").attr("data_comments_url") != "undefined") {
        var issueURL = $("#commentsList").attr("data_comments_url");
        var comment = $("#comment_txt").val();
        var commentJson = '{"body": "' + comment + '"}';
        console.log(comment);
        if (comment == "") {
            alert("评论不能为空");
            return;
        }

        $.ajax({
            type: "POST",
            url: issueURL,
            dataType: "json",
            async: false,
            headers: {
                Authorization: "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
            data: commentJson,
            success: function() {
                console.log("评论成功");

                // 更新评论区
                if (title != null) {
                    setCommentURL(issuesList, title);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("账号密码错误,或者开启了两步验证");
            }
        });
    } else {
        console.log("未开启评论");
    }
}

function getTitleString() {
    var reg = new RegExp("(^|&)" + "title" + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}