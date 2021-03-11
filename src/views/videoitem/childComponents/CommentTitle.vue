<template>
    <div id="comment-ti">
        <div class="comment-title">
            <span>评论</span>
            <span>{{$store.state.commentDataLength}}</span>
        </div>
        <div class="user-info">
            <img :src="individualInfo.user_img" alt="" @click="toUserInfo" v-if="individualInfo">
            <img src="~assets/img/login.jpg" alt="" @click="toUserInfo" v-else>
            <input type="text" placeholder="分享你刚编的故事" ref="commentTitleIpt" v-model="publishContent">
            <button @click="commTitleInputClick">发表</button>
        </div>
    </div>
</template>

<script>
export default {
    data() { 
        return {
            individualInfo: null,
            publishContent: ""
        }
    },
    methods: {
        async getIndividualInfo() {
            if(localStorage.getItem("token")) {
                const result = await this.$request.get("/user/" + localStorage.getItem("id"))
                // console.log(result)
                this.individualInfo = result.data[0]
                console.log(this.individualInfo)
            } // 判断一下，本地的存储中有token再发送Ajax数据请求
        }, // 拿到个人用户的数据
        
        toUserInfo() {
            this.$router.push("/userinfo")
        },
        commTitleInputClick() {
            this.$emit("publishComment", this.publishContent)
            this.publishContent = ""
        }
    },
    created () {
        this.getIndividualInfo()
    },
    mounted () {
        this.$bus.$on("toCommentTitleInput", () => {
            this.$refs.commentTitleIpt.focus()
        })  //  利用事件总线接受SecondComment点击回复的事件，使本组件
            //  的输入框聚焦    
    }
}
</script>

<style scoped>
    .comment-title {
        padding: 10px 10px;
    }
    .comment-title span:nth-child(1) {
        margin-right: 5px;
    }
    .comment-title span:nth-child(2) {
        color: #999;
    }
    .user-info {
        padding: 0 10px;
        display: flex;
        align-content: center;
    }
    .user-info img {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 8px;
    }
    .user-info input {
        border: 0;
        border-radius: 12px;
        font-size: 12px;
        padding: 5px;
        color: #999;
    }
    .user-info button {
        height: 20px;
        border-radius: 10px;
        background-color: #3366ff;
        color: white;
        margin-left: 5px;
        border: 0;
        position: relative;
        top: 2px;
    }
</style>
