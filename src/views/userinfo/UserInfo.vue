<template>
    <div id="user-info">
        <top-message></top-message>
        <details-info :personal-message="personalInfo"></details-info>
    </div>
</template>

<script>
import TopMessage from "components/common/TopMessage.vue"
// 导入顶部搜索栏
import DetailsInfo from "./childComponents/DetailsInfo"
// 导入个人中心主页面

export default {
    components: {
        TopMessage,
        DetailsInfo
    },
    data () {
        return {
            personalInfo: {},      
        }
    },
    methods: {
        async getUserInfo() {
            const res = await this.$request.get("/user/" + localStorage.getItem("id"))
            console.log(res)
            console.log(res.data[0])
            this.personalInfo = res.data[0]
        }
        // 拿到存储在本地的用户信息
    },
    created () {
        this.getUserInfo()
    }
}
</script>

<style scoped>

</style>
