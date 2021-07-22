$(function() {
    // 1. 切换注册 - 登录
    (function() {
        $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        });
        $('#link_login').on('click', function() {
            $('.reg-box').hide();
            $('.login-box').show();
        });

    })();

    // 2. 表单验证
    (function() {
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

    // 3. 监听注册表单的提交事件
    (function() {
        var layer = layui.layer;
        $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            var data = { username: $('#form_reg [name=user]').val(), password: $('#form_reg [name=psw]').val() };
            $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
                if (res.status != 0) {
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                return $('#link_login').click();
            });
        });
    })();

    // 4. 监听登录表单提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                console.log(res.token);
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token)
                location.href = './index.html';
            }
        });
    });

});