<template>
    <div id="category">
        <top-message></top-message>
        <div class="exited-items">
            <div class="exited-title">
                <span>........................</span>
                <span>现有栏目</span>
                <span>........................</span>
            </div>
            <div class="exited-body">
                <div v-for="(item, index) in categoryTitles" :key="index"
                @click="exitedCategoryClick(index)">
                    {{item.title}}
                </div>
            </div>
        </div>
        <div class="deleted-items">
            <div class="deleted-title">
                <span>........................</span>
                <span>删除栏目</span>
                <span>........................</span>
            </div>
            <div class="deleted-body">
                <div v-for="(item, index) in deletedCategoryTitles" :key="index"
                @click="deletedCategoryClick(index)">
                    {{item.title}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopMessage from "components/common/TopMessage"

export default {
    data() {
        return {
            categoryTitles: [],
            deletedCategoryTitles: []
        }
    },
    components: {
        TopMessage
    },
    methods: {
        async getCategoryTitles() {
            if(localStorage.getItem("nowCategory") && localStorage.getItem("deleCategory")) {
                this.categoryTitles = JSON.parse(localStorage.getItem("nowCategory"))
                this.deletedCategoryTitles = JSON.parse(localStorage.getItem("deleCategory"))
            }else {
                const result = await this.$request.get("/category")
                // console.log(result)
                this.categoryTitles.push(...result.data)
                console.log(this.categoryTitles)
            }
        },
        exitedCategoryClick(index) {
            if(this.categoryTitles.length < 4) {
                this.$alertInfo("请至少选择三个")
                // 当选择的栏目数量少于4个时，不让继续删除已选栏目
            }else {
                this.deletedCategoryTitles.push(this.categoryTitles[index])
                this.categoryTitles.splice(index, 1)
            }
        },  //  点击已有栏目，实现同步删除栏目和增加栏目的效果
        deletedCategoryClick(index) {
            this.categoryTitles.push(this.deletedCategoryTitles[index])
            this.deletedCategoryTitles.splice(index, 1)
        }  //  点击删除栏目，实现同步删除栏目和增加栏目的效果
    },
    created() {
        this.getCategoryTitles()
    },
    watch: {
        categoryTitles() {
            localStorage.setItem("nowCategory", JSON.stringify(this.categoryTitles))
            localStorage.setItem("deleCategory", JSON.stringify(this.deletedCategoryTitles))
        },  //  监听当现有栏目发生变化时，存到localStorage
    }
}
</script>

<style scoped>
    .exited-items, .exited-body, .deleted-items, .deleted-body {
        padding: 0px 10px;
    }
    .exited-title {
        text-align: center;
        margin-top: 15px;
        color: #3366ff;
    }
    .deleted-title {
        text-align: center;
        margin-top: 15px;
        color: rgb(255, 59, 48);
    }
    .exited-title span:nth-child(2), .deleted-title span:nth-child(2) {
        position: relative;
        top: 4.4px;
        padding: 0px 10px;
    }
    .exited-body, .deleted-body {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .deleted-body div {
        border: 2px solid rgb(255, 59, 48);
        width: 20%;
        margin: 8px;
        text-align: center;
    }
    .exited-body div {
        border: 2px solid #3366ff;
        width: 20%;
        margin: 8px;
        text-align: center;
    }
</style>
