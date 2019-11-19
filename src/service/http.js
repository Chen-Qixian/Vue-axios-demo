import axios from 'axios'
import service from './contactApi'
import {Toast} from 'vant'

// service 循环便利输出不同请求方法
let instance = axios.create({
    baseURL: 'http://localhost:9000/api',
    timeout: 1000
})
const Http = {};
// 请求格式统一
for(let key in service) {
    let api = service[key];  // url  method
    Http[key] = async function(
        params, // 请求参数 get: url, put, post, patch(data), delete: url
        isFormData=false, // 表示是否form-data请求
        config={} // 配置参数
    ) {
        let newParams = {};

        // content-type是否form-data判断
        if(params && isFormData) {
            newParams = new FormData();
            for(let i in params) {
                newParams.append(i, params[i]) 
            }
        }
        else {
            newParams = params;
        }
        // 不同请求的判断
        let response = {};
        if(api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try{
                response = await(instance[api.method](api.url, newParams, config))
            }
            catch(e){
                response = e;
            }
        }
        else if(api.method === 'delete' || api.method === 'get') {
            config.params = newParams;
            try{
                response = await instance[api.method](api.url, config);
            }
            catch(e) {
                response = e;
            }
        }
        return response; // 请求响应值
    }
}

// 添加拦截器
// 请求拦截器
instance.interceptors.request.use(config => {
    Toast.loading({
        mask: false,
        duration: 0, //一直都在
        forbidClick: true,
        message: '加载中'
    })
    return config;
}, () => {
    Toast.clear();
    Toast('请求错误，请求稍后重试')
})

// 响应拦截器
instance.interceptors.response.use(res => {
    Toast.clear();
    return res.data;
}, () => {
    Toast.clear();
    Toast('请求错误，请求稍后重试');
})

export default Http