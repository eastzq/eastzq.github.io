var issuesList;
var issuesHTML;
var gh = {
    issuesList: "https://api.github.com/repos/eastzq/eastzq.github.io/issues",
    issuesHTML: "https://github.com/eastzq/eastzq.github.io/issues",
    readmeURL: "https://raw.githubusercontent.com/eastzq/eastzq.github.io/master/blog/ABOUT/About Me.md",
    baseBlogUrl: "https://raw.githubusercontent.com/eastzq/eastzq.github.io/master/",
    treeUrl: "https://api.github.com/repos/eastzq/eastzq.github.io/git/trees/master?recursive=1",
    cache: {}
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
        Api.genBlogTree2(gh.treeUrl);
        var tid = Api.getUrlParams("tid");
        Api.renderAboutMe(tid);
        Api.bindEvent();
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
        var  rootNodes = treeObj.getNodes();
        for  (var  i = 0; i < rootNodes.length; i++) {  //设置节点展开
            treeObj.expandNode(rootNodes[i],  true,  false,  true);
        }
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
        var blogName = node.name;
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
        }
        if (gh.cache[blogUrl]) {
            renderMd(gh.cache[blogUrl]);
        } else {
            // set blog content
            $.ajax({
                dataType: "text",
                url: blogUrl,
                async: sync ? false : true,
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
            name: "博客介绍",
            type: "file"
        };
        if (tid) {
            var arr = tid.split("/");
            var fileName = arr[arr.length - 1];
            node.name = fileName;
            node.type = 'file';
            node.blogPath =
                "/" + tid.substring(0, tid.lastIndexOf("/") + 1);
            node.blogUrl = gh.baseBlogUrl + tid;
            M.renderBlogTxt(node, true);
        } else {
            M.renderBlogTxt(node);
        }
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