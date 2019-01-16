var isdebug = true;
var service_url = 'http://tv.beben.cn';
var appname = 'tv_beben_cn';
var localStorageKey = 'tv_beben_';
//本地存储空间防止命名冲突
(function() {
    window.c = {
        set : function(b, a) {
            if ( typeof (a) == "object") {
                a = "obj-" + JSON.stringify(a)
            } else {
                a = "str-" + a
            }
            localStorage.setItem(localStorageKey + b, a)
        },
        get : function(b) {
            var a = localStorage.getItem(localStorageKey + b);
            if (a == null) {
                return false
            }
            if (a.indexOf("obj-") == 0) {
                return JSON.parse(a.slice(4))
            } else {
                return a.slice(4)
            }
        },
        del : function(a) {
            return localStorage.removeItem(localStorageKey + a)
        }
    }
})();
(function() {
    window.ajax = {
        callBack : {},
        index : 1,
        get : function(url, succCall, timeout) {
            url = service_url + '?do=' + url
            var id = this.index++;
            this.callBack[id] = [succCall];
            uexXmlHttpMgr.open(id, 'get', url, (timeout || 0));
            this._send(id);
        },
        post : function(url, data, succCall, timeout) {
            url = service_url + '?do=' + url
            var id = this.index++;
            this.callBack[id] = [succCall];
            uexXmlHttpMgr.open(id, 'post', url, (timeout || 0));
            if (data) {
                for (var k in data) {
                    uexXmlHttpMgr.setPostData(id, 0, k, data[k]);
                }
            }
            this._send(id);
        },
        _send : function(id) {
            uexXmlHttpMgr.onData = this.onData;
            uexXmlHttpMgr.send(id);

        },
        onData : function(inOpCode, inStatus, inResult) {

            var that = ajax,
                callBack = that.callBack[inOpCode] || [];
            if (inStatus == -1) {
                uexWindow.toast("0", "5", "连接不上网络^_^哦", "3000");
            } else if (inStatus == 1) {
                if (inResult.substr(0, 1) != "{") {
                    if (isdebug) {
                        alert(inResult);
                    } else {
                        uexWindow.toast("0", "5", "数据返回异常,请联系管理员", "3000");
                    }
                    return;
                }
                inResult = JSON.parse(inResult);
                if (inResult.status == -1) {
                    c.del('usermes');
                    O('login', 2);
                    appcan.window.evaluateScript({
                        name : 'index', //窗口名称
                        scriptContent : 'appcan.window.close();'
                    });
                    return;

                }

                callBack[0] && callBack[0](inResult);
            }
            delete that.callBack[inOpCode];
        }
    };
})();
function l(data) {
    if (console.log) {
        console.log(data);
    }
}



// window.onerror=function(msg,url,num){alert("错误："+msg+"\n\r网址："+url+"\n\r行号"+num);}
/**
 *  信息提示后跳转
 * @param {Object} text
 * @param {Object} frame
 * @param {Object} aniId_
 * @param {Object} type_
 */
function mes(text, frame, aniId_, type_) {
    var aniId = aniId_ || 0;
    var type = type_ || 4;
    appcan.window.alert({
        title : "提示",
        content : text,
        buttons : ['确定'],
        callback : function(err, data, dataType, optId) {

            appcan.window.open({
                name : frame,
                dataType : 0,
                aniId : aniId,
                type : type,
                data : frame + ".html"
            });

        }
    });
}

function reload_(text, aniId_, type_) {
    var aniId = aniId_ || 0;
    var type = type_ || 4;
    appcan.window.alert({
        title : "提示",
        content : text,
        buttons : ['确定'],
        callback : function(err, data, dataType, optId) {
            uexWindow.evaluateScript("", 0, "uexWindow.reload();");
        }
    });
}

/**
 *  alert 加强版
 * @param {Object} text
 */
function alert_(text) {
    if(uexWidgetOne.platformName=='Simulator')//测试环境,直接登陆
    {
        uexWindow.alert("提示",text,"确定");
    }
    else{
        uexWindow.alert({
          title:"提示",
          message:text,
          buttonLabel:"确定"
        });
    }
}

/*
 *  打开指定页面
 *
 */
function O(name, aniId_, type_) {
    var aniId = aniId_ || 0;
    var type = type_ || 0;

    appcan.window.open({
        name : name,
        dataType : 0,
        aniId : aniId,
        type : type,
        data : name + ".html"
    });

}

