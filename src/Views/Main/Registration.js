import { useStore } from 'vuex'

export function Registration (userEmail, userName, userPassword, userRepeatPassword, resetUser, formFlag) {
  const store = useStore()

  const registrationUser = () => {
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
        .catch(err => {
          store.commit('SetNotification', {
            header: 'Ошибка',
            body: err.message,
            flag: true,
            status: 'error',
            duration: 5000
          })
        })
        .finally(() => {
          store.commit('SetGloaderFlag', false)
        })
    }
  }

  return {
    registrationUser
  }
}
