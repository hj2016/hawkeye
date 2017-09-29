define(function(require, exports, module) {
	var fun={};
	fun.init=function(id){
		if (typeof (id) == "undefined" || id == "") {
			alert("非法访问！！！");
			return false;
		}
		
		$.postNoAsync("/resource/getResourceById", {
			'id' : id
		}, function(data) {
			$.setFields($$("form")[0], data.data);
		});
		
		$("#commit").on(
				"click",
				function() {
					var param = $$("form").serializeObject();
					if (param.code == '' || param.name == '' || param.pCode == '' || param.url == '' || param.icon == '') {
						alert("请填写完整的信息");
						return null;
					}
					$.postNoAsync("/resource/update", param, function(data) {
						if (data.data == true) {
							alert("更新成功",function () {
                                util = require("util");
                                util.pageJump("page/resourceManage/resourceInfo.html");
                                require("resourceInfo").init();
                            });
						} else {
							alert("更新失败");
						}
					});
				});
		
	}
	return fun;
})