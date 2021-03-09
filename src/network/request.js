import axios from "axios"
import router from "../router/index"
import Vue from "vue"

const request = axios.create({
    baseURL: "http://112.74.99.5:3000/web/api"
})

request.interceptors.request.use(config => {
    if(localStorage.getItem("token") && localStorage.getItem("id")) {
        config.headers.Authorization = "Bearer " + localStorage.getItem("token")
        // 在进行数据请求的时候，加上数据的请求头
    }
    return config
}, error => {
    return Promise.reject(error)
})

request.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response.status === 401 || error.response.status === 402) {
        router.push("/login")
        Vue.prototype.$alertInfo.fail(error.response.data.message)
        // 当响应报错并且状态码为401或402时，跳转到注册页面
    } 
    return Promise.reject(error)
})

export default request