define(function(require, exports, module) {
	var fun = {};
	fun.init = function() {
        var loadSuccess = function () {
            $$(".add-acc-btn").off("click");
            $$(".add-acc-btn").on("click", function() {
                util = require("util");
                util.pageJump("page/userManage/userAdd.html");
                require("userAdd").init();
            });
            $$(".edit").off("click");
            $$(".edit").on("click", function() {
                id = $(this).parent().parent().attr("data-uniqueid");
                util = require("util");
                util.pageJump("page/userManage/userEdit.html");
                require("userEdit").init(id);
            });

            $$(".resetPassword").off("click");
            $$(".resetPassword").on("click",function(){
                var id = $(this).parent().parent().attr("data-uniqueid");
                if(confirm("确定初始化该用户密码!")){
                	$.postNoAsync("/user/resetPassword?id="+id,{},function (data) {
						if(data.data){
							alert("初始化成功！");
						}else{
							alert("系统异常！");
						}
                    })
				}
			});
        }
		
		$$('.table-striped').bootstrapTable({
			url : '/user/search',
			pagination : true,
			pageSize : 10,
			pageNumber : 1,
			pageList : [ 10 ],
			sidePagination : 'server',
			dataType : 'json',
			method : "post",
			queryParams : function(params) {
				params.name = $$("input[name='name']").val();
				params.loginName = $$("input[name='loginName']").val();
				params.validate = $$("select[name='validate']").val();
				return params;
			},
			responseHandler : function(res) {
				var obj = {};
				obj.total = res.data[0];
				obj.rows = res.data[1];
				return obj;
			},
			onLoadSuccess : loadSuccess,
			uniqueId : 'id',
			columns : [ {
				field : "checkbox",
				title : '编号',
				checkbox : true
			}, {
				field : 'id',
				visible : false
			}, {
				field : 'name',
				title : '用户名'
			}, {
				field : 'loginName',
				title : '登陆名'
			}, {
				field : 'createDate',
				title : '创建时间'
			}, {
				field : 'roles',
				title : '角色'
			}, {
				field : 'validate',
				title : '用户状态',
				formatter : function(e) {
					if (e == 1) {
						return "可用";
					} else if (e == 0) {
						return "不可用";
					}
					return "";
				}
			}, {
				field : '',
				title : '操作',
				formatter : function(e) {
					return "<button class='btn btn-warning btn-sm edit'>编辑</button>&nbsp;&nbsp;<button class='btn btn-warning btn-sm resetPassword'>密码重置</button> ";
				}
			} ]
		});

		$$(".del-acc-btn").on("click", function(e) {
			var objs = $$('.table-striped').bootstrapTable("getAllSelections");
			if (objs.length == 0) {
				alert("请选择要删除的数据！");
				return false;
			}
			if (confirm("你确定要删除这" + objs.length + "条数据么？")) {
				var ids = new Array();
				for ( var i = 0; i < objs.length; i++) {
					ids.push(objs[i].id);
				}
				$.postAsync("/user/delete", ids, function(data) {
                    alert("删除成功！",function () {
                        util = require("util");
                        util.pageJump("page/userManage/userInfo.html");
                        require("userInfo").init();
                    });
                });
			}

		});
		
		$$("#search_btn").on("click", function() {
			var param = $$("form").serializeObject();
			$.postAsync("/user/search", param, function(data) {
				var obj = {};
				obj.total = data.data[0];
				obj.rows = data.data[1];
				$$('.table-striped').bootstrapTable("load", obj);
                loadSuccess();
			});

		});
	}
	return fun;
})