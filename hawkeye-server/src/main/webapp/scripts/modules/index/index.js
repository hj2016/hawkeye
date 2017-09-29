define(function (require, exports, module) {
    $(".safe-exit").on("click", function () {
        if (confirm("确定退出系统？")) {
            $.postNoAsync("/user/exit", {}, function (data) {
                if (data.data == true) {
                    alert("安全退出!", function () {
                        window.location.href = "login.html";
                    });

                } else {
                    alert("退出失败!");
                }
            });
        }
    });

    $(function () {
        //console.log("login");
        $.postNoAsync("/user/getUserBySession", {}, function (data) {
            if (!data.data) {
                window.location.href = "login.html";
                return;
            }
            var loginName = data.data.split(':')[0];
            var loginRole = data.data.split(':')[1];
            $('#loginname').text(loginName);
            $('#loginrole').text(loginRole);
        });

        $("#updatePwd").off("click");
        $("#updatePwd").on("click", function (e) {
            $("#updatePwdModal").modal("show");
            // 内容置空
            $("#updatePwdForm")[0].reset();
            $("#updatePwdForm .text-danger").hide();
        });

        $("#commitUpdatePwd").off("click");
        $("#commitUpdatePwd").on("click", function (e) {
            $("#updatePwdForm .text-danger").hide();
            var updatePwdForm = $("#updatePwdForm").serializeObject();

            // 密码非空验证
            if (updatePwdForm.oldPassword.length == 0) {
                $("#oldPassword").next().show();
                $("#ioldPassword").text(" 原密码输入不能为空！");
                return;
            }

            if (updatePwdForm.newPassword.length == 0) {
                $("#newPassword").next().show();
                $("#inewPassword").text(" 新密码输入不能为空！");
                return;
            }

            if (updatePwdForm.newPassword.length < 6) {
                $("#newPassword").next().show();
                $("#inewPassword").text(" 密码长度不能少于6个字符！");
                return;
            }


            // 原密码验证
            var vaildatepwd = false;
            $.postNoAsync("/user/vaildatePwd", updatePwdForm, function (data) {
                vaildatepwd = data.data;
            });

            if (!vaildatepwd) {
                $("#oldPassword").next().show();
                $("#ioldPassword").text(" 原密码输入不正确！");
                return;
            }

            // 密码重复输入验证
            if (updatePwdForm.repeatPassword != updatePwdForm.newPassword) {
                $("#repeatPassword").next().show();
                $("#irepeatPassword").text(" 新密码两次输入不一致！");
                return;
            }

            // 密码保存
            $.postNoAsync("/user/updatePwd", updatePwdForm, function (data) {
                $("#updatePwdModal").modal("hide");
                if (data.data) {
                    alert("修改成功！");
                } else {
                    alert("系统异常！");
                }
            });


        });
    });
});