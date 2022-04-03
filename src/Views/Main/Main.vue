<template>
  <div class="Main">
    <div id="testData">
      {{ userEmail }}
      {{ userName }}
      {{ userPassword }}
      {{ userRepeatPassword }}
    </div>
    <div class="Main-Buttons">
      <span @click="selectForm('login')" class="Main-ButtonsForm">
        <span class="icon icon-user-check"></span>
        Логин
      </span>
      <span class="Main-ButtonsForm">/</span>
      <span @click="selectForm('registration')" class="Main-ButtonsForm">
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
        label="Ваш логин (англ)"
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
          :fun="registrationUser"
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
import { ChangeForm } from './ChangeForm'
import { Login } from './Login'
import { Registration } from './Registration'

export default {
  name: 'Main',
  setup () {
    const userEmail = ref('')
    const userName = ref('')
    const userPassword = ref('')
    const userRepeatPassword = ref('')

    const { formFlag, selectForm, resetUser } = ChangeForm(userEmail, userName, userPassword, userRepeatPassword)
    const { loginUser } = Login(userEmail, userPassword)
    const { registrationUser } = Registration(userEmail, userName, userPassword, userRepeatPassword, resetUser, formFlag)
    return {
      formFlag,
      selectForm,
      userEmail,
      userName,
      userPassword,
      userRepeatPassword,
      loginUser,
      resetUser,

      registrationUser
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
  &-ButtonsForm
    cursor pointer
    &:not(:last-child)
      margin-right 10px
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
