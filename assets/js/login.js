$(function() {
    (function() {
        // 1. 切换注册 - 登录
        $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        });
        $('#link_login').on('click', function() {
            $('.reg-box').hide();
            $('.login-box').show();
        });
    })();

    (function() {
        // 2. 表单验证
        var form = layui.form;
        form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                // 通过形参拿到确认密码框中的内容
                // 还需要拿到密码框的内容
                // 然后进行比较 如果不一样 则 return 一个提示消息
                var psw = $('.reg-box [name=psw]').val();
                if (psw !== value) {
                    return '两次密码不一致';
                }
            }
        });
    })();
});