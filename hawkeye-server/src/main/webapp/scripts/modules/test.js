define(function(require, exports, module) {
	var fun={};
	fun.init=function(){
		$$('.table-striped').bootstrapTable({
			url: 'data.json',
			pagination: true,
			pageSize: 10,
			pageNumber:1,
			pageList:[10],
			sidePagination:'server',
			dataType:'json',
			responseHandler:function(res){
				var obj={};
				obj.total=res.data.totalElements;
				obj.rows=res.data.content
				return obj;
			},
		    columns: [{
		        field: 'account',
		        title: '账号'
		    }, {
		        field: 'accountName',
		        title: '账号名称'
		    }, {
		        field: 'privateKey',
		        title: '私钥'
		    }, {
		        field: 'reAmount',
		        title: '账户剩余金额'
		    }, {
		        field: 'freezeBuffer',
		        title: '允许欠费天数'
		    },{
		    	field: 'status',
		        title: '状态'
		    },{
		    	field: '',
		        title: '操作',
		        formatter:function(e){
		        	return "<a class='edit' href='javascript:void(0);'>编辑</a>" +
		        			"<a class='config' href='javascript:void(0);'>配置</a>" +
		        			"<a class='disable' href='javascript:void(0);'>禁用</a>";
		        }
		    }]
		});
	}
	return fun;
})