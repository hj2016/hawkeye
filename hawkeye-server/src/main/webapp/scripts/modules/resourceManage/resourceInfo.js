define(function(require, exports, module) {
	var fun={};
	fun.init=function(){

        var loadSuccess = function () {
            $$(".edit").off("click");
            $$(".edit").on("click",function(){
                id=$(this).parent().parent().attr("data-uniqueid");
                util=require("util");
                util.pageJump("page/resourceManage/resourceEdit.html");
                require("resourceEdit").init(id);
            });
        }
		
		$$(".add-acc-btn").on("click",function(){
			util=require("util");
			util.pageJump("page/resourceManage/resourceAdd.html");
			require("resourceAdd").init();
		});
		
		$$("#search_btn").on("click",function(){
			var param=$$("form").serializeObject();
			$.postAsync("/resource/search",param,function(data){
				var obj={};
				obj.total=data.data[0];
				obj.rows=data.data[1];
				$$('.table-striped').bootstrapTable("load",obj);
                loadSuccess()
			});
		});
		
		$$(".del-resource-btn").on("click", function(e) {
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
				$.postAsync("/resource/delete", ids, function(data) {
					alert("删除成功！",function(){
                        util = require("util");
                        util.pageJump("page/resourceManage/resourceInfo.html");
                        require("resourceInfo").init();
					});

				});
			}

		});
		
		$$('.table-striped').bootstrapTable({
			url: '/resource/search',
			pagination: true,
			pageSize: 10,
			pageNumber:1,
			pageList:[10],
			sidePagination:'server',
			dataType:'json',
			method:"post",
			queryParams:function(params){
				params.name=$$("input[name='name']").val();
				params.mode=$$("input[name='mode']").val();
				return params;
			},
			responseHandler:function(res){
				var obj={};
				obj.total=res.data[0];
				obj.rows=res.data[1];
				return obj;
			},
			onLoadSuccess: loadSuccess,
			uniqueId:'id',
			columns: [ {
				field:"checkbox",
				title: '编号',
				checkbox:true
			},{
				field: 'id',
				visible:false
			}, {
				field: 'code',
				title: '资源编号'
			}, {
				field: 'name',
				title: '资源名称'
			}, {
				field: 'mode',
				title: '模块名称'
			}, {
				field: 'url',
				title: '链接地址'
			},{
				field: 'icon',
				title: '菜单头标'
			},{
				field: 'pCode',
				title: '上级资源编号'
			},{
				field: '',
				title: '操作',
				formatter:function(e){
					return "<button class='btn btn-warning btn-sm edit'>编辑</button>";
				}
			}]
		});
	}
	return fun;
})