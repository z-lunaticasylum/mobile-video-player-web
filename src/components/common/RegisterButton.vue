<template>
    <div id="register-button" @click="buttonClick">
        <div>{{buttonText}}</div>
    </div>
</template>

<script>
export default {
    props: {
        buttonText: String,
        // 由父组件传入按钮显示的文字
    },
    methods: {
        buttonClick() {
            this.$emit("loginInfo")
        }
    },
}
</script>

<style scoped>
    #register-button {
        background-color: #3366ff;
        height: 35px;
        border-radius: 17.5px;
        text-align: center;
        line-height: 35px;
        color: #fff;
    }
</style>