function get_post() {
    var data = {};
    data.platformName = uexWidgetOne.platformName;
    data.platformVersion = uexWidgetOne.platformVersion;
    if (c.get('usermes') != false) {
        data.userid = c.get('usermes').id;
        data.userkey = c.get('usermes').userkey;
    }
    return data;
}

var emoji = {
    "[\u5fae\u7b11]" : "ace_emoji_1.png",
    "[\u618b\u5634]" : "ace_emoji_2.png",
    "[\u8272]" : "ace_emoji_3.png",
    "[\u53d1\u5446]" : "ace_emoji_4.png",
    "[\u5f97\u610f]" : "ace_emoji_5.png",
    "[\u6d41\u6cea]" : "ace_emoji_6.png",
    "[\u5bb3\u7f9e]" : "ace_emoji_7.png",
    "[\u95ed\u5634]" : "ace_emoji_8.png",
    "[\u7761]" : "ace_emoji_9.png",
    "[\u5927\u54ed]" : "ace_emoji_10.png",
    "[\u5c34\u5c2c]" : "ace_emoji_11.png",
    "[\u53d1\u6012]" : "ace_emoji_12.png",
    "[\u8c03\u76ae]" : "ace_emoji_13.png",
    "[\u5472\u7259]" : "ace_emoji_14.png",
    "[\u60ca\u8bb6]" : "ace_emoji_15.png",
    "[\u96be\u8fc7]" : "ace_emoji_16.png",
    "[\u9177]" : "ace_emoji_17.png",
    "[\u51b7\u6c57]" : "ace_emoji_18.png",
    "[\u6293\u72c2]" : "ace_emoji_19.png",
    "[\u5410]" : "ace_emoji_20.png",
    "[\u5077\u7b11]" : "ace_emoji_21.png",
    "[\u6109\u5feb]" : "ace_emoji_22.png",
    "[\u767d\u773c]" : "ace_emoji_23.png",
    "[\u50b2\u6162]" : "ace_emoji_24.png",
    "[\u9965\u997f]" : "ace_emoji_25.png",
    "[\u56f0]" : "ace_emoji_26.png",
    "[\u60ca\u6050]" : "ace_emoji_27.png",
    "[\u6d41\u6c57]" : "ace_emoji_28.png",
    "[\u61a8\u7b11]" : "ace_emoji_29.png",
    "[\u60a0\u95f2]" : "ace_emoji_30.png",
    "[\u594b\u6597]" : "ace_emoji_31.png",
    "[\u5492\u9a82]" : "ace_emoji_32.png",
    "[\u7591\u95ee]" : "ace_emoji_33.png",
    "[\u5618]" : "ace_emoji_34.png",
    "[\u6655]" : "ace_emoji_35.png",
    "[\u75af\u4e86]" : "ace_emoji_36.png",
    "[\u8870]" : "ace_emoji_37.png",
    "[\u9ab7\u9ac5]" : "ace_emoji_38.png",
    "[\u6572\u6253]" : "ace_emoji_39.png",
    "[\u518d\u89c1]" : "ace_emoji_40.png",
    "[\u64e6\u6c57]" : "ace_emoji_41.png",
    "[\u62a0\u9f3b]" : "ace_emoji_42.png",
    "[\u9f13\u638c]" : "ace_emoji_43.png",
    "[\u7cd7\u5927\u4e86]" : "ace_emoji_44.png",
    "[\u574f\u7b11]" : "ace_emoji_45.png",
    "[\u5de6\u54fc\u54fc]" : "ace_emoji_46.png",
    "[\u53f3\u54fc\u54fc]" : "ace_emoji_47.png",
    "[\u54c8\u6b20]" : "ace_emoji_48.png",
    "[\u9119\u89c6]" : "ace_emoji_49.png",
    "[\u59d4\u5c48]" : "ace_emoji_50.png",
    "[\u5feb\u54ed\u4e86]" : "ace_emoji_51.png",
    "[\u9634\u9669]" : "ace_emoji_52.png",
    "[\u4eb2\u4eb2]" : "ace_emoji_53.png",
    "[\u5413]" : "ace_emoji_54.png",
    "[\u53ef\u601c]" : "ace_emoji_55.png",
    "[\u83dc\u5200]" : "ace_emoji_56.png",
    "[\u897f\u74dc]" : "ace_emoji_57.png",
    "[\u5564\u9152]" : "ace_emoji_58.png",
    "[\u7bee\u7403]" : "ace_emoji_59.png",
    "[\u4e52\u4e53]" : "ace_emoji_60.png"
};

