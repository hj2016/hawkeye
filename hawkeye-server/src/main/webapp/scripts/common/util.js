define(function (require, exports, module) {
    var fun = {};

    fun.numToMoneyValue = function (num) {
        var num = num + "";
        len = num.length;
        str = "";
        if (len == 0) {
            return;
        }
        var n= len % 3 ==0 ? parseInt(len / 3)-1:parseInt(len / 3)

        for (var i = 0; i <= n; i++) {
            var start = len-(3*(i+1));
            if(start<0){
                start = 0;
            }
            var end =len-(3*i);
            if(i==0){
                str = num.substring(start,end);
            }else{
                str = num.substring(start,end) +"," + str;
            }

        }
        return str;
    }

    // json 对象判断
    fun.isJson = function (str) {
        if (typeof str == 'string') {
            try {
                JSON.parse(str);
                return true;
            } catch (e) {
                /*console.log(e);*/
                return false;
            }
        }
    }

    fun.isMobile = function (str) {
        var g = /^1[3|4|5|6|7|8][0-9]{9}$/;
        return g.test(str);
    }

    // 判断是否为正整数

    fun.isPInt = function (str) {
        var g = /^[1-9]*[1-9][0-9]*$/;
        return g.test(str);
    }

    // 整数

    fun.isInt = function (str) {
        var g = /^-?\d+$/;
        return g.test(str);
    }


    // 判断是否是url 地址

    fun.isUrl = function (str) {
        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        //var reg = /((\w|=|\?|\.|\/|&|-)+)/g
        return reg.test(str);
    }

    //页面跳转方法
    fun.pageJump = function (url) {
        $.ajax({
            url: url,
            global: false,
            type: "POST",
            dataType: "html",
            async: false,
            success: function (data) {
                if (fun.isJson(data)) {
                    var data = JSON.parse(data);
                    if (data.data == false && data.resCode == "0001") {
                        alert(data.statMsg, function () {
                            window.location.href = 'login.html';
                        });
                    }
                } else {

                    //当前J_iframe类可见页面
                    var obj = $(".J_iframe:visible");
                    $(".J_iframe:visible").html(data);
                    obj.hide();
                    obj.fadeIn();
                }


            }
        })
    }

    fun.loadhtml = function (id, page) {
        $.ajax({
            url: page,
            global: false,
            type: "POST",
            dataType: "html",
            async: false,
            success: function (data) {
                if (fun.isJson(data)) {
                    var data = JSON.parse(data);
                    if (data.data == false && data.resCode == "0001") {
                        alert(data.statMsg, function () {
                            window.location.href = 'login.html';
                        });
                    }
                } else {
                    id.html(data);
                }

            }
        })
    }

    fun.reloadHtml = function (url) {
        var htmldata = "";
        $.ajax({
            url: url,
            global: false,
            type: "POST",
            dataType: "html",
            async: false,
            success: function (data) {
                if (fun.isJson(data)) {
                    var data = JSON.parse(data);
                    if (data.data == false && data.resCode == "0001") {
                        alert(data.statMsg, function () {
                            window.location.href = 'login.html';
                        });
                    }
                } else {
                    //当前J_iframe类可见页面
                    htmldata = data;
                    return;
                }


            }
        })
        return htmldata;
    }

    fun.selected = function (selected) {
        if (typeof (selected) == "object") {
            return $(selected);
        }
        var dataId = $("a[class='J_menuTab active']").attr("data-id");
        var jquery = $("div[data-id='" + dataId + "']").find(selected);
        $.extend(fun.selected, $);
        return jquery;
    }


    //全局返回方法
    returnPage = function (e) {
        var dataUrl = $(e.target).attr("data-url");
        var dataValue = $(e.target).attr("data-value");
        var dataMode = $(e.target).attr("data-mode");

        fun.pageJump(dataUrl);
        require(dataMode).init(dataValue);
    }

    // 时间格式化

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    // 根据值移出元素
    Array.prototype.remove = function(val) {
        for(var i=0; i<this.length; i++) {
            if(this[i] == val) {
                this.splice(i, 1);
                break;
            }
        }
    }

    return fun;

})