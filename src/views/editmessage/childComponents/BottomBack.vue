<template>
    <div id="bottom-back" @click="backToUserinfo">
        <div>返回个人中心</div>
    </div>
</template>

<script>
export default {
    methods: {
        backToUserinfo() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    #bottom-back {
        background-color: #3366ff;
        margin-top: 20px;
        padding: 10px;
        font-size: 14px;
        text-align: center;
        color: white;
        border-radius: 18px;
    }
</style>
