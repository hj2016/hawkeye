/**
 * Created by huangjing on 17-5-19.
 */
define(function(require, exports, module) {
    var fun = {};
    var $= require("util").selected;
    fun.init = function (id) {

        var conditionButton = "<button class='btn btn-default' style='margin-left: 5px;margin-right: 5px;margin-bottom: 5px' type='button'>{conditionName}</button>";

        var util = require("util");


        $.postAsync("/task/selectTask?id="+id,{}, function(data) {

            var tagData = "";
            $.postNoAsync("/tagType/getTagDiction",{},function (data) {
                tagData = data.data;

            });

            var conditionHtml = util.reloadHtml("/page/taskManager/taskCondition.html");
            var taskRuleHtml = util.reloadHtml("/page/taskManager/taskRule.html");

            var taskDetailForm = $("#taskDetailForm");
            $.setFields($("form")[0], data.data);


            for(var i=0 ; i<data.data.tagRules.length;i++){
                var tagRule = data.data.tagRules[i];
                var addtaskRuleHtml = taskDetailForm.append(taskRuleHtml);

                // 数据来源
                taskDetailForm.find("select").last().val(tagRule.datasource);
                // 包含条件
                var includes = JSON.parse(tagRule.include);
                for(var j=0; j<includes.length; j++){
                    var include = includes[j][0];
                    var tagname = "";
                    $.postNoAsync("/tagType/findTag?tagId="+include.tagId,{}, function(data) {
                        tagname = data.data.name
                    });
                    taskDetailForm.find(".has-success").last().parent().append(conditionHtml.replace("{dimensionName}",tagname));
                    var inrules = include.rule.split(",")
                    for(var ir=0;ir < inrules.length;ir++){
                        var inrule = inrules[ir];
                        var invalue = ""
                        if(typeof(tagData[include.tagId][inrule])== "undefined"){
                            invalue = inrule;
                        }else{
                            invalue = inrule+ ":" + tagData[include.tagId][inrule];
                        }
                        var condition = taskDetailForm.find(".condition").last();
                        condition.append(conditionButton.replace("{conditionName}",invalue));
                    }

                }
                var excludes = JSON.parse(tagRule.exclude);
                for(var n=0; n<excludes.length; n++){
                    var exclude = excludes[n][0];
                    var tagname = "";
                    $.postNoAsync("/tagType/findTag?tagId="+exclude.tagId,{}, function(data) {
                        tagname = data.data.name
                    });
                    taskDetailForm.find(".has-error").last().parent().append(conditionHtml.replace("{dimensionName}",tagname));
                    var exrules = exclude.rule.split(",")
                    for(var ir=0;ir < exrules.length;ir++){
                        var exrule = exrules[ir];
                        var exvalue = ""
                        if(typeof(tagData[exclude.tagId][exrule])== "undefined"){
                            exvalue = exrule;
                        }else{
                            exvalue = exrule+ ":" + tagData[exclude.tagId][exrule];
                        }
                        var condition = taskDetailForm.find(".condition").last();
                        condition.append(conditionButton.replace("{conditionName}",exvalue));
                    }
                }


            }

            // 隐藏删除按钮
            taskDetailForm.find(".delRule").hide();

            // 隐藏添加按钮
            taskDetailForm.find(".addCondition").hide();

            // 禁止选择
            taskDetailForm.find("select").attr("disabled",true);

            // 隐藏规则删除按钮
            taskDetailForm.find(".remove-condition").hide();
        });
    }
    return fun;

})