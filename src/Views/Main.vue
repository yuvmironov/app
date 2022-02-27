<template>
  <div>
    <div id="testData">
      {{ userEmail }}
      {{ userName }}
      {{ userPassword }}
      {{ userRepeatPassword }}
    </div>
    <div class="Main-Buttons">
      <span @click="selectForm('login')">Логин</span>
      <span @click="selectForm('registration')">Регистрация</span>
    </div>
    <div class="Main-LoginForm" v-if="formFlag === 'login'">
      <input-component
        class="Main-Input"
        type="email"
        v-model="userEmail"
        id="email"
        label="E-mail"
      />
      <input-component
        class="Main-Input"
        type="password"
        v-model="userPassword"
        id="password"
        label="Пароль"
      />
      <div class="Main-LoginButtons">
        <button>Логин</button>
        <button @click="resetUser">Очистить форму</button>
      </div>
    </div>
    <div class="Main-Registration" v-if="formFlag === 'registration'">
      <input-component
        class="Main-Input"
        type="email"
        v-model="userEmail"
        id="email"
        label="E-mail"
      />
      <input-component
        class="Main-Input"
        type="text"
        v-model="userName"
        id="name"
        label="Ваше имя"
      />
      <input-component
        class="Main-Input"
        type="password"
        v-model="userPassword"
        id="password"
        label="Пароль"
      />
      <input-component
        class="Main-Input"
        type="password"
        v-model="userRepeatPassword"
        id="repeatPassword"
        label="Повторение пароля"
      />
      <div class="Main-RegistrationButtons">
        <button @click="registration">Регистрация</button>
        <button @click="resetUser">Очистить форму</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Main',
  setup () {
    const store = useStore()

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
          if (element.classList.contains('InputComponents-Input__Error')) {
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
          })
      }
    }

    return {
      formFlag,
      selectForm,
      userEmail,
      userName,
      userPassword,
      userRepeatPassword,
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
  &-Input
    &:not(:last-child)
      margin-bottom 10px
</style>
