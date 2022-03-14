<template>
  <router-view name="header"/>
  <router-view class="Main"/>
  <router-view name="footer"/>
  <yuv-notification/>
  <yuv-global-loader/>
</template>

<script>
export default {
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        document.title = to.meta.title || 'Some Default Title'
      }
    }
  }
}
</script>

<style lang="stylus">
@import './Styles/global.styl'
#app
  height 100vh
  display flex
  flex-direction column
  justify-content space-between
</style>
