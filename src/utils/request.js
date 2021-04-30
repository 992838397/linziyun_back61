// 引入
import axios from 'axios'

axios.defaults.baseURL = 'http://157.122.54.189:9083'
// 暴露
export default axios




axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('linziyun_back')
    if (token) {
        config.headers.Authorization = token
    }

    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});