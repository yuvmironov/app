<template>
  <div class="Mailing">
    <h1>Ваши рассылки</h1>
    <div class="Mailing-Content">
      <div class="Mailing-Content_List">
        <router-link
          class="Mailing-ListElement"
          v-for="mailing in listMailing"
          :key="mailing._id"
          :to="`/mailing/${mailing._id}`">
          {{ mailing.name }}
        </router-link>
      </div>
      <div class="Mailing-Content_Form">
        <h3 v-if="Object.keys($route.params).length === 0">
          Выберите рассылку
        </h3>
        <router-view v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'mailing',
  setup () {
    const store = useStore()
    const listMailing = computed({
      get: () => store.getters.getMailingList
    })
    onMounted(() => {
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiGetMailingList', { listName: store.getters.GetUserName })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    })
    return {
      listMailing
    }
  }
}
</script>

<style lang="stylus">
.Mailing
  height 85vh
  padding 20px
  &-Content
    display flex
    width 100%
    &_List
      padding 10px
      flex-basis 15%
      height 100%
      border-right 1px solid var(--black-light)
    &_Form
      padding 10px
      flex-basis 85%
  &-ListElement
    display block
    cursor pointer
</style>
