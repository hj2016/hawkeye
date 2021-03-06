define(function(require, exports, module) {
	var fun = {};
	fun.init = function(id) {
		if (id == "" || typeof (id) == "undefined") {
			alert("非法访问！！！");
			return false;
		}

		// 初始化所有角色
		$.postNoAsync("/role/list", {}, function(data) {
			var roles = data.data;
			for ( var i = 0; i < roles.length; i++) {
				var id = roles[i].id;
				var info = roles[i].info;
				radioDiv = initRoleRadio(id, "roles", info, id);
				$$("#roleRadio").append(radioDiv);
			}
		});

		// ajax 请求后台回显数据
		$.postNoAsync("/user/getUserById?id="+id, {}, function(data) {
			$.setFields($$("form")[0], data.data);
		});

		$$("#commit").on("click", function() {
			var flag = $$("#loginName").attr("flag");
			if (flag == "false") {
				alert("此登录名已使用,请重新输入!");
				return null;
			}
			var param = $$("form").serializeObject();
			if (param.name == '' || param.loginName == '' || param.password == ''
					|| param.validate == '' || typeof (param.roles) == 'undefined') {
				alert("请填写完整的信息");
				return null;
			}
			var param = $$("form").serializeObject();
			$.postNoAsync("/user/update", param, function(data) {
				alert("修改成功",function () {
                    util = require("util");
                    util.pageJump("page/userManage/userInfo.html");
                    require("userInfo").init();
                });

			});
		});

		// 判断登录名是否已存在
		/*$$("#loginName").on("blur", function() {
			var param = {
				"loginName" : $(this).val()
			};
			$.post("/user/isExist", param, function(data) {
				if (data.data == false) {
					$$("#loginName").attr("flag", false);
					alert("此登录名已使用,请重新输入!");
				} else {
					$$("#loginName").attr("flag", true);
				}
			});
		});*/

	}
	var initRoleRadio = function(id, name, info, value) {
		var radioDiv = "<div class='radio radio-info radio-inline col-sm-2 radio-common'>"
				+ "<input type='radio' id='radio{id}' value='{id}' name='{name}'>"
				+ "<label for='radio{id}'>{info}</label>" + "</div>";
		radioDiv = radioDiv.replace(/{id}/g, id);
		radioDiv = radioDiv.replace(/{name}/g, name);
		radioDiv = radioDiv.replace(/{info}/g, info);
		radioDiv = radioDiv.replace(/{value}/g, value);
		return radioDiv
	}
	return fun;
})