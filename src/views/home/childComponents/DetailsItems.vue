<template>
    <div id="details-items" @click="toArticle">
        <div class="every-item">
            <!-- <div>{{detailsItem.id}}</div> -->
            <div class="every-item-info">
                <img :src="detailsItem.img" alt="" 
                v-if="detailsItem.img" 
                :onerror="defaultImg"
                class="items-img">
                <div class="view-counts">
                    <van-icon name="play-circle" size="10"/>
                    <span>13.5W</span>
                </div>
                <div class="comment-counts">
                    <van-icon name="column" size="10"/>
                    <span>6789</span>
                </div>
            </div>
            <p class="every-item-text">{{detailsItem.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            defaultImg: 'this.src="' + require("assets/img/404again.jpg") + '"' 
        }
    },
    props: {
        detailsItem: Object,
    },
    methods: {
        toArticle() {
            this.$router.push("/article/" + this.detailsItem.id)
        }
    },
    mounted() {
        // console.log(this.detailsItem)
    },
}
</script>

<style>
    .items-img {
        width: 100%;
    }
    .every-item-text {
        font-size: 12px;
        color: black;
        margin: 0 0 10px 0;
    }
    .every-item-info {
        position: relative;
    }
    .every-item-info span {
        font-size: 10px;
    }
    .view-counts {
        position: absolute;
        left: 2px;
        bottom: 5px;
        color: white;
        display: flex;
        align-items: center;
    }
    .comment-counts {
        position: absolute;
        right: 2px;
        bottom: 5px;
        color: white;
        display: flex;
        align-items: center;
    }
    .view-counts, .comment-counts {
        background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
    }
</style>
