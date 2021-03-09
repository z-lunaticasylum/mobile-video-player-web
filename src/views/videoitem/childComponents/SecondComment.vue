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
                    <div class="comment-text">{{item.comment_content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        commentMess: Array,
    }
}
</script>

<style scoped>
    #second-comment {
        padding: 0 0 0 20px;
    }
    .first-comment {
        margin: 15px 10px;
    }
    .first-comment-style{
        display: flex;
    }
    .userinfo-img img {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 5px;
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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 230px;
    }
</style>
