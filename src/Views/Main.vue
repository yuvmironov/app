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
    <div v-if="formFlag === 'login'">
      Форма логина
    </div>
    <div class="Main-Registration" v-if="formFlag === 'registration'">
      <label for="email">E-mail</label>
      <input type="email" id="email" v-model="userEmail">
      <label for="login">Имя пользователя</label>
      <input type="text" id="login" v-model="userName">
      <label for="userPassword">Пароль</label>
      <input type="password" id="userPassword" v-model="userPassword">
      <label for="userRepeatPassword">Повторение пароля</label>
      <input type="password" id="userRepeatPassword" v-model="userRepeatPassword">
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
  &-Registration
    display flex
    flex-direction column
</style>
