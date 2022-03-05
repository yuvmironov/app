import { createStore } from 'vuex'
import User from '@/Store/User'
import Notification from 'yuv-components/src/store/Notification'
import List from '@/Store/List'

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
    Notification,
    List
  }
})
