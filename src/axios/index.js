
import axios from 'axios'
import {Loading} from 'element-ui'
import {Message} from 'element-ui';

axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.responseType = 'json';
axios.defaults.timeout = 0; //超时时间\
axios.defaults.validateStatus = function (status) {
  return true;
};


/*axios请求拦截*/
var loading;
function startLoading(showLoadingTime) {
  showLoadingTime=showLoadingTime||""
  loading = Loading.service({
    customClass:"axios-loading"+showLoadingTime,
    lock: true,
    text: '加载中……',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}


/*
 *@functionName: endLoading
 *@description: 关闭弹框
 *@author: sunny
 *@date: 2019-11-29 15:25:22
 *@version: V1.0.0
*/
function endLoading() {
  if (loading) {
    loading.close()
  }
}

/*
 *@author: sunny
 *@date: 2019-11-29 15:25:55
 *@starTimestamp: 请求开始时间戳
 *@endTimestamp: 请求结束时间戳
*/
var starTimestamp = (new Date()).valueOf();
var endTimestamp = (new Date()).valueOf();


/*
 *@description:请求拦截
 *@author: sunny
 *@date: 2019-11-29 15:26:44
*/
function axiosError(error){
  error.status=error.status||""
  var message="请求出错"+error.status+"！"
  Message({
    message: message,
    type: 'error'
  });
}

/*
 *@description:axios 请求拦截
 *@author: sunny
 *@date: 2019-12-20 15:48:52
*/
axios.interceptors.request.use(function (config) {
  if (config.showLoading) {
    starTimestamp = (new Date()).valueOf();
    startLoading(config.showLoadingTime);
  }
  if (!config.headers.Authorization) {
  }
  return config;
}, axiosError);




/*
 *@description:axios数据拦截
 *@author: sunny
 *@date: 2019-11-29 15:30:45
*/
axios.interceptors.response.use(function (response) {
  /*关闭遮罩层*/
  if (response.config.showLoading) {
    endTimestamp = (new Date()).valueOf();
    if (loading) endLoading();
  }
  let status = response.status;
  if (status >= "500" && status <= "599.99") {
    axiosError(response)
  } else if (status >= "400" && status <= "499.99") {
    axiosError(response)
  } else if (status >= "300" && status <= "399.99") {
    axiosError(response)
  } else if (status >= "200" && status <= "299.99") {
    return Promise.resolve(response.data);
  } else if (status < "200") {
    axiosError(response)
  } else {
    axiosError(response)
  }
  return Promise.resolve(false);
}, axiosError);
export default axios