function f_(str) {
    var faces = str.match(/\[.*?\]/g);
    for (var i in faces) {
        str = str.replace(faces[i], '<img src="wgtRes/emojicons/' + emoji[faces[i]] + '" />');
    }
    return str;
}

function getDateDiff(dateTimeStamp) {
    dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi, "/"));
    //转换为时间戳

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;

    var result = "";

    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        return result;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = parseInt(monthC) + "个月前";

    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";

    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前";

    } else if (hourC >= 1) {

        result = parseInt(hourC) + "小时前";

    } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";

    } else {
        result = "刚刚";
    }
    return result;
}

//倒计时
function getdiftime(dateTimeStamp, minu) {
    var second = 1000;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    var seC = Math.floor(diffValue / second);
    if (seC <= minu * 60) {
        return 300 - seC + "s";
    } else {
        return -1;
    }
}

function is_null(str) {
    if (!str || str == '' || String(str) == 'null') {
        return true;
    }
    return false;
}

//放大查看图片组
function bigimg(obj) {
    var data = {
        displayNavArrows : true,
        enableGrid : false,
        startOnGrid : false,
        startIndex : $(obj).attr("index"),
        data : []
    }
    $(obj).parent().find(".img").each(function() {
        data.data.push($(this).attr("img_b"));
    })
    var json = JSON.stringify(data);
    uexImage.openBrowser(json);

}

function s_pic(img) {
    if (!img)
        return;
    if (img.substr(0, 4) == 'http')
        return img;
    return service_base + img;
}

var getAppPlat = function() {//取当前系统类型
    if (uexWidgetOne.platformName.toLowerCase() == 'android') {
        return 1;
    }
    if (uexWidgetOne.platformName.toLowerCase() == 'ios') {
        return 0;
    }
    return -1;
}
function get_city() {
    uexLocation.onChange = function(lat, log) {
        uexLocation.getAddress(lat, log, 1);
    };
    uexLocation.cbGetAddress = function(opCode, dataType, data) {
        data = JSON.parse(data);

        c.set('city', data.addressComponent.city);
        //document.getElementById('adre').innerHTML = data.addressComponent.city;
        uexLocation.closeLocation();
    };
    uexLocation.openLocation();

}

function show_info_pic(obj) {
    var width = $(obj).find(".pic").eq(0).width() * 0.9;
    //总宽度
    var width1 = width * 0.33 - 5;
    var height1 = width1 * 2 + 5;

    $(obj).find(".pic_f").each(function() {
        var num = $(this).find(".img").length;
        $(this).find(".img").each(function() {
            if (num == 1) {
                $(this).css({
                    height : height1,
                    'max-width' : width
                });
            } else {
                if (getAppPlat() != 0) {
                    $(this).css({
                        width : width1,
                        height : width1,
                        margin : "0px 10px 0 0"
                    });
                } else {
                    $(this).css({
                        width : width1,
                        height : width1,
                        margin : "0px 5px 0 0"
                    });
                }

            }
        });
        $(this).removeClass("pic_f");

    });
    $(obj).find(".span_blank").css({
        width : width1,
        height : width1,
        margin : "0px 5px 0 0"
    });
}

function get_info_pic(photos) {
    var pic = '';
    var class_name = 'img';
    var index = 0;
    var n = photos.length;
    if (n == 1) {
        if (photos[0]['img_s'].substr(-1)) {
            class_name += ' img_w';
        } else {
            class_name += ' img_h';
        }
        pic += "<img class='" + class_name + "' index='" + index + "'  img_b='" + service_base + photos[0]['img_b'] + "' onclick='bigimg(this);' src='" + service_base + photos[0]['img_s'] + "' />";
    } else {
        for (var photo in photos) {
            var class_name = 'img';
            if (photos[photo]['img_s'].substr(-1) == '2') {
                class_name += ' ub-img-w';
            } else {
                class_name += ' ub-img-h';
            }
            var img_b = service_base + photos[photo]["img_b"];
            var img_s = service_base + photos[photo]["img_s"];
            pic += "<span class='" + class_name + "' index='" + index + "'  img_b='" + img_b + "' onclick='bigimg(this);' style='background-image:url(" + img_s + ");' ></span>";
            if (n == 4 && index == 1) {
                pic += "<span class='span_blank'></span>";
            }++index;
        }
    }
    return pic;
}

function base64_encode(str) {
    var c1,
        c2,
        c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var i = 0,
        len = str.length,
        string = '';

    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt((c1 & 0x3) << 4);
            string += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt((c2 & 0xF) << 2);
            string += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        string += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return string
}

