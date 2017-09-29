(function ($) {
    // 推荐div
    var segHtml = "<div class='tt-suggestion tt-selectable' data-target='{id}'>{text}</div>";
    // 选中span 标签
    var divspan = "<span class='tag label label-success'>{value}<input type='hidden' value='{value}' class='tagValue' /><span data-role='remove'></span></span>";

    var seggDivHigh = 28;

    var menuDivHigh = 154;

    var limit = 5;

    $.fn.getSelected = function () {
        var tagValue = $(this).find(".tagValue");
        var arr = [];
        tagValue.each(function () {
            arr.push($(this).val());
        });
        return arr;
    }

    $.fn.searchInput = function (config) {
        //config.data 数据源
        var selected = [];
        // 初始化
        

        $(this).off("keydown");
        $(this).on("keydown", function (e) {
            switch (e.which) {
                case 8: {
                    // 删除键
                    var val = $(this).find("input[name='search-input']").val();
                    if (val == "") {
                        $(this).find(".tag.label:last").remove();
                        selected.pop($(this).find(".tag.label:last").text());
                        console.log(selected.toString())
                    }
                    break;
                }
                case 40: {
                    e.preventDefault();
                    break;
                }
                case 38: {
                    e.preventDefault();
                    break;
                }
            }
        })


        // 监听页面键盘按下事件
        $(this).off("keyup");
        $(this).on("keyup", function (e) {
            var activediv = $(this).find(".active");
            var inputsearch = $(this)
            switch (e.which) {
                case 40: {
                    // 下键
                    if (activediv.size() == 0) {
                        $(this).find(".tt-suggestion.tt-selectable:first").addClass("active");
                    } else {
                        var activeNext = activediv.next();
                        if (activeNext.length != 0) {
                            activediv.removeClass("active");
                            activeNext.addClass("active");

                            // 判断是否向下滑动
                            var top = activediv.position().top + (seggDivHigh * 2);
                            if (top > menuDivHigh) {
                                var scrollTop = $(this).find(".tt-menu").scrollTop();
                                $(this).find(".tt-menu").scrollTop(scrollTop + seggDivHigh);
                            }
                        }

                    }
                    e.preventDefault();
                    break;
                }
                case 38: {
                    // 上键
                    if (activediv.size() == 0) {
                        $(this).find(".tt-suggestion.tt-selectable:first").addClass("active");
                    } else {
                        var activePrev = activediv.prev();
                        if (activePrev.length != 0) {
                            activediv.removeClass("active");
                            activePrev.addClass("active");

                            // 判断是否向上滑动
                            var top = activediv.position().top - seggDivHigh;
                            if (top < 5) {
                                var scrollTop = $(this).find(".tt-menu").scrollTop();
                                $(this).find(".tt-menu").scrollTop(scrollTop - seggDivHigh);
                            }
                        }
                    }
                    e.preventDefault();
                    break;
                }
                case 13: {
                    // 回车键
                    var _divspan = divspan.replace(/{value}/g, activediv.text());
                    $(this).find(".tag.label:last").after(_divspan);
                    selected.push($(this).text());
                    activediv.remove();
                    $(this).find("input[name='search-input']").val("");
                    inputsearch.find(".tt-dataset.tt-dataset-states").empty();
                    inputsearch.find(".tt-menu").hide();
                    break;
                }
                default: {
                    // 获取输入框search-input
                    var val = $(this).find("input[name='search-input']").val();
                    var segdiv = $(this).find(".tt-dataset.tt-dataset-states");
                    segdiv.empty();
                    for (var i = 0; i < config.data.length; i++) {
                        var tagkv = config.data[i];
                        var flag = true;
                        if (tagkv.indexOf(val) != -1) {
                            // 过滤已经选中的
                            for (var j = 0; j < selected.length; j++) {
                                if (selected[j] == tagkv) {
                                    flag = false;
                                    break;
                                }
                            }

                            if (flag) {
                                var _segHtml = segHtml.replace(/{text}/g, tagkv).replace(/{id}/g, i);
                                segdiv.append(_segHtml);
                            }

                        }
                    }
                    // 加入鼠标进入事件
                    $(this).find(".tt-suggestion.tt-selectable").on("mouseenter", function (e) {
                        segdiv.find(".tt-suggestion.tt-selectable").removeClass("active");
                        $(this).addClass("active");
                    });
                    // 加入鼠标移出
                    $(this).find(".tt-suggestion.tt-selectable").on("mouseleave", function (e) {
                        $(this).removeClass("active");
                    });
                    // 加入点击事件
                    $(this).find(".tt-suggestion.tt-selectable").on("click", function (e) {
                        var _divspan = divspan.replace(/{value}/g, $(this).text());
                        inputsearch.prepend(_divspan);
                        selected.push($(this).text());
                        $(this).remove();
                        inputsearch.find("input[name='search-input']").val("");
                        inputsearch.find("input[name='search-input']").focus();
                        inputsearch.find(".tt-dataset.tt-dataset-states").empty();
                        inputsearch.find(".tt-menu").hide();
                        // remove 按钮加入事件
                        inputsearch.find("span[data-role='remove']").off("click");
                        inputsearch.find("span[data-role='remove']").on("click", function () {
                            var removeDiv = $(this).parent();
                            selected.pop(removeDiv.text());
                            removeDiv.remove();
                        });

                    });

                    if($(this).find(".tt-suggestion.tt-selectable").length < limit){
                        $(this).find(".tt-menu").css("height","");
                    }else{
                        $(this).find(".tt-menu").css("height",menuDivHigh);
                    }
                    $(this).find(".tt-menu").show();
                }
            }

        });
    };


})(jQuery);