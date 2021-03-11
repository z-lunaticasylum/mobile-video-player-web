<template>
    <div id="video-item" v-if="videoInfo">
        <top-message></top-message>
        <div class="main">
            <div class="video-show">
                <video src="~assets/video/video.mp4" class="video-play" controls="controls"></video>
                <!-- 使用video标签播放视频，controls代表显示视频控件 -->
            </div>
            <div class="video-text">
                <div class="text-title">
                    <span v-if="videoInfo.category.title">{{videoInfo.category.title}}</span>
                    <span v-else>热门</span>
                    <span>队长，别说唱啦！</span>
                </div>
                <div class="text-details-info">
                    <span v-if="videoInfo.userinfo.name">{{videoInfo.userinfo.name}}</span>
                    <span v-else>三十六贱笑</span>
                    <span class="video-play-info">300.5万次播放</span>
                    <span class="video-play-info">1.2万弹幕</span>
                    <span class="video-play-info">{{videoInfo.date}}</span>
                </div>
                <div class="video-spread">
                    <div class="first-item" @click="collectionClick" :class="{collection:isCollected}">
                        <van-icon name="star" />
                        <span>收藏</span>
                    </div>
                    <div class="second-item" @click="followClick" :class="{collection:isFollow}">
                        <van-icon name="sort" />
                        <span>关注</span>
                    </div>
                    <div class="third-item">
                        <van-icon name="share" />
                        <span>分享</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="recommend-video">
            <details-items v-for="(item, index) in recommendVideo" :key="index"
            :detailsItem="item" class="recommend-video-item"></details-items>
        </div>
        <comment-title 
        @publishComment="publishComment"></comment-title>
        <comment ref="comment"></comment>
    </div>
</template>

<script>
import TopMessage from "components/common/TopMessage"
import DetailsItems from "views/home/childComponents/DetailsItems"
// 导入之前封装过的显示对每个视频的封面和标题的渲染
import CommentTitle from "./childComponents/CommentTitle"
import Comment from "./childComponents/Comment"

export default {
    data() {
        return {
            videoInfo: null,
            recommendVideo: [],
            publishContentMess: {
                comment_content: "",
                comment_date: "",
                article_id: ""
            },  //  发表评论需要携带的参数，分别是评论的内容、日期和对应评论的视频id
            isCollected: "",    // 判断是否收藏
            isFollow: ""
        }
    },
    components: {
        TopMessage,
        DetailsItems,
        CommentTitle,
        Comment
    },
    methods: {
        async getVideoItem() {
            const result = await this.$request.get("/article/" + this.$route.params.id)
            console.log(result)
            this.videoInfo = result.data[0]

            this.existedFollow()

        },  // 获取具体视频的内容

        async getRecommendVideo() {
            const result = await this.$request.get("/commend")
            // console.log(result)
            this.recommendVideo = result.data
        },  // 这个函数是获取推荐视频的内容

        async publishComment(publishContent) {
            // console.log(publishContent)
            this.publishContentMess.comment_date = this.getNowTime()
            // 首先获得评论的时间
            this.publishContentMess.comment_content = publishContent
            this.publishContentMess.article_id = this.$route.params.id

            const result = await this.$request.post("/comment_post/" + localStorage.getItem("id"), this.publishContentMess)
            // 将评论发送到接口
            // 然后调用获取评论的方法
            this.$refs.comment.getDetailsComment()
        },  //  发表评论

        getNowTime() {
            let time = new Date()
            let mon = time.getMonth() + 1
            let day = time.getDate()

            if(mon < 10) {
                mon = "0" + mon
            }
            if(day < 10) {
                day = "0" + day
            }

            let resultTime = ""
            resultTime = mon + "-" + day

            return resultTime
        },   //  封装一个获得当前月份和天数的函数

        async getCollectionMess() {
            if(localStorage.getItem("token")) {
                const result = await this.$request.post("/collection/" + localStorage.getItem("id"), {article_id: this.$route.params.id})
                
                return result
            }
        },  //  获取收藏的信息
        // 这里封装的是点击收藏时向后台提交收藏状态数据的请求函数，用的是post

        async collectionClick() {
            const res =  await this.getCollectionMess()
            console.log(res)
            if(res.data.msg == "收藏成功") {
                this.isCollected = true
                this.$alertInfo.fail("收藏成功")
            }else {
                this.isCollected = false
                this.$alertInfo.fail("取消收藏成功")
            }
        },  //  点击收藏按钮选择是否收藏

        async existedCollection() {
            if(localStorage.getItem("token")) {
                const res = await this.$request.get("/collection/" + localStorage.getItem("id"), {params: {article_id: this.$route.params.id}})
                console.log(res)
                this.isCollected = res.data.success 
            }
        },   //  一进入页面，显示收藏按钮的样式
        // 注意：这里获取是否是收藏的状态的请求方式是get

        async followClick() {
            const res = await this.$request.post("/sub_scription/" + localStorage.getItem("id"), {sub_id: this.videoInfo.userinfo.id})
            console.log(res)

            if(res.data.msg == "关注成功") {
                this.isFollow = true
                this.$toast.fail(res.data.msg)
            }else {
                this.isFollow = false
                this.$toast.fail(res.data.msg)
            }
        },   //  点击关注按钮，进行是否关注的选择

        async existedFollow() {
            const res = await this.$request.get("/sub_scription/" + localStorage.getItem("id"), {params: {sub_id: this.videoInfo.userid}})

            this.isFollow = res.data.success
        }
    },
    created() {
        this.getVideoItem()
        this.getRecommendVideo()
        this.existedCollection()
    }, 
    watch: {
        $route() {
            this.getVideoItem()
            this.getRecommendVideo()
        }   //这里是监听到路由的跳转变化时，发送数据到请求
    },
    mounted () {
        
    }
}
</script>

<style scoped>
    .video-show {
        width: 100%;
    }
    .video-play {
        width: 100%;
    }
    .video-text {
        padding: 10px 15px;
    }
    .text-title span:nth-child(1){
        color: #3366ff;
        font-size: 15px;
        background: #ccc;
        border-radius: 8px;
        padding: 3px 5px;
        margin-right: 8px;
    }
    .text-title span:nth-child(2) {
        font-size: 14px;
    }
    .text-details-info {
        margin: 12px 0;
    }
    .text-details-info span:nth-child(1) {
        font-size: 13px;
        margin-right: 8px;
    }
    .video-play-info {
        font-size: 12px;
        color: #999;
    }
    .video-spread {
        display: flex;
        color: #777;
        align-items: center;
    }
    .video-spread van-icon {
        font-size: 14px;
    }
    .video-spread div {
        margin-right: 8px;
    }
    .video-spread span {
        font-size: 13px;
        position: relative;
        top: -2px;
    }
    .recommend-video {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .recommend-video-item {
        width: 45%;
    }
    .video-play-info {
        margin-right: 5px;
    }

    .collection {
        color: #3366ff;
    }
</style>
