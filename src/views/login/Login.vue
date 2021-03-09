<template>
    <div id="login">
        <top-bar>
            <slot slot="left">    </slot>
            <div slot="center" class="login-center">注册页面</div>
            <!-- <div>注册页面</div> -->
            <div slot="right" class="login-right" @click="toRegister">登录</div>
        </top-bar>
        <!-- <register v-for="(item, index) in labelName" :key="index" :label="item"
        :placeholder="'请输入' + item"></register> -->
        <register class="register-label" 
        label="姓名" 
        placeholder="请输入姓名" 
        rule="^.{6,16}$" 
        @accountInfo="idInfo => name = idInfo"></register>
        <register class="register-label" 
        label="账号" 
        placeholder="请输入账号" 
        rule="^.{6,16}$" 
        @accountInfo="idInfo => account = idInfo"></register>
        <register class="register-label" 
        label="密码" 
        placeholder="请输入密码" 
        rule="^.{6,16}$" 
        type="password" 
        @accountInfo="idInfo => password = idInfo"></register>
        <div class="register-text">输入的格式为6-16位任意格式的字符串</div>
        <register-button buttonText="注册" @loginInfo="loginInfo"></register-button>
        
    </div> 
</template>

<script>
import TopBar from "components/common/TopBar"
// 导入顶部标题栏
import Register from "components/common/RegisterInput"
// 导入输入账号密码等的组件内容
import RegisterButton from "components/common/RegisterButton"
// 导入按钮组件

export default {
    name: "Login",
    components: {
        TopBar,
        Register,
        RegisterButton
    },
    data () {
        return {
            name: "",
            account: "",
            password: ""
        }
    },
    methods: {
        async loginInfo() {
            const regs = /^.{6,16}$/
            if(regs.test(this.name) && regs.test(this.account) && regs.test(this.password)) {
                const res = await this.$request.post("/register", {
                    name: this.name,
                    username: this.account,
                    password: this.password
                })
                console.log(res)
                this.$alertInfo.fail(res.data.msg)
                // 当账号信息输入的格式正确时，弹出相应的信息

                /* 先判断一下，返回的状态码为200时才跳转到个人中心页 */
                if(res.data.code === 200) {
                    localStorage.setItem("id", res.data.id)     
                    //  将注册成功后服务端返回的数据中的id存储在本地浏览器
                    localStorage.setItem("token", res.data.objtoken)
                    //  将注册成功后服务端返回的数据中的token存储在本地浏览器(理解什么是token)

                    setTimeout(() => {
                        this.$router.push("/userinfo")
                    }, 1000)
                    // 注册成功后，延时一秒跳转到个人中心页
                }
            }else {
                this.$alertInfo.fail("账号信息输入不正确，请重新输入")
                // 当账号信息输入的格式不正确时，弹出的信息
            }
        },
        toRegister() {
            this.$router.push("/register")
        }
    },
}
</script>

<style scoped>
    .register-label {
        padding: 0;
    }
    .register-text {
        width: 100%;
        font-size: 13px;
        color: gray;
        text-align: center;
        margin-bottom: 20px;
    }
    .login-right {
        font-size: 13px;
    }
    .login-center {
        position: relative;
        left: 128px;
    }
    .login-right {
        position: relative;
        right: 10px;
    }
</style>
