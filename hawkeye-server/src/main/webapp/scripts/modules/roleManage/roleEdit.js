define(function(require, exports, module) {
	var fun={};
	fun.init=function(id){
		if (typeof (id) == "undefined" || id == "") {
			alert("非法访问！！！");
			return false;
		}
		
		$.postNoAsync("/resource/list", {}, function(data) {
			var resources = data.data;
			for (var i = 0; i < resources.length; i++) {
				var id = resources[i].id;
				var name = resources[i].name;
				radioDiv = initRoleRadio(id, "resources", name, id);
				$$("#resourceRadio").append(radioDiv);
			}
		});
		
		$.postNoAsync("/role/getUserById", {
			'id' : id
		}, function(data) {
			var resources=new Array();
			for(i in data.data.menus){
				resources.push(data.data.menus[i].code);
			}
			data.data.resources=resources;
			$.setFields($$("form")[0], data.data);
		});
		$$("#commit").on(
				"click",
				function() {
					var param = $$("form").serializeObject();
					if (param.role == '' || param.info == ''
							|| typeof (param.resources) == 'undefined') {
						alert("请填写完整的信息");
						return null;
					}
					param.resources=param.resources.toString();
					$.postNoAsync("/role/update", param, function(data) {
						if (data.data == true) {
							alert("更新成功",function () {
                                util = require("util");
                                util.pageJump("page/roleManage/roleInfo.html");
                                require("roleInfo").init();
                            });

						} else {
							alert("更新失败");
						}
					});
				});
	}
	var initRoleRadio = function(id, name, info, value) {
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