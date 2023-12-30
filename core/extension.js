// 获取当前域名，设置导航栏链接，设置页面标题
const domain = window.location.host;
const NavNameLink = document.getElementById('header');
NavNameLink.href = "https://" + domain;
const PageTitle = document.title;
const PostTitle = document.getElementById('title').innerText;
PageTitle = PostTitle;

