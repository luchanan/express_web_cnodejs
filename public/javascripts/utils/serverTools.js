module.exports = {
    stringFormat: function (str) {
        // string字符串站位符号
        var result = arguments[0];
        if (arguments.length > 0) {
            if (arguments.length == 2 && typeof(arguments[1]) == "object") {
            for (var key in arguments[1]) {
                if (arguments[1][key] != undefined) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, arguments[1][key]);
                }
            }
            } else {
            for (var i = 1; i < arguments.length; i++) {
                if (arguments[i] != undefined) {　　　　　　　　　　　　
                var reg = new RegExp("({)" + (i - 1) + "(})", "g");
                result = result.replace(reg, arguments[i]);
                }
            }
            }
        }
        return result;
    }
}