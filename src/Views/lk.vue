<template>
  <div class="Lk">
    личный кабинет
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'lk',
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('apiGetList', { listName: store.getters.GetUserName })
        .then(response => {
          console.log(response)
        })
    })
  }
}
</script>

<style lang="stylus"></style>
