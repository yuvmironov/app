<template>
  <router-view name="header"/>
  <router-view class="Main"/>
  <router-view name="footer"/>
  <yuv-notification/>
</template>

<style lang="stylus">
#app
  height 100vh
  display flex
  flex-direction column
  justify-content space-between
</style>
