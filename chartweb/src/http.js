import axios from 'axios'
import Vue from 'vue'
import router from './router'
//axios 配置
const http = axios.create({
    baseURL: 'http://localhost:9900',
    timeout: 10000
});
// 添加响应拦截器
http.interceptors.response.use(res => {
    Vue.$vux.loading.hide();
    if (res.data.status === 200) {
        return Promise.resolve(res.data)
    } else {
        return Promise.reject(res.data.error|| "出错了～")
    }
}, e => {
    Vue.$vux.loading.hide();
    return Promise.reject('网络异常')
});

// 添加请求拦截器
http.interceptors.request.use(config => {
    Vue.$vux.loading.show('请求中...');
    return config;
}, error => {
    Vue.$vux.loading.show('请求中...');
    return Promise.reject(error);
});


export default http;