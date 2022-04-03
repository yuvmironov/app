import { ref } from 'vue'

export function ChangeForm (userEmail, userName, userPassword, userRepeatPassword) {
  const formFlag = ref('login')
  const selectForm = (data) => {
    resetUser()
    formFlag.value = data
  }

  const resetUser = () => {
    userEmail.value = ''
    userName.value = ''
    userPassword.value = ''
    userRepeatPassword.value = ''
  }

  return {
    formFlag,
    selectForm,
    resetUser
  }
}
