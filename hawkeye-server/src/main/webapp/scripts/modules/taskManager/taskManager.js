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

        // Some logic to retrieve, or generate tree structure
        /*var datajson = [{
            text: "会员维度",
            selectable: false,
            tags: {id: 1, name: "会员维度", parentId: "-1", updateTime: ""},
            nodes: [{
                text: "事业部",
                tags: {
                    id: 1,
                    name: "事业部",
                    tagTypeId: "1",
                    tagId: "u0001",
                    choiceType: "1",
                    valKvs: "2001:商城事业部,2002:平台事业部,1001:门店事业部,2003:跨境电商事业部"
                }
            },
                {
                    text: "区域",
                    tags: {id: 2, name: "区域", tagTypeId: "1", tagId: "u0002", choiceType: "2", valKvs: ""}
                },
                {
                    text: "最后一次购物日期",
                    tags: {id: 3, name: "最后一次购物日期", tagTypeId: "1", tagId: "u0003", choiceType: "3", valKvs: ""}
                },
                {
                    text: "门店",
                    tags: {
                        id: 4,
                        name: "门店",
                        tagTypeId: "1",
                        tagId: "u0003",
                        choiceType: "4",
                        valKvs: "0010121:汉口北营运部,0010124:汉十营运部,0010321:,0010322:,1012100:汉口北营运部本部,1012101:原中山区,1012102:发展大道区,1012103:花桥区,1012104:二七区,1012105:新华家园区,1012106:,1012107:,1012108:台北路区,1012109:黄陂区,1012110:,1012111:百步亭区,1012201:光谷区,1012202:关山区,1012203:街道口区,1012204:洪山区,1012205:江夏区,1012206:鲁巷区,1012207:,1012208:,1012209:积玉桥区,1012210:,1012301:郭茨口区,1012302:沌口区,1012303:钟家村区,1012304:汉阳大道区,1012305:,1012306:,1012307:,1012308:,1012309:,1012310:江汉区,1012401:襄城大区,1012402:,1012403:五堰大区,1012404:随州大区,1012405:六堰大区,1012406:,1012407:樊城大区,1012408:襄州大区,1012501:沙市大区,1012502:,1012503:宜昌西区,1012504:,1012505:石首大区,1012506:恩施大区,1012507:荆州大区,1012508:宜昌东区,1012509:,1012510:仙潜大区,1012511:钟祥大区,1012601:咸宁大区,1012602:黄石港区,1012603:鄂州大区,1012604:大冶大区,1012605:黄冈大区,1012606:黄石万达区,1012607:赤壁新区,1012608:黄冈外围,1012609:鄂州新城区,1013101:新业务区,1012701:锦江区,1012801:中山区,1012802:吴家山区,1012803:万松园区,1012804:世贸区,1012805:古田区,1012806:江汉区,1012807:硚口区,1012901:,1012903:,1013001:青山区,1013002:徐东区,1013003:和平大道区,1013004:大洲区,1013201:中南区,1013202:司门口区,1013203:南湖区,1013204:亚贸区,1013205:积玉桥区,1013206:东门区,1013207:保利区,1013401:孝东大区,1013402:孝南大区,1013403:仙桃大区,1013404:潜江大区,1013405:荆门大区,1022101:长沙黄兴南路区,1022102:长沙韶山南路区,1022103:长沙韶山北路区,1022104:长沙芙蓉中路区,1022105:长沙人民路区,1022106:长沙岳麓区,1022108:长沙星沙大区,1022113:长沙地铁大区,1032205:上饶大区,1022301:衡阳大区,1022302:湘潭大区,1022303:株洲大区,1022304:永州大区,1022305:郴州大区,1022306:衡阳东大区,1022307:衡阳西大区,1022308:株洲东大区,1022309:株洲北大区,1022401:岳阳大区,1022402:益阳大区,1022403:常德大区,1022404:张家界大区,1022501:邵阳大区,1022502:娄底大区,1022503:吉首大区,1022504:怀化大区,1032101:南昌上海路区,1032102:南昌八一广场区,1032104:南昌叠山区,1032105:南昌站前区,1032106:南昌红谷滩区,1032107:南昌洪城区,1032108:南昌中山区,1032201:,1032202:赣州大区,1032203:宜春大区,1032207:瑞金大区,1032208:吉安大区,1032209:九江大区,1032210:新余大区,1032211:庐山大区,1032301:抚州大区,1032302:上饶大区,1032303:景德镇大区,1032304:鹰潭大区,1042101:成都锦江区,1042102:成都成华区,1042104:成都金牛区,1042108:成都望江区,1042109:成都武锦区,1042110:成都广北区,1042301:成都武侯区,1042305:成都青羊区,1042306:成都金沙区,1042307:成都高新区,1042310:成都沙湾区,1042311:成都双楠区,1082101:商城大区,1082102:绿城大区,1082103:北环大区,1082104:紫荆大区,1082105:郑东大区,1082106:东风大区,1082107:中原大区,0112402:荆州北营运部南阳大区,0113206:武昌南营运部东门区,0132107:南昌营运部南昌洪城区,0132109:南昌营运部南昌洪都区,0132110:南昌营运部南昌胜利大区,0132111:南昌营运部南昌莲塘区,0132210:赣西营运部新余大区,0132211:赣西营运部庐山大区,0132212:赣西营运部浔阳大区,0182111:郑州营运部伏牛大区,0113005:汉口东营运部解放大道区,0142110:成都东营运部成都广北区,0100101:未知,0102001:华东营运一部,0112102:汉口北营运部发展大道区,0112103:汉口北营运部花桥区,0112104:汉口北营运部二七区,0112105:汉口北营运部新华家园区,0112109:汉口北营运部黄陂区,0112112:汉口北营运部盘龙城区,0112113:汉口北营运部新荣区,0112201:武昌东营运部光谷区,0112202:武昌东营运部关山区,0112203:武昌东营运部街道口区,0112204:武昌东营运部洪山区,0112205:武昌东营运部江夏区,0112206:武昌东营运部鲁巷区,0112207:武昌东营运部藏龙岛区,0112301:汉阳营运部郭茨口区,0112302:汉阳营运部沌口区,0112303:汉阳营运部钟家村区,0112304:汉阳营运部汉阳大道区,0112305:汉阳营运部硚口区,0112401:荆州北营运部襄城大区,0112403:荆州北营运部五堰大区,0112404:荆州北营运部随州大区,0112405:荆州北营运部六堰大区,0112407:荆州北营运部樊城大区,0112408:荆州北营运部襄州大区,0112501:荆州南营运部沙市大区,0112502:荆州南营运部恩施东区,0112504:荆州南营运部宜昌夷陵区,0112505:荆州南营运部石首大区,0112507:荆州南营运部荆州大区,0112509:荆州南营运部宜昌西陵区,0112510:荆州南营运部恩施西区,0112511:荆州南营运部宜昌伍家岗,0112601:鄂东营运部咸宁大区,0112603:鄂东营运部鄂州大区,0112604:鄂东营运部大冶大区,0112605:鄂东营运部黄冈大区,0112606:鄂东营运部黄石万达区,0112607:鄂东营运部赤壁新区,0112608:鄂东营运部黄冈外围,0112609:鄂东营运部鄂州新城区,0112610:鄂东营运部黄石新街口区,0112801:汉口南营运部中山区,0112802:汉口南营运部吴家山区,0112803:汉口南营运部万松园区,0112804:汉口南营运部世贸区,0112805:汉口南营运部古田区,0112806:汉口南营运部江汉区,0112808:汉口南营运部解放大道区,0113001:汉口东营运部青山区,0113002:汉口东营运部徐东区,0113003:汉口东营运部和平大道区,0113004:汉口东营运部大洲区,0113006:汉口东营运部二七区,0113201:武昌南营运部中南区,0113202:武昌南营运部司门口区,0113203:武昌南营运部南湖区,0113204:武昌南营运部亚贸区,0113205:武昌南营运部积玉桥区,0113207:武昌南营运部保利区,0113208:武昌南营运部白沙洲区,0113401:荆州东营运部孝东大区,0113402:荆州东营运部孝南大区,0113403:荆州东营运部仙桃大区,0113404:荆州东营运部潜江大区,0113405:荆州东营运部荆门大区,0113406:荆州东营运部钟祥大区,0113501:华南营运一部福田区,0113601:新品类营运部创业一区,0122102:长沙营运部长沙韶山南路区,0122103:长沙营运部长沙韶山北路区,0122104:长沙营运部长沙芙蓉中路区,0122105:长沙营运部长沙人民路区,0122106:长沙营运部长沙岳麓区,0122107:长沙营运部长沙湘江中路区,0122108:长沙营运部长沙星沙大区,0122109:长沙营运部长沙八一路区,0122302:湘南营运部湘潭大区,0122304:湘南营运部永州大区,0122305:湘南营运部郴州大区,0122306:湘南营运部衡阳东大区,0122307:湘南营运部衡阳西大区,0122308:湘南营运部株洲东大区,0122309:湘南营运部株洲北大区,0122310:湘南营运部衡阳大区,0122311:湘南营运部株洲大区,0122401:湘北营运部岳阳大区,0122402:湘北营运部益阳大区,0122403:湘北营运部常德大区,0122404:湘北营运部张家界大区,0122501:湘西营运部邵阳大区,0122502:湘西营运部娄底大区,0122503:湘西营运部吉首大区,0122504:湘西营运部怀化大区,0122601:湘北组常德大区,0122602:湘北组益阳大区,0122603:湘北组岳阳北大区,0122604:湘北组岳阳南大区,0122605:湘北组张家界大区,0122701:湘南组郴州大区,0122702:湘南组衡阳东大区,0122703:湘南组衡阳西大区,0122704:湘南组湘潭大区,0122705:湘南组永州大区,0122801:湘西组洪江大区,0122802:湘西组怀化大区,0122803:湘西组吉首大区,0122804:湘西组娄底大区,0122805:湘西组邵阳大区,0122901:长沙南组长沙八一路区,0132306:赣东营运部珠山大区,0122902:长沙南组长沙人民路区,0122903:长沙南组长沙韶山南路区,0122904:长沙南组株洲北大区,0122905:长沙南组株洲东大区,0123001:长沙北组长沙大学城区,0123002:长沙北组长沙芙蓉中路区,0123003:长沙北组长沙湘江中路区,0123004:长沙北组长沙星沙大区,0123005:长沙北组长沙岳麓区,0132101:昌北营运部南昌上海路区,0132102:昌北营运部南昌站前区,0132103:昌北营运部浔阳大区,0132104:昌北营运部九江大区,0132105:昌北营运部庐山大区,0132106:昌北营运部南昌洪都区,0132202:赣南营运部赣州大区,0132203:赣南营运部宜春大区,0132207:赣南营运部瑞金大区,0132208:赣南营运部吉安大区,0132209:赣南营运部新余大区,0132301:赣东营运部抚州大区,0132302:赣东营运部上饶大区,0132303:赣东营运部景德镇大区,0132304:赣东营运部鹰潭大区,0132305:赣东营运部信州大区,0132401:昌南营运部南昌八一广场区,0132402:昌南营运部南昌叠山区,0132403:昌南营运部南昌红谷滩区,0132404:昌南营运部南昌洪城区,0132405:昌南营运部南昌蛟桥区,0132406:昌南营运部南昌莲塘区,0132407:昌南营运部南昌胜利大区,0132501:昌北组九江大区,0132502:昌北组开发大区,0132503:昌北组庐山大区,0132504:昌北组南昌站前区,0132505:昌北组浔阳大区,0132601:昌南组南昌八一广场区,0132602:昌南组南昌叠山区,0132603:昌南组南昌洪都区,0132604:昌南组南昌上海路区,0132605:昌南组南昌胜利大区,0132701:赣东组景德镇大区,0132702:赣东组上饶大区,0132703:赣东组信州大区,0132704:赣东组鹰潭大区,0132705:赣东组珠山大区,0132801:赣南组赣州大区,0132802:赣南组吉安大区,0132803:赣南组瑞金大区,0132804:赣南组新余大区,0132805:赣南组宜春大区,0132901:红城组抚州大区,0132902:红城组南昌红谷滩区,0132903:红城组南昌洪城区,0132904:红城组南昌蛟桥区,0132905:红城组南昌莲塘区,0142101:成都东营运部成都锦江区,0142102:成都东营运部成都成华区,0142104:成都东营运部成都金牛区,0142108:成都东营运部成都望江区,0142109:成都东营运部成都武锦区,0142111:成都东营运部成都沙河区,0142112:成都东营运部成都新都区,0142113:成都东营运部成都龙泉区,0142301:成都西营运部成都武侯区,0142305:成都西营运部成都青羊区,0142306:成都西营运部成都金沙区,0142307:成都西营运部成都高新区,0142310:成都西营运部成都蜀汉区,0142311:成都西营运部成都双楠区,0142312:成都西营运部成都西江区,0142313:成都西营运部华阳大区,0142314:成都西营运部郫县大区,0142315:成都西营运部双流大区,0142316:成都西营运部温江大区,0142501:成都外围营运部德阳大区,0142502:成都外围营运部蜀南大区,0142504:成都外围营运部资阳大区,0142505:成都外围营运部绵阳大区,0142506:成都外围营运部南充大区,0142507:成都外围营运部自贡大区,0142508:成都外围营运部达州大区,0142509:成都外围营运部眉山大区,0182101:郑州营运部商城大区,0182102:郑州营运部绿城大区,0182103:郑州营运部北环大区,0182104:郑州营运部紫荆大区,0182105:郑州营运部郑东大区,0182106:郑州营运部东风大区,0182107:郑州营运部中原大区,0182108:郑州营运部黄河大区,0182109:郑州营运部天中大区,0182110:郑州营运部洛阳大区,0182201:豫南营运部伏牛大区,0182202:豫南营运部绿城大区,0182203:豫南营运部商城大区,0182204:豫南营运部天中大区,0182205:豫南营运部中原大区,0182206:豫南营运部紫荆大区,0182207:豫南营运部信阳大区,0182301:豫北营运部北环大区,0182302:豫北营运部东风大区,0182303:豫北营运部黄河大区,0182304:豫北营运部郑东大区,0182305:豫北营运部开新大区,0182306:豫北营运部洛阳大区,0182307:豫北营运部轩辕大区,0142503:成都外围营运部乐山大区"
                    }
                }]
        }]*/
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
        $$("#selectTask").modal('show');
        // 推送方式选择弹出框
        $$("#mobileMessage").on("click",function () {
            $$("#crowdType").val("0");
            $$("#taskTitle").text("新建手机短信营销任务");
            $$("input[name='taskName']").attr("placeholder","例如：xx店新店开业手机短信群发")
            mobileModle();

        });

        $$("#appMessage").on("click",function () {
            $$("#crowdType").val("1");
            $$("#taskTitle").text("新建app消息营销任务");
            $$("input[name='taskName']").attr("placeholder","例如：xx店新店开业app消息推送")
            appModle();
        });

        // $$("#mobileMessage").click();


        // 初始化次数限制
        $("#range").ionRangeSlider({
            type: "double",
            min: 0,
            max: 20,
            step: 1,
            from: 0,
            to: 20,
            grid: true
        });

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