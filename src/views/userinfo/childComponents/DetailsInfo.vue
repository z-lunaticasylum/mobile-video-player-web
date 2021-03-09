<template>
    <div id="details-com">
        <div class="background-img">
            <img src="~assets/img/userInfoBg.jpg" alt="">
        </div>
        <div class="indentify-info">
            <img :src="personalMessage.user_img" alt="" class="profile-img" v-if="personalMessage.user_img">
            <img src="~assets/img/login.jpg" alt="" class="profile-img" v-else>
            <div class="base-message">
                <div>
                    <p class="no-border-left">
                        <span>{{fans}}</span>
                        <span class="base-text">粉丝</span>
                    </p>
                    <p class="add-border-left">
                        <span>{{concerns}}</span>
                        <span class="base-text">关注</span>
                    </p>
                    <p class="add-border-left">
                        <span>{{likes}}</span>
                        <span class="base-text">获赞</span>
                    </p>
                </div>
                <div class="compile-info" @click="$router.push('/edit')">
                    <span>编辑资料</span>
                </div>
            </div>
        </div>
        <div class="personal-message">
            <h3>{{personalMessage.name}}</h3>
            <span>个人简介，balabala呀呀呀呀</span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            fans: 66,
            concerns: 66,
            likes: 66
        }
    },
    props: {
        personalMessage: Object,
    }
}
</script>

<style scoped>
    .background-img img {
        height: 120px;
        width: 100%;
    }
    .indentify-info {
        display: flex;
        padding: 0px 10px;
    }
    .base-message >div {
        display: flex;
        margin-left: 30px;
    }
    .base-message p {
        padding: 5px 20px;
    }
    .base-message span {
        display: block;
        text-align: center;
    }
    .add-border-left::before {
        content: "|";
        position: relative;
        right: 20px;
        top: 17.6px;
        color: #ccc;
    }
    .add-border-left {
        position: relative;
        top: -17.6px;
    }
    .base-text {
        font-size: 12px;
        color: #ccc;
        white-space: nowrap;
    }
    .profile-img {
        height: 90px;
        width: 90px;
        border-radius: 50%;
    }
    .compile-info {
        width: 170px;
        border: 2px solid #3366ff;
        color: #3366ff;
        border-radius: 5px;
        text-align: center;
        padding: 5px 0px;
        font-size: 14px;
        position: relative;
        top: -20px;
        display: flex;
        justify-content: center;
    }
    .personal-message {
        padding: 0 10px;
    }
    .personal-message h3 {
        font-weight: normal;
        margin: 0px;
    }
    .personal-message span {
        font-size: 13px;
        color: #ccc;
        margin-top: 10px;
    }
</style>
