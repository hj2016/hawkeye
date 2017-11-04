/**
 * Created by huangjing on 17-4-29.
 */
define(function (require, exports, module) {
    var $ = require("util").selected;
    var fun = {};
    var jeDate = require("jedate");
    var util = require("util");
    var t1 = ""


    fun.init = function () {
        // 每30秒刷新表格
        var tableRefresh = function () {
            console.log("table-striped table refresh");
            $('.table-striped').bootstrapTable("refresh", {url: "/task/viewList"});
        }
        // 防止多次点入多次刷新
        window.clearInterval(t1);
        t1 = window.setInterval(tableRefresh, 1000 * 30);


        var loadSuccess = function () {


            // 任务明细查询
            $(".see").off("click");
            $(".see").on("click", function () {
                util = require("util");
                util.pageJump("page/taskManager/taskDetail.html");
                var taskDetail = require("taskDetail");
                var id = $(this).parent().parent().attr("data-uniqueid");
                taskDetail.init(id);
            });

            // 任务停止
            $(".stopTask").off("click");
            $(".stopTask").on("click", function () {
                var id = $(this).parent().parent().attr("data-uniqueid");
                if (confirm("确定要停止任务吗？")) {
                    $.postAsync("/task/examine?id=" + id + "&taskState=2", {}, function (data) {
                        if (data.data) {
                            alert("提交成功!");
                        } else {
                            alert("提交失败!");
                        }
                        $('.table-approve').bootstrapTable("refresh", {url: "/task/list"});
                    });
                }
            });

            // 编辑查询条件
            $(".taskEdit").off("click");
            $(".taskEdit").on("click", function () {
                util = require("util");
                util.pageJump("page/taskManager/taskEdit.html");
                var taskEdit = require("taskEdit");
                var id = $(this).parent().parent().attr("data-uniqueid");
                taskEdit.init(id);
            });
        }

        // 开始结束时间控件
        $("#startTime").on("click", function () {
            var maxdate = jeDate.now(0)
            if ($("#endTime").val() != "") {
                maxdate = $("#endTime").val();
            }
            jeDate({
                dateCell: $('#startTime'),
                format: "YYYY-MM-DD",
                isinitVal: false,
                isTime: false,
                zIndex: 9999,
            });
        });

        $("#endTime").on("click", function () {
            var mindate = jeDate.now(0)
            if ($("#startTime").val() != "") {
                mindate = $("#startTime").val();
            }
            jeDate({
                dateCell: $('#endTime'),
                format: "YYYY-MM-DD",
                isinitVal: true,
                isTime: false,
                zIndex: 9999,
                minDate: mindate,
                maxDate: jeDate.now(0)
            });
        });

        $('.table-striped').bootstrapTable({
            url: '/task/viewList',
            pagination: true,
            pageSize: 10,
            pageNumber: 1,
            pageList: [10],
            sidePagination: 'server',
            dataType: 'json',
            method: "post",
            queryParams: function (params) {
                params.taskName = $("input[name='taskName']").val();
                params.startTime = $("input[name='startTime']").val();
                params.endTime = $("select[name='endTime']").val();
                params.taskState = $("select[name='taskState']").val();
                return params;
            },
            responseHandler: function (res) {
                var obj = {};
                obj.total = res.data[0];
                obj.rows = res.data[1];
                return obj;
            },
            onLoadSuccess: loadSuccess,
            uniqueId: 'id',
            columns: [
                {
                    field: 'id',
                    visible: false
                }, {
                    field: 'taskState',
                    title: '任务状态',
                    formatter: function (e) {
                        if (e == 0) {
                            return "<span class='label label-white'>等待中</span>";
                        }
                        if (e == 1) {
                            return "<span class='label label-warning'>执行中</span>";
                        }
                        if (e == 2) {
                            return "<span class='label label-info'>已停止</span>";
                        }
                        if (e == 3) {
                            return "<span class='label label-danger'>已失败</span>";
                        }
                        if (e == 4) {
                            return "<span class='label label-success'>已完成</span>";
                        }
                        if (e == 5) {
                            return "<span class='label label-primary'>待审核</span>";
                        }
                        if (e == 6) {
                            return "<span class='label label-default'>未通过</span>";
                        }
                        if (e == 7) {
                            return "<span class='label label-green'>已通过</span>";
                        }
                        if (e == 8) {
                            return "<span class='label label-inverse'>发送中</span>";
                        }
                        if (e == 9) {
                            return "<span class='label label-purple'>发送成功</span>";
                        }
                        if (e == 10) {
                            return "<span class='label label-orange'>测试中</span>";
                        }
                        if (e == 11) {
                            return "<span class='label label-yellow'>已测试</span>";
                        }
                        if (e == 12) {
                            return "<span class='label label-pink'>发送失败</span>";
                        }
                        if (e == 13) {
                            return "<span class='label label-violet'>待审核</span>";
                        }

                    }
                }, {
                    field: 'taskName',
                    title: '任务名称'
                }, {
                    field: 'createTime',
                    title: '创建时间'
                }, {
                    field: 'endTime',
                    title: '结束时间'
                }, {
                    field: 'taskMotif',
                    title: '任务主题',
                    formatter: function (e) {
                        if (e == 1) {
                            return "开业";
                        }
                        if (e == 2) {
                            return "闭店";
                        }
                        if (e == 3) {
                            return "店庆";
                        }
                        if (e == 4) {
                            return "其他";
                        }

                    }
                }, {
                    field: 'crowdType',
                    title: '营销方式',
                    formatter: function (e) {
                        if (e == 0) {
                            return "短信发送";
                        } else if (e == 1) {
                            return "app消息推送";
                        }
                    }
                }, {
                    field: 'name',
                    title: '操作者'
                }, {
                    field: 'taskState',
                    title: '操作',
                    formatter: function (e) {


                        if (e == 4) {
                            return "<button class='btn btn-white btn-sm see'><i class='fa fa-eye'></i>查看</button>&nbsp;&nbsp;<button class='btn btn-success btn-sm sendMsg'><i class='fa fa-paper-plane-o'></i>发送消息</button>";
                        } else if (e == 6) {
                            return "<button class='btn btn-white btn-sm see'><i class='fa fa-eye'></i>查看</button>&nbsp;&nbsp;<button class='btn btn-white btn-sm taskEdit'><i class='fa fa-edit'></i>编辑</button>";
                        } else if (e == 7) {
                            return "<button class='btn btn-white btn-sm see'><i class='fa fa-eye'></i>查看</button>&nbsp;&nbsp;<button class='btn btn-danger btn-sm stopTask'><i class='fa fa-pause'></i>停止发送</button>";
                        } else if (e == 10) {
                            return "<button class='btn btn-white btn-sm see'><i class='fa fa-eye'></i>查看</button>&nbsp;&nbsp;<button class='btn badge-primary btn-sm sendMsgTest'><i class='fa fa-flask'></i>测试发送</button>";
                        } else if (e == 11) {
                            return "<button class='btn btn-white btn-sm see'><i class='fa fa-eye'></i>查看</button>&nbsp;&nbsp;<button class='btn badge-primary btn-sm sendMsgTest'><i class='fa fa-flask'></i>测试发送</button>&nbsp;&nbsp;<button class='btn btn-info btn-sm submitExamine'><i class='fa fa-external-link'></i>提交审核</button>";
                        } else {
                            return "<button class='btn btn-white btn-sm see'><i class='fa fa-eye'></i>查看</button>";
                        }

                    }
                }]
        });

        $("#search_btn").on("click", function () {
            var param = $("#search_form").serializeObject();
            $.postAsync("/task/viewList", param, function (data) {
                var obj = {};
                obj.total = data.data[0];
                obj.rows = data.data[1];
                $('.table-striped').bootstrapTable("load", obj);
                loadSuccess();
            });

        });
    }


    return fun;
})