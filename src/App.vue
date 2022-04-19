<template>
  <router-view name="header"/>
  <router-view class="main"/>
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
  min-height 100%
  display flex
  flex-direction column
  justify-content space-between
  background-color var(--background)
  color var(--on-backgroud)
.main
  flex: 1 0 auto;
</style>
