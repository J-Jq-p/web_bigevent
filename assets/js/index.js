$(function() {
    getUserInfo();
    var layer = layui.layer;

    // 点击按钮退出
    $('#btn_ogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 1. 清空本地存储中的token
            localStorage.removeItem('token');
            location.href = './login.html';

            // 关闭 confirm 询问框
            layer.close(index);
        });
    });
});

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: 'my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！');
            };
            renderAvatar(res.data);
        },
        // 不论成功还是失败 最终都会调用 complete 这个函数
        // complete: function(res) {
        //     console.log(res);
        //     // 在complete 回调函数中  可用使用 res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        //         // 1. 强制清空 token 
        //         localStorage.removeItem('token');
        //         // 2. 强制跳转登录页面
        //         location.href = './login.html';
        //     };
        // }
    });
};
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;' + name);
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.txt-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.txt-avatar').html(first).show();
    }
};