/*
 * Javascript base64_decode() base64解密函数
 * @param string str base64加密字符串
 * @return string 解密后的字符串
 */
function base64_decode(str) {
    var c1,
        c2,
        c3,
        c4;
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var i = 0,
        len = str.length,
        string = '';

    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (
        i < len && c1 == -1
        );

        if (c1 == -1)
            break;

        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (
        i < len && c2 == -1
        );

        if (c2 == -1)
            break;

        string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return string;

            c3 = base64DecodeChars[c3]
        } while (
        i < len && c3 == -1
        );

        if (c3 == -1)
            break;

        string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return string;
            c4 = base64DecodeChars[c4]
        } while (
        i < len && c4 == -1
        );

        if (c4 == -1)
            break;

        string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return string;
}

/**
 * 判断值是否在数组里面
 * @param {Object} val	值
 * @param {Object} arr  数组
 */
function in_array(val, arr) {
    for (var i in arr) {
        if (arr[i] == val) {
            return true;
        }
    }
    return false;
}

function int(str) {
    return parseInt(str)
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
/**
 * base64编码
 * @param {Object} str
 */
function base64encode(str) {
    var out,
        i,
        len;
    var c1,
        c2,
        c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

/**
 * base64解码
 * @param {Object} str
 */
function base64decode(str) {
    var c1,
        c2,
        c3,
        c4;
    var i,
        len,
        out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

/**
 * utf16转utf8
 * @param {Object} str
 */
function utf16to8(str) {
    var out,
        i,
        len,
        c;
    out = "";
    len = str.length;
    for ( i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

/**
 * utf8转utf16
 * @param {Object} str
 */
function utf8to16(str) {
    var out,
        i,
        len,
        c;
    var char2,
        char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            // 0xxxxxxx
            out += str.charAt(i - 1);
            break;
        case 12:
        case 13:
            // 110x xxxx 10xx xxxx
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
        case 14:
            // 1110 xxxx10xx xxxx10xx xxxx
            char2 = str.charCodeAt(i++);
            char3 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
            break;
        }
    }
    return out;
}
if (c.get('faceImages') == false) {
    c.set('faceImages', {});
}
function get_face(id)
{
	var rs = c.get('faceImages');
	var key = 'id_'+id;
	if (typeof(rs.key) == "undefined")
	{
		return "res://face.png";
	}
	return rs.key;
}

function set_face(id,url)
{
	var rs = c.get('faceImages');
	var key = 'id_'+id;
	eval("rs."+key+" = url");
	c.set('faceImages', rs)
}
function get_map_face(url,user)
{
	var tmp =  service_url+"?do=get_gaode_face&plat="+uexWidgetOne.platformName+"&userName="+encodeURI(user)+"&url="+url;
	return encodeURI(tmp);
}

function int(a)
{
    return parseInt(a);
}
function int_float(a)
{
    return parseFloat(a).toFixed(2);
}


function get_face(url)
{
    if(url.substring(0,4)=='http')
    {
        return url;
    }
    return service_base+url;
}


    //加法
    function accAdd(num1, num2) {
        var r1,
            r2,
            m;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch(e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch(e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        // return (num1*m+num2*m)/m;
        return Math.round(num1 * m + num2 * m) / m;
    }

    // 减法
    function accSub(num1, num2) {
        var r1,
            r2,
            m;
        try {
            r1 = num1.toString().split('.')[1].length;
        } catch(e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split(".")[1].length;
        } catch(e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
    }

    // 除法
    function accDiv(num1, num2) {
        var t1,
            t2,
            r1,
            r2;
        try {
            t1 = num1.toString().split('.')[1].length;
        } catch(e) {
            t1 = 0;
        }
        try {
            t2 = num2.toString().split(".")[1].length;
        } catch(e) {
            t2 = 0;
        }
        r1 = Number(num1.toString().replace(".", ""));
        r2 = Number(num2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }

    //乘法
    function accMul(num1, num2) {
        var m = 0,
            s1 = num1.toString(),
            s2 = num2.toString();
        try {
            m += s1.split(".")[1].length
        } catch(e) {
        };
        try {
            m += s2.split(".")[1].length
        } catch(e) {
        };
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }
/**
 * 日期格式化函数
 * @param {Object} fmt
 */
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
function sys(num)
{
    var system = {1:'simulator',2:'android',3:'ios'};
    return  ( system[num] == uexWidgetOne.platformName.toLowerCase() ) ? true:false;
}
