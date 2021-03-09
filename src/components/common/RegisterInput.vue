<template>
    <dir id="register">
        <van-field 
        v-model="text"
        :label="label" 
        :type="type" 
        :placeholder="placeholder" 
        :rule="rule"></van-field>
    </dir>
    
</template>

<script>
export default {
    name: "Register",
    props: {
        label: String,
        type: String,
        placeholder: String,
        rule: String
    },
    data () {
        return {
            text: ""
            // 使用vant的输入框要绑定一个v-model，并在data中定义，
            // 否则失去焦点后会清空数据
        }
    },
    methods: {
        judgeRule() {
            const reg = RegExp(this.rule)
            // 将传过来的正则字符串转成正则表达式(具有校验功能)
            if(reg.test(this.text)) {
                this.$emit("accountInfo", this.text)
            }
        }
    },
    watch: {
        // 监听data中的数据，当发生变化时，调用对应的函数
        text() {
            this.judgeRule()
        }
    }
}
</script>

<style scoped>

</style>
