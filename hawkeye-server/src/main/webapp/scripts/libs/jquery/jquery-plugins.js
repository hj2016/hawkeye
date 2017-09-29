(function ($) {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    $.indexOf = function (value, array, opt_fromIndex) {
        var fromIndex = opt_fromIndex == null ? 0 : (opt_fromIndex < 0 ? Math
            .max(0, array.length + opt_fromIndex) : opt_fromIndex);

        for (var i = fromIndex; i < array.length; i++) {
            if (i in array && array[i] === value)
                return i;
        }
        return -1;
    }
    $._setFieldValue = function (field, value) {
        if (field.type === 'checkbox') {
            if (field.value == '' + value
                || ($.isArray(value) && $.inArray(field.value, value) !== -1)) {
                $(field).attr('checked', true);
            } else {
                $(field).attr('checked', false);
            }
        } else if (field.type === 'radio') {
            if (field.value == '' + value) {
                $(field).attr('checked', true);
            } else {
                $(field).attr('checked', false);
            }
        } else {
            $(field).val(value);
        }
    }
    $.setField = function (form, fieldName, value) {
        var fields = form.elements[fieldName];
        if (fields && fields.type) {
            $._setFieldValue(fields, value);
        } else if ($.isArray(fields) || (fields && fields.length)) {
            for (var i = 0; i < fields.length; i++) {
                $._setFieldValue(fields[i], value);
            }
            /*$.each(fields, function(field) {
             $._setFieldValue(field, value);
             });*/
        }
    }
    $.setFields = function (form, obj) {
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                $.setField(form, name, obj[name]);
            }
        }
    }
    $.postAsync = function (url, param, callback) {
        $.ajax({
            "type": "post",
            "url": url,
            "dataType": "json",
            "data": JSON.stringify(param),
            "contentType": "application/json",
            "success": callback,
            "complete": function (event, request, settings) {
                if (event.responseJSON.data == false && event.responseJSON.resCode == "0001") {
                    alert(event.responseJSON.statMsg, function () {
                        window.location.href = 'login.html';
                    });
                }
            },
            "async": true
        });
    }

    $.postNoAsync = function (url, param, callback) {
        $.ajax({
            "type": "post",
            "url": url,
            "dataType": "json",
            "data": JSON.stringify(param),
            "success": callback,
            "complete": function (event, request, settings) {
                if (event.responseJSON.data == false && event.responseJSON.resCode == "0001") {
                    alert(event.responseJSON.statMsg, function () {
                        window.location.href = 'login.html';
                    });
                }
            },
            "contentType": "application/json",
            "async": false
        });
    }
})(jQuery);