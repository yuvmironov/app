import { createStore } from 'vuex'
import User from '@/Store/User'
import Notification from '@/Store/Notificatioin'

export default createStore({
  state: {
    token: ''
  },
  getters: {
    GetToken: state => state.token
  },
  mutations: {
    SetToken: (state, data) => {
      state.token = data
    }
  },
  modules: {
    User,
    Notification
  }
})
