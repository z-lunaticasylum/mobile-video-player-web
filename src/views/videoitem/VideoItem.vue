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
                    <div class="first-item">
                        <van-icon name="star" />
                        <span>收藏</span>
                    </div>
                    <div class="second-item">
                        <van-icon name="sort" />
                        <span>缓存</span>
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
        <comment-title></comment-title>
        <comment></comment>
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
            // console.log(result)
            this.videoInfo = result.data[0]
        },  // 获取具体视频的内容

        async getRecommendVideo() {
            const result = await this.$request.get("/commend")
            // console.log(result)
            this.recommendVideo = result.data
        },  // 这个函数是获取推荐视频的内容
    },
    created() {
        this.getVideoItem()
        this.getRecommendVideo()
    }, 
    watch: {
        $route() {
            this.getVideoItem()
            this.getRecommendVideo()
        }   //这里是监听到路由的跳转变化时，发送数据到请求
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
</style>
