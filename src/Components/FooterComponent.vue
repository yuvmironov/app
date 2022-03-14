<template>
  <div class="Footer">
    <span>&#169; Mironov Yrij Projects 2005-2022</span>
    <span>version: {{ version }}</span>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'footer',
  setup () {
    const version = ref(require('../../package.json').version)

    return {
      version
    }
  }
}
</script>

<style lang="stylus">
.Footer
  display flex
  justify-content space-between
  padding 5px
  box-shadow inset 0 4px 8px var(--black-light)
</style>
