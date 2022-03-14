<template>
  <div class="Main">
    <div id="testData">
      {{ userEmail }}
      {{ userName }}
      {{ userPassword }}
      {{ userRepeatPassword }}
    </div>
    <div class="Main-Buttons">
      <span @click="selectForm('login')">
        <span class="icon icon-user-check"></span>
        Логин
      </span>
      <span @click="selectForm('registration')">
        <span class="icon icon-user-plus"></span>
        Регистрация
      </span>
    </div>
    <div class="Main-LoginForm" v-if="formFlag === 'login'">
      <yuv-input
        class="Main-Input"
        type="email"
        v-model="userEmail"
        id="email"
        label="E-mail"
      />
      <yuv-input
        class="Main-Input"
        type="password"
        v-model="userPassword"
        id="password"
        label="Пароль"
      />
      <div class="Main-LoginButtons">
        <yuv-button
          name="Войти"
          left-icon="user-check"
          type="base"
          :fun="loginUser"
        />
        <yuv-button
          name="Очистить"
          left-icon="trash"
          type="base"
          :fun="resetUser"
        />
      </div>
    </div>
    <div class="Main-Registration" v-if="formFlag === 'registration'">
      <yuv-input
        class="Main-Input"
        type="email"
        v-model="userEmail"
        id="email"
        label="E-mail"
      />
      <yuv-input
        class="Main-Input"
        type="text"
        v-model="userName"
        id="name"
        label="Ваше имя"
      />
      <yuv-input
        class="Main-Input"
        type="password"
        v-model="userPassword"
        id="password"
        label="Пароль"
      />
      <yuv-input
        class="Main-Input"
        type="password"
        v-model="userRepeatPassword"
        id="repeatPassword"
        label="Повторение пароля"
      />
      <div class="Main-RegistrationButtons">
        <yuv-button
          name="Регистрация"
          left-icon="user-plus"
          type="base"
          :fun="registration"
        />
        <yuv-button
          name="Очистить"
          left-icon="trash"
          type="base"
          :fun="resetUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Main',
  setup () {
    const store = useStore()
    const router = useRouter()

    const formFlag = ref('login')
    const selectForm = (data) => {
      resetUser()
      formFlag.value = data
    }

    const userEmail = ref('')
    const userName = ref('')
    const userPassword = ref('')
    const userRepeatPassword = ref('')
    const resetUser = () => {
      userEmail.value = ''
      userName.value = ''
      userPassword.value = ''
      userRepeatPassword.value = ''
    }

    const registration = () => {
      const formRegistration = document.querySelector('.Main-Registration')
      let flag = false
      Array.from(formRegistration.children).forEach(item => {
        Array.from(item.children).forEach(element => {
          if (element.classList.contains('YuvInput-Input__Error')) {
            flag = true
          }
        })
      })
      if (flag) {
        store.commit('SetNotification', {
          header: 'Ошибка ввода данных',
          body: 'Не все поля ввода заполнены корректно',
          flag: true,
          status: 'error',
          duration: 5000
        })
      } else {
        store.commit('SetGloaderFlag', true)
        store.dispatch('registrationUser', {
          email: userEmail.value,
          login: userName.value,
          password: userPassword.value,
          repeatPassword: userRepeatPassword.value
        })
          .then(response => {
            store.commit('SetNotification', {
              header: 'Успешно',
              body: response.message,
              flag: true,
              status: 'success',
              duration: 5000
            })
            resetUser()
            formFlag.value = 'login'
          })
          .finally(() => {
            store.commit('SetGloaderFlag', false)
          })
      }
    }

    const loginUser = () => {
      store.commit('SetGloaderFlag', true)
      store.dispatch('apiLoginUser', {
        email: userEmail.value,
        password: userPassword.value
      })
        .then(result => {
          store.commit('SetUserName', result.data.user)
          router.push('/taskList')
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }

    return {
      formFlag,
      selectForm,
      userEmail,
      userName,
      userPassword,
      userRepeatPassword,
      loginUser,
      resetUser,

      registration
    }
  }
}
</script>

<style lang="stylus">
#testData
  position fixed
  width 300px
  border 1px solid grey
  top 0
  right 0
  display flex
  flex-direction column
  background-color white
.Main
  display flex
  justify-content center
  align-items center
  flex-direction column
  &-Registration, &-LoginForm
    padding 15px
  &-Registration, &-LoginForm
    width 300px
  &-RegistrationButtons, &-LoginButtons
    display flex
    justify-content space-between
  &-Input
    &:not(:last-child)
      margin-bottom 10px
</style>
