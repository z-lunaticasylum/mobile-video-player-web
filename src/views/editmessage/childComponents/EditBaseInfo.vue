<template>
    <div id="edit-base-info">
        <div class="base-info-style">
            <span>{{left}}</span>
            <span class="text-right">
                <slot name="right"></slot>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        left: String
    }
}
</script>

<style scoped>
    .base-info-style {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 10px;
        font-size: 14px;
        border-bottom: 2px solid #fafafa;
    }
    .text-right {
        font-size: 12px;
        color: #666;
    }
</style>
