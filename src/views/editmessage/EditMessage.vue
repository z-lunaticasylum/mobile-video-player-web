<template>
    <div id="edit-message">
        <top-message></top-message>
        <div class="first-edit-base-info">
            <van-uploader :after-read="afterRead" preview-size="100vw" class="image-upload"/>
            <!-- 使用vant框架中的文件上传功能 -->
            <edit-base-info left="头像" style="margin-top: 10px">
                <div slot="right">
                    <img :src="personalInfo.user_img" alt="" class="personal-info-img" v-if="personalInfo.user_img">
                    <img src="~assets/img/login.jpg" alt="" class="personal-info-img" v-else>
                </div>
            </edit-base-info>
        </div>
        <edit-base-info left="昵称" @click.native="nameClick">
            <div slot="right">{{personalInfo.name}}</div>
        </edit-base-info>
        <edit-base-info left="账号">
            <div slot="right">{{personalInfo.username}}</div>
        </edit-base-info>
        <edit-base-info left="性别" @click.native="genderClick">
            <div slot="right">{{personalInfo.gender ? "男" : "女"}}</div>
        </edit-base-info>
        <edit-base-info left="个性签名" @click.native="descClick">
            <div slot="right">{{personalInfo.user_desc}}</div>
        </edit-base-info>

        <bottom-back></bottom-back>

        <van-dialog v-model="nameShow" title="昵称" show-cancel-button @confirm="nameDialogConfirm">
            <van-field v-model="text" autofocus/>
            <!-- 输入框 -->
        </van-dialog>
        <!-- 修改昵称的弹出框 -->

        <van-dialog v-model="descShow" title="个性签名" show-cancel-button @confirm="descDialogConfirm">
            <van-field v-model="text" autofocus/>
        </van-dialog>
        <!-- 修改个性签名的弹出框 -->

        <van-action-sheet 
        v-model="genderShow" 
        :actions="actions"  
        cancel-text="取消"
        @select="genderSelect" />
    </div>
</template>

<script>
import TopMessage from "components/common/TopMessage"
import EditBaseInfo from "./childComponents/EditBaseInfo"
import BottomBack from "./childComponents/BottomBack"

export default {
    data () {
        return {
            personalInfo: Object,
            nameShow: false,
            descShow: false,
            genderShow: false,
            text: "",
            actions: [
                {name: "男", val: 1},
                {name: "女", val: 0}
            ]
        }
    },
    components: {
        TopMessage,
        EditBaseInfo,
        BottomBack
    },
    methods: {
        // 从服务器拿到个人信息的数据
        async getPersonalInfo() {
            const result = await this.$request.get("/user/" + localStorage.getItem("id"))
            this.personalInfo = result.data[0]
            console.log(this.personalInfo)
        },
        // 将用户上传的图片传到服务器，并渲染到页面上
        async afterRead(file) {
            // console.log(file)
            let formdata = new FormData()
            formdata.append("file", file.file)
            const res = await this.$request.post("/upload", formdata)
            console.log(res)
            this.personalInfo.user_img = res.data.url

            this.personalInfoUpdate()
        },
        // 定义一个方法，当个人信息的数据发生变化后，在服务器进行更改
        async personalInfoUpdate() {
            const res = await this.$request.post("/update/" + localStorage.getItem("id"), this.personalInfo)
        },
        nameClick() {
            this.nameShow = true
            // 点击昵称区域，实现修改昵称弹出框的弹出
        },
        descClick() {
            this.descShow = true
        },
        genderClick() {
            this.genderShow = true
        },
        nameDialogConfirm() {
            if(this.text) {
                this.personalInfo.name = this.text;
                this.personalInfoUpdate()
            }
            // 点击弹出框的确认后，如果输入了昵称内容，将昵称进行修改并提交后台
            this.text = ""
        },
        descDialogConfirm() {
            if(this.text) {
                this.personalInfo.user_desc = this.text;
                this.personalInfoUpdate()
            }
            // 点击弹出框的确认后，如果输入了个签内容，将个签进行修改并提交后台
            this.text = ""
        },
        genderSelect(data) {
            console.log(data)
            this.personalInfo.gender = data.val
            // 0代表女，1代表男；将数字0/1传给后台而不是字符串男/女

            this.genderShow = false
        }
    },
    created() {
        this.getPersonalInfo()
    },
}
</script>

<style scoped>
    .personal-info-img {
        height: 30px;
        width: 30px;
    }
    .first-edit-base-info {
        position: relative;
        overflow: hidden;
    }
    .first-edit-base-info img {
        border-radius: 50%;

    }
    .image-upload {
        position: absolute;
        opacity: 0;
    }
</style>
