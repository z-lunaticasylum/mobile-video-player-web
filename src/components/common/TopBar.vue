<template>
    <div id="top-bar">
        <slot name="left" class="top-left"></slot>
        <slot name="center" class="top-center"></slot>
        <slot name="right" class="top-right"></slot>
    </div>
</template>

<script>
export default {
    name: "TopBar"    
}
</script>

<style scoped>
    #top-bar {
        height:44px;
        display: flex;
        justify-content: space-between;
        background-color: #3366ff;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 44px;
    }
</style>
