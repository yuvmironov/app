import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function Login (userEmail, userPassword) {
  const store = useStore()
  const router = useRouter()

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
    loginUser
  }
}
