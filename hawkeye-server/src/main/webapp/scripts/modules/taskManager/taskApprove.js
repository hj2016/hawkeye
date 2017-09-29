/**
 * Created by huangjing on 17-5-19.
 */
define(function(require, exports, module) {
    var fun = {};

    fun.init = function () {
        var loadSuccess = function () {
            $$(".see").off("click");
            $$(".see").on("click",function () {
                util = require("util");
                util.pageJump("page/taskManager/taskDetail.html");
                var taskDetail = require("taskDetail");
                var id = $(this).parent().parent().attr("data-uniqueid");
                taskDetail.init(id);
            });
            $$(".pass").off("click");
            $$(".pass").on("click",function () {
                var id = $(this).parent().parent().attr("data-uniqueid");
                if(confirm("确定要通过吗？")){
                    $.postAsync("/task/examine?id="+id+"&taskState=7",{}, function(data) {
                        if(data.data){
                            alert("提交成功!");
                        }else{
                            alert("提交失败!");
                        }
                        $$('.table-approve').bootstrapTable("refresh", {url:"/task/list"});
                    });
                }

            });

            $$(".nopass").off("click");
            $$(".nopass").on("click",function () {
                var id = $(this).parent().parent().attr("data-uniqueid");
                if(confirm("确定要不通过吗？")){
                    $.postAsync("/task/examine?id="+id+"&taskState=6",{}, function(data) {
                        if(data.data){
                            alert("提交成功!");
                        }else{
                            alert("提交失败!");
                        }
                        $$('.table-approve').bootstrapTable("refresh", {url:"/task/list"});
                    });
                }
            });
        } 
        
        
        // 开始结束时间控件
        jeDate = require("jedate");
        $$("#startTime").on("click", function() {
            var maxdate =jeDate.now(0)
            if ($$("#endTime").val() != "") {
                maxdate = $$("#endTime").val();
            }
            jeDate({
                dateCell : $$('#startTime'),
                format : "YYYY-MM-DD",
                isinitVal : true,
                isTime : false,
                zIndex : 9999,
                maxDate : maxdate
            });
        });

        $$("#endTime").on("click", function() {
            var mindate = jeDate.now(0)
            if ($$("#startTime").val() != "") {
                mindate = $$("#startTime").val();
            }
            jeDate({
                dateCell : $$('#endTime'),
                format : "YYYY-MM-DD",
                isinitVal : true,
                isTime : false,
                zIndex : 9999,
                minDate : mindate,
                maxDate : jeDate.now(0)
            });
        });

        $$("#search_btn").on("click", function() {
            var param = $$("form").serializeObject();
            $.postAsync("/task/list", param, function(data) {
                var obj = {};
                obj.total = data.data[0];
                obj.rows = data.data[1];
                $$('.table-approve').bootstrapTable("load", obj);
                loadSuccess();
            });

        });

        $$('.table-approve').bootstrapTable({
            url : '/task/list',
            pagination : true,
            pageSize : 10,
            pageNumber : 1,
            pageList : [ 10 ],
            sidePagination : 'server',
            dataType : 'json',
            method : "post",
            queryParams : function(params) {
                params.taskName = $$("input[name='taskName']").val();
                params.startTime = $$("input[name='startTime']").val();
                params.endTime = $$("select[name='endTime']").val();
                params.taskMotif =  $$("select[name='taskMotif']").val();
                params.taskState = $$("select[name='taskState']").val();
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
            columns : [
                {
                    field : 'id',
                    visible : false
                }, {
                    field : 'taskState',
                    title : '任务状态',
                    formatter:function(e) {
                        if(e==0){
                            return "<span class='label label-white'>等待中</span>";
                        }
                        if(e==1){
                            return "<span class='label label-warning'>执行中</span>";
                        }
                        if(e==2){
                            return "<span class='label label-info'>已停止</span>"
                        }
                        if(e==3){
                            return "<span class='label label-danger'>已失败</span>";
                        }
                        if(e==4){
                            return "<span class='label label-success'>已完成</span>"
                        }
                        if(e==5){
                            return "<span class='label label-primary'>待审核</span>";
                        }
                        if(e==6){
                            return "<span class='label label-default'>未通过</span>";
                        }
                        if(e==7){
                            return "<span class='label label-green'>已通过</span>"
                        }
                        if(e==8){
                            return "<span class='label label-inverse'>发送中</span>"
                        }
                        if(e==9){
                            return "<span class='label label-purple'>发送成功</span>"
                        }
                        if (e == 10) {
                            return "<span class='label label-orange'>测试中</span>";
                        }
                        if (e == 11) {
                            return "<span class='label label-yellow'>已测试</span>";
                        }
                    }
                }, {
                    field : 'taskName',
                    title : '任务名称'
                }, {
                    field : 'createTime',
                    title : '创建时间'
                }, {
                    field : 'endTime',
                    title : '结束时间'
                }, {
                    field : 'taskMotif',
                    title : '任务主题' ,
                    formatter:function (e) {
                        if(e == 1){
                            return "新店开业";
                        }
                        if(e == 2){
                            return "闭店";
                        }
                        if(e == 3){
                            return "区域促销活动";
                        }
                        if(e == 4){
                            return "区域主题活动";
                        }
                        if(e == 5){
                            return "外卖促销活动";
                        }

                    }
                }, {
                    field : 'name',
                    title : '操作者'
                }, {
                    field : 'taskState',
                    title : '操作',
                    formatter : function(e) {

                        if(e != 5){
                            return "<button class='btn btn-white btn-sm see'><i class='fa fa-eye'></i>查看</button>";
                        }else{
                            return "<button class='btn btn-white btn-sm see'><i class='fa fa-eye'></i>查看</button>&nbsp;&nbsp;<button class='btn btn-primary btn-sm pass'>通过</button>&nbsp;&nbsp;<button class='btn btn-danger btn-sm nopass'>不通过</button>";
                        }

                    }
                } ]
        });

    }

    return fun;
})