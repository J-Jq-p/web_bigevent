// 注意每次调用 $.get() 或 $.ajax $.post 时
// 先会调用 ajaxPrefilter 这个函数
$.ajaxPrefilter(function(option) {
    option.url = 'http://api-breakingnews-web.itheima.net/' + option.url;
    // console.log(option.url);


    // 统一为有权限的接口 设置 headers 请求头
    if (option.url.indexOf('my/') != -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };

    // 全局统一挂载 complete 回调函数
    option.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空 token 
            localStorage.removeItem('token');
            // 强制跳转登录页面
            location.href = './login.html';
        };
    };
});