<template>
    <div id="top-message">
        <div class="top-mess-left">
            <img src="~assets/img/logoblue.jpg" alt="" @click="toHome">
        </div>
        <div class="top-mess-center">
            <div class="search">
                <van-icon class="search-icon" name="search" />
                <span>输入搜索的内容</span>
            </div>
        </div>
        <div class="top-mess-right">
            <img :src="userImg" alt="" v-if="userImg" @click="toUserInfo">
            <img src="~assets/img/login.jpg" alt="" v-else @click="toUserInfo">
            <div class="download-btn">下载App</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userImg: ""
        }
    },
    async mounted() {
        if(localStorage.getItem("token")) {
            const res = await this.$request.get("/user/" + localStorage.getItem("id"))
            // console.log(res)
            this.userImg = res.data[0].user_img
        } // 判断一下，本地的存储中有token再发送Ajax数据请求
    },
    methods: {
        toUserInfo() {
            this.$router.push("/userinfo")
        },
        toHome() {
            this.$router.push("/home")
        }
    }
}
</script>

<style scoped>
    #top-message {
        height: 44px;
        width: 100%;
        background: rgb(255, 255, 255);
        display: flex;
    }
    .top-mess-left {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .top-mess-left img {
        height: 45px;
        width: 70px;
        margin: 0 5px;
    }
    .top-mess-center {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    }
    .search {
        width: 90%;
        background: #D3D3D3;
        border-radius: 10px;
        display: flex;
    }
    .search span {
        line-height: 24px;
        font-size: 13px;
        color: #F5F5F5;
    }
    .search-icon {
        padding: 4px 5px;
    }
    .top-mess-right {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .top-mess-right img {
        height: 24px;
        width: 24px;
        border-radius: 50%;
    }
    .download-btn {
        background: #3366ff;
        color: #fff;
        margin: 0px 3px;
        border-radius: 30px;
        font-size: 13px;
        padding: 4px;
    }
</style>
