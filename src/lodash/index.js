var lodash = require('lodash');
lodash.setCookie = function setCookie(name, value) {
  if (!document.cookie) {
    return this
  }
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  return this
}
lodash.getCookie = function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
lodash.delCookie = function delCookie(name) {
  if (!document.cookie) {
    return this
  }
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
/*
 *@functionName: 时间格式化
 *@fmt: 返回时间格式
 *@date: 时间戳
 *@var timestamp1 = Date.parse(new Date());
 *@var timestamp2 = (new Date()).valueOf();
 *@var timestamp3 = new Date().getTime();
 *@description:
 *@see:dateFormat("YYYY-MM-DD hh:mm:ss", new Date())
 *@author: sunny
 *@date: 2019-12-23 10:12:22
 *@version: V1.0.0
 */
lodash.dateFormat = function (fmt, date) {
  if (!date || typeof (date - 0) != "number") {
    date = lodash.now()
  }
  let ret;
  date = new Date(date);
  let opt = {
    "Y+": date.getFullYear().toString(), // 年
    "M+": (date.getMonth() + 1).toString(), // 月
    "D+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "m+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}



/*
 *@functionName: 随机字母数字组合
 *@author: sunny
 *@date: 2019-12-23 10:12:22
 *@version: V1.0.0
 */
lodash.randomStrNum = function (length) {
  if(length>20){length=20}
  return (Math.random().toString(36).substr(2,20)+Math.random().toString(36).substr(2,20)).substr(0,length)
}

export default lodash