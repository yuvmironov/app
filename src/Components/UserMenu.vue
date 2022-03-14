<template>
  <div class="UserMenu">
    <span class="UserMenu-Icon icon icon-user" @click="showMenu"/>
    <div
      class="UserMenu-Menu"
      :class="{ 'UserMenu-Menu__Active' : userMenuShow }"
      @click="showMenu"
    >
      <div class="UserMenu-MenuContent">
        <div class="UserMenu-LinksBlock">
          <router-link to="/taskList" class="UserMenu-Link">
            <span class="UserMenu-LinkIcon icon icon-list"/>
            <span class="UserMenu-LinkText">Список задач</span>
          </router-link>
          <span class="UserMenu-Link" @click="logOut">
            <span class="UserMenu-LinkIcon icon icon-log-out"/>
            <span class="UserMenu-LinkText">Выход</span>
          </span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'user-menu',
  setup () {
    const store = useStore()
    const router = useRouter()

    const userMenuShow = ref(false)
    const showMenu = () => {
      userMenuShow.value = !userMenuShow.value
    }

    const logOut = () => {
      console.log('Log Out')
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiLogOutUser', { email: window.sessionStorage.getItem('email') })
        .then(response => {
          console.log(response)
          router.push('/')
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }
    return {
      userMenuShow,
      showMenu,
      logOut
    }
  }
}
</script>

<style lang="stylus">
.UserMenu
  height auto
  display flex
  align-items center
  position relative
  &-Icon
    background-color var(--white-dark)
    font-size 30px
    color var(--black-light)
    border-radius 50%
    padding 4px
    cursor pointer
  &-Menu
    box-shadow 0 0 40px var(--black-light)
    padding 10px
    background-color var(--white-default)
    position fixed
    top 0
    bottom 0
    width 0
    right 0
    opacity 0
    transition 0.5s
    z-index 9000
    display flex
    justify-content flex-start
    align-items flex-start
    &__Active
      opacity 1
      width 400px
      transition 0.5s
  &-MenuContent
    width 100%
  &-Link
    cursor pointer
    width 100%
    display flex
    height 30px
    align-items center
    font-size 20px
    color var(--blue-dark)
    transition 0.5s
    &:hover
      background-color var(--blue-dark)
      color var(--white-default)
      transition 0.5s
  &-LinkIcon
    margin-right 5px
</style>
