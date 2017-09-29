define(function(require, exports, module) {
	var fun = {};
	fun.init = function() {
		$$("#commit").on(
				"click",
				function() {
					var param = $$("form").serializeObject();
					if (param.code == '' || param.name == '' || param.pCode == '' || param.url == '' || param.icon == '') {
						alert("请填写完整的信息");
						return null;
					}
					$.postNoAsync("/resource/save", param, function(data) {
						if (data.data == true) {
							alert("保存成功",function () {
                                util = require("util");
                                util.pageJump("page/resourceManage/resourceInfo.html");
                                require("resourceInfo").init();
                            });

						} else {
							alert("保存失败");
						}
					});
				});
	}
	return fun;
})