<template>
  <header-component class="Header"/>
  <router-view class="Main"/>
  <footer-component class="Footer"/>
  <notification/>
</template>

<script>
import HeaderComponent from '@/Components/HeaderComponent'
import FooterComponent from '@/Components/FooterComponent'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="stylus">
@import '~@/Styles/global.styl'
#app
  height 100vh
  display flex
  flex-direction column
  justify-content space-between
</style>
