/**
 * Created by huangjing on 17-4-29.
 */
define(function (require, exports, module) {
    var fun = {};
    var jeDate = require("jedate");
    var util = require("util");
    var t1 =""

    // 短信发送
    var sendSmsMsg = function (id) {


        // 提交短信信息
        $$("#commitSms").off();
        $$("#commitSms").on("click", function () {
            var msgContent = $("#smsMsgContent").val();
            if (msgContent.length == 0) {
                alert("短信内容不能为空！");
                return;
            }
            var datePeriod = $("#smsDatePeriod").val();
            if (datePeriod.length == 0) {
                alert("请选择发送时间！");
                return;
            }

            var sendAmount = $("#smsSendAmount").val();
            if (sendAmount.length == 0) {
                alert("请输入发送短信数量！");
                return;
            }

            if (!util.isPInt(sendAmount)) {
                alert("发送短信数量必须是正整数!");
                return;
            }


            if (new Date(datePeriod) < new Date()) {
                alert("发送时间不能晚于当前时间！");
                return;
            }

            if ($$("#smsMsgContent").val().length > 64) {
                if (!confirm("此短信已经超过64个字符，将按照" + Math.ceil($$("#smsMsgContent").val().length / 64) + "条短信收费")) {
                    return;
                }
            }

            $.postNoAsync("task/sendTelphone?id=" + id + "&sms=" + msgContent + "&datePeriod=" + datePeriod + "&sendAmount=" + sendAmount, {}, function (data) {
                if (data.data) {
                    alert("已提交！");
                } else {
                    alert("提交失败！");
                }
                $$('.table-striped').bootstrapTable("refresh", {url: "/task/viewList"});
                $$("#sendSmsMsg").modal('hide');
            });
        });

    }


    // app信息发送
    var sendAppMsg = function (id) {
        $$("#commitApp").off("click");
        $$("#commitApp").on("click", function (e) {

            var sendAppMsgForm = $$("#sendAppMsg form").eq(0).serializeObject();
            var sendAppMsgForm2 = $$("#sendAppMsg form").eq(1).serializeObject();
            if (sendAppMsgForm.title.length == 0) {
                alert("标题不能为空！");
                return;
            }

            if (sendAppMsgForm.body.length == 0) {
                alert("内容不能为空！");
                return;
            }

            if (sendAppMsgForm.time.length == 0) {
                alert("有效时长不能为空！");
                return;
            }

            if (!util.isPInt(sendAppMsgForm.time)) {
                alert("有效时长必须输入正整数！");
                return;
            }


            if (sendAppMsgForm2.datePeriod.length == 0) {
                alert("请选择发送时间！");
                return;
            }

            // 包含当前时间
            if (new Date(new Date(sendAppMsgForm2.datePeriod).valueOf()+1000*60) < new Date()) {
                alert("发送时间不能晚于当前时间！");
                return;
            }

            if (sendAppMsgForm2.sendAmount == 0) {
                alert("请输入发送人群数量！");
                return;
            }

            if (!util.isPInt(sendAppMsgForm2.sendAmount)) {
                alert("发送短信数量必须是正整数!");
                return;
            }

            /*if (sendAppMsgForm.url.length > 0 & !util.isUrl(sendAppMsgForm.url)) {
                alert("输入url地址有误！");
                return;
            }*/
            sendAppMsgForm.time = sendAppMsgForm.time*3600;

            $.postNoAsync("task/sendTelphone?id=" + id + "&sms=" + JSON.stringify(sendAppMsgForm) + "&datePeriod=" + sendAppMsgForm2.datePeriod + "&sendAmount=" + sendAppMsgForm2.sendAmount, {}, function (data) {
                if (data.data) {
                    alert("已提交！");
                } else {
                    alert("提交失败！");
                }
                $$('.table-striped').bootstrapTable("refresh", {url: "/task/viewList"});
                $$("#sendAppMsg").modal('hide');
            });


        });
    }

    // 短信测试发送
    var sendSmsMsgTest = function(id){
        var codeInputDiv = "<div class='col-sm-3'>" +
            "<input type='text' class='input form-control codeInput' name='codeInput' value='' placeholder='请输入手机号码'>" +
            "</div>";

        // 手机号选择初始化
        $("#sendSmsMsgTest .codeGroup>div").remove();
        $("#sendSmsMsgTest .codeGroup").prepend(codeInputDiv);

        $("#commitSmsTest").off();
        $("#commitSmsTest").on("click", function () {

            // 获取手机号
            var mobiles = $(this).parent().parent().find("input[name=codeInput]");
            var mobileStrs = "";
            for (var i = 0; i < mobiles.length; i++) {
                var mobile = mobiles.eq(i).val();
                if (!util.isMobile(mobile)) {
                    alert("第" + (i + 1) + "个输入的手机号格式不正确！");
                    return;
                }

                if (i == mobiles.length - 1) {
                    mobileStrs = mobileStrs + mobile;
                } else {
                    mobileStrs = mobileStrs + mobile + ",";
                }
            }

            var msgContent = $("#msgContentTest").val();
            $.postNoAsync("/task/sendMessageTest?mobiles=" + mobileStrs + "&msgContent=" + msgContent + "&id=" + id+"&crownType=0", {}, function (data) {
                $$("#sendSmsMsgTest").modal('hide');
                if (data.data) {
                    alert("提交成功！");
                } else {
                    alert("提交异常！");
                }
                $$('.table-striped').bootstrapTable("refresh", {url: "/task/list"});
            });

        });
    }
    // app信息发送测试
    var sendAppMsgTest = function(id){
        var codeInputDiv = "<div class='col-sm-3'>" +
            "<input type='text' class='input form-control codeInput' name='codeInput' value='' placeholder='请输入设备号码'>" +
            "</div>";

        // 手机号选择初始化
        $("#sendAppMsgTest .codeGroup>div").remove();
        $("#sendAppMsgTest .codeGroup").prepend(codeInputDiv);

        $$("#commitAppTest").off("click");
        $$("#commitAppTest").on("click",function () {
            var sendAppMsgForm = $("#sendAppMsgTest form").eq(1).serializeObject()
            var mobiles = $(this).parent().parent().find("input[name=codeInput]");
            var mobileStrs = "";
            for (var i = 0; i < mobiles.length; i++) {
                var mobile = mobiles.eq(i).val();
                if (mobile.length ==0 ) {
                    alert("第" + (i + 1) + "个输入的设备号不能为空！");
                    return;
                }


                if (i == mobiles.length - 1) {
                    mobileStrs = mobileStrs + mobile;
                } else {
                    mobileStrs = mobileStrs + mobile + ",";
                }
            }
            if (sendAppMsgForm.time.length == 0) {
                alert("有效时长不能为空！");
                return;
            }

            if (!util.isPInt(sendAppMsgForm.time)) {
                alert("有效时长必须输入正整数！");
                return;
            }
            sendAppMsgForm.time = sendAppMsgForm.time*3600;
            var msgContent = JSON.stringify(sendAppMsgForm);

            $.postNoAsync("/task/sendMessageTest?mobiles=" + mobileStrs + "&msgContent=" + msgContent + "&id=" + id+"&crownType=1", {}, function (data) {
                $$("#sendAppMsgTest").modal('hide');
                if (data.data) {
                    alert("提交成功！");
                } else {
                    alert("提交异常！");
                }
                $$('.table-striped').bootstrapTable("refresh", {url: "/task/list"});
            });
        });
    }


    fun.init = function () {
        // 每30秒刷新表格
        var tableRefresh = function(){
            console.log("table-striped table refresh");
            $$('.table-striped').bootstrapTable("refresh", {url: "/task/list"});
        }
        // 防止多次点入多次刷新
        window.clearInterval(t1);
        t1 = window.setInterval(tableRefresh,1000*30);
        

        var loadSuccess = function () {

            // 提交审核
            $$(".submitExamine").off("click");
            $$(".submitExamine").on("click", function () {
                var id = $(this).parent().parent().attr("data-uniqueid");
                if (confirm("确定要提交审核吗？")) {
                    $.postAsync("/task/examine?id=" + id + "&taskState=5", {}, function (data) {
                        if (data.data) {
                            alert("提交成功!");
                        } else {
                            alert("提交失败!");
                        }
                        $$('.table-striped').bootstrapTable("refresh", {url: "/task/list"});
                    });
                }

            });


            // 短信测试点击事件
            $$(".sendMsgTest").off("click");
            $$(".sendMsgTest").on("click", function () {
                var id = $(this).parent().parent().attr("data-uniqueid");

                var codeInputDiv = "<div class='col-sm-3'>" +
                    "<input type='text' class='input form-control codeInput' name='codeInput' value='' >" +
                    "</div>";

                var crowdType = "";
                $.postNoAsync("/task/findById?id=" + id, {}, function (data) {
                    crowdType = data.data.crowdType;
                });



                // 内容回显
                var id = $(this).parent().parent().attr("data-uniqueid");
                $.postNoAsync("/task/selectTask?id=" + id, {}, function (data) {
                    if(crowdType == 0){
                        $("#sendSmsMsgTest #msgContentTest").val(data.data.sms);
                    }else if (crowdType == 1){
                        var content = JSON.parse(data.data.sms);
                        content.time = content.time/3600;
                        $.setFields($("#sendAppMsgTest form")[1], content );
                    }

                });


                if (crowdType == 0 ) {
                    // 短信信息推送
                    $$("#sendSmsMsgTest").modal('show');
                    sendSmsMsgTest(id);

                    var msglen=$$("#sendSmsMsgTest").find(".msgContent").val().length;
                    $$("#sendSmsMsgTest").find(".codesize").text(msglen+"/500");

                }else if (crowdType ==1 ){
                    // app信息推送
                    $$("#sendAppMsgTest").modal('show');
                    sendAppMsgTest(id);
                    var msglen=$$("#sendAppMsgTest").find(".msgContent").val().length;
                    $$("#sendAppMsgTest").find(".codesize").text(msglen+"/500");

                }


                $$(".addCode").off();
                $$(".delCode").off();

                $$(".addCode").on("click", function () {
                    var codes = $(this).parent().find("input[name=codeInput]");
                    if (codes.length >= 3) {
                        alert("已超过3个测试上线！");
                    } else {
                        $(this).prev().append(codeInputDiv);
                    }
                });

                $$(".delCode").on("click", function () {
                    var codes = $(this).parent().find("input[name=codeInput]");
                    if (codes.length <= 1) {
                        alert("请保证至少输入一个测试号！");
                    } else {
                        $(this).parent().find(".codeGroup div").last().remove();
                    }
                });

                // 超过长度提示
                $$(".msgContent").off("keyup");
                $$(".msgContent").on("keyup", function () {
                    var text = $(this).next().text();
                    var texts = text.split("/");
                    texts[0] = $(this).val().length;
                    $(this).next().text(texts.join("/"));
                });


            });

            // 发送信息点击事件
            $$(".sendMsg").off("click");
            $$(".sendMsg").on("click", function () {
                var id = $(this).parent().parent().attr("data-uniqueid");
                var crowdType = "";
                $.postNoAsync("/task/findById?id=" + id, {}, function (data) {
                    crowdType = data.data.crowdType;
                });

                if (crowdType == 0) {
                    // 短信信息推送
                    $$("#sendSmsMsg").modal('show');
                    // 超过长度提示
                    sendSmsMsg(id);

                } else if (crowdType == 1) {
                    // app信息推送
                    $$("#sendAppMsg").modal('show');
                    sendAppMsg(id);
                } else {
                    alert("发送信息异常，请联系管理员！");
                }

                // 超过长度提示
                $$(".msgContent").off("keyup");
                $$(".msgContent").on("keyup", function () {
                    var text = $(this).next().text();
                    var texts = text.split("/");
                    texts[0] = $(this).val().length;
                    $(this).next().text(texts.join("/"));
                });

                // 发送时间
                $$(".datePeriod").off("click");
                $$(".datePeriod").on("click", function () {
                    var minDate = new Date().Format("yyyy-MM-dd hh:mm:ss");

                    jeDate({
                        dateCell: $(this),
                        format: "YYYY-MM-DD hh:mm:00",
                        isinitVal: true,
                        isTime: true,
                        zIndex: 9999,
                        minDate: minDate
                    });
                });

                $$("#sendSmsMsg form")[0].reset();
                $$("#sendAppMsg form")[0].reset();
                $$(".codesize").text("0/500");

            });

            // 任务明细查询
            $$(".see").off("click");
            $$(".see").on("click", function () {
                util = require("util");
                util.pageJump("page/taskManager/taskDetail.html");
                var taskDetail = require("taskDetail");
                var id = $(this).parent().parent().attr("data-uniqueid");
                taskDetail.init(id);
            });
        }

        $$("#createTask").on("click", function () {
            $(".modal-backdrop").hide();
            util = require("util");
            util.pageJump("page/taskManager/taskManager.html");
            var taskManager = require("taskManager");
            taskManager.init();
        });
        $$("#seeTask").on("click", function () {
            util = require("util");
            util.pageJump("page/taskManager/taskDetail.html");

        });

        // 开始结束时间控件
        $$("#startTime").on("click", function () {
            var maxdate = jeDate.now(0)
            if ($$("#endTime").val() != "") {
                maxdate = $$("#endTime").val();
            }
            jeDate({
                dateCell: $$('#startTime'),
                format: "YYYY-MM-DD",
                isinitVal: false,
                isTime: false,
                zIndex: 9999,
            });
        });

        $$("#endTime").on("click", function () {
            var mindate = jeDate.now(0)
            if ($$("#startTime").val() != "") {
                mindate = $$("#startTime").val();
            }
            jeDate({
                dateCell: $$('#endTime'),
                format: "YYYY-MM-DD",
                isinitVal: true,
                isTime: false,
                zIndex: 9999,
                minDate: mindate,
                maxDate: jeDate.now(0)
            });
        });

        $$('.table-striped').bootstrapTable({
            url: '/task/viewList',
            pagination: true,
            pageSize: 10,
            pageNumber: 1,
            pageList: [10],
            sidePagination: 'server',
            dataType: 'json',
            method: "post",
            queryParams: function (params) {
                params.taskName = $$("input[name='taskName']").val();
                params.startTime = $$("input[name='startTime']").val();
                params.endTime = $$("select[name='endTime']").val();
                params.taskMotif = $$("select[name='taskMotif']").val();
                params.taskState = $$("select[name='taskState']").val();
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
                            return "新店开业";
                        }
                        if (e == 2) {
                            return "闭店";
                        }
                        if (e == 3) {
                            return "区域促销活动";
                        }
                        if (e == 4) {
                            return "区域主题活动";
                        }
                        if (e == 5) {
                            return "外卖促销活动";
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

        $$("#search_btn").on("click", function () {
            var param = $$("#search_form").serializeObject();
            $.postAsync("/task/viewList", param, function (data) {
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