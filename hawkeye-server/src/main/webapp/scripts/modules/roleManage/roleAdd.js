define(function (require, exports, module) {
    var fun = {};
    fun.init = function () {
        // 初始化所有角色
        $.postNoAsync("/resource/list", {}, function (data) {
            debugger
            var resources = data.data;
            for (var i = 0; i < resources.length; i++) {
                var id = resources[i].id;
                var name = resources[i].name;
                radioDiv = initRoleRadio(id, "resources", name, id);
                $$("#resourceRadio").append(radioDiv);
            }
        });

        // 判断角色是否存在
        $$("#role").on("blur", function () {
            $.postNoAsync("/role/isExist?role=" + $(this).val(), {}, function (data) {
                if (data.data) {
                    $$("#role").attr("flag", false);
                    alert("此角色编号已使用,请重新输入!");
                } else {
                    $$("#role").attr("flag", true);
                }
            });

        });


        $$("#commit").on(
            "click",
            function () {
                var param = $$("form").serializeObject();
                if (param.role == '' || param.info == ''
                    || typeof (param.resources) == 'undefined') {
                    alert("请填写完整的信息");
                    return;
                }
                if ($$("#role").attr("flag") == "false") {
                    alert("此角色编号已使用,请重新输入!");
                    return;
                }
                param.resources = param.resources.toString();
                $.postNoAsync("/role/save", param, function (data) {
                    if (data.data == true) {
                        alert("保存成功", function () {
                            util = require("util");
                            util.pageJump("page/roleManage/roleInfo.html");
                            require("roleInfo").init();
                        });
                    } else {
                        alert("保存失败");
                    }
                });
            });
    }
    var initRoleRadio = function (id, name, info, value) {
        var radioDiv = "<div class='checkbox checkbox-info checkbox-inline col-sm-2 checkbox-common'>"
            + "<input type='checkbox' id='checkbox{id}' value='{value}' name='{name}'>"
            + "<label for='checkbox{id}'>{info}</label>" + "</div>";
        radioDiv = radioDiv.replace(/{id}/g, id);
        radioDiv = radioDiv.replace(/{name}/g, name);
        radioDiv = radioDiv.replace(/{info}/g, info);
        radioDiv = radioDiv.replace(/{value}/g, value);
        return radioDiv;
    };
    return fun;
})