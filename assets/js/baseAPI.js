// 注意每次调用 $.get() 或 $.ajax $.post 时
// 先会调用 ajaxPrefilter 这个函数
$.ajaxPrefilter(function(option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    // console.log(option.url);
})