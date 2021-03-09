import Vue from "vue"
import Router from "vue-router"


// 路由懒加载的形式
const Login = () => import("views/login/Login")
const Register = () => import("views/register/Register")
const UserInfo = () => import("views/userinfo/UserInfo")
const EditMessage = () => import("views/editmessage/EditMessage")
const Home = () => import("views/home/Home")
const Videoitem = () => import("views/videoitem/VideoItem")

Vue.use(Router)

const routes = [
    {
        path: "",
        redirect: "/home",
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/userinfo",
        component: UserInfo,
        meta: {
            isToken: true
        }
    },
    {
        path: "/edit",
        component: EditMessage,
        meta: {
            isToken: true
        }
    },
    {
        path: "/home",
        component: Home,
        meta: { 
            keepalive: true
         }
    },
    {
        path: "/article/:id",
        component: Videoitem
    }
]

const router = new Router({
    mode: "history",        // 这里要记得加冒号
    routes,
})

router.beforeEach((to, from, next) => {
    if(!localStorage.getItem("token") && !localStorage.getItem("id") && to.meta.isToken == true) {
        router.push("/register")
        Vue.prototype.$alertInfo.fail("请重新登录")
        return
    }
    next()
})
// 路由一发生变化就会执行.beforeEach这个函数,是针对所有的路由；为了只对特定的页面路由发生跳转时起效，
// 加上一个to.meta.isToken == true做一个判断

// 解决不能跳转到路由自身的报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router