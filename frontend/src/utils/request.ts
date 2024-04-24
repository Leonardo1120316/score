import axios from 'axios'
import { message } from 'ant-design-vue';


let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})

request.interceptors.request.use((config)=>{
    return config
})

request.interceptors.response.use((response)=>{
    return response;
},(err)=>{
    if(err.response.data.msg == undefined){
    let notice = '';
    let status = err.response.status
    switch(status){
        case 401: notice = '登录过期';break;
        case 403: notice = '无权访问';break;
        case 404: notice = '请求地址错误';break;
        case 500: notice = '服务器出现问题';break;
        default: notice = '网络出现问题'
    }
    message.info(notice)
    }
    else{
        message.info(err.response.data.msg)
    }
})

export default request;