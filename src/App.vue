<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  @import "./assets/css/normalize.css";
  /* 引入normallize.css文件 */

  body {
    background-color: rgb(244, 244, 244);
  }
</style>
