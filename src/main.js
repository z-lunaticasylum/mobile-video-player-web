import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from "vant"
// 导入vant样式框架
import request from "./network/request"
// 导入网络请求的函数
import store from "./store/index"

Vue.use(Vant)
Vue.prototype.$alertInfo = Toast

Vue.config.productionTip = false

Vue.prototype.$request = request

Vue.prototype.$bus = new Vue()
// 添加事件总线内容

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
