<template>
    <div id="comment" v-if="commentData">
        <div class="first-comment" v-for="(item, index) in commentData" :key="index">
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
            <second-comment :comment-mess="commentData"></second-comment>
        </div>
        <div class="first-comment">
            <div class="userinfo-img">
                <img src="~assets/img/login.jpg" alt="">
            </div>
            <div class="comment-content">
                <div class="comment-user">
                    <span>小傻逼</span>
                    <span>03-09</span>
                </div>
                <div class="comment-text">
                    你关心的问题，看总书记怎么说
                    习近平“下团组” 这些话震撼人心
                    新疆部分企业和民众将起诉德国人郑国恩
                    人代会审议全国人大常委会工作报告等
                    “画”出中国2025新模样 一个春天的约定  两会专题
                    两会热议  法治中国  北京冬奥会
                    两会今日看点：人代会审议全国人大常委会工作报告
                    林郑月娥：完善选举制度不是要限制反对派人士
                    全国人大代表曹永鸣：建议教师工资免税
                    全国人大代表黎霞：建议离婚分割财产时对家暴者少分或不分
                    人大代表：建议允许退休独生子女父母随子女落户
                    好消息！中国版“国际旅行健康证明”正式上线
                    林郑月娥：完善香港选举必须要在12个月内完成
                    香港公务员事务局局长：拒签宣誓声明 近200港公务员须离职
                    中方敦促美政府恪守一个中国原则和中美联合公报 白宫回应
                    港媒：拜登政府拉帮结派对付中国，会砸美国的脚
                    解放军重申不承诺放弃使用武力，台军负责人：强化建军备战
                    欧阳娜娜参演建党百年献礼大片 晒照后绿媒心态又崩了
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SecondComment from "./SecondComment"

export default {
    data() {
        return {
            commentData: null
        }
    },
    components: {
        SecondComment,
    },
    methods: {
      async getDetailsComment() {
          const result = await this.$request.get("/comment/" + this.$route.params.id)
          console.log(result)
          this.commentData = this.changeCommentData(result.data)
          console.log(this.commentData)
      },    //  拿到评论的数据
      changeCommentData(dataArr) {
          function fn(temp) {
              let resultArr = []
              for(let i = 0; i < dataArr.length; i++) {
                  if(dataArr[i].parent_id == temp) {
                      resultArr.push(dataArr[i])
                      dataArr[i].child = fn(dataArr[i].comment_id)
                  } //  用到了递归
              }
              return resultArr
          }
          return fn(null)       //  changeCommentData这个方法由于内部又定义了一个函数，所以
                                //  需要对调用的函数进行返回
      } //  对请求评论返回的数据进行改写
    },
    created () {
        this.getDetailsComment()
    }
}
</script>

<style scoped>
    .first-comment {
        margin: 15px 10px;
        border-bottom: 2px solid #ccc;
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
        overflow: auto;
        text-overflow: ellipsis;
        width: 250px;
    }
</style>
