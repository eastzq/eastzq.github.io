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

document.addEventListener('DOMContentLoaded',function(){
  const pdfLinks = document.querySelectorAll('.pdfLink');
  pdfLinks.forEach(function(link){
    link.addEventListener('click',function(event){
      event.preventDefault();
      const pdfPath = link.getAttribute('path');
      if(pdfPath){
        const host = window.location.host;
        const redirectUrl = `${host}/pdfReader.html?path=${pdfPath}`;
        window.location.href = redirectUrl;

      }else {
        console.log('未提供有效文件路径参数');
      }
    })
  })
})