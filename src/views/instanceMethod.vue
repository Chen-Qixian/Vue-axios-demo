<template>
  <div>
    This page is for instance method
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    axios.get('/data.json').then((res) => {
      console.log(res);
    }),
    axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
        url: '/data.json',
        method: 'get,post,put,patch,delete', 
        headers: {
            token: ''
        }, // 请求头
        params: {}, //请求参数拼接在url后
        data: {}, // 数据放置与请求体中
    })
    // 优先级低 -> 高
    // 1.axios全局配置
    axios.defaults.timeout = 1000;
    axios.defaults.baseURL = 'http://localhost: 8080'
    // 2.axios实例配置
    let instance = axios.create()
    instance.defaults.timeout = 3000;
    // 3.axios请求配置
    instance.get('/data.json', {
        timeout: 5000
    })

    // 开发中两种请求接口：
    // http:localhost: 9090
    // http:localhost: 9091
    let instance = axios.create({
        baseURL: 'http:localhost:9090',
        timeout: 1000
    })
    let instance1 = axios.create({
        baseURL: 'http:localhost:9091',
        timeout: 3000
    })
    instance.get('/contactList', {
        params:{}
    }).then(res => {
        console.log(res);
    })

    instance1.get('/orderList', {
        timeout: 5000
    }).then(res => {
        console.log(res);
    })

    // 拦截器：请求/响应 被处理前，拦截他们
    // 请求拦截器
    axios.interceptors.request.use(
        config => {
            // 在发送请求前做些什么
            return config;
        },
        err => {
            // 在请求错误时响应什么
            return Promise.reject(err);
        }
    )
    // 响应拦截器
    axios.interceptors.response.use(
        res => {
            return res;
        },
        err => {
            return Promise.reject(err)
        }
    )
    // 取消拦截器
    let interceptors = axios.interceptors.request.use(
        config => {
            config.headers = {
                auth: true
            }
            return config;
        }       
    )
    axios.interceptors.request.eject(interceptors);
    let instance = axios.create({});
    instance.interceptors.request.use(
        config => {
            config.headers.token = '';
            return config;
        }
    )
    let instance_phone = axios.create({});
    instance_phone.interceptors.request.use(
        config => {
            $('#model').show();
            return config;
        }
    )
    instance_phone.interceptors.response.use(
        res => {
            $('#model').hide();
            return res;
        }
    )

    // 错误处理
    axios.interceptros.request.use (
        config => {
            return config;
        }
    ), err => {
        return Promise.reject(err);
    }
    axios.interceptors.response.use(
        res => {
            return res
        }
    ), err => {
        return Promise.reject(err);
    }

    axios.get('/data.json').then( res => {
        console.log(res);
    }).catch (err => {
        console.log(err);
    })

    let inst = axios.create({})
    inst.interceptors.request(
        config => {
            return config;
        }, err => {
            // 请求错误： http401超时 404
            $('#model').show();
            setTimeout(() => {
                $('#model').hide();
            }, 2000)
            return Promise.reject(err);
        }
    )
    inst.interceptors.reponse.use (
        res => {
            return res;
        }, err => {
            // 响应错误： http 500系统错误 502系统重启
            $('#model').show();
            setTimeout(() => {
                $('#model').hide();
            }, 2000)
            return Promise.reject(err);
        }
    )

    let source = axios.CancelToken.source();
    axios.get('/data.json', {
        cancelToken: source.token
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })

    source.cancel('cancel http');
  }
}
</script>
