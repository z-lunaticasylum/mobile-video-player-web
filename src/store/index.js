import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        commentDataLength: null
    },
    mutations: {
        changeCommentData(state, nowCommentData) {
            state.commentDataLength = nowCommentData
        }   //  根据当前页面的评论数据修改评论数据的数量
    }
})

export default store