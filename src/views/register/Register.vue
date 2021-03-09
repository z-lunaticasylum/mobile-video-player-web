<template>
    <div id="register">
        <top-bar>
            <div slot="left">    </div>
            <div slot="center">登录页面</div>
            <div slot="right" class="register-right" @click="toLogin">注册新用户</div>
        </top-bar>
        <!-- <register v-for="(item, index) in labelName" :key="index" :label="item"
        :placeholder="'请输入' + item"></register> -->
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
        <register-button buttonText="登录" @loginInfo="loginInfo"></register-button>
        
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
            account: "",
            password: ""
        }
    },
    methods: {
        async loginInfo() {
            const regs = /^.{6,16}$/
            if(regs.test(this.account) && regs.test(this.password)) {
                const res = await this.$request.post("/login", {
                    username: this.account,
                    password: this.password
                })
                console.log(res)
                this.$alertInfo.fail(res.data.msg)
                // 当账号信息输入的格式正确成功登录时，弹出相应的信息

                /* 当账号密码正确成功登录时，将账号的token和id存到本地浏览器,然后跳转到个人中心页 */
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("id", res.data.id)

                setTimeout(() => {
                    this.$router.push("/userinfo")
                }, 1000)
            }else {
                this.$alertInfo.fail("账号信息输入不正确，请重新输入")
                // 当账号信息输入的格式不正确时，弹出的信息
            }
        },
        toLogin() {
            this.$router.push("/login")
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
    #register .register-right {
        font-size: 13px;
    }
    .register-right {
        position: relative;
        right: 10px;
    }
</style>
