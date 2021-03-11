<template>
    <div id="second-comment">
        <div class="first-comment" v-for="(item, index) in commentMess" :key="index">
            <div class="first-comment-style">
                <div class="userinfo-img">
                    <img :src="item.userinfo.user_img" alt="" v-if="item.userinfo.user_img">
                    <img src="~assets/img/login.jpg" alt="" v-else>
                </div>
                <div class="comment-content">
                    <div class="comment-user">
                        <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
                        <span v-else>小逗比</span>
                        <span>{{item.comment_date}}</span>
                    </div>
                    <div class="comment-text"> 
                        <span v-if="item.parent_user_info">回复
                            <span class="name-highlight">@{{item.parent_user_info.name}}</span>
                        </span>
                        <span v-else> </span>
                        :{{item.comment_content}}
                        <span class="answer" @click="answerClick">回复</span>
                    </div>
                    <!-- <div class="comment-text">回复 xxx:{{item.comment_content}}</div> -->
                </div>
            </div>
            <div>
                <second-comment :commentMess="item.child"></second-comment>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SecondComment",
    props: {
        commentMess: Array,
    },
    methods: {
        answerClick() {
            this.$bus.$emit("toCommentTitleInput")
        }
    },
    
}
</script>

<style scoped>
    #second-comment {
        /* width: 100%; */
        box-sizing:border-box;
    }
    .first-comment {
        margin: 15px 0px;
    }
    .first-comment-style{
        display: flex;
        /* box-sizing:border-box; */
    }
    .userinfo-img img {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 5px;
    }
    .comment-content {
        width: 100%;
        position: relative;
    }
    .comment-user {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #999;
    }
    .comment-text {
        font-size: 13px;
        padding: 10px 2px;
        /* white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; */
        width: 230px;
        word-break : normal;
    }
    .name-highlight {
        color: #3366ff;
    }
    .comment-text .answer {
        position: absolute;
        right: 0px;
        color: #3366ff;
    }
</style>
