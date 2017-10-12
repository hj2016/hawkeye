define(function (require, exports, module) {
    var fun = {};

    var util = require("util");


    var delRule = function (e) {
        $(this).parent().parent().parent().remove();
    };

    var removeCondition = function (e) {
        $(this).parent().parent().remove();
    }

    var addConditionElement = function (preEle, tags, kv, condition) {
        var conditionHtml = util.reloadHtml("/page/taskManager/taskCondition.html");
        var v = [];
        for (var i = 0; i < kv.length; i++) {
            v.push(kv[i].split(":")[0]);
        }

        var inputVal = '{"rule":"' + v.join(",") + '","tagId":"' + tags.tagId + '"}';
        conditionHtml = conditionHtml.replace(/{dimensionName}/g, tags.name).replace(/{kv}/g, inputVal).replace(/{condition}/g, condition);
        var buttondiv = "<button class='btn btn-default' style='margin-left: 5px;margin-right: 5px;' type='button'>{conditionName}</button>";
        preEle.append(conditionHtml);

        var conditionDiv = preEle.find(".condition:last")
        for (var i = 0; i < kv.length; i++) {
            var button = buttondiv.replace(/{conditionName}/g, kv[i]);
            conditionDiv = conditionDiv.append(button);
        }
        // 加入按钮移除事件
        preEle.find(".remove-condition").off("click");
        preEle.find(".remove-condition").on("click", removeCondition);

    };


    var addCondition = function (e) {
        var condition = $(this).attr("target-data");
        var conditionDiv = $(this).parent().parent().parent();
        var datasource = conditionDiv.parent().find("select[name='datasource']").val();
        if (datasource == "") {
            alert("请选择数据源！");
            return;
        }
        $("#dimRule").modal('show');

        // 数据源修改的时候清空选项
        $(".datasource").off("change");
        $(".datasource").on("change",function (e) {
            $(this).parent().parent().parent().find(".condition").parent().remove();
            var value = $(this).val();

            if(value == "d005"){
                $$("#crowdType").val("2");
            }else {
                $$("#crowdType").val("1");
            }

        });


        $("#commitDim").off("click");
        // 提交选择规则
        $("#commitDim").on("click", function (e) {
            var treeSelect = $('#tree').treeview('getSelected');
            var tags = treeSelect[0].tags;
            if (treeSelect.length < 1) {
                alert("请选择维度！");
                return;
            }
            if (treeSelect[0].tags.choiceType == 1) {
                var arr = [];
                var checkBox = $("#event_output").find("input:checked");
                if (checkBox.length == 0) {
                    alert("请选择条件！");
                    return;
                }
                checkBox.each(function () {
                    var value = $(this).val();
                    arr.push(value);
                });

                addConditionElement(conditionDiv, tags, arr, condition);
            }
            if (treeSelect[0].tags.choiceType == 2) {
                var input = $("#event_output").find("input");
                if (input.val() == "") {
                    alert("请输入模糊匹配条件！");
                    return;
                }
                var arr = input.val().split(",");
                addConditionElement(conditionDiv, tags, arr, condition);
            }
            if (treeSelect[0].tags.choiceType == 3) {
                var beginTime = $("#event_output").find("#beginTime");
                var endTime = $("#event_output").find("#endTime");
                if (beginTime.val() == "") {
                    alert("请输入开始时间条件！");
                    return;
                }

                if (endTime.val() == "") {
                    alert("请输入结束时间条件！");
                    return;
                }
                var arr = [beginTime.val(), endTime.val()];
                addConditionElement(conditionDiv, tags, arr, condition);
            }
            if (treeSelect[0].tags.choiceType == 4) {
                arr = $("#inputsearch").getSelected();
                if (arr.length == 0) {
                    alert("输入模糊选择不能为空！");
                    return;
                }
                addConditionElement(conditionDiv, tags, arr, condition);
            }
        });


        $("#event_output").html("");
        // 初始化菜单
        $("#tree").treeview({
            color: "#428bca",
            expandIcon: "glyphicon glyphicon-chevron-right",
            collapseIcon: "glyphicon glyphicon-chevron-down",
            nodeIcon: "glyphicon glyphicon-stop",
            multiSelect: false,
            selectable: false,
            data: getTree(datasource),
            onNodeUnselected: function (event, data) {
                if (!data.state.selected) {
                    $("#event_output").html("");
                }
            },
            onNodeSelected: function (event, data) {
                // Your logic goes here
                var eo = $("#event_output");

                if (data.tags.choiceType == 1) {
                    // 多选控件
                    var checkBoxhtml = "<div class='col-sm-6' >" +
                        "<div class='checkbox checkbox-info  checkbox-common'>" +
                        "<input type='checkbox' id='checkbox{id}' value='{kv}' name='{tagId}'>" +
                        "<label for='checkbox{id}'>{text}</label>" +
                        "</div>" +
                        "</div>";
                    var html = util.reloadHtml("/page/taskManager/taskCheckBox.html")
                    eo.html(html);
                    var valKvs = data.tags.valKvs.split(",")
                    for (var i = 0; i < valKvs.length; i++) {
                        var text = valKvs[i].split(":")[1];
                        var rehtml = checkBoxhtml.replace(/{id}/g, i).replace(/{kv}/g, valKvs[i]).replace(/{text}/g, text).replace(/{tagId}/g, data.tags.tagId)
                        eo.find("#dateWidget").append(rehtml);
                    }

                }
                if (data.tags.choiceType == 2) {
                    // 输入控件
                    var html = util.reloadHtml("/page/taskManager/taskInput.html");
                    eo.html(html);
                }
                if (data.tags.choiceType == 3) {
                    // 时间控件
                    var html = util.reloadHtml("/page/taskManager/taskDate.html");
                    eo.html(html);
                    // 时间控件
                    jeDate = require("jedate");
                    $$("#beginTime").on("click", function () {
                        var maxdate = jeDate.now(0)
                        if ($$("#endTime").val() != "") {
                            maxdate = $$("#endTime").val();
                        }
                        jeDate({
                            dateCell: $$('#beginTime'),
                            format: "YYYY-MM-DD",
                            isinitVal: true,
                            isTime: false,
                            zIndex: 9999,
                            maxDate: maxdate
                        });
                    });

                    $$("#endTime").on("click", function () {
                        var mindate = jeDate.now(0)
                        if ($$("#beginTime").val() != "") {
                            mindate = $$("#beginTime").val();
                        }
                        jeDate({
                            dateCell: $$("#endTime"),
                            format: "YYYY-MM-DD",
                            isinitVal: true,
                            isTime: false,
                            zIndex: 9999,
                            minDate: mindate,
                            maxDate: jeDate.now(0)
                        });
                    });


                }
                if (data.tags.choiceType == 4) {
                    var html = util.reloadHtml("/page/taskManager/taskInputSerch.html");
                    eo.html(html);
                    $("#inputsearch").searchInput({
                        data: data.tags.valKvs.split(",")
                    });
                }

                /*if(data.tags.choiceType == 5) {
                    var html = util.reloadHtml("/page/taskManager/taskRangeSlider.html");
                    eo.html(html);
                    debugger

                    $("#range").ionRangeSlider({
                        type: "single",
                        min: 0,
                        max: 20,
                        from: 1,
                        step: 1
                    });
                }*/
            }
        });
    };

    function getTree(dataSrc) {
        // ajax 请求后台回显数据
        var datajson ="";
        $.postNoAsync("/tagType/list?dataSrc="+dataSrc,
         {},
        function(data) {
            datajson= data.data;
        });
        return datajson;
    };


    var submitTask = function (e) {

        var taskInfoForm = $$("#taskInfoForm").serializeObject();

        // 输入参数检测

        //基本属性
        if (taskInfoForm.taskName == "") {
            alert("任务名称不能为空！");
            return;
        }

        if (taskInfoForm.taskMotif == "") {
            alert("请选择任务主题！");
            return;
        }
        var conditions = [];

        var vaildate = true;

        //规则属性
        for (var i=0;i < $(".rule").length;i++){
            var rule = $(".rule").eq(i)
            var includes = [];
            var excludes = [];
            var condition = {};
            // 数据源
            var dataSource= rule.find(".datasource").val();

            // 包含条件
            rule.find(".include").each(function () {
                if ($(this).val() != "") {
                    includes.push([$.parseJSON($(this).val())]);
                }
            });

            // 排除条件
            rule.find(".exclude").each(function () {
                if ($(this).val() != "") {
                    excludes.push([$.parseJSON($(this).val())]);
                }
            });


            if(includes.length==0 && excludes==0){
                alert("请选择包含或排除条件！");
                vaildate = false;
                return;
            }

            // 门店 会员等级必选
            if(dataSource == "d002" && taskInfoForm.crowdType==0 ){
                var op = rule.find("select>option[value='"+dataSource+"']").text();
                var hydj = rule.find(".has-success").parent().find(".condition .text-success:contains('会员等级')");
                if(hydj.length == 0){
                    alert(op+":请选择会员等级！");
                    vaildate = false;
                    return;
                }
            }

            // 日期选择必选检测
            if(dataSource != "d001" && dataSource != "" && taskInfoForm.crowdType==0){
                var op = rule.find("select>option[value='"+dataSource+"']").text();
                var xsrq = rule.find(".has-success").parent().find(".condition .text-success:contains('销售日期')");

                if(xsrq.length==0){
                    alert(op+":请选择销售日期！");
                    vaildate = false;
                    return;
                }
                // 判断日期范围
                debugger
                var _button = xsrq.parent().find("button");
                var start = _button.eq(0).text();
                var end = _button.eq(1).text();
                var year = ( new Date(end +" 00:00:00")-new Date(start +" 00:00:00") )/1000/60/60/24/365;

                if( year>1 ){
                    alert(op+":销售日期选择区间不能大于一年！");
                    vaildate = false;
                    return;
                }
            }
            condition.includes = includes;
            condition.excludes = excludes;
            condition.dataSource = dataSource;
            conditions.push(condition);
        }

        if(conditions.length ==0 ){
            alert("请添加至少一个规则条件！");
            return;
        }

        /*if(!vaildate){
            alert("验证失败");
            return;
        }
        alert("验证成功");*/

        taskInfoForm.conditions = conditions;

        console.log(JSON.stringify(taskInfoForm));

        taskInfoForm.monthlyLimit = $$("#range").val();

        $.postAsync("/task/addTask", taskInfoForm, function(data) {
            //console.log(JSON.stringify(data));
            alert("保存成功!",function () {
                $("a[mode='taskList']").click();
            });

        });


    };

    var mobileModle = function(){
        $$("select[name='datasource'] option[value='d005']").remove();
    }

    var appModle = function(){
        $$("select[name='datasource'] option[value='d001']").remove();
        $$("select[name='datasource'] option[value='d002']").remove();
        $$("select[name='datasource'] option[value='d003']").remove();
        $$("select[name='datasource'] option[value='d004']").remove();
    }

    fun.init = function () {



        // datasource
        $(".datasource").off("change");
        $(".datasource").on("change",function (e) {
            $(this).parent().parent().parent().find(".condition").parent().remove();
            var value = $(this).val();
            /*if(value == "d005"){
                $$("#crowdType").val("2");
            }else {
                $$("#crowdType").val("1");
            }*/
        });

        // 提交任务
        $("#submitTask").off("click");
        $("#submitTask").on("click", submitTask);


        // 删除规则事件
        $(".delRule").off("click");
        $(".delRule").on("click", delRule);

        // 包含排除添加
        $(".addCondition").off("click");
        $(".addCondition").on("click", addCondition);

        // 添加规则
        $("#addRule").on("click", function () {
            // 判断数据源是否选择
            var datasource = $("select[name='datasource']");
            var flag = true;
            for (var i = 0; i < datasource.length; i++) {
                var dsval = datasource.eq(i).val();
                if (dsval == "") {
                    flag = false;
                    alert("请选择规则数据源！");
                    break;
                }
            }
            if (flag) {
                var rule = util.reloadHtml("page/taskManager/taskRule.html");
                $("#rulediv").append(rule);

                // 删除规则事件
                $(".delRule").off("click");
                $(".delRule").on("click", delRule)

                // 包含排除添加
                $(".addCondition").off("click");
                $(".addCondition").on("click", addCondition);

                //移除已选中的选项
                $(".datasource").off("mousedown");
                $(".datasource").on("mousedown",function (e) {
                    var v = $(this).val();
                    var obj = $(this);
                    obj.find("option").show();
                    $(".datasource").each(function () {
                        var other = $(this).val();
                        if(other!=v){
                            obj.find("option[value='"+other+"']").hide();
                        }
                    })
                });
            }

            var crowdType = $$("#crowdType").val();
            if(crowdType==0){
                mobileModle();
            }else if(crowdType==1){
                appModle();
            }
        });


        $("#saveRule").on("click", function () {
            $(".modal-backdrop").hide();
            util.pageJump("page/taskManager/taskList.html");

        });

        $("#commitRule").on("click", function () {
            $(".modal-backdrop").hide();
            util.pageJump("page/taskManager/taskList.html");

        });


    };

    return fun;


});