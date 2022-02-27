<template>
  <div class="Notification" v-if="flag" @click="closeOnClick">
    <p class="Notification-Header" :class="'Notification-Header__' + status">{{ header }}</p>
    <p class="Notification-Body">{{ body }}</p>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'notification',
  setup () {
    const store = useStore()
    const header = computed(() => store.getters.GetNotificationHeader)
    const body = computed(() => store.getters.GetNotificationBody)
    const flag = computed(() => store.getters.GetNotificationFlag)
    const status = computed(() => {
      if (store.getters.GetNotificationStatus === 'success') {
        return 'Success'
      } else {
        return 'Error'
      }
    })
    const duration = computed(() => store.getters.GetNotificationDuration)

    const closeOnClick = () => {
      store.commit('SetNotification', { flag: false })
    }
    watch(duration, () => {
      if (flag.value && duration.value) {
        setTimeout(() => {
          store.commit('SetNotification', { flag: false })
        }, duration.value)
      }
    })
    return {
      header,
      body,
      flag,
      status,
      closeOnClick
    }
  }
}
</script>

<style lang="stylus">
.Notification
  position fixed
  top 10px
  right 10px
  z-index 9000
  width 200px
  border 1px solid rgba(0, 0, 0, 0.5)
  &-Header
    border-bottom 1px solid rgba(0, 0, 0, 0.5)
    padding 3px
    &__Success
      background-color #40b740
    &__Error
      background-color #f16464
  &-Body
    padding 3px
</style>
