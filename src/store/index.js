import { createStore } from 'vuex'
import User from '@/Store/User'
import Notification from 'yuv-components/src/store/Notification'
import GlobalLoader from 'yuv-components/src/store/GlobalLoader'
import List from '@/Store/List'
import Notes from '@/Store/Notes'
import Mailing from '@/Store/Mailing'
import Mail from '@/Store/Mail'

export default createStore({
  state: {
    token: '',
    statuses: {}
  },
  getters: {
    GetToken: state => state.token,
    GetStatuses: state => state.statuses
  },
  mutations: {
    SetToken: (state, data) => {
      state.token = data
    },
    SetStatuses: (state, data) => {
      state.statuses = data
    }
  },
  modules: {
    User,
    Notification,
    GlobalLoader,
    List,
    Notes,
    Mailing,
    Mail
  }
})
