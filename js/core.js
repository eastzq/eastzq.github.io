var issuesList;
var issuesHTML;
var gh = {
    baseBlogUrl:
        "https://api.github.com/repos/eastzq/eastzq.github.io/contents/blog",
    issuesList: "https://api.github.com/repos/eastzq/eastzq.github.io/issues",
    issuesHTML: "https://github.com/eastzq/eastzq.github.io/issues",
    readmeURL:
        "https://raw.githubusercontent.com/eastzq/eastzq.github.io/master/About Me.md",
    treeUrl:
        "https://api.github.com/repos/eastzq/eastzq.github.io/git/trees/master?recursive=1"
};

var Api = (function() {
    var M = function() {};
    M.init = function() {
        $("#header").text("eastzq's Blog");
        $("#commentsList").removeAttr("data_comments_url");
        $("#tips").html(
            '我们不会获取您的用户名和密码,评论直接通过 HTTPS 与 Github API交互,<br>如果您开启了两步验证,请在博客的<a  target="_blank" href="' +
                issuesHTML +
                '">Github issues</a>下添加 Comment'
        );
        gh.blogTree = Api.genBlogTree2(gh.treeUrl);
        // api.blogTree = ghJson.blogTree;
        Api.renderBlogTree("#blogTree", gh.blogTree);
        Api.renderAboutMe();
    };

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
                        node.blogUrl =
                            "https://raw.githubusercontent.com/eastzq/eastzq.github.io/master/" +
                            path;
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
                        node.type = fileType;
                        node.blogPath =
                            "/" + path.substring(0, path.lastIndexOf("/") + 1);
                        node.blogUrl =
                            "https://raw.githubusercontent.com/eastzq/eastzq.github.io/master/" +
                            path;
                        var pArr = blogTree;
                        for(var j = 1;j<arr.length-1;j++){
                            var temp = arr[i];
                            var target = M.findObjInArrayByName(pArr,temp);
                            if(target){
                                pArr = target.children;
                            }else{
                                var pnode={
                                    name:temp,
                                    type:"dir",
                                    children:[]                           
                                 };
                                pArr.push(pnode);
                                pArr = pnode.children;
                            }
                        }
                        pArr.push(node);
                    }
                }
            }
        });
        return blogTree;
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
        $.fn.zTree.init($(blogTreeSelector), setting, data);
    };
    M.findObjInArrayByName = function(arr,name){
        for(var i =0;i<arr.length;i++){
            if(arr[i].name === name){
                return arr[i];
            }
        }
        return false;
    };
    M.renderBlogTxt = function(node) {
        // 隐藏Button，响应式布局用。
        if (!$("#btnNav").is(":hidden")) {
            $("#btnNav").click();
        }
        if (node.type !== "file") {
            return;
        }
        var blogUrl = node.blogUrl;
        var blogPath = node.blogPath;
        var blogName = node.name;
        $("#title").text(blogName);
        $("#article").html("loading . . .");

        // set blog content
        $.get(blogUrl, function(result) {
            $("#article").html("");
            //替换markdown里的图片的路径
            var patten = /\[([^\]])*?\.(jpg|gif|png)\]/gi;
            var md = result.replace(patten, function(match) {
                var picPath = match.substring(1, match.lastIndexOf("]"));
                if (picPath.startsWith("http") || picPath.startsWith("/")) {
                    return false;
                }
                var r = "[" + blogPath + picPath + "]";
                return r;
            });
            editormd.markdownToHTML("article", {
                markdown: md, //+ "\r\n" + $("#append-test").text(),
                // htmlDecode: true, // 开启 HTML 标签解析，为了安全性，默认不开启
                htmlDecode: "style,script,iframe", // you can filter tags decode
                // toc             : true,
                tocm: true, // Using [TOCM]
                //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
                //gfm             : false,
                //tocDropdown     : true,
                // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
                emoji: true,
                taskList: true,
                tex: true, // 默认不解析
                flowChart: true, // 默认不解析
                sequenceDiagram: true // 默认不解析
            });
        });
        //get comments_url
        // setCommentURL(issuesList, blogName);
    };
    M.renderAboutMe = function() {
        var node = {
            blogUrl:
                "https://raw.githubusercontent.com/eastzq/eastzq.github.io/master/blog/ABOUT/About Me.md",
            blogPath: "/blog/aboutme/",
            name: "作者介绍",
            type: "file"
        };
        M.renderBlogTxt(node);
    };
    return M;
})();
$(document).ready(function() {
    var main = Api.init();
    console.log(main);
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
