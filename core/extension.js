// 获取当前URL
var currentUrl = window.location.href;

// 监听URL变化
window.addEventListener('popstate', function() {
  // 获取新URL
  var newUrl = window.location.href;

  // 如果新URL与当前URL不同
  if (currentUrl !== newUrl) {
    console.log("update page");
    // 刷新当前页面
    window.location.reload();
  }
});