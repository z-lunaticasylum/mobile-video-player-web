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
            <!-- <second-comment :comment-mess="commentData"></second-comment> -->
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
        //   console.log(this.commentData.length)
          this.$store.commit("changeCommentData", this.commentData.length)
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
    #comment {
        width: 100%;
        overflow: auto;
    }
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
        /* white-space: nowrap;
        overflow: auto;
        text-overflow: ellipsis; */
        width: 250px;
        word-break : normal;
    }
</style>
