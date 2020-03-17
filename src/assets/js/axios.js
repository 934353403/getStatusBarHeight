//router
import router from "@/router/index"; //引入路由对象
import { Toast,Dialog } from "vant"; //引入vant提示框
//原生交互
import WebDemo from './webdemo.js'
var demo = new WebDemo;

// axios
import axios from 'axios'
import qs from "qs";
import { baseURL } from './common.js' //域名引入
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000; //超时毫秒 60s
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//请求头



// axios请求拦截
axios.interceptors.request.use(config =>{
    // 在发送请求之前做些什么:
    // config.headers['token'] = 'c5d1b483-18c8-4690-b829-48b8f525f527';
    
    // loading
    // Toast.loading({
    //     // icon: require('../images/icons/loading.gif'),
    //     duration: 0, // 持续展示 toast
    //     forbidClick: true, // 禁用背景点击
    //     mask: false, // 是否显示遮罩层
    //     // message: '数据加载中...',
    // });
    
    // 特定接口不显示数据加载中
    // if (config.url.includes('/api/mobile/index.php?w=member_favorites&t=favorites_add')) {
    //     // 清除加载动画
    //     Toast.clear();
    // } else {
    //     Toast.loading({
    //         duration: 0, // 持续展示 toast
    //         forbidClick: true, // 禁用背景点击
    //         mask: false, // 是否显示遮罩层
    //         message: '数据加载中...',
    //     });
    // }
    
    return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
})


// axios响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 404请求不存在
                case 404:
                    Toast.fail({
                        message: "网络请求不存在",
                        duration: 2000,
                        forbidClick: true
                    });
                    break;
                case 500:
                    Toast.fail({
                        message: '内部服务器错误',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                    // 其他错误，直接抛出错误提示
                default:
                    Toast.fail({
                        message: error.response.data.msg,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);




/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params = {}) {
    let token = localStorage.getItem('token') || '';
    
    if (params.__proto__.constructor.name == "Object") {
        token && (params.token = token);
        params = qs.stringify(params);
    } else if (params.__proto__.constructor.name == "FormData") {
        token && (params.append("token", token));
    }

    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            Toast.clear();
            if (res.data.status == -1) {
                Toast.fail({
                    message: "登录过期，请重新登录!",
                    duration: 2000,
                    forbidClick: true
                });
                localStorage.clear();
                setTimeout(() => {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
                return;
            } else if (res.data.status == 0) {
                Toast.fail({
                    message: res.data.msg,
                    duration: 2000,
                    forbidClick: true
                });
                resolve(res.data)
            }else{
                resolve(res.data);
            }
        })
        .catch(error => {
            Toast.clear();
            if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
                Toast.fail({
                    message: '请求超时,请稍后重试!',
                    duration: 2000,
                    forbidClick: true
                });
            } else if (error.message == 'Network Error') {
                Toast.fail({
                    message: '请求超时,请稍后重试!',
                    duration: 2000,
                    forbidClick: true
                });
            }else{
                Toast.fail({
                    message: '网络请求错误',
                    duration: 2000,
                    forbidClick: true
                });
            }
            reject(error.data)
        })
    });
}

var http = {
    get,
    post
};
export default http;
