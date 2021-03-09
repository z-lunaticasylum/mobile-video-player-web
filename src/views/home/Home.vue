<template>
    <div id="home">
        <top-message></top-message>
        <van-tabs color="#3366ff" v-model="active" sticky>
            <van-tab v-for="(item, index) in categoryTitles" :key="index" 
            :title="item.title">
                <van-list v-model="item.loading"
                :finished="item.finished"
                finished-text="到我的底线啦"
                @load="onLoad"
                :immediate-check="false">
                    <div class="detail-items">
                        <details-items :detailsItem="detailsItem" 
                        v-for="(detailsItem, indey) in item.list" 
                        :key="indey" 
                        class="items"></details-items>
                    </div>
                </van-list>
            </van-tab>  
        </van-tabs>
    </div>
</template>

<script>
import TopMessage from "components/common/TopMessage"
import DetailsItems from "./childComponents/DetailsItems"

export default {
    components: {
        TopMessage,
        DetailsItems
    },
    data () {
        return {
            categoryTitles: [],
            active: 0,  // 这个active是动态绑定到了滚动标题栏中，标题被点击时active会对应地发生变化
            // loading: 
        }
    },
    methods: {
        async getCategoryTitles() {
            const result = await this.$request.get("/category")
            console.log(result) 
            // this.categoryTitles = result.data
            this.changeCategory(result.data)
        },// 获取到首页中滚动标题栏中的标题数据

        changeCategory(data) {
            // console.log(data)
            const newCategory = data.map((item, index) => {
                item.list = []
                item.page = 0       // 每个分类下数据的起始页码
                item.pageNums = 10  //  每次传输一页的数据有多少
                item.loading = false    // 记录每个item，即是每个标题下的内容是否滚动到了底部
                item.finished = false   //  记录每个item，即是每个标题下的内容是否已经加载完成
                return item
            })
            // console.log(newCategory)
            this.categoryTitles = newCategory
        },// 这个函数会在getCategoryTitles中被调用，目的是给拿到的标题数据增添一个属性为list
         // 用于存储从后台请求到的分类数据

        async getVideoData() {
            const idCategorytitlesItem = this.getIdCategorytitlesItem()
            // 根据点击不同的标题(会产生不同的active)返回的对应标题对象
            console.log(idCategorytitlesItem)
            // idCategorytitlesItem是被点击的标题所对应的对象
            const result = await this.$request.get("/detail/" + idCategorytitlesItem._id, {
                params: {
                    page: idCategorytitlesItem.page,
                    pagesize: idCategorytitlesItem.pageNums
                }
            })
            console.log(result)
            // idCategorytitlesItem.list = result.data
            // 这里不要用直接赋值的方式，否则在加载到新的数据的时候会覆盖原有的数据
            idCategorytitlesItem.list.push(...result.data)

            idCategorytitlesItem.loading = false 
            // 当每一个获取到新的数据后，将loading改为false，以便能进行下一次数据的获取

            if(result.data.length < idCategorytitlesItem.pageNums) {
                idCategorytitlesItem.finished = true
            } // 判断当最新获取数据的长度小于要求传输数据的数量(10)时，将finished改为true，停止发送数据请求
        },// 获取每个标题下面的视频数据

        getIdCategorytitlesItem() { 
            const categoryItem = this.categoryTitles[this.active]
            // console.log(categoryItem)
            return categoryItem
        },// 根据active的变化(点击标题栏)拿到对应的分类标题
          // 即是点击不同的标题，拿到对应标题的对象信息
          // categoryItem是this.categoryTitles中的被选中的那个标题对象
        onLoad() {
            const activeTitleItem = this.getIdCategorytitlesItem()
            // console.log(activeTitleItem)
            activeTitleItem.page += 1
            this.getVideoData()
        },// 滚动到底部时触发这个方法
    },
    created () {
        this.getCategoryTitles()
    },
    watch: {
        active() {
            this.getVideoData()
        }
    }
}
</script>

<style scoped>
    .detail-items:nth-child(1) {
        margin-top: 10px;
    }
    .detail-items {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .items {
        width: 45%;
    }
</style>